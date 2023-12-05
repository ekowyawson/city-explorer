import React, { useState } from 'react';
import axios from 'axios';
import Header from "./components/Header.js";
import Location from "./components/Location.js";
import Footer from "./components/Footer.js";
import Errors from "./components/Errors.js";

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const BASE_URL = process.env.REACT_APP_GEO_URL

function App() {

  // =========================== DECLARE STATE VARS
  const [city, setCity] = useState('');
  const [latitude, setLatitude] = useState(40.7127281);
  const [longitude, setLongitude] = useState(-74.0060152);
  const [errors, setErrors] = useState(false);
  const [showErr, setShowErr] = useState(false);

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
        { showErr ? <Errors error={errors} clrErr={clearErr} /> : null }
        <Location city={city} handleChangeCity={changeCity} latitude={latitude} longitude={longitude} />
      </main>
      <Footer />
    </>
  );
}

export default App;
