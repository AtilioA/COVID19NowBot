// This is just a placeholder

var Localize = require('localize');

var myLocalize = new Localize({
  "start": {
    "english": `🦠 @COVID19NowBot
Hello! This bot can fetch information and numbers of COVID-19 cases.

🧭 *AVAILABLE COMMANDS*:
/start shows this welcome message.
/help shows the help message.
/world shows stats for the world.\n
—
Source: worldometers.info/coronavirus/
Created by @AtilioA`,

    "br": `🦠 @COVID19NowBot
Olá! Este bot pode enviar informações e números de casos de COVID-19.

🧭 *COMANDOS DISPONÍVEIS*:
/start exibe esta mensagem de boas-vindas.
/help ou /ajuda exibe a mensagem de ajuda.
/world exibe estatísticas do mundo todo.\n
—
Fonte: worldometers.info/coronavirus/
Criado por @AtilioA`,

    "fr": `🦠 @COVID19NowBot
Salut ! Cette bot peut récupérer des informations et des nombres sur les cas de COVID-19.\n
🧭 *COMMANDES DISPONIBLES*:
/start affiche ce message de bienvenue.
/help affiche le message d'aide.\n
—
Source: worldometers.info/coronavirus
Criée pour @AtilioA`
  },

  "help": {
    "english": `🦠 @COVID19NowBot
Hello! This bot can fetch information and numbers of COVID-19 cases.

🧭 *AVAILABLE COMMANDS*:
/start shows the welcome message.
/help shows this help message.
/world shows stats for the world.\n
/country shows stats for the specified country. Example: /usa

📖 Open-source bot:
https://github.com/AtilioA/COVID19NowBot

—
Source: worldometers.info/coronavirus/
Created by @AtilioA`,
  },

  "worldStats": {
    "english": `Today - *$[9]*:
  🦠 $[6] new cases of COVID-19.
  ☠️ $[7] people died.

So far - *$[9]*:
  🦠 $[1] cases of COVID-19.
  ☠️ $[2] people died.
  😷 $[3] active cases.
  🤒 $[4] people in critical condition.
  💊 $[5] people recovered.

Fetched at $[8].`,

    "br": `Atualmente - *$[9]*:
  🦠 $[1] casos de COVID-19.
  ☠️ $[2] pessoas morreram.
  😷 $[3] casos ativos.
  🤒 $[4] pessoas em condição crítica.
  💊 $[5] pessoas recuperaram-se.

Hoje - *$[9]*:
  🦠 $[6] novos casos de COVID-19.
  ☠️ $[7] pessoas morreram.

Buscado em $[8].`
  }
});

myLocalize.setLocale("english");

module.exports = myLocalize;
