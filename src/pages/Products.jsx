import React, { useEffect, useState } from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap'
import Edit from '../components/Edit'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGlobe, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { getAllProductsApi } from '../../services/allApi'
import { serverUrl } from '../../services/serviceUrl'
// import AddProducts from '../components/AddProducts'


function Products() {

  const [allProduct, setAllProducts] = useState([])
  const [searchKey,setSearchKey]=useState('')
  // console.log(searchKey);
  

  const getAllProducts = async () => {

    const result = await getAllProductsApi(searchKey)
    // console.log(result.data);

    // console.log(result.data);
    setAllProducts(result.data)

  }

  useEffect(()=>{
    getAllProducts()
  },[searchKey])

  useEffect(() => {
    getAllProducts()
  }, [])
  return (
    <>
      <Container className='w-100 p-5' >
        <div className='mt-5  d-flex justify-content-between align-items-center'>
          <h1 className=''>Products</h1>

          <div className="d-flex justify-content-center align-items-center">
            <input type="text" placeholder='Search products' className='form-control bg-light w-100' onChange={(e)=>setSearchKey(e.target.value)} name="" id="productInput" />
            <FontAwesomeIcon icon={faMagnifyingGlass} className="" style={{ marginLeft: "-20px" }} />
          </div>




        </div>
        <Row>


          {
            allProduct?.length > 0 ? (

              allProduct?.map((item) => (

                <Col sm={12} md={6} lg={3} className='mt-3' >

                  {/* <div className='p-2 d-flex justify-content-between align-items-center bg-light w-75 rounded-2' >
                    <h3>{item.productName}</h3>
                  </div> */}

                  <Card style={{ width: '20rem' }} className=''>
                    <Card.Img variant="top" src={`${serverUrl}/upload/${item.
                      productImage}`} style={{height:"250px"}} />
                    <Card.Body>
                      <Card.Title>{item.productName}</Card.Title>
                    </Card.Body>
                  </Card>

                </Col>
              ))
            )
              :
              (

                <div className=' d-flex justify-content-center align-items-center' >
                  <p className=''>No Products available</p>
                </div>
              )
          }





        </Row>
      </Container>

    </>
  )
}

export default Products
