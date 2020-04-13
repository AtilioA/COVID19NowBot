const axios = require('axios');
const APIURL = "https://pomber.github.io/covid19/timeseries.json";

async function getCountryStats(country) {
  return await axios.get(APIURL)
    .then((res) => {

      switch (country.toLowerCase()) {
        case 'usa':
          country = 'US';
          break;
        case 's. korea':
          country = 'Korea, South';
          break;
        default:
          break;
      }

      return res.data[country];
    })
    .catch((err) => {
      console.log(err);
      return undefined;
    });
}

module.exports = { getCountryStats };
