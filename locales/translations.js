function translate(stringID, locale, ...args) {
  switch (stringID) {
    case "start":
      return translateStart(locale, ...args);
    case "help":
      return translateHelp(locale, ...args);
    case "worldStats":
      return translateWorldStats(locale, ...args);
    case "countryStats":
      return translateCountryStats(locale, ...args);
    case "country":
      return translateCountry(locale, ...args);
    case "setLocale":
      return translateSetLocale(locale, ...args);
  }
}

function translateStart(locale, ...args) {
  const start = { // /start message
    "en": `🦠 @COVID19NowBot
Hello! This bot can fetch information and numbers of COVID-19 cases.

You can change the language with the following command:
*/language*

🧭 *AVAILABLE COMMANDS*:
*/start* shows the welcome message.
*/help* shows this help message.
*/world* shows stats for the world.
*/country* shows stats for the specified country. _Example_: /brazil
\`/top N\` shows the N countries with *highest* total cases. _Example_: \`/top 10\`
\`/bottom N\` shows the N countries with *lowest* total cases. _Example_: \`/bottom 10\`

—
Source: JHU CSSE, Worldometer and [covid19-api on NPM](https://www.npmjs.com/package/covid19-api#-references).
Created by @AtilioA`,

    "br": `🦠 @COVID19NowBot
Olá! Este bot pode enviar informações e números de casos de COVID-19.

🧭 *COMANDOS DISPONÍVEIS*:
*/start* exibe esta mensagem de boas-vindas.
*/help* ou /ajuda exibe a mensagem de ajuda.
*/world* exibe estatísticas do mundo todo.
*/country* mostra estatísticas pro país especificado. _Exemplo_: */brazil*.
\`/top N\` mostra os N países com *maiores* números de casos totais.\n    _Exemplo_: \`/top 10\`.
\`/bottom N\` mostra os N países com *menores* números de casos totais.\n    _Exemplo_: \`/bottom 10\`.

—
*Fonte*: JHU CSSE, Worldometer e [covid19-api no NPM](https://www.npmjs.com/package/covid19-api#-references).
Criado por @AtilioA`,

    "fr": `🦠 @COVID19NowBot
Salut ! Cette bot peut récupérer des informations et des nombres sur les cas de COVID-19.\n
🧭 *COMMANDES DISPONIBLES*:
*/start* affiche ce message de bienvenue.
*/help* affiche le message d'aide.
*/world* affiche des statistiques pour le monde.
*/country* affiche des statistiques pour le pays spécifié. _Exemple_: */brazil*.
\`/top N\` affiche les N pays avec des *le plus grand* nombre de cas totaux.\n    _Exemple_: \`/top 10\`.
\`/bottom N\` affiche les N pays avec des *le plus petit* nombre de cas totaux.\n    _Exemple_: \`/bottom 10\`.

—
*Source*: JHU CSSE, Worldometer et [covid19-api sur NPM](https://www.npmjs.com/package/covid19-api#-references).
Créé par @AtilioA`
  };

  return start[locale];
}


function translateHelp(locale, ...args) {
  const help = { // /help message
    "en": `🦠 @COVID19NowBot
Hello! This bot can fetch information and numbers of COVID-19 cases.

You can change the language with the following command:
*/language*

🧭 *AVAILABLE COMMANDS*:
*/start* shows the welcome message.
*/help* shows this help message.
*/world* shows stats for the world.
*/country* shows stats for the specified country. _Example_: /brazil
    The "/" is optional. _Example_: "\`brazil\`" would work too.
\`/top N\` shows the N countries with *highest* total cases.\n    _Example_: \`/top 10\` lists the 10 countries with *highest* total cases. Defaults to 10.
\`/bottom N\` shows the N countries with *lowest* total cases.\n    _Example_: \`/bottom 10\` lists the 10 countries with *lowest* total cases. Defaults to 10.

📖 *Open-source bot*:
https://github.com/AtilioA/COVID19NowBot

—
Source: JHU CSSE, Worldometer and [covid19-api on NPM](https://www.npmjs.com/package/covid19-api#-references).
Created by @AtilioA`,

    "br": `🦠 @COVID19NowBot
Olá! Este bot pode enviar informações e números de casos de COVID-19.

🧭 *COMANDO DISPONÍVEIS*:
*/start* mostra a mensagem de boas-vindas.
*/help* mostra esta mensagem de ajuda.
*/world* mostra estatísticas para o mundo.
*/country* mostra estatísticas pro país especificado. _Exemplo_: */brazil*.
    O "/" é opcional. _Exemplo_: "\`brazil\`" também funcionaria.
\`/top N\` mostra os N países com *maiores* números de casos totais.\n    _Exemplo_: \`/top 10\` lista os 10 países com o *maiores* números de casos totais. O padrão é 10.
\`/bottom N\` mostra os N países com *menores* números de casos totais.\n    _Exemplo_: \`/bottom 10\` lista os 10 países com o *menores* números de casos totais. O padrão é 10.

📖 *Bot open-source*:
https://github.com/AtilioA/COVID19NowBot

—
Fontes: JHU CSSE, Worldometer e [covid19-api no NPM](https://www.npmjs.com/package/covid19-api#-references).
Criado por @AtilioA`,

    "fr": `🦠 @COVID19NowBot
Salut ! Cette bot peut récupérer des informations et des nombres sur les cas de COVID-19.\n
🧭 *COMMANDES DISPONIBLES*:
*/start* affiche ce message de bienvenue.
*/help* affiche le message d'aide.
*/world* affiche des statistiques pour le monde.
*/country* affiche des statistiques pour le pays spécifié. _Exemple_: */brazil*.
    Le "/" est facultatif. _Exemple_: "\`brazil\`" fonctionnerait aussi bien.
\`/top N\` affiche les N pays avec des *le plus grand* nombre de cas totaux.\n    _Exemple_: \`/top 10\` énumère les 10 pays avec des *le plus grand* nombre de cas totaux.
\`/bottom N\` affiche les N pays avec des *le plus petit* nombre de cas totaux.\n    _Exemple_: \`/bottom 10\` énumère les 10 pays avec des *le plus petit* nombre de cas totaux.

—
*Source*: JHU CSSE, Worldometer et [covid19-api sur NPM](https://www.npmjs.com/package/covid19-api#-references).
Créé par @AtilioA`
  };

  return help[locale];
}

