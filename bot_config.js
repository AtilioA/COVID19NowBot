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

// Keep the bot awake
cron.schedule('0,15,30,45 * * * *', async () => {
  axios.get('http://covid19nowbot.herokuapp.com/');
});

// Keep INMETBot awake
cron.schedule('0,30 0,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23 * * *', () => {
  axios.get('https://inmetbot.herokuapp.com/');
});

module.exports = bot;
