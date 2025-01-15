import React, { useEffect } from 'react'
// import logo from '../assets/logo.png'
import { Card, Col, Container, Row } from 'react-bootstrap'
import brain from '../assets/cyber-brain-7633488_1920.jpg'
// import sheheen from '../assets/3439.jpg'
import car from '../assets/car.avif'
import left from '../assets/AI-to-LEFT.jpg'
import right from '../assets/AI-to-RIGHT.webp'
import OurProducts from '../components/OurProducts'
import AOS from 'aos'
import "aos/dist/aos.css";


function Home() {
    useEffect(() => {
        AOS.init({
          disable: "phone",
          duration: 700,
          easing: "ease-out-cubic",
        });
      }, []);
    
    return (
        <>
            <div className="container-fluid p-5 w-100">
                <Container>
                    <Row className='w-100' style={{ height: "100vh" }}>

                        <Col sm={12} md={12} lg={6} className='d-flex justify-content-center align-items-center flex-column'>
                            <h1 className='' id='mainHeading' data-aos='zoom-in-up'>Forverse</h1>
                            <h6 className='' data-aos='zoom-in-up'>Ready to see your beyond ability</h6>
                        </Col>

                        <Col sm={12} md={12} lg={6} className='d-flex justify-content-center align-items-center'>
                            <img src={brain} alt="" className='w-100 h-75' />
                        </Col>

                    </Row>
                </Container>
            </div>

            {/* <div className="container">
                <h2 className='text-center mt-3'>Explore our Employees</h2>
                <div className="row p-5 m-5 bg-light rounded-3">

                    <div className="col-md-4 d-flex justify-content-center">
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src={sheheen} />
                            <Card.Body>
                                <Card.Title>Card Title</Card.Title>

                            </Card.Body>
                        </Card>
                    </div>

                    <div className="col-md-4 d-flex justify-content-center">
                         <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src={sheheen} />
                        <Card.Body>
                            <Card.Title>Card Title</Card.Title>

                        </Card.Body>
                    </Card>
                    </div>

                    <div className="col-md-4 d-flex justify-content-center">
                        <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src={sheheen} />
                        <Card.Body>
                            <Card.Title>Card Title</Card.Title>

                        </Card.Body>
                    </Card>
                    </div>

                </div>
            </div> */}

            <div className="container">
                <OurProducts/>
            </div>

            <div className="conatiner-fluid">
                <h2 className='text-center'>Testimonial</h2>
                <div className="row w-100">

                     <div className="col-md-6 p-5">
                        <p className='' style={{ textAlign: 'start' }}><span style={{fontSize:"30px",fontWeight:"800"}}>Lorem</span> ipsum dolor sit amet consectetur adipisicing elit. Sint debitis voluptatibus eligendi quas qui sequi, vel, cupiditate consequatur doloribus earum, sit odio tenetur a odit ea cum minus exercitationem nam! Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae commodi et facere magnam mollitia quo consequatur voluptate optio facilis iure eaque nam placeat dignissimos nostrum molestiae harum molestias, illo cumque!</p>
                    </div>

                    <div className="col-md-6 d-flex justify-content-center">
                        <Card style={{ width: '50%' }} className='my-3' data-aos="zoom-in-left">
                            <Card.Img variant="top" src={left} />
                            <Card.Body>
                                <Card.Title>Michael</Card.Title>
                            </Card.Body>
                        </Card>
                    </div>  
                   
                     <div className="col-md-6 d-flex justify-content-center">
                        <Card style={{ width: '50%' }} className='my-3' data-aos="zoom-in-right">
                            <Card.Img variant="top" src={right} />
                            <Card.Body>
                                <Card.Title>Sofia</Card.Title>
                            </Card.Body>
                        </Card>
                    </div>

                    <div className="col-md-6 p-5">
                        <p className='' style={{ textAlign: 'end' }}><span style={{fontSize:"30px",fontWeight:"800"}}>Lorem</span> ipsum dolor sit amet consectetur adipisicing elit. Sint debitis voluptatibus eligendi quas qui sequi, vel, cupiditate consequatur doloribus earum, sit odio tenetur a odit ea cum minus exercitationem nam! Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae commodi et facere magnam mollitia quo consequatur voluptate optio facilis iure eaque nam placeat dignissimos nostrum molestiae harum molestias, illo cumque!</p>
                    </div>

                    <div className="col-md-6 p-5">
                        <p className='' style={{ textAlign: 'start' }}><span style={{fontSize:"30px",fontWeight:"800"}}>Lorem</span> ipsum dolor sit amet consectetur adipisicing elit. Sint debitis voluptatibus eligendi quas qui sequi, vel, cupiditate consequatur doloribus earum, sit odio tenetur a odit ea cum minus exercitationem nam! Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae commodi et facere magnam mollitia quo consequatur voluptate optio facilis iure eaque nam placeat dignissimos nostrum molestiae harum molestias, illo cumque!</p>
                    </div>

                    <div className="col-md-6 d-flex justify-content-center">
                        <Card style={{ width: '50%' }} className='my-3' data-aos="zoom-in-left">
                            <Card.Img variant="top" src={left} />
                            <Card.Body>
                                <Card.Title>Liam</Card.Title>
                            </Card.Body>
                        </Card>
                    </div> 

                </div>
            </div>
        </>
    )
}

export default Home
