import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'

function AddProducts() {

    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <button className='btn btn-outline-warning'  onClick={handleShow}>Add products</button> 

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <input type="text" placeholder='Product name' name="" id="" className='form-control my-2' />
            <input type="text" placeholder='Image URL' name="" id="" className='form-control my-2' />
            <input type="text" placeholder='Mileage' name="" id="" className='form-control my-2' />
            <input type="text" placeholder='Fuel Type' name="" id="" className='form-control my-2' />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default AddProducts
