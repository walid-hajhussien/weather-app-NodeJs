const request = require("request");
const chalk = require("chalk");

// forecast API from dark sky
const forecastUrl =
  "https://api.darksky.net/forecast/cab3c55d2b328308e9bff05ca4fb26e9";

//  geocoding API to get the longitude and latitude based on address from mapbox
const geocodingUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places";

// to get the user longitude and latitude
function getGeocoding(address, callback) {
  const path =
    "/" +
    encodeURIComponent(address) +
    ".json" +
    "?limit=1&access_token=pk.eyJ1Ijoid2FsaWRoYWoiLCJhIjoiY2sycmFrZ3Z6MDYzZjNocDV2bTlrMmh1MCJ9.T_N3LrBTrDVs3HTvDj_imQ";

  let URL = geocodingUrl + path;

  request.get({ url: URL, json: true }, (error, response) => {
    if (error) {
      callback("unable to connect to the  geocoding service", undefined);
    } else if (response.statusCode != 200) {
      callback(response.body.message, undefined);
    } else if (
      response.statusCode === 200 &&
      response.body.features.length === 0
    ) {
      callback("Address Not Found", undefined);
    } else {
      let data = {
        longitude: response.body.features[0].center[0],
        latitude: response.body.features[0].center[1]
      };
      callback(undefined, data);
    }
  });
}

// to get the user forecast
function getForecast(longitude, latitude, callback) {
  let url =
    forecastUrl + "/" + longitude + "," + latitude + "?lang=en&units=si";

  request.get({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("unable to connect to the  dark sky service", undefined);
    } else if (response.statusCode != 200) {
      callback(response.body.error, undefined);
    } else {
      callback(undefined, response);
    }
  });
}

getForecast("37.8267", "-122.4233", (error, response) => {
  if (error) {
    console.log("ERROR : ", chalk.red(error));
  } else {
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
  }
});

// getGeocoding("zarqa jordan", (error, data) => {
//   if (error) {
//     console.log("ERROR : ", chalk.red(error));
//   } else {
//     console.log(
//       "longitude : " +
//         chalk.green(data.longitude) +
//         " ,latitude : " +
//         chalk.green(data.latitude)
//     );
//   }
// });
