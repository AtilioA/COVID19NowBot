const bot = require('./bot_config.js');

bot.on(['/start'], (msg) => msg.reply.text('Welcome!'));

bot.on(['/prior', '/tropa_do_prior'], async (msg) => {
    await bot.sendMessage(msg.chat.id, "_JOGA Y JOGA_...", { parseMode: 'Markdown' });
    return bot.sendVideo(msg.chat.id, "BAACAgEAAxkBAAMFXnpQk-y5Qtm2usbDu9gEfj0mecQAAm4AA7cQ0EcytWs1Hs6JfRgE", { replyToMessage: msg.message_id });
});
