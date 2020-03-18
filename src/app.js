const path = require('path');
const express = require('express');
const hbs = require('hbs');
const {forecast} = require('./utils/forecast');
const {geocode} = require('./utils/geocode');


const app = express();
const port = process.env.PORT || 3000;

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup HandlerBars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
    res.render('index', {
        title: "Weather App",
        name: "Divyansh Acharya"
    });
});

app.get("/about", (req, res) => {
    res.render('about', {
        title: "About Me",
        name: "Divyansh Acharya",
        img: "/img/profile-pic.jpg"
    });
});

app.get("/help", (req, res) => {
    res.render('help', {
        title: "Get Help Here",
        name: "Divyansh Acharya",
        helpText: "This page is for u to get help! ",
    });
});

app.get("/weather", (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "You must provide an Address"
        });
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({error});
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({error});
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            });
        });
    });
});


app.get("/help/*", (req, res) => {
    res.render("404", {
        title: "404",
        name: "Divyansh Acharya",
        errorMessage: "Help article not found"
    });
});

app.get("*", (req, res) => {
    res.render('404', {
        title: "404",
        name: "Divyansh Acharya",
        errorMessage: "Page not Found"
    });
});

app.listen(port, function () {
    console.log("Server is running on localhost:3000");
});