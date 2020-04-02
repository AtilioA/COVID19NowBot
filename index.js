require('dotenv/config');

const date = require('date-and-time');
var covid19Api = require("covid19-api");

const bot = require('./bot_config.js');
const Extra = require('telegraf/extra');
var myLocalize = require('./bot_localize.js');
const getWorldStats = require('./data/scrap_worldometer.js');
const { calculateDiffDays, createRankingString } = require('./utils.js');
const { flag } = require('country-emoji');

bot.command(['/start'], async (ctx) => {
  console.log(`${ctx.message.text} from ${ctx.from.first_name} (${ctx.from.username})`);
  await ctx.replyWithChatAction("typing");
  ctx.replyWithMarkdown(myLocalize.translate("start"), { reply_to_message_id: ctx.message.message_id, disable_web_page_preview: true });
});

bot.command(['/help', '/ajuda'], async (ctx) => {
  await ctx.replyWithChatAction("typing");
  ctx.replyWithMarkdown(myLocalize.translate("help"), { reply_to_message_id: ctx.message.message_id, disable_web_page_preview: true });
});

bot.command(['/country'], async (ctx) => {
  await ctx.replyWithChatAction("typing");
  ctx.replyWithMarkdown("Please specify a country instead of using _/country_.\nExample: */brazil*", { reply_to_message_id: ctx.message.message_id });
});

bot.command(['/all', '/total', '/world'], async (ctx) => {
  console.log("World");
  await ctx.replyWithChatAction("typing");

  var scrapObj = await getWorldStats();
  const now = new Date();
  var currentDate = date.format(now, 'DD/MM/YYYY HH:mm:ss UTC', true);

  var worldString = myLocalize.translate("worldStats", scrapObj['totalCases'], scrapObj['totalDeaths'] || 0, scrapObj['activeCases'], scrapObj['seriousCases'], scrapObj['totalRecovered'], scrapObj['newCases'], scrapObj['newDeaths'], currentDate, "WORLD", "", "", "", "", "", "", "🗺");

  await ctx.replyWithMarkdown(worldString, { reply_to_message_id: ctx.message.message_id });
});

bot.hears(['/prior', '/tropa_do_prior', /^prior/i], async (ctx) => {
  console.log("Joga y joga.");
  await ctx.replyWithChatAction("typing");
  ctx.replyWithMarkdown("_JOGA Y JOGA_...", { reply_to_message_id: ctx.message.message_id });
  await ctx.replyWithChatAction("upload_video");
  ctx.replyWithMediaGroup([
    {
      media: 'BAACAgEAAxkBAAMFXnpQk-y5Qtm2usbDu9gEfj0mecQAAm4AA7cQ0EcytWs1Hs6JfRgE',
      type: 'video'
    }]);
});

bot.hears([/\/(top|bottom)(?:@COVID19NowBot)?\s*(\d)*/], async (ctx) => {
  var commandText = ctx.match[1], nCountries = ctx.match[2];

  if (commandText == "top" || commandText == "bottom") {
    await ctx.replyWithChatAction("typing");
    if (!nCountries) { nCountries = 10; }
    if (nCountries > 100) {
      const nTooBigWarning = `The maximum number of countries is *100*. I'll use *10* instead of ${nCountries}.`;
      await ctx.replyWithMarkdown(nTooBigWarning, { reply_to_message_id: ctx.message.message_id });
      nCountries = 10;
      await ctx.replyWithChatAction("typing");
    }

    console.log(commandText, nCountries);

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

    await ctx.replyWithMarkdown(rankingString, { reply_to_message_id: ctx.message.message_id });
  }
});

bot.hears(/^\/?(\w+\.?\s*\w*)$/, async (ctx) => {
  const text = ctx.match[1].toString();

  // getReportsByCountries doesn't return info about new cases
  var countriesReports = await covid19Api.getReports();
  var countryObj = undefined;

  for (let country of countriesReports[0][0]['table'][0]) {
    if (text.toLowerCase() == country['Country'].toLowerCase()) {
      await ctx.replyWithChatAction("typing");
      countryObj = country;
    }
  }

  if (countryObj != undefined) {
    console.log(countryObj["Country"]);
    const countryFlag = flag(countryObj["Country"]);

    const now = new Date();
    var currentDate = date.format(now, 'DD/MM/YYYY HH:mm:ss UTC', true);

    var diffConfirmed, diffDeaths, diffRecovered, diffConfirmedPercentage, diffDeathsPercentage, diffRecoveredPercentage;

    var diffObj = await calculateDiffDays(7, countryObj['Country']);
    if (diffObj) {
      ({ diffConfirmed, diffDeaths, diffRecovered, diffConfirmedPercentage, diffDeathsPercentage, diffRecoveredPercentage } = diffObj);
    }

    var worldString = myLocalize.translate("worldStats", countryObj['TotalCases'], countryObj['TotalDeaths'] || 0, countryObj['ActiveCases'] || 0, countryObj['Serious_Critical'] || 0, countryObj['TotalRecovered'] || 0, countryObj['NewCases'] || 0, countryObj['NewDeaths'] || 0, currentDate, countryObj["Country"], diffConfirmed, diffDeaths, diffRecovered, diffConfirmedPercentage, diffDeathsPercentage, diffRecoveredPercentage, countryFlag || "");

    await ctx.replyWithMarkdown(worldString, { parseMode: 'Markdown', reply_to_message_id: ctx.message.message_id });
  }
});

bot.launch();
