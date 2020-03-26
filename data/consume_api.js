const axios = require('axios');
const APIURL = "https://pomber.github.io/covid19/timeseries.json";

async function getCountryStats(country) {
  return await axios.get(APIURL)
    .then((res) => {
      if (country.toLowerCase() == 'usa') {
        country = 'US';
      }
      return res.data[country];
    })
    .catch((err) => {
      console.log(err);
    });
}

module.exports = { getCountryStats };
