require('dotenv/config');

const telebot = require('telebot');
const bot = new telebot(process.env.BOT_TOKEN);

module.exports = bot;