function translateWorldStats(locale, ...args) {
  const worldStats = { // /world message
    "en": `Today — ${args[8]} * World *:
  🦠 ${args[5]} new cases of COVID-19.
  ☠️ ${args[6]} people died.

So far — ${args[8]} * World *:
  🦠 ${args[0]} cases of COVID-19.
  ☠️ ${args[1]} people died.
  😷 ${args[2]} active cases.
  🤒 ${args[3]} people in critical condition.
  💊 ${args[4]} people recovered.

Fetched at ${args[7]}.`,

    "br": `Hoje — ${args[8]} *Mundo*:
  🦠 ${args[5]} novos casos de COVID-19.
  ☠️ ${args[6]} pessoas morreram.

Atualmente — ${args[8]} *Mundo*:
  🦠 ${args[0]} casos de COVID-19.
  ☠️ ${args[1]} pessoas morreram.
  😷 ${args[2]} casos ativos.
  🤒 ${args[3]} pessoas em condição crítica.
  💊 ${args[4]} pessoas recuperaram-se.

Buscado em ${args[7]}.`,

    "fr": `Aujourd'hui — ${args[8]} *Monde*:
  🦠 ${args[5]} nouveaux cas de COVID-19.
  ☠️ ${args[6]} personnes sont mortes.

Actuellement — ${args[8]} *Monde*:
  🦠 ${args[0]} cas de COVID-19.
  ☠️ ${args[1]} personnes sont mortes.
  😷 ${args[2]} cas actifs.
  🤒 ${args[3]} personnes dans un état critique.
  💊 ${args[4]} personnes se sont récupérés.

Récupéré à ${args[7]}.`,
  };

  return worldStats[locale];
}

function translateCountryStats(locale, ...args) {
  const countryStats = {  // /country message
    "en": `Today — ${args[15]} *${args[8]} *:
  🦠 ${args[5]} new cases of COVID-19.
  ☠️ ${args[6]} people died.

So far — ${args[15]} *${args[8]} *:
  🦠 ${args[0]} cases of COVID-19.
  ☠️ ${args[1]} people died.
  😷 ${args[2]} active cases.
  🤒 ${args[3]} people in critical condition.
  💊 ${args[4]} people recovered.

Difference to last week:
  ${args[9]} cases (*${args[12]}%*)
  ${args[10]} deaths (*${args[13]}%*)
  ${args[11]} recovered (*${args[14]}%*)

  Fetched at ${args[7]}.`,

    "br": `Hoje — ${args[15]} *${args[8]}*:
  🦠 ${args[5]} novos casos de COVID- 19.
  ☠️ ${args[6]} pessoas morreram.

Atualmente — ${args[15]} *${args[8]}*:
  🦠 ${args[0]} casos de COVID-19.
  ☠️ ${args[1]} pessoas morreram.
  😷 ${args[2]} casos ativos.
  🤒 ${args[3]} pessoas em condição crítica.
  💊 ${args[4]} pessoas recuperaram-se.

Diferença para a semana passada:
  ${args[9]} casos (*${args[12]}%*)
  ${args[10]} mortes (*${args[13]}%*)
  ${args[11]} recuperados (*${args[14]}%*)

Buscado em ${args[7]}.`,

    "fr": `Aujourd'hui — ${args[15]} *${args[8]}*:
  🦠 ${args[5]} nouveaux cas de COVID-19.
  ☠️ ${args[6]} personnes sont mortes.

Actuellement — ${args[15]} *${args[8]}*:
  🦠 ${args[0]} cas de COVID-19.
  ☠️ ${args[1]} personnes sont mortes.
  😷 ${args[2]} cas actifs.
  🤒 ${args[3]} personnes dans un état critique.
  💊 ${args[4]} personnes se sont récupérés.

Par rapport à la semaine dernière:
  ${args[9]} cas (*${args[12]}%*)
  ${args[10]} mortes (*${args[13]}%*)
  ${args[11]} récupérées (*${args[14]}%*)

Récupéré à ${args[7]}.`,
  };

  return countryStats[locale];

}

function translateCountry(locale, ...args) {
  const country = { // /"country" message
    "en": "Please specify a country instead of using _/country_.\nExample: */brazil*",
    "br": "Por favor, especifique um país em vez de usar _/country_. Exemplo: */brazil*.",
    "fr": "S'il-vous-plaît, spécifiez un pays au lieu d'utiliser _/country_. Exemple: */brazil*."
  };

  return country[locale];
}

function translateSetLocale(locale, ...args) {
  const setLocale = {
    "en": `I've set the display language to *${locale.toUpperCase()}*!`,
    "br": `Defini a preferência de idioma para *${locale.toUpperCase()}*!`,
    "fr": `J'ai défini la préférence de langue sur *${locale.toUpperCase()}*!`
  };

  return setLocale[locale];
}

const locales = ["en", "br", "fr"];

module.exports = { locales, translate };
