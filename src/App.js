import React, { useState } from 'react';
import axios from 'axios';
import Header from "./components/Header/Header.js";
import Location from "./components/Location/Location.js";
import Weather from "./components/Weather/Weather.js";
import Footer from "./components/Footer/Footer.js";
import Errors from "./components/Errors/Errors.js";

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const LIQ_API_KEY = process.env.REACT_APP_API_KEY;
const WB_API_KEY = process.env.REACT_APP_WEATHERBIT_API;
const LIQ_API =`https://us1.locationiq.com/v1/search?key=${LIQ_API_KEY}`;
const WB_API = `https://api.weatherbit.io/v2.0/forecast/daily?key=${WB_API_KEY}`;
// const TMDB_API=``;
// const MY_WEATHER_API = 'https://city-explorer-api-iwil.onrender.com/weather';
// http://api.weatherbit.io/v2.0/forecast/hourly?
// https://api.weatherbit.io/v2.0/current?
// const MY_WEATHER_API = 'http://localhost:3001/weather'

function App() {

  // =========================== DECLARE STATE VARS
  const [city, setCity] = useState('');
  const [latitude, setLatitude] = useState(40.7127281);
  const [longitude, setLongitude] = useState(-74.0060152);
  const [errors, setErrors] = useState(false);
  const [showErr, setShowErr] = useState(false);
  const [weatherData, setWeatherData] = useState(null);
  const [isWeatherData, setIsWeatherData] = useState(false);

  // =========================== GET LOCATION FUNCTION
  async function getLocation(cityName) {
    let url = `${LIQ_API}&q=${cityName}&format=json`;

    try {
      let res = await axios.get(url);
      setCity(res.data[0].display_name);
      setLatitude(res.data[0].lat);
      setLongitude(res.data[0].lon);
      getWeather(res.data[0].lat, res.data[0].lon, cityName);

    } catch(err) {
      console.error(err.message);
      setShowErr(true);
      setErrors(`${err.code}: ${err.message}. Check your input and try again.`);
    }
    
  }

  // =========================== GET WEATHER DATA FUNCTION
  async function getWeather(lat, lon, city) {
    // let query = `${MY_WEATHER_API}?lat=${lat}&lon=${lon}&q=${city}`;
    let query = `${WB_API}&lat=${lat}&lon=${lon}&city=${city}`;

    try {
      let res = await axios.get(query);
      
      const Forecast = res.data.data.map(d => {
        let arr = {
          date : d.valid_date,
          temp : d.temp,
          weather : d.weather.description
        }

        return arr;
      })

      setWeatherData(Forecast);
      setIsWeatherData(true);
    } catch (err) {
      console.error(err);
      setShowErr(true);
      setErrors(`${err.code}: ${err.message}.`);
    }
  }

  // =========================== CHANGE CITY FUNCTION
  function changeCity(newCity) {
    getLocation(newCity);
  }

  // =========================== ERROR HANDLING
  function clearErr() {
    setShowErr(false);
  }

  // =========================== RENDERER
  return (
    <>
      <Header />

      <main>
        { 
          showErr
          ? <Errors error={errors} clrErr={clearErr} />
          : null 
        }
        
        <Location
          city={city}
          handleChangeCity={changeCity}
          latitude={latitude}
          longitude={longitude}
        />

        { 
          isWeatherData
          ? <Weather weatherData={weatherData} city={city} />
          : null
        }
      </main>

      <Footer />
    </>
  );
}

export default App;
