require('dotenv/config');

const date = require('date-and-time');
var covid19Api = require("covid19-api");

const bot = require('./bot_config.js');
var myLocalize = require('./bot_localize.js');
const getWorldStats = require('./data/scrap_worldometer.js');
const { createRankingString } = require('./utils.js');


bot.on(['/start'], async (msg) => {
  await bot.sendAction(msg.chat.id, "typing");
  bot.sendMessage(msg.chat.id, myLocalize.translate("start"), { parseMode: 'Markdown', webPreview: false, replyToMessage: msg.message_id });
});

bot.on(['/help', '/ajuda'], async (msg) => {
  await bot.sendAction(msg.chat.id, "typing");
  bot.sendMessage(msg.chat.id, "Not yet.", { replyToMessage: msg.message_id });
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
  var res = await covid19Api.getReports();
  var countryObj = undefined;
  // console.log(res[0][0]['table'][0].splice(0, 5));
  for (let country of res[0][0]['table'][0]) {
    if (text.toLowerCase() == country['Country'].toLowerCase()) {
      await bot.sendAction(msg.chat.id, "typing");
      countryObj = country;
    }
  }

  if (countryObj != undefined) {
    const now = new Date();
    var currentDate = date.format(now, 'DD/MM/YYYY HH:mm:ss UTC', true);
    var worldString = myLocalize.translate("worldStats", countryObj['TotalCases'], countryObj['TotalDeaths'], countryObj['ActiveCases'], countryObj['Serious_Critical'], countryObj['TotalRecovered'], countryObj['NewCases'].replace(/\+/g, ''), countryObj['NewDeaths'].replace(/\+/g, ''), currentDate, countryObj["Country"]);

    await bot.sendMessage(msg.chat.id, worldString, { parseMode: 'Markdown', replyToMessage: msg.message_id });
  }
});

bot.on([/\/(\w+)\s*(\d*)\s*/], async (msg, props) => {
  var commandText = props.match[1], nCountries = props.match[2];
  console.log(`${msg.text}`);
  if (nCountries > 100) {
    const nTooBigWarning = `The maximum number of countries is *100*. I'll use *10* instead of ${nCountries}.`;
    await bot.sendMessage(msg.chat.id, nTooBigWarning, { parseMode: 'Markdown', replyToMessage: msg.message_id });
    nCountries = 10;
  }
  var res = await covid19Api.getReports();
  switch (commandText) {
    case "top":
      res = res[0][0]['table'][0].slice(0, -1).slice(null, nCountries);
      break;
    case "bottom":
      res = res[0][0]['table'][0].slice(0, -1).reverse().slice(null, nCountries);
      break;
    default:
      console.log(`Failed switch-case for /${commandText}`);
      break;
  }

  const rankingString = createRankingString(commandText, nCountries, res);

  await bot.sendMessage(msg.chat.id, rankingString, { parseMode: 'Markdown', replyToMessage: msg.message_id });
});

bot.start();
