"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.forecast = void 0;

var _request = _interopRequireDefault(require("request"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var forecast = function forecast(latitude, longitude, callback) {
  var url = 'https://api.darksky.net/forecast/822e47a9321260a68302266c1594560b/' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude);
  (0, _request["default"])({
    url: url,
    json: true
  }, function (error, _ref) {
    var body = _ref.body;

    if (error) {
      callback('Unable to connect to weather service!');
    } else if (body.error) {
      callback('Unable to find location');
    } else {
      callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees out. There is ' + body.currently.precipProbability + '% chance of rain');
    }
  });
};

exports.forecast = forecast;
//# sourceMappingURL=forecast.js.map