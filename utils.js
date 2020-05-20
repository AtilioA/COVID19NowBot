/* eslint-disable no-unused-vars */
const mongoose = require('mongoose');
const { Chat } = require('./chat.model.js');
const roundTo = require("round-to");
const date = require('date-and-time');
const { getCountryStats } = require('./data/consume_api');
const { translate } = require("./locales/translations.js");

function addDiffEmoji(diffString) {
  return (parseFloat(diffString) < 0 ? "📉 " : "📈 ") + diffString;
}

function addSign(intString) {
  return (intString < 0 ? "" : "+") + intString;
}

function formatDiff(diffObj) {
  var diffConfirmed = addDiffEmoji(addSign((diffObj['diffConfirmed'])));
  var diffDeaths = addDiffEmoji(addSign((diffObj['diffDeaths'])));
  var diffRecovered = addDiffEmoji(addSign((diffObj['diffRecovered'])));
  var diffConfirmedPercentage = addSign(diffObj['diffConfirmedPercentage']);
  var diffDeathsPercentage = addSign(diffObj['diffDeathsPercentage']);
  var diffRecoveredPercentage = addSign(diffObj['diffRecoveredPercentage']);

  const formatedDiffObj = {
    diffConfirmed,
    diffDeaths,
    diffRecovered,
    diffConfirmedPercentage,
    diffDeathsPercentage,
    diffRecoveredPercentage
  };

  return formatedDiffObj;
}

function calculateDiff(previous, current) {
  var previousNewCases = previous[previous.length - 1].confirmed - previous[0].confirmed;
  var previousNewDeaths = previous[previous.length - 1].deaths - previous[0].deaths;
  var previousNewRecovered = previous[previous.length - 1].recovered - previous[0].recovered;

  var currentNewCases = current[current.length - 1].confirmed - current[0].confirmed;
  var currentNewDeaths = current[current.length - 1].deaths - current[0].deaths;
  var currentNewRecovered = current[current.length - 1].recovered - current[0].recovered;

  const diffConfirmed = currentNewCases - previousNewCases;
  const diffConfirmedPercentage = roundTo((diffConfirmed / previousNewCases * 100), 2);
  const diffDeaths = currentNewDeaths - previousNewDeaths;
  const diffDeathsPercentage = roundTo((diffDeaths / previousNewDeaths * 100), 2);
  const diffRecovered = currentNewRecovered - previousNewRecovered;
  const diffRecoveredPercentage = roundTo((diffRecovered / previousNewRecovered * 100), 2);

  const casesDiff = {
    diffConfirmed,
    diffDeaths,
    diffRecovered,
    diffConfirmedPercentage,
    diffDeathsPercentage,
    diffRecoveredPercentage
  };

  return casesDiff;
}

async function calculateDiffDays(nDays, country = undefined) {
  var countryStats;
  if (country) {
    countryStats = await getCountryStats(country);
  }

  if (countryStats) {
    const previousWeek = countryStats.splice(countryStats.length - (nDays * 2), nDays);
    const currentWeek = countryStats.splice(countryStats.length - nDays, nDays);

    const diff = calculateDiff(previousWeek, currentWeek);
    return diff;
  }

  return undefined;
}

function titleCase(str) {
  str = str.split(' ');
  for (var i = 0; i < str.length; i++) {
    str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
  }
  return str.join(' ');
}

function createRankingString(order = "top", nCountries, countriesList) {
  var rankingString = `*${order.toUpperCase()} ${nCountries} COUNTRIES*:\n\n`;

  console.log(countriesList.entries());
  for (let [i, country] of countriesList.entries()) {
    rankingString += `${i + 1} - *${country['Country']}*\n`;
    rankingString += `😷 ${country["ActiveCases"] || "0"} ☠️ ${country["TotalDeaths"] || "0"} 💊 ${country["TotalRecovered"] || "0"}\n\n`;
  }

  const now = new Date();
  var currentDate = date.format(now, 'DD/MM/YYYY HH:mm:ss UTC', true);
  rankingString += `Fetched at ${currentDate}.`;

  return rankingString;
}

async function clearOldMessages(bot) {
  // Get updates for the bot
  const updates = await bot.telegram.getUpdates(0, 100, -1);

  //  Add 1 to the ID of the last one, if there is one
  return updates.length > 0
    ? updates[updates.length - 1].update_id + 1
    : 0
    ;
}

async function changeChatLocale(locale, ctx) {
  const Chat = mongoose.model('Chat');
  const chatQuery = await Chat.findOne({ id: ctx.update.callback_query.message.chat.id }, async (err, doc) => {
    if (!doc) {
      console.log("New chat.");
      new Chat({
        id: ctx.update.callback_query.message.chat.id.toString(),
        locale: "pt-br"
      }).save().then(async () => {
        console.log("Saved new chat.");
        await ctx.replyWithMarkdown(translate("setLocale", locale, locale));
      }).catch(async (err) => {
        await ctx.replyWithMarkdown(`Couldn't save language preference as *${locale}*!`);
        console.log("Couldn't create chat: " + err);
      });
    }
    else {
      console.log("Chat already exists.");
      doc.locale = locale;
      await doc.save();
      await ctx.replyWithMarkdown(translate("setLocale", locale, locale));
    }
  });
}

module.exports = { calculateDiffDays, titleCase, createRankingString, formatDiff, changeChatLocale, clearOldMessages };
