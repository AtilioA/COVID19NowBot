const cron = require('node-cron');
const axios = require('axios');
require('dotenv/config');

const telebot = require('telebot');
const bot = new telebot(process.env.BOT_TOKEN);

const http = require('http');

http.createServer((req, res) => {
  res.write('Hello, World!');
  res.end();
}).listen(process.env.PORT || 3333);

cron.schedule('0,15,30,45 * * * *', async () => {
  axios.get('http://zapeador.herokuapp.com/');
});

module.exports = bot;
