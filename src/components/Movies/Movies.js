import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

import styles from './movies.module.css';

function Movies(props) {

    const text_truncate = (str, length, ending) => {
        if (length == null) {
          length = 100;
        }
        if (ending == null) {
          ending = '...';
        }
        if (str.length > length) {
          return str.substring(0, length - ending.length) + ending;
        } else {
          return str;
        }
      };

    return (
        <section className={styles.layout}>
            <h6 className={styles.heading}>Movies from {props.city}</h6>
            <div className='alldata'>
                <Row xs={2} md={2} lg={3} className="g-4">
                    {props.movies.map((movie) => (
                        <Col key={movie.id}>
                            <Card className={styles.movieCard}>
                                <Card.Img variant="top" src={movie.img} />
                                <Card.Body>
                                    <Card.Title className={styles.movieTitle}>
                                        {movie.title}
                                    </Card.Title>
                                    <Card.Text className={styles.movieSummary}>
                                        {text_truncate(movie.summary,150)}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>
        </section>
    )
}

export default Movies;