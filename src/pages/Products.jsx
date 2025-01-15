import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Edit from '../components/Edit'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGlobe } from '@fortawesome/free-solid-svg-icons'
import AddProducts from '../components/AddProducts'

function Products() {
  return (
    <>
      <Container className='w-100 p-5' style={{ height: "100vh" }}>
        <div className='mt-5  d-flex justify-content-between align-items-center'>
          <h1 className=''>Products</h1>
         <AddProducts/>
        </div>
        <Row>

          <Col sm={12} md={12} lg={12} className='mt-3' >

            <div className='p-2 d-flex justify-content-between align-items-center bg-light w-75 rounded-2' >
              <h3>Tesla</h3>
  
              <div className='d-flex   fa-xl'>
                <Edit />
                <FontAwesomeIcon icon={faGlobe} className='mx-3 text-success' />
              </div>
            </div>

          </Col>

          <Col sm={12} md={12} lg={12} className='mt-3' >

            <div className='p-2 d-flex justify-content-between align-items-center bg-light w-75 rounded-2' >
              <h3>Tesla</h3>
  
              <div className='d-flex   fa-xl'>
                <Edit />
                <FontAwesomeIcon icon={faGlobe} className='mx-3 text-success' />
              </div>
            </div>

          </Col>

          <Col sm={12} md={12} lg={12} className='mt-3' >

            <div className='p-2 d-flex justify-content-between align-items-center bg-light w-75 rounded-2' >
              <h3>Tesla</h3>
  
              <div className='d-flex   fa-xl'>
                <Edit />
                <FontAwesomeIcon icon={faGlobe} className='mx-3 text-success' />
              </div>
            </div>

          </Col>


        </Row>
      </Container>
    </>
  )
}

export default Products
