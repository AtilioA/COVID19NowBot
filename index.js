require('dotenv/config');

const date = require('date-and-time');
var covid19Api = require("covid19-api");

const bot = require('./bot_config.js');
var myLocalize = require('./bot_localize.js');
const getWorldStats = require('./data/scrap_worldometer.js');
const { calculateDiffDays, createRankingString } = require('./utils.js');


bot.on(['/start'], async (msg) => {
  console.log(`${msg.text} from ${msg.from.first_name} (${msg.from.username})`);
  await bot.sendAction(msg.chat.id, "typing");
  bot.sendMessage(msg.chat.id, myLocalize.translate("start"), { parseMode: 'Markdown', webPreview: false, replyToMessage: msg.message_id });
});

bot.on(['/help', '/ajuda'], async (msg) => {
  await bot.sendAction(msg.chat.id, "typing");
  bot.sendMessage(msg.chat.id, myLocalize.translate("help"), { parseMode: 'Markdown', webPreview: false, replyToMessage: msg.message_id });
});

bot.on(['/all', '/total', '/world'], async (msg) => {
  await bot.sendAction(msg.chat.id, "typing");

  var scrapObj = await getWorldStats();
  const now = new Date();
  var currentDate = date.format(now, 'DD/MM/YYYY HH:mm:ss UTC', true);

  var worldString = myLocalize.translate("worldStats", scrapObj['totalCases'], scrapObj['totalDeaths'], scrapObj['activeCases'], scrapObj['seriousCases'], scrapObj['totalRecovered'], scrapObj['newCases'], scrapObj['newDeaths'], currentDate, "WORLD");

  await bot.sendMessage(msg.chat.id, worldString, { parseMode: 'Markdown', replyToMessage: msg.message_id });
});

bot.on(['/prior', '/tropa_do_prior', /^prior$/i], async (msg) => {
  await bot.sendAction(msg.chat.id, "typing");
  await bot.sendMessage(msg.chat.id, "_JOGA Y JOGA_...", { parseMode: 'Markdown', replyToMessage: msg.message_id });
  await bot.sendAction(msg.chat.id, "upload_video");
  return bot.sendVideo(msg.chat.id, "BAACAgEAAxkBAAMFXnpQk-y5Qtm2usbDu9gEfj0mecQAAm4AA7cQ0EcytWs1Hs6JfRgE");
});

bot.on(/^\/?(.+)$/, async (msg, props) => {
  const text = props.match[1].toString();

  // getReportsByCountries doesn't return info about new cases
  var countriesReports = await covid19Api.getReports();
  var countryObj = undefined;

  for (let country of countriesReports[0][0]['table'][0]) {
    if (text.toLowerCase() == country['Country'].toLowerCase()) {
      await bot.sendAction(msg.chat.id, "typing");
      countryObj = country;
    }
  }

  if (countryObj != undefined) {
    const now = new Date();
    var currentDate = date.format(now, 'DD/MM/YYYY HH:mm:ss UTC', true);

    var diffObj = await calculateDiffDays(7, countryObj['Country']);
    let { diffConfirmed, diffDeaths, diffRecovered, diffConfirmedPercentage, diffDeathsPercentage, diffRecoveredPercentage } = diffObj;

    var worldString = myLocalize.translate("worldStats", countryObj['TotalCases'], countryObj['TotalDeaths'], countryObj['ActiveCases'], countryObj['Serious_Critical'], countryObj['TotalRecovered'], countryObj['NewCases'].replace(/\+/g, ''), countryObj['NewDeaths'].replace(/\+/g, ''), currentDate, countryObj["Country"], diffConfirmed, diffDeaths, diffRecovered, diffConfirmedPercentage, diffDeathsPercentage, diffRecoveredPercentage);

    await bot.sendMessage(msg.chat.id, worldString, { parseMode: 'Markdown', replyToMessage: msg.message_id });
  }
});

bot.on([/\/(\w+)\s*(\d*)\s*/], async (msg, props) => {
  var commandText = props.match[1], nCountries = props.match[2];
  if (commandText == "top" || commandText == "bottom") {
    if (!nCountries) { nCountries = 10; }
    if (nCountries > 100) {
      const nTooBigWarning = `The maximum number of countries is *100*. I'll use *10* instead of ${nCountries}.`;
      await bot.sendMessage(msg.chat.id, nTooBigWarning, { parseMode: 'Markdown', replyToMessage: msg.message_id });
      nCountries = 10;
    }

    var countriesReports = await covid19Api.getReports();
    switch (commandText) {
      case "top":
        countriesReports = countriesReports[0][0]['table'][0].slice(0, -1).slice(null, nCountries);
        break;
      case "bottom":
        countriesReports = countriesReports[0][0]['table'][0].slice(0, -1).reverse().slice(null, nCountries);
        break;
      default:
        console.log(`Failed switch-case for /${commandText}`);
        break;
    }

    const rankingString = createRankingString(commandText, nCountries, countriesReports);

    await bot.sendMessage(msg.chat.id, rankingString, { parseMode: 'Markdown', replyToMessage: msg.message_id });
  }
});

bot.start();
