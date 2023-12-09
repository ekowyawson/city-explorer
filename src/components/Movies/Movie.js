import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';

import styles from './movies.module.css';

function Movie(props) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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
        <>
            <Col key={props.key}>
                <Card className={styles.movieCard} onClick={handleShow}>
                    <Card.Img variant="top" src={props.img} alt={props.title} />
                    <Card.Body>
                        <Card.Title className={styles.movieTitle}>
                            {props.title}
                        </Card.Title>
                        <Card.Text className={styles.movieSummary}>
                            {text_truncate(props.summary, 150)}
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Col>

            {/* MODAL */}
            <Modal className="bg-dark" show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{props.title}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Card className={styles.movieCard} data-bs-theme="dark" border="primary" style={{ margin: "1em" }}>
                        <Card.Img variant="top" src={props.img} alt={props.title}  style={{ height: "50vh", width: "auto" }} />
                        <Card.Body>
                            <Card.Title className={styles.movieTitle}>
                                {props.title}
                            </Card.Title>
                            <Card.Text className={styles.movieSummary}>
                                {props.summary}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );

}

export default Movie;