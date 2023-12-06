import React, { useState } from 'react';
import axios from 'axios';
import Header from "./components/Header.js";
import Location from "./components/Location.js";
import Footer from "./components/Footer.js";
import Errors from "./components/Errors.js";

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const API_KEY = process.env.REACT_APP_API_KEY
const BASE_URL=`https://us1.locationiq.com/v1/search?key=${API_KEY}`
const WEATHER_API = 'https://city-explorer-api-iwil.onrender.com'

function App() {

  // =========================== DECLARE STATE VARS
  const [city, setCity] = useState('');
  const [latitude, setLatitude] = useState(40.7127281);
  const [longitude, setLongitude] = useState(-74.0060152);
  const [errors, setErrors] = useState(false);
  const [showErr, setShowErr] = useState(false);
  const [weatherData, SetWeatherData] = useState({});

  // =========================== GET LOCATION FUNCTION
  async function getLocation(cityName) {
    let url = `${BASE_URL}&q=${cityName}&format=json`;

    try {
      let res = await axios.get(url);
      setCity(res.data[0].display_name);
      setLatitude(res.data[0].lat);
      setLongitude(res.data[0].lon);

    } catch(err) {
      console.error(err.message);
      setShowErr(true);
      setErrors(`${err.code}: ${err.message}. Check your input and try again.`);
    }
    
  }

  async function getWeather(lat, lon, city) {
    let query = `${WEATHER_API}?lat=${lat}&lon=${lon}&q=${city}`;

    try {
      let res = await axios.get(query);
      console.log(res);
      SetWeatherData(res);

    } catch (err) {
      console.error(err);
      setShowErr(true);
      setErrors(`${err.code}: ${err.message}.`);
    }
  }

  // =========================== CHANGE CITY FUNCTION
  function changeCity(newCity) {
    getLocation(newCity);
    getWeather(latitude, longitude, city);
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
        { showErr ? <Errors error={errors} clrErr={clearErr} /> : null }
        <Location city={city} handleChangeCity={changeCity} latitude={latitude} longitude={longitude} />
      </main>
      <Footer />
    </>
  );
}

export default App;
