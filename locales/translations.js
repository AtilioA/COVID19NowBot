var Localize = require('localize');

var myLocalize = new Localize({
    "start": { // /start message
        "english": `🦠 @COVID19NowBot
Hello! This bot can fetch information and numbers of COVID-19 cases.

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
\`/bottom N\` affiche les N pays avec des *le plus petit* nombre de cas totaux\n    _Exemple_: \`/bottom 10\`.

—
*Source*: JHU CSSE, Worldometer et [covid19-api sur NPM](https://www.npmjs.com/package/covid19-api#-references).
Créé par @AtilioA`
    },

    "help": { // /help message
        "english": `🦠 @COVID19NowBot
Hello! This bot can fetch information and numbers of COVID-19 cases.

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
    },

    "worldStats": { // /world message
        "english": `Today — $[9] *World*:
🦠 $[6] new cases of COVID-19.
☠️ $[7] people died.

So far — $[9] *World*:
🦠 $[1] cases of COVID-19.
☠️ $[2] people died.
😷 $[3] active cases.
🤒 $[4] people in critical condition.
💊 $[5] people recovered.

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

Buscado em $[8].`,

        "fr": `Aujourd'hui — $[9] *Monde*:
  🦠 $[6] nouveaux cas de COVID-19.
  ☠️ $[7] personnes sont mortes.

Actuellement — $[9] *Monde*:
  🦠 $[1] cas de COVID-19.
  ☠️ $[2] personnes sont mortes.
  😷 $[3] cas actifs.
  🤒 $[4] personnes dans un état critique.
  💊 $[5] personnes se sont récupérés.

Récupéré à $[8].`,
    },

    "countryStats": { // /country message
        "english": `Today — $[16] *$[9]*:
  🦠 $[6] new cases of COVID-19.
  ☠️ $[7] people died.

So far — $[16] *$[9]*:
  🦠 $[1] cases of COVID-19.
  ☠️ $[2] people died.
  😷 $[3] active cases.
  🤒 $[4] people in critical condition.
  💊 $[5] people recovered.

Difference to last week:
  $[10] cases (*$[13]%*)
  $[11] deaths (*$[14]%*)
  $[12] recovered (*$[15]%*)

Fetched at $[8].`,

        "br": `Hoje — *$[9]*:
  🦠 $[6] novos casos de COVID-19.
  ☠️ $[7] pessoas morreram.

Atualmente — $[16] *$[9]*:
  🦠 $[1] casos de COVID-19.
  ☠️ $[2] pessoas morreram.
  😷 $[3] casos ativos.
  🤒 $[4] pessoas em condição crítica.
  💊 $[5] pessoas recuperaram-se.

Diferença para a semana passada:
  $[10] casos (*$[13]%*)
  $[11] mortes (*$[14]%*)
  $[12] recuperados (*$[15]%*)

Buscado em $[8].`,

        "fr": `Aujourd'hui — *$[9]*:
  🦠 $[6] nouveaux cas de COVID-19.
  ☠️ $[7] personnes sont mortes.

Actuellement — $[16] *$[9]*:
  🦠 $[1] cas de COVID-19.
  ☠️ $[2] personnes sont mortes.
  😷 $[3] cas actifs.
  🤒 $[4] personnes dans un état critique.
  💊 $[5] personnes se sont récupérés.

Par rapport à la semaine dernière:
  $[10] cas (*$[13]%*)
  $[11] mortes (*$[14]%*)
  $[12] récupérées (*$[15]%*)

Récupéré à $[8].`,
    },

    "country": {
        "english": "Please specify a country instead of using _/country_.\nExample: */brazil*",
        "br": "Por favor, especifique um país em vez de usar _/country_. Exemplo: */brazil*.",
        "fr": "S'il-vous-plaît, spécifiez un pays au lieu d'utiliser _/country_. Exemple: */brazil*."
    },
});

myLocalize.setLocale("br");

module.exports = myLocalize;
