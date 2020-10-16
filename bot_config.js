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
  axios.get('https://chooseipsum.herokuapp.com/');
});

// Keep INMETBot awake
cron.schedule('0,40 10-23,2 * * *', () => {
  axios.get('https://inmetbot.herokuapp.com/');
});

module.exports = bot;
