const request = require("request");
const publicIp = require("public-ip");
const chalk = require("chalk");

// forecast API from dark sky
const forecastUrl =
  "https://api.darksky.net/forecast/cab3c55d2b328308e9bff05ca4fb26e9/37.8267,-122.4233?lang=en&units=si";

//  geocoding API to get the longitude and latitude based on address from mapbox
const geocodingUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places";

// to get the current public ip
async function getIp() {
  const IP = await publicIp.v4();
  getForecast(IP);
}

// to get the user longitude and latitude
function getGeocoding(location) {
  location = "Amman jordan";
  const path =
    "/" +
    location +
    ".json" +
    "?limit=1&access_token=pk.eyJ1Ijoid2FsaWRoYWoiLCJhIjoiY2sycmFrZ3Z6MDYzZjNocDV2bTlrMmh1MCJ9.T_N3LrBTrDVs3HTvDj_imQ";
  let URL = geocodingUrl + path;

  request.get({ url: URL, json: true }, (error, response) => {
    if (response) {
      const statusCode = response.statusCode;

      if (statusCode === 200) {
        const longitude = response.body.features[0].center[0];
        const latitude = response.body.features[0].center[1];
        console.log(
          "longitude : " +
            chalk.green(longitude) +
            " ,latitude : " +
            chalk.green(latitude)
        );
      } else {
        console.log("ERROR : " + chalk.red(response.body.message));
      }
    } else {
      console.log(
        "ERROR : ",
        chalk.red("unable to connect to the  geocoding service")
      );
    }
  });
}

// to get the user forecast
function getForecast(ip) {
  request.get({ url: forecastUrl, json: true }, (error, response) => {
    if (response) {
      const statusCode = response.statusCode;

      if (statusCode === 200) {
        let forcast = response.body.daily;
        console.log(
          chalk.green(forcast.summary) +
            " The High Temp is : " +
            chalk.red(forcast.data[0].temperatureHigh) +
            " degree, and The low Temp is : " +
            chalk.blue(forcast.data[0].temperatureLow) +
            " degree . this is an " +
            chalk.green(forcast.data[0].precipProbability) +
            " chance of rain"
        );
      } else {
        console.log("ERROR : " + chalk.red(response.body.error));
      }
    } else {
      console.log(
        "ERROR : " + chalk.red("unable to connect to the  dark sky service")
      );
    }
  });
}

getForecast();
// getGeocoding();
