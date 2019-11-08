const request = require("request");
const publicIp = require("public-ip");
const chalk = require("chalk");

const url =
  "https://api.darksky.net/forecast/cab3c55d2b328308e9bff05ca4fb26e9/37.8267,-122.4233";

// to get the current public ip
async function getIp() {
  const IP = await publicIp.v4();
  getForecast(IP);
}

// to get the user forecast
function getForecast(ip) {
  request.get({ url: url, json: true }, (error, response) => {
    if (response) {
      let forcast = response.body.currently;
      console.log(
        "its currently " +
          chalk.red(forcast.temperature) +
          " degree out. this is an " +
          chalk.green(forcast.precipProbability) +
          " chance of rain"
      );
    } else {
      console.log("error");
    }
  });
}

getForecast();
