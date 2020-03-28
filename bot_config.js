const cron = require('node-cron');
const axios = require('axios');
require('dotenv/config');

const telebot = require('telebot');
const bot = new telebot({
  token: process.env.BOT_TOKEN,
  polling: {
    interval: 100,
    timeout: 0,
    limit: 100,
    retryTimeout: 2000,
  },
});

const http = require('http');

http.createServer((req, res) => {
  res.write('COVID19NowBot is online.');
  res.end();
}).listen(process.env.PORT || 3333);

cron.schedule('0,15,30,45 * * * *', async () => {
  axios.get('http://covid19nowbot.herokuapp.com/');
});

module.exports = bot;
