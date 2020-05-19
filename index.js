require('dotenv/config');

const date = require('date-and-time');
var covid19Api = require("covid19-api");

var { locales, translate } = require("./locales/translations.js");
var countries = require('./countries.json');

const bot = require('./bot_config.js');
const Keyboard = require('telegraf-keyboard');
const { calculateDiffDays, createRankingString, formatDiff, changeChatLocale, clearOldMessages } = require('./utils.js');
const { flag } = require('country-emoji');
const { Chat } = require('./chat.model.js');
const mongoose = require('mongoose');
const uri = process.env.MONGODB_URI;

mongoose.Promise = global.Promise;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
  console.log("Connected to MongoDB.");
}).catch((err) => {
  console.log("Couldn't connect to MongoDB: " + err);
});

bot.command(['/start'], async (ctx) => {
  console.log(`${ctx.message.text} from ${ctx.from.first_name} (${ctx.from.username})`);

  await ctx.replyWithChatAction("typing");
  const Chat = mongoose.model('Chat');
  var locale;
  var thisChat = await Chat.findOne({ id: ctx.message.chat.id });
  (thisChat ? locale = thisChat.locale : locale = ctx.update.message.from.language_code);

  ctx.replyWithMarkdown(translate("start", locale), { reply_to_message_id: ctx.message.message_id, disable_web_page_preview: true });
});

const options = {
  inline: true,
  duplicates: false,
  newline: false,
};
const languageKeyboard = new Keyboard(options);
languageKeyboard
  .add('🇺🇸 English', '🇫🇷 Français') // first line
  .add('🇧🇷 Português Brasileiro'); // second line

bot.command(['/language'], async (ctx) => {
  const Chat = mongoose.model('Chat');
  var locale;
  var thisChat = await Chat.findOne({ id: ctx.message.chat.id });
  (thisChat ? locale = thisChat.locale : locale = ctx.update.message.from.language_code);

  const selectLanguage = translate("selectLanguage", locale);

  ctx.reply(selectLanguage, languageKeyboard.draw());
}).on('callback_query', (ctx) => {
  console.log(`/language callback_query from ${ctx.callbackQuery.from.first_name} (${ctx.from.username})`);

  var locale;
  switch (ctx.callbackQuery.data.slice(0, 4)) {
    case "🇺🇸":
      locale = "en";
      break;
    case "🇧🇷":
      locale = "pt-br";
      break;
    case "🇫🇷":
      locale = "fr";
      break;
  }

  ctx.answerCbQuery(ctx.callbackQuery.data);
  changeChatLocale(locale, ctx);

});

bot.command(['/help', '/ajuda'], async (ctx) => {
  await ctx.replyWithChatAction("typing");

  const Chat = mongoose.model('Chat');
  var locale;
  var thisChat = await Chat.findOne({ id: ctx.message.chat.id });
  (thisChat ? locale = thisChat.locale : locale = ctx.update.message.from.language_code);

  ctx.replyWithMarkdown(translate("help", locale), { reply_to_message_id: ctx.message.message_id, disable_web_page_preview: true });
});

bot.command(['/country'], async (ctx) => {
  await ctx.replyWithChatAction("typing");

  const Chat = mongoose.model('Chat');
  var locale;
  var thisChat = await Chat.findOne({ id: ctx.message.chat.id });
  (thisChat ? locale = thisChat.locale : locale = ctx.update.message.from.language_code);

  ctx.replyWithMarkdown(translate("country", locale), { reply_to_message_id: ctx.message.message_id });
});

bot.hears([/\/(?:locale(?:@COVID19NowBot)?(?:\s*(\w+))?)|^\/(en)$|^\/(pt)$|^\/((pt_)?br)$|^\/(fr)$/i], async (ctx) => {
  for (let element of ctx.match.slice(1)) {
    if (element) {
      var locale = element;
      break;
    }
  }

  console.log(locale);

  switch (locale) {
    case "english":
      locale = "en";
      break;
    case "pt":
      locale = "pt-br";
      break;
    case "br":
      locale = "pt-br";
      break;
    case "french":
      locale = "fr";
      break;
  }

  await ctx.replyWithChatAction("typing");
  if (locales.indexOf(locale) != -1) {
    const Chat = mongoose.model('Chat');

    const chatQuery = await Chat.findOne({ id: ctx.message.chat.id }, async (err, doc) => {
      if (!doc) {
        console.log("New chat");
        new Chat({
          id: ctx.message.chat.id.toString(),
          locale: "pt-br"
        }).save().then(async () => {
          console.log("Saved new chat.");
          await ctx.replyWithMarkdown(translate("setLocale", locale, locale), { reply_to_message_id: ctx.message.message_id });
        }).catch(async (err) => {
          await ctx.replyWithMarkdown(`Couldn't save language preference as *${locale}*!`, { reply_to_message_id: ctx.message.message_id });
          console.log("Couldn't create chat: " + err);
        });
      }
      else {
        console.log("Chat already exists");
        doc.locale = locale;
        await doc.save();
        await ctx.replyWithMarkdown(translate("setLocale", locale, locale), { reply_to_message_id: ctx.message.message_id });
      }
    });
  }
  else {
    await ctx.replyWithMarkdown(`Unrecognized locale. Available locales: ${locales}`, { reply_to_message_id: ctx.message.message_id });
  }
});

