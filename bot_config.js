const cron = require('node-cron');
const axios = require('axios');
require('dotenv/config');

const Telegraf = require('telegraf');
const bot = new Telegraf(process.env.BOT_TOKEN);

const http = require('http');

http.createServer((req, res) => {
  res.write('COVID19NowBot is online.');
  res.end();
}).listen(process.env.PORT || 3333);

module.exports = bot;
