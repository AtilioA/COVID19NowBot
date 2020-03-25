const date = require('date-and-time');
var myLocalize = require('./bot_localize.js');
const scrap_worldometer = require('./scraping/scrap_worldometer.js');
require('dotenv/config');

const bot = require('./bot_config.js');

bot.on(['/start'], async (msg) => {
  await bot.sendAction(msg.chat.id, "typing");
  bot.sendMessage(msg.chat.id, myLocalize.translate("start"), { parseMode: 'Markdown', webPreview: false, replyToMessage: msg.message_id });
});

bot.on(['/help', '/ajuda'], async (msg) => {
  await bot.sendAction(msg.chat.id, "typing");
  bot.sendMessage(msg.chat.id, "Not yet.", { replyToMessage: msg.message_id });
});

bot.on(['/prior', '/tropa_do_prior'], async (msg) => {
  await bot.sendAction(msg.chat.id, "typing");
  await bot.sendMessage(msg.chat.id, "_JOGA Y JOGA_...", { parseMode: 'Markdown', });
  await bot.sendAction(msg.chat.id, "upload_video");
  return bot.sendVideo(msg.chat.id, "BAACAgEAAxkBAAMFXnpQk-y5Qtm2usbDu9gEfj0mecQAAm4AA7cQ0EcytWs1Hs6JfRgE", { replyToMessage: msg.message_id });
});

bot.on(['/all', '/total', '/world'], async (msg) => {
  await bot.sendAction(msg.chat.id, "typing");

  var scrapObj = await scrap_worldometer();
  const now = new Date();
  var currentDate = date.format(now, 'DD/MM/YYYY HH:mm:ss UTC', true);
  var worldString = `Currently in the *WORLD*:
  🦠 ${ scrapObj['totalCases']} cases of COVID-19.
  ☠️ ${scrapObj['totalDeaths']} people died.
  😷 ${scrapObj['activeCases']} active cases.
  🤒 ${ scrapObj['seriousCases']} people in critical condition.
  💊 ${scrapObj['totalRecovered']} people recovered.

Today in the *WORLD*:
  🦠 ${ scrapObj['newCases']} cases of COVID-19.
  ☠️ ${ scrapObj['newDeaths']} people died.

Fetched at ${currentDate}.`;

  await bot.sendMessage(msg.chat.id, worldString, { parseMode: 'Markdown', });
});

bot.start();