bot.command(['/all', '/total', '/world'], async (ctx) => {
  console.log(`World from ${ctx.from.first_name} (${ctx.from.username})`);
  await ctx.replyWithChatAction("typing");

  var scrapObj = await covid19Api.getReports();
  scrapObj = scrapObj[0][0]['table'][0][0];
  if (scrapObj) {
    const now = new Date();
    var currentDate = date.format(now, 'DD/MM/YYYY HH:mm:ss UTC', true);

    const Chat = mongoose.model('Chat');
    var locale;
    var thisChat = await Chat.findOne({ id: ctx.message.chat.id });
    (thisChat ? locale = thisChat.locale : locale = ctx.update.message.from.language_code);

    var worldString = translate("worldStats", locale, scrapObj['TotalCases'], scrapObj['TotalDeaths'] || 0, scrapObj['ActiveCases'] || 0, scrapObj['Serious_Critical'] || 0, scrapObj['TotalRecovered'] || 0, scrapObj['NewCases'] || 0, scrapObj['NewDeaths'] || 0, currentDate, "🗺");

    await ctx.replyWithMarkdown(worldString, { parseMode: 'Markdown', reply_to_message_id: ctx.message.message_id });
  }
});

bot.hears(['/babu', '/tropa_do_babu', /^babu$/i], async (ctx) => {
  console.log("PAIZÃO TÁ ON");
  await ctx.replyWithChatAction("typing");
  ctx.replyWithMarkdown("*PAIZÃO TÁ ON*", { reply_to_message_id: ctx.message.message_id });
  await ctx.replyWithChatAction("upload_video");
  ctx.replyWithMediaGroup([
    {
      media: 'BAACAgEAAxkBAAOYXotbqYLWGT-HU5KzRicR-Vxq3gUAAucAAzkgWEQfNJz7BNdnXRgE',
      type: 'video'
    }]);
});

bot.hears([/\/(top|bottom)(?:@COVID19NowBot)?\s*(\d+)?/i], async (ctx) => {
  var commandText = ctx.match[1], nCountries = ctx.match[2];

  if (commandText == "top" || commandText == "bottom") {
    await ctx.replyWithChatAction("typing");

    const Chat = mongoose.model('Chat');
    var locale;
    var thisChat = await Chat.findOne({ id: ctx.message.chat.id });
    (thisChat ? locale = thisChat.locale : locale = ctx.update.message.from.language_code);

    if (!nCountries) { nCountries = 10; }
    if (nCountries > 100) {
      const nTooBigWarning = translate("maxCountries", locale, nCountries);
      await ctx.replyWithMarkdown(nTooBigWarning, { reply_to_message_id: ctx.message.message_id });
      nCountries = 10;
      await ctx.replyWithChatAction("typing");
    }

    console.log(`${commandText} ${nCountries} from ${ctx.from.first_name} (${ctx.from.username})`);

    var countriesReports = await covid19Api.getReports();
    switch (commandText) {
      case "top":
        countriesReports = countriesReports[0][0]['table'][0].slice(1, -1).slice(0, nCountries);
        break;
      case "bottom":
        countriesReports = countriesReports[0][0]['table'][0].slice(0, -2).reverse().slice(0, nCountries);
        break;
      default:
        console.log(`Failed switch-case for /${commandText}`);
        break;
    }

    const rankingString = createRankingString(commandText, nCountries, countriesReports);
    const translatedRankingString = translate("rankingString", locale, rankingString);

    await ctx.replyWithMarkdown(rankingString, { reply_to_message_id: ctx.message.message_id });
  }
});

bot.hears(/^\/?(\w+\.?\s*\w*)$/, async (ctx) => {
  const text = ctx.match[1].toString();

  if (countries.includes(text.toUpperCase())) {
    var countriesReports = await covid19Api.getReports();
    var countryObj = undefined;

    for (let country of countriesReports[0][0]['table'][0]) {
      if (text.toLowerCase() == country['Country'].toLowerCase()) {
        await ctx.replyWithChatAction("typing");
        countryObj = country;
      }
    }

    if (countryObj != undefined) {
      console.log(`${countryObj["Country"]} from ${ctx.from.first_name} (${ctx.from.username})`);
      const countryFlag = flag(countryObj["Country"]);

      const now = new Date();
      var currentDate = date.format(now, 'DD/MM/YYYY HH:mm:ss UTC', true);

      var diffConfirmed, diffDeaths, diffRecovered, diffConfirmedPercentage, diffDeathsPercentage, diffRecoveredPercentage;

      var diffObj = await calculateDiffDays(7, countryObj['Country']);
      if (diffObj) {
        var formatedDiffObj = formatDiff(diffObj);
        ({ diffConfirmed, diffDeaths, diffRecovered, diffConfirmedPercentage, diffDeathsPercentage, diffRecoveredPercentage } = formatedDiffObj);
      }

      const Chat = mongoose.model('Chat');
      var locale;
      var thisChat = await Chat.findOne({ id: ctx.message.chat.id });
      (thisChat ? locale = thisChat.locale : locale = ctx.update.message.from.language_code);

      var countryString = translate("countryStats", locale, countryObj['TotalCases'], countryObj['TotalDeaths'] || 0, countryObj['ActiveCases'] || 0, countryObj['Serious_Critical'] || 0, countryObj['TotalRecovered'] || 0, countryObj['NewCases'] || 0, countryObj['NewDeaths'] || 0, currentDate, countryObj["Country"], diffConfirmed, diffDeaths, diffRecovered, diffConfirmedPercentage, diffDeathsPercentage, diffRecoveredPercentage, countryFlag || "");

      await ctx.replyWithMarkdown(countryString, { parseMode: 'Markdown', reply_to_message_id: ctx.message.message_id });
    }
  }
});

bot.launch();
// bot.startPolling();
console.log('Bot started at', new Date());
