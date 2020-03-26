// This is just a placeholder

var Localize = require('localize');

var myLocalize = new Localize({
  "start": {
    "english": `🦠 @COVID19NowBot
Hello! This bot can fetch information and numbers of COVID-19 cases.

🧭 *AVAILABLE COMMANDS*:
/start shows the welcome message.
/help shows this help message.
/world shows stats for the world.
/country shows stats for the specified country. _Example_: /brazil
\`/top N\` shows the N countries with *highest* total cases. _Example_: \`/top 10\`
\`/bottom N\` shows the N countries with *lowest* total cases. _Example_: \`/bottom 10\`

start - shows the welcome message.
help - shows this help message.
world - shows stats for the world.
country - shows stats for the specified country.
top - shows the N countries with *highest* total cases.
bottom - shows the N countries with *lowest* total cases.

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
/world shows stats for the world.
/country shows stats for the specified country. _Example_: /brazil
      The "/" is optional. _Example_: "\`brazil\`" would work too.
\`/top N\` shows the N countries with *highest* total cases.\n    _Example_: \`/top 10\` lists the 10 countries with *highest* total cases. Defaults to 10.
\`/bottom N\` shows the N countries with *lowest* total cases.\n    _Example_: \`/bottom 10\` lists the 10 countries with *lowest* total cases. Defaults to 10.

📖 Open-source bot:
https://github.com/AtilioA/COVID19NowBot

—
Source: worldometers.info/coronavirus/
Created by @AtilioA`,
  },

  "worldStats": {
    "english": `Today — *$[9]*:
  🦠 $[6] new cases of COVID-19.
  ☠️ $[7] people died.

So far — *$[9]*:
  🦠 $[1] cases of COVID-19.
  ☠️ $[2] people died.
  😷 $[3] active cases.
  🤒 $[4] people in critical condition.
  💊 $[5] people recovered.

📊 Difference to last week (WIP):
  $[10] cases ($[13]%)
  $[11] deaths ($[14]%)
  $[12] recovered ($[15]%)

Fetched at $[8].`,

    "br": `Atualmente — *$[9]*:
  🦠 $[1] casos de COVID-19.
  ☠️ $[2] pessoas morreram.
  😷 $[3] casos ativos.
  🤒 $[4] pessoas em condição crítica.
  💊 $[5] pessoas recuperaram-se.

Hoje — *$[9]*:
  🦠 $[6] novos casos de COVID-19.
  ☠️ $[7] pessoas morreram.

Buscado em $[8].`
  }
});

myLocalize.setLocale("english");

module.exports = myLocalize;
