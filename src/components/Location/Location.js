import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Dropdown from 'react-bootstrap/Dropdown';
import Map from "../Map/Map.js";

import cities from '../../assets/cities.json';
import styles from './location.module.css';

function Location(props) {

  const [typedInCity, setTypedInCity] = useState('New York, NY');
  const [showHeading, setShowHeading] = useState(false);
  const [validated, setValidated] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  function handleChange(e) {
    setShowHeading(false);
    const inputValue = e.target.value;
    // Use a regular expression to check whether the input contains only letters
    const isValidInput = /^[A-Za-z\s.'"-]+$/.test(inputValue);
    setTypedInCity(inputValue);
    // Mark the input as invalid if it contains anything other than the allowed characters
    setValidated(isValidInput);
    // Show suggestions based on the input value
    if (isValidInput) {
      const matchingCities = findMatchingCities(inputValue);
      setSuggestions(matchingCities);
    } else {
      setSuggestions([]);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === false || validated === false) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      setValidated(true);
      setShowHeading(true);
      props.handleChangeCity(typedInCity);
    }

  }

  function findMatchingCities(input) {
    // Search for matching cities in the cityStateData
    const matchingCities = [];
    for (const state in cities) {
      for (const city of cities[state]) {
        if (city.toLowerCase().startsWith(input.toLowerCase())) {
          matchingCities.push(`${city}, ${state}`);
        }
        if (matchingCities.length >= 10) {
          // Limit suggestions to a maximum of 10
          return matchingCities;
        }
      }
    }
    return matchingCities;
  }

  function handleSuggestionSelect(suggestion) {
    setTypedInCity(suggestion);
    setSuggestions([]);
  }

  // =================================> REACT RENDER
  return (
    <section className={styles.location}>
      <p className='instructions'>
        City Explorer is a web application designed and implemented to provide you with a comprehensive exploration experience of various cities. The app was built to enhance your ability to plan trips. Let's Explore!
      </p>
      <p className='instructions'>| Enter a city name to begin exploring |</p>

      <Form
        className='location-form'
        noValidate
        validated={!validated}
        onSubmit={handleSubmit}>

        <Row className="align-items-center">
          <Col xs="auto">
            <Form.Control
              required
              type="text"
              placeholder="City, State"
              value={typedInCity}
              onChange={handleChange}
            />
            <Form.Control.Feedback type='invalid'>
              Please enter a city and state.
            </Form.Control.Feedback>

            {/* Display suggestions */}
            {suggestions.length > 0 && (
              <Dropdown className="suggestion-dropdown">
                <Dropdown.Toggle variant="light" id="dropdown-basic">
                  Suggestions
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {suggestions.map((suggestion, index) => (
                    <Dropdown.Item
                      key={index}
                      onClick={() => handleSuggestionSelect(suggestion)}>
                      {suggestion}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            )}
          </Col>

          <Col xs="auto">
            <Button type="submit">Explore</Button>
          </Col>
        </Row>

        {
          showHeading && props.city && (
            <p className='p-info'>
              Information about &nbsp;
              <span className='location-name'>{props.city}</span>
            </p>
          )}
      </Form>

      <ul className='coordinates'>
        <li>Latitude: <span>{props.latitude}</span></li>
        <li>Longitude: <span>{props.longitude}</span></li>
      </ul>

      <Map lat={props.latitude} long={props.longitude} />
    </section>
  )
}

export default Location;