var config = ('./../config');
var Weather = require('weather-zip');
var weather = new Weather(config.forecastio.key);

module.exports.getWeather = function (zipCode){
  return weather.get(zipCode);
};
