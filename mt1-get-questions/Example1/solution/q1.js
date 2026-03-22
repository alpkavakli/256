import express from 'express';
import { countries, cities } from './db.js';

const app = express();

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  let countryCode  = req.query.code ?? "All"
  let currentCountryName = "All";

  // Find country name for the current country code
  if (countryCode !== "All") {
    currentCountryName =  countries.find(c => c.code === countryCode).name;
  }
  // Filter cities by country code, if "All" is selected, show all cities
  let filteredCities = Object.values(cities).filter(c => countryCode === "All" || c.code === countryCode);

  // Add "country" name to each city
  filteredCities = filteredCities.map( c =>  {
    return { ...c, countryName: countries.find(country => country.code === c.code).name ,
    }
  })
  res.render('index', { countries, filteredCities, currentCountryName });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
