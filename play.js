// var config = require('./server/config.json');
// var Promise = require('bluebird');
// var zipp = Promise.promisify(require('node-zippopotamus'));
// var Forecast = require('forecast.io-bluebird');
// var forecast = new Forecast(config.forecastio);
//
// zipp('us', '27606')
// .then(function (data) {
//   var coords = {
//     "latitude": data.places[0].latitude,
//     "longitude": data.places[0].longitude
//   }
//   console.log(coords);
//   return forecast.fetch(coords.latitude, coords.longitude);
// })
// .then(function (data) {
//   console.log(data);
// })
// .catch(function (error){
//   console.log(error);
// })

// var weather = require('./server/logic/weather.js');
//
// weather.getWeather('27606')
// .then(function (data) {
//   console.log(data);
// })

var Weather = require('weather-zip');
var weather = new Weather('adb442c0180bae3ebbd8b8d38c77df04');

weather.get('27606')
.then(function (data) {
  console.log(data);
});
//
// var forecast = new Forecast({
//   key: 'adb442c0180bae3ebbd8b8d38c77df04', //PUT YOUR FORECAST.IO KEY HERE,
//   timeout: 2500
// });
//
// var getWeather = function (zipCode){
//   return zipp('us', zipCode)
//   .then(function (data) {
//     var coords = {
//       "latitude": data.places[0].latitude,
//       "longitude": data.places[0].longitude
//     }
//     return forecast.fetch(coords.latitude, coords.longitude);
//   });
// };
//
// getWeather('90210')
// .then(function(weather) {
//   console.log(weather);
// });
