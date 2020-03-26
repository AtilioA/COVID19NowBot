const axios = require('axios');
const APIURL = "https://pomber.github.io/covid19/timeseries.json";
const { titleCase } = require('../utils.js');

async function getCountryStats(country) {
  return await axios.get(APIURL)
    .then((res) => {
      // console.log(res.data[country]);
      const countryData = res.data[titleCase(country)];
      return countryData;
    })
    .catch((err) => {
      console.log(err);
    });
}

module.exports = getCountryStats;
