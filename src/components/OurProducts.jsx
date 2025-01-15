import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Container, Modal, Row } from 'react-bootstrap'
import car from '../assets/car.avif'
import AOS from 'aos'
import "aos/dist/aos.css";



function OurProducts() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(()=>{
        AOS.init({
            disable: "phone",
            duration: 700,
            easing: "ease-out-cubic",
          });
    },[])
    return (
        <>
            <h2 className='text-center mt-3'>Our Products</h2>
            <div className="row p-5 m-5 bg-light rounded-3">

                <div className="col-md-4 d-flex justify-content-center">
                    <Card style={{ width: '18rem' }} onClick={handleShow} data-aos="fade-up" className='shadow'>
                        <Card.Img variant="top" src={car} className='' alt='No image' />
                        <Card.Body>
                            <Card.Title className='text-center'>uniqo</Card.Title>
                        </Card.Body>
                    </Card>
                </div>

                <div className="col-md-4 d-flex justify-content-center">
                    <Card style={{ width: '18rem' }} onClick={handleShow} data-aos="fade-up" className='mt-md-0 mt-3 shadow'>
                        <Card.Img variant="top" src={car} alt='No image' />
                        <Card.Body>
                            <Card.Title className='text-center'>uniqo</Card.Title>
                        </Card.Body>
                    </Card>
                </div>

                <div className="col-md-4 d-flex justify-content-center">
                    <Card style={{ width: '18rem' }} onClick={handleShow} data-aos="fade-up" className='mt-md-0 mt-3 shadow'>
                        <Card.Img variant="top" src={car} alt='No image' />
                        <Card.Body>
                            <Card.Title className='text-center'>Uniqo</Card.Title>
                        </Card.Body>
                    </Card>
                </div>

                <div className="col-md-4 d-flex justify-content-center">
                    <Card style={{ width: '18rem' }} onClick={handleShow} data-aos="fade-up" className='mt-md-3 mt-3 mt-lg-3 shadow'>
                        <Card.Img variant="top" src={car} alt='No image' />
                        <Card.Body>
                            <Card.Title className='text-center'>Uniqo</Card.Title>
                        </Card.Body>
                    </Card>
                </div><div className="col-md-4 d-flex justify-content-center">
                    <Card style={{ width: '18rem' }} onClick={handleShow} data-aos="fade-up" className='mt-md-3 mt-3 mt-lg-3 shadow'>
                        <Card.Img variant="top" src={car} alt='No image' />
                        <Card.Body>
                            <Card.Title className='text-center'>Uniqo</Card.Title>

                        </Card.Body>
                    </Card>
                </div><div className="col-md-4 d-flex justify-content-center">
                    <Card style={{ width: '18rem' }} onClick={handleShow} data-aos="fade-up" className='mt-md-3 mt-3 mt-lg-3 shadow'>
                        <Card.Img variant="top" src={car} alt='No image' />
                        <Card.Body>
                            <Card.Title className='text-center'>Uniqo</Card.Title>

                        </Card.Body>
                    </Card>
                </div>

            </div>

            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} centered size='lg' >
                <Modal.Header closeButton>
                    <Modal.Title>Uniqo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Row>
                            <Col sm={12} md={6}>
                                <h3>Model</h3>
                                <p>M5</p>

                                <h3>Fuel type</h3>
                                <p>Petrol</p>
                            </Col>

                            <Col sm={12} md={6}>
                                <h3>Horse power</h3>
                                <p>1243 HP</p>

                                <h3>Mileage</h3>
                                <p>14 km/hrs</p>
                            </Col>

                        </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default OurProducts
