const axios = require('axios');
const cheerio = require('cheerio');

const page = "https://www.worldometers.info/coronavirus/";
async function getWorldStats() {
  return await axios.get(page)
    .then((res) => {
      const $ = cheerio.load(res.data);

      var data = $('.total_row');
      data.splice(1, 1);
      var elements = [];

      data.each((index, element) => {
        elements = $(element).text().split("\n");
      });

      if (elements) {

        elements.splice(0, 2);
        elements = elements.map(e => e.trim());

        const scrapedStats = {
          totalCases: elements[0],
          newCases: elements[1],
          totalDeaths: elements[2],
          newDeaths: elements[3],
          totalRecovered: elements[4],
          activeCases: elements[5],
          seriousCases: elements[6]
        };

        return scrapedStats;
      }
    })
    .catch((err) => {
      console.log(err);
      return undefined;
    });
}

module.exports = getWorldStats;
