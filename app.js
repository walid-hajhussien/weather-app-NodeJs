const request = require("request");
const chalk = require("chalk");
const Geocoding = require("./utils/Geocoding");
const forecast = require("./utils/forecast");

Geocoding.getGeocoding("zarqa jordan", (error, data) => {
  if (error) {
    console.log("ERROR : ", chalk.red(error));
  } else {
    forecast.getForecast(data.longitude, data.latitude, (error, response) => {
      if (error) {
        console.log("ERROR : ", chalk.red(error));
      } else {
        let forcast = response.body.daily;
        console.log("Location : " + chalk.green(data.location));
        console.log(chalk.green(forcast.summary) + " The High Temp is : " + chalk.red(forcast.data[0].temperatureHigh) + " degree, and The low Temp is : " + chalk.blue(forcast.data[0].temperatureLow) + " degree . this is an " + chalk.green(forcast.data[0].precipProbability) + " chance of rain");
      }
    });
  }
});
