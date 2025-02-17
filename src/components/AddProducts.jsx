import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import add from '../assets/add-button.png'
import { toast, ToastContainer } from 'react-toastify';
import { addproductApi } from '../../services/allApi';

function AddProducts() {

  const [show, setShow] = useState(false);
  const [preview, setPreview] = useState('')
  const [token, setToken] = useState('')
  const [key, setKey] = useState(0)
  console.log(token);


  const [productDetails, setProductDetails] = useState({
    productName: "",
    variant: "",
    mileage: "",
    fuelType: "",
    rs: "",
    productImage: ""
  })
  console.log(productDetails);

  const handleFile = (e) => {
    // console.log(e.target.files[0]);

    setProductDetails({ ...productDetails, productImage: e.target.files[0] })
  }
  useEffect(() => {
    if (productDetails.productImage) {
      setPreview(URL.createObjectURL(productDetails.productImage))
    }
  }, [productDetails.productImage])

  const handleCancel = () => {
    setProductDetails({
      productName: "",
      variant: "",
      mileage: "",
      fuelType: "",
      rs: "",
      productImage: ""
    })
    setPreview()
    //key attribute - when a value of key attribute changes onChange events calls/invoke
    if (key == 1) {
      setKey(0)
    } else {
      setKey(1)
    }
  }

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true)
    handleCancel()
  }
  const handleAdd = async () => {
    const { productName, variant, mileage, fuelType, rs, productImage } = productDetails
    if (!productName || !variant || !mileage || !fuelType || !rs || !productImage) {
      toast.info(`Please fill the form completely`)
    } else {
      //append() -> to create reqBody
      // if the request contains upload content the reqBody should be created with the help of append method, present in the form-data class. inshort request body be a form data
      const reqBody = new FormData()
      reqBody.append("productDetails", productDetails)
      reqBody.append("variant", variant)
      reqBody.append("mileage", mileage)
      reqBody.append("fuelType", fuelType)
      reqBody.append("rs", rs)
      reqBody.append("productImage", productImage)

      if (token) {
        const reqHeader = {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`
        }

        const result = await addproductApi(reqBody, reqHeader)
        console.log(result);
        if (result.status == 200) {
          toast.success(`Product added succesfully`)
          setTimeout(() => {
            handleClose()
          }, 2500);
        } else if (result.status == 406) {
          toast.warning(result.response.data)
          handleCancel()
        } else {
          toast.error(`Something went wrong`)
          handleClose()
        }

      } else {
        toast.warning(`Please login`)
      }
    }
  }

  useEffect(() => {
    if (sessionStorage.getItem('token')) {
      setToken(sessionStorage.getItem('token'))
    }
  }, [])

  return (
    <>
      <button className='btn btn-outline-warning' onClick={handleShow}>Add products</button>

      <Modal show={show} centered onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container-fluid w-100">
            <div className="row">

              <div className="col-md-6 d-flex justify-content-center align-items-center">
                <label>
                  <input type="file" key={key} hidden id="" onChange={(e) => handleFile(e)} />
                  <img src={preview ? preview : add} alt="No image" className='w-100' />
                </label>
              </div>

              <div className="col-md-6">
                <input type="text" value={productDetails.productName} placeholder='Product name' name="" id="" className='form-control my-3' onChange={(e) => setProductDetails({ ...productDetails, productName: e.target.value })} />
                <input type="text" value={productDetails.variant} placeholder='Variant' name="" id="" className='form-control my-3' onChange={(e) => setProductDetails({ ...productDetails, variant: e.target.value })} />
                <input type="text" value={productDetails.mileage} placeholder='Mileage' name="" id="" className='form-control my-3' onChange={(e) => setProductDetails({ ...productDetails, mileage: e.target.value })} />
                <input type="text" value={productDetails.fuelType} placeholder='Fuel Type' name="" id="" className='form-control my-3' onChange={(e) => setProductDetails({ ...productDetails, fuelType: e.target.value })} />
                <input type="text" value={productDetails.rs} placeholder='₹₹₹ ' name="" id="" className='form-control' onChange={(e) => setProductDetails({ ...productDetails, rs: e.target.value })} />
              </div>

            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancel}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAdd}>
            Add product
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer position='top-center' theme='dark' autoClose={2000} />
    </>
  )
}

export default AddProducts
