"use strict";

var _path = _interopRequireDefault(require("path"));

var _express = _interopRequireDefault(require("express"));

var _hbs = _interopRequireDefault(require("hbs"));

var _forecast = require("./utils/forecast");

var _geocode = require("./utils/geocode");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
var port = process.env.PORT || 3000; // Define paths for express config

var publicDirectoryPath = _path["default"].join(__dirname, '../public');

var viewsPath = _path["default"].join(__dirname, '../templates/views');

var partialsPath = _path["default"].join(__dirname, '../templates/partials'); // Setup HandlerBars engine and views location


app.set('view engine', 'hbs');
app.set('views', viewsPath);

_hbs["default"].registerPartials(partialsPath); // setup static directory to serve


app.use(_express["default"]["static"](publicDirectoryPath));
app.get("", function (req, res) {
  res.render('index', {
    title: "Weather App",
    name: "Divyansh Acharya"
  });
});
app.get("/about", function (req, res) {
  res.render('about', {
    title: "About Me",
    name: "Divyansh Acharya",
    img: "/img/profile-pic.jpg"
  });
});
app.get("/help", function (req, res) {
  res.render('help', {
    title: "Get Help Here",
    name: "Divyansh Acharya",
    helpText: "This page is for u to get help! "
  });
});
app.get("/weather", function (req, res) {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an Address"
    });
  }

  (0, _geocode.geocode)(req.query.address, function (error) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        latitude = _ref.latitude,
        longitude = _ref.longitude,
        location = _ref.location;

    if (error) {
      return res.send({
        error: error
      });
    }

    (0, _forecast.forecast)(latitude, longitude, function (error, forecastData) {
      if (error) {
        return res.send({
          error: error
        });
      }

      res.send({
        forecast: forecastData,
        location: location,
        address: req.query.address
      });
    });
  });
});
app.get("/help/*", function (req, res) {
  res.render("404", {
    title: "404",
    name: "Divyansh Acharya",
    errorMessage: "Help article not found"
  });
});
app.get("*", function (req, res) {
  res.render('404', {
    title: "404",
    name: "Divyansh Acharya",
    errorMessage: "Page not Found"
  });
});
app.listen(port, function () {
  console.log("Server is running on localhost:3000");
});
//# sourceMappingURL=app.js.map