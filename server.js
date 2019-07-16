'use strict';

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

function Location(query, geoData) { 
  this.city_query = query;
  this.latitude = geoData.results[0].geometry.location.lat;
  this.longitude = geoData.results[0].geometry.location.lng;
}

function Weather(forecast, time) {
  this.forecast = forecast;
  this.time = time;
}

app.get('/location', (req, res) => { 
  try { 
    if (req.query.data === 'Lynnwood') {
      const geoData = require('./data/geo.json');
      const user_location = new Location(req.query.data, geoData);
      res.send(user_location);
    } else { 
      res.status(500).send('Sorry, something went wrong');
    }
  }
  catch (err) { 
    res.status(500).send('Sorry, something went wrong');
  }
});

app.get('/weather', (req, res) => {
  try {
    if (req.query.data === 'Lynnwood') {
      const weatherArr = [];
      const darkskyData = require('./data/darksky.json');
      darkskyData.daily.data.forEach( day => {
        weatherArr.push(new Weather(day.summary, new Date(day.time).toString()));
      })
      res.send(weatherArr);
    } else { 
      res.status(500).send('Sorry, something went wrong');
    }  
  } 
  catch(err) { 
    res.status(500).send('Sorry, something went wrong');
  }
})

app.listen(PORT, () => { 
  console.log('Listening to PORT: ' + PORT);
})
