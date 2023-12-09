import React from 'react';
import Movie from './Movie';
import Row from 'react-bootstrap/Row';

import styles from './movies.module.css';

function Movies(props) {
    return (
        <section className={styles.layout}>
            <h6 className={styles.heading}>Movies About {props.city}</h6>
            <div className='alldata'>
                <Row xs={2} md={2} lg={3} className="g-4">
                    {
                        props.movies.map((movie) => (
                            <Movie
                                key={movie.id}
                                img={movie.img}
                                title={movie.title}
                                summary={movie.summary}
                                city={props.city}
                            />
                        ))}
                </Row>
            </div>
        </section>
    )
}

export default Movies;