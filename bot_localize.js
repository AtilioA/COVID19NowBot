// This is just a placeholder

var Localize = require('localize');

var myLocalize = new Localize({
  "start": {
    "english": `🦠 @COVID19NowBot
Hello! This bot can fetch information and numbers of COVID-19 cases.

🕹 *AVAILABLE COMMANDS*:
/start shows this welcome message.
/help shows the help message.\n
—
Source: worldometers.info/coronavirus/
Created by @AtilioA`,

    "br": `🦠 @COVID19NowBot
Olá! Este bot pode enviar informações e números de casos de COVID-19.

🕹 *COMANDOS DISPONÍVEIS*:
/start exibe esta mensagem de boas-vindas.
/help ou /ajuda exibe a mensagem de ajuda.\n
—
Fonte: worldometers.info/coronavirus/
Criado por @AtilioA`,

    "fr": `🦠 @COVID19NowBot
Salut ! Cette bot peut récupérer des informations et des nombres sur les cas de COVID-19.\n
🕹 *COMMANDES DISPONIBLES*:
/start affiche ce message de bienvenue.
/help affiche le message d'aide.\n
—
Source: worldometers.info/coronavirus
Criée pour @AtilioA`
  },

  "Substitution: $[1]": {
    "en": "Substitution: $[1]",
    "br": "Substituição: $[1]",
    "fr": "Substitution: $[1]"
  }
});

myLocalize.setLocale("english");

module.exports = myLocalize;
