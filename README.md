<h1 align="center">
  <br>
    <a href="https://t.me/COVID19NOWBot">
    <img src=".github/bot_icon_circle.png" width="30%"></a>
  <br>
  <a href="https://t.me/COVID19NOWBot">🦠 COVID19NOWBot</a>
  <br>
</h1>

<h4 align="center"><a href="https://t.me/COVID19NOWBot">@COVID19NOWBot</a> - Telegram bot to fetch numbers of COVID-19 cases. Available in 🇺🇸, 🇧🇷 and 🇫🇷.
</h4>

<h5 align="center">

[![Telegram bot](https://img.shields.io/badge/Telegram-bot-0088CC)](https://t.me/COVID19NowBot) [![Heroku App Status](https://heroku-shields.herokuapp.com/covid19nowbot)](https://covid19nowbot.herokuapp.com) [![License: GPL v3](https://img.shields.io/badge/License-GPLv3-orange.svg)](https://www.gnu.org/licenses/gpl-3.0) ![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/atilioa/covid19nowbot)

</h5>

## ℹ About

Telegram bot that consumes APIs and makes information available through a [Telegram](http://telegram.org/) bot. It runs on JavaScript (Node.js) and uses MongoDB. You can [try it here](https://t.me/COVID19NOWBot) (available in en-US, pt-BR and fr-FR).

## 📖 Examples (in en-US)

- Getting stats for the world:

  ![Telegram bot](.github/world.png)

- Getting stats for countries:

  ![Telegram bot](.github/country-brazil.png)
  ![Telegram bot](.github/country-usa.png)

- Changing locale (to en-US):

  ![Telegram bot](.github/locale.png)

You can learn more with the `/help` command.

## 🏡 Running locally

1- First, clone the repository and enter the folder with your terminal. Then, install all dependencies with

`npm install` or `yarn`

Some of the bot's functionality depends on being connected to a MongoDB database. If you wish to use your own database, just set the `MONGODB_URI` environment variable in the `.env.example` file to your URI connection string and rename the `.env.example` file to `.env` or, alternatively, set `MONGODB_URI` as an environment variable of the system hosting the bot.

You'll be doing the same thing for the `BOT_TOKEN` environment variable. You can get your token/key with [BotFather](t.me/BotFather), the official way to create bots on Telegram.

With everything set, you can start the bot with (nodemon is optional for hot reloading):

`nodemon index.js`

---

Data sources: JHU CSSE, Worldometer and [covid19-api on NPM](https://www.npmjs.com/package/covid19-api#-references).
