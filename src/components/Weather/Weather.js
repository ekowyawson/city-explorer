import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import styles from './weather.module.css';

// const cl = i => console.log(i);

function Weather(props) {

    let weatherData = props.weatherData;

    return (
        <section className={styles.layout}>
            <h6 className={styles.heading}>Weather Data</h6>
            
            <div className='alldata'>
                <Container className='alldataContainer'>
                    {/* TIMEZONE */}
                    <Row>
                        <Col xs={6} md={4}>
                            <p className='datakey'>Time Zone:</p>
                        </Col>
                        <Col xs={6} md={4}>
                            <p className='dataval'>{weatherData.timezone}</p>
                        </Col>
                    </Row>

                    {/* COUNTRY CODE */}
                    <Row>
                        <Col xs={6} md={4}>
                            <p className='datakey'>Country Code:</p>
                        </Col>
                        <Col xs={6} md={4}>
                            <p className='dataval'>{weatherData.country_code}</p>
                        </Col>
                    </Row>

                    {/* DATE */}
                    <Row>
                        <Col xs={6} md={4}>
                            <p className='datakey'>Date:</p>
                        </Col>
                        <Col xs={6} md={4}>
                            <p className='dataval'>{weatherData.data[0].datetime}</p>
                        </Col>
                    </Row>

                    {/* MAX TEMP */}
                    <Row>
                        <Col xs={6} md={4}>
                            <p className='datakey'>Max Temperature:</p>
                        </Col>
                        <Col xs={6} md={4}>
                            <p className='dataval'>{weatherData.data[0].high_temp} &deg;C</p>
                        </Col>
                    </Row>

                    {/* MIN TEMP */}
                    <Row>
                        <Col xs={6} md={4}>
                            <p className='datakey'>Min Temperature:</p>
                        </Col>
                        <Col xs={6} md={4}>
                            <p className='dataval'>{weatherData.data[0].low_temp} &deg;C</p>
                        </Col>
                    </Row>

                    {/* WEATHER DESCRIPTION */}
                    <Row>
                        <Col xs={6} md={4}>
                            <p className='datakey'>Weather:</p>
                        </Col>
                        <Col xs={6} md={4}>
                            <p className='dataval'>{weatherData.data[0].weather.description}</p>
                        </Col>
                    </Row>
                </Container>
            </div>
        </section>
    )
}

export default Weather;