import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Container, Modal, Row } from 'react-bootstrap'
// import car from '../assets/car.avif'
import AOS from 'aos'
import "aos/dist/aos.css";
import { serverUrl } from '../../services/serviceUrl';



function OurProducts({ products }) {

    
    
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        AOS.init({
            disable: "phone",
            duration: 700,
            easing: "ease-out-cubic",
        });
    }, [])
    return (

        <>

            <Card style={{ width: '25rem' }} onClick={handleShow} data-aos="fade-up" className='shadow-lg mt-3'>
                <Card.Img variant="" src={`${serverUrl}/upload/${products.
                    productImage}`} alt='No image' style={{height:"230px"}} />
                <Card.Body>
                    <Card.Title className='text-center'>{products?.productName}</Card.Title>
                </Card.Body>
            </Card>


            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} centered size='lg' >
                <Modal.Header closeButton>
                    <Modal.Title>
                        {/* Uniqo */}
                        {products?.productName}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Row>
                            <Col sm={12} md={6}>
                                <h3>Model</h3>
                                <p>{products?.variant}</p>

                                <h3>Fuel type</h3>
                                <p>{products?.fuelType}</p>
                            </Col>

                            <Col sm={12} md={6}>
                                <h3>Horse power</h3>
                                <p className='text-decoration-line-through'>1243 HP</p>

                                <h3>Mileage</h3>
                                <p>{products?.mileage}</p>
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
