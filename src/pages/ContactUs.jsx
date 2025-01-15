import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

function ContactUs() {
    return (
        <>
            <Container>
                <Row className='w-100' style={{ height: "100vh" }}>

                    <Col sm={12} md={6} className=' d-flex justify-content-center align-items-center flex-column'>
                        <h1 className='' style={{color:"cyan"}}>Contact us</h1>
                        <p className='fa-xl'>Free free to ask anything...</p>
                    </Col>

                    <Col sm={12} md={6} className='d-flex justify-content-center align-items-center flex-column'>
                        <input type="text" placeholder='Name' name="" id="" className='form-control my-3 p-2' />
                        <input type="text" placeholder='Phone no.' name="" id="" className='form-control my-3 p-2' />
                        <input type="text" placeholder='Email id' name="" id="" className='form-control my-3 p-2' />
                        <textarea rows={5} type="text" placeholder='Message' name="" id="" className='form-control my-3 p-2' />

                        <button className='btn btn-warning w-100 p-3'>Submit</button>

                    </Col>

                </Row>
            </Container>
        </>
    )
}

export default ContactUs
