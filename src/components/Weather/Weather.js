import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import styles from './weather.module.css';

function Weather(props) {
    // let city = props.city;
    let weatherData = props.weatherData;

    return (
        <section className={styles.layout}>
            <h6 className={styles.heading}>16 Day Weather Forecasts</h6>

            <div className='alldata'>
                    <Container className='alldataContainer'>
                        <Row>
                            <Col xs={4} md={4}>
                                <p className='datakey'>Date:</p>
                            </Col>
                            <Col xs={4} md={4}>
                                <p className='datakey'>Temperature</p>
                            </Col>
                            <Col xs={4} md={4}>
                                <p className='datakey'>Weather</p>
                            </Col>
                        </Row>

                        {weatherData.map((data, key) => {
                            return (
                                <Row key={key}>
                                    <Col xs={4} md={4}>
                                        <p className='dataval'>{data.date}</p>
                                    </Col>
                                    <Col xs={4} md={4}>
                                        <p className='dataval'>{data.temp}&deg;C</p>
                                    </Col>
                                    <Col xs={4} md={4}>
                                        <p className='dataval'>{data.weather}</p>
                                    </Col>
                                </Row>
                            )
                        })}
                    </Container>
            </div>
        </section>
    )
}

export default Weather;