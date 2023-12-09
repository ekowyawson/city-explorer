import React, { useState } from 'react';
import axios from 'axios';
import Header from "./components/Header/Header.js";
import Location from "./components/Location/Location.js";
import Weather from "./components/Weather/Weather.js";
import Movies from "./components/Movies/Movies.js";
import Footer from "./components/Footer/Footer.js";
import Errors from "./components/Errors/Errors.js";

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const LIQ_API_KEY = process.env.REACT_APP_API_KEY;
const WB_API_KEY = process.env.REACT_APP_WEATHERBIT_API;
const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const LIQ_API = `https://us1.locationiq.com/v1/search?key=${LIQ_API_KEY}`;
const WB_API = `https://api.weatherbit.io/v2.0/forecast/daily?key=${WB_API_KEY}`;
const TMDB_API = `https://api.themoviedb.org/3/search/movie?`;
// const MY_RENDER_API = 'https://city-explorer-api-iwil.onrender.com/weather';
// const WB_HR_URL = http://api.weatherbit.io/v2.0/forecast/hourly;
// const WB_CUR_URL = https://api.weatherbit.io/v2.0/current;
// const LOCAL_WB_API = 'http://localhost:3001/weather';

function App() {
  // =========================== DECLARE STATE VARS
  const [city, setCity] = useState('');
  const [latitude, setLatitude] = useState(40.7127281);
  const [longitude, setLongitude] = useState(-74.0060152);
  const [errors, setErrors] = useState(false);
  const [showErr, setShowErr] = useState(false);
  const [weatherData, setWeatherData] = useState(null);
  const [isWeatherData, setIsWeatherData] = useState(false);
  const [movies, setMovies] = useState(false);
  const [moviesPage, setMoviesPage] = useState(1);

  // =========================== GET LOCATION FUNCTION
  async function getLocation(cityName) {
    let url = `${LIQ_API}&q=${cityName}&format=json`;

    try {
      let res = await axios.get(url);
      setCity(res.data[0].display_name);
      setLatitude(res.data[0].lat);
      setLongitude(res.data[0].lon);
      getWeather(res.data[0].lat, res.data[0].lon, cityName);
      getMovies(cityName);
    } catch (err) {
      console.error(err.message);
      setShowErr(true);
      setErrors(`${err.code}: ${err.message}. Check your input and try again.`);
    }
  }

  // =========================== GET WEATHER DATA FUNCTION
  async function getWeather(lat, lon, city) {
    let query = `${WB_API}&lat=${lat}&lon=${lon}&city=${city}`;

    try {
      let res = await axios.get(query);
      const Forecast = res.data.data.map(d => {
        let arr = {
          date: d.valid_date,
          temp: d.temp,
          weather: d.weather.description
        }
        return arr;
      })
      setWeatherData(Forecast);
      setIsWeatherData(true);
    } catch (err) {
      console.error(err);
      setShowErr(true);
      setErrors(`ERROR: ${err.code}: ${err.message}.`);
    }
  }

  // =========================== GET MOVIES FUNCTION
  async function getMovies(city) {
    const cityQuery = `${TMDB_API}query=${city}&include_adult=false&language=en-US&page=${moviesPage}`;

    const options = {
      method: 'GET',
      url: cityQuery,
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${TMDB_API_KEY}`
      }
    };

    try {
      const res = await axios.request(options);
      const resData = res.data.results.map(e => {
        return {
          id: e.id,
          title: e.title,
          summary: e.overview,
          date: e.realease_date,
          rating: e.popularity,
          img: `https://image.tmdb.org/t/p/w200${e.poster_path}`
        }
      });
      setMovies(resData);
    } catch (err) {
      console.error(err);
      setShowErr(true);
      setErrors(`ERROR ${err.code}: ${err.message}.`);
    }
  }

  // =========================== CHANGE CITY FUNCTION
  function changeCity(newCity) {
    getLocation(newCity);
  }
  // =========================== CHANGE PAGE FUNCTION
  function changePage(newPage) {
    setMoviesPage(newPage);
  }
  // =========================== ERROR HANDLING
  function clearErr() {
    setShowErr(false);
  }

  // =========================== REACT RENDER =========================== \\
  return (
    <>
      <div className='background'></div>
      {/* HEADER COMPONENT */}
      <Header />
      {/* ERRORS COMPONENT */}
      <main>
        {
          showErr
            ? <Errors error={errors} clrErr={clearErr} />
            : null
        }
        {/* LOCATION COMPONENT */}
        <Location
          city={city}
          handleChangeCity={changeCity}
          latitude={latitude}
          longitude={longitude}
        />
        {/* WEATHER COMPONENT */}
        {
          isWeatherData
            ? <Weather weatherData={weatherData}
                city={city} />
            : null
        }
        {/* MOVIES COMPONENT */}
        {
          movies
            ? <Movies
                movies={movies}
                moviesPage={moviesPage}
                handleChangeMovie={changePage}
                city={city} />
            : null
        }
      </main>
      {/* FOOTER COMPONENT */}
      <Footer />
    </>
  );
}

export default App;
