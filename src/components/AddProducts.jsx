import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import add from '../assets/add-button.png';
import { toast, ToastContainer } from 'react-toastify';
import { addproductApi } from '../../services/allApi';

function AddProducts() {
  const [show, setShow] = useState(false);
  const [preview, setPreview] = useState('');
  const [token, setToken] = useState('');
  const [key, setKey] = useState(0);

  const [productDetails, setProductDetails] = useState({
    productName: '',
    variant: '',
    mileage: '',
    fuelType: '',
    rs: '',
    productImage: null,
  });

  // 🔹 Get token from localStorage on mount
  useEffect(() => {
    setToken(localStorage.getItem('token'));
  }, []);

  // 🔹 File selection handler
  const handleFile = (e) => {
    const file = e.target.files[0];
    setProductDetails({ ...productDetails, productImage: file });

    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview('');
    }
  };

  // 🔹 Reset form & image preview
  const handleCancel = () => {
    setProductDetails({
      productName: '',
      variant: '',
      mileage: '',
      fuelType: '',
      rs: '',
      productImage: null,
    });
    setPreview('');
    setKey((prevKey) => prevKey + 1);
  };

  const handleClose = () => {
    setShow(false);
    handleCancel();
  };

  const handleShow = () => {
    setShow(true);
    handleCancel();
  };

  // 🔹 Product submission handler
  const handleAdd = async () => {
    const { productName, variant, mileage, fuelType, rs, productImage } = productDetails;
    
    if (!productName || !variant || !mileage || !fuelType || !rs || !productImage) {
        toast.info(`Please fill the form completely`);
        return;
    }

    // ✅ Create FormData for file upload
    const reqBody = new FormData();
    reqBody.append("productName", productName);
    reqBody.append("variant", variant);
    reqBody.append("mileage", mileage);
    reqBody.append("fuelType", fuelType);
    reqBody.append("price", rs); // 🔹 Change rs → price
    reqBody.append("productImage", productImage);

    // ✅ Retrieve token from localStorage
    const token = localStorage.getItem('token');

    if (!token) {
        toast.warning(`Please login`);
        return;
    }

    // ✅ Pass token in Authorization header
    const reqHeader = {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${token}`
    };

    try {
        const result = await addproductApi(reqBody, reqHeader);

        if (result.status === 200) {
            toast.success(`Product added successfully`);
            setTimeout(() => {
                handleClose();
            }, 2500);
        } else if (result.status === 406) {
            toast.warning(result.response.data);
            handleCancel();
        } else {
            toast.error(`Something went wrong`);
            handleClose();
        }
    } catch (error) {
        console.error("Error adding product:", error);
        toast.error(`Failed to add product`);
    }
};



  return (
    <>
      <button className="btn btn-outline-warning" onClick={handleShow}>
        Add products
      </button>

      <Modal show={show} centered onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container-fluid w-100">
            <div className="row">
              {/* Image Upload Section */}
              <div className="col-md-6 d-flex justify-content-center align-items-center">
                <label>
                  <input type="file" key={key} hidden onChange={handleFile} />
                  <img src={preview || add} alt="No image" className="w-100" />
                </label>
              </div>

              {/* Product Details Section */}
              <div className="col-md-6">
                <input
                  type="text"
                  value={productDetails.productName}
                  placeholder="Product name"
                  className="form-control my-3"
                  onChange={(e) => setProductDetails({ ...productDetails, productName: e.target.value })}
                />
                <input
                  type="text"
                  value={productDetails.variant}
                  placeholder="Variant"
                  className="form-control my-3"
                  onChange={(e) => setProductDetails({ ...productDetails, variant: e.target.value })}
                />
                <input
                  type="text"
                  value={productDetails.mileage}
                  placeholder="Mileage"
                  className="form-control my-3"
                  onChange={(e) => setProductDetails({ ...productDetails, mileage: e.target.value })}
                />
                <input
                  type="text"
                  value={productDetails.fuelType}
                  placeholder="Fuel Type"
                  className="form-control my-3"
                  onChange={(e) => setProductDetails({ ...productDetails, fuelType: e.target.value })}
                />
                <input
                  type="text"
                  value={productDetails.rs}
                  placeholder="₹₹₹"
                  className="form-control"
                  onChange={(e) => setProductDetails({ ...productDetails, rs: e.target.value })}
                />
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

      <ToastContainer position="top-center" theme="dark" autoClose={2000} />
    </>
  );
}

export default AddProducts;
