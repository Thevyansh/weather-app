"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.geocode = void 0;

var _request = _interopRequireDefault(require("request"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var geocode = function geocode(address, callback) {
  var url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoidGhldnlhbnNoIiwiYSI6ImNrN2s2ajVoeDEzaHAzb2xpZjdseTgyaW0ifQ.hcRSw5uWlkpQGCCbFWkzZg&limit=1";
  (0, _request["default"])({
    url: url,
    json: true
  }, function (error, _ref) {
    var body = _ref.body;

    if (error) {
      callback("Unable to connect to location services!");
    } else if (body.features.length === 0) {
      callback('Unable to find location, Try again with a different search term.');
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name
      });
    }
  });
};

exports.geocode = geocode;
//# sourceMappingURL=geocode.js.map