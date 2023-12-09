import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Map from "../Map/Map.js";

import styles from './location.module.css';

function Location(props) {

  const [typedInCity, setTypedInCity] = useState('New York, NY');
  const [validated, setValidated] = useState(false);

  function handleChange(e) {
    const inputValue = e.target.value;
    const isValidInput = /^[A-Za-z\s.'"-]+$/.test(inputValue);
    setTypedInCity(inputValue);
    setValidated(isValidInput);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === false || validated === false) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      setValidated(true);
      props.handleChangeCity(typedInCity);
    }
  }

  // =================================> REACT RENDER
  return (
    <section className={styles.location}>
      {/* COORDINATES */}
      <ul className='coordinates'>
        <li>Latitude: <span>{props.latitude}</span></li>
        <li className={styles.instructions}>Enter a city name to begin exploring</li>
        <li>Longitude: <span>{props.longitude}</span></li>
      </ul>

      {/* MAP COMPONENT */}
      <Map lat={props.latitude} long={props.longitude} />

      {/* CITY INPUT FORM */}
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
          </Col>
          {/* Explore Button */}
          <Col xs="auto">
            <Button type="submit">Explore</Button>
          </Col>
        </Row>
      </Form>
    </section>
  )
}

export default Location;