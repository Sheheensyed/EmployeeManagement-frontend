import React, { useRef, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { loginApi, requestApi } from '../../services/allApi';
import { Flip } from 'react-toastify/unstyled';

function SignIn({ register }) {
  const navigate = useNavigate();
  const [empDetails, setEmpDetails] = useState({
    employeeName: "",
    employeeID: "",
    email: "",
    password: ""
  });

  console.log(empDetails);

  const handleRegister = async () => {
    const { employeeID, employeeName, email, password } = empDetails;
    if (!employeeID || !employeeName || !email || !password) {
      toast.info('Please fill the form');
    } else {
      const result = await requestApi(empDetails);
      console.log(result);
      if (result.status === 200) {
        toast.success(`Registration successful`);
        setEmpDetails({ employeeName: "", employeeID: "", email: "", password: "" });

        setTimeout(() => {
          navigate('/dashboard');
        }, 1500);
      } else if (result.status === 406) {
        toast.warning(result.response.data);
      } else {
        toast.error(`Something went wrong`);
      }
    }
  };

  const handleLogin = async () => {
    const { employeeID, password } = empDetails;
    
    if (!employeeID || !password) {
      toast.info('Please fill the form completely');
    } else {
      try {
        const result = await loginApi({ employeeID, password });
        console.log("Login Result:", result);

        if (result.status === 200) {
          toast.success("Login successful");

          // Store only employeeID in localStorage
          localStorage.setItem("employeeID", result.data.existingEmployee.employeeName);
          localStorage.setItem("token", result.data.token);

          setEmpDetails({ employeeName: "", employeeID: "", email: "", password: "" });

          setTimeout(() => {
            navigate('/dashboard');
          }, 1500);
        } else if (result.status === 406) {
          toast.warning(result.response.data);
        } else {
          toast.error("Something went wrong");
        }
      } catch (error) {
        console.error("Login Error:", error);
        toast.error("Server error, try again later");
      }
    }
  };

  // Use refs for input fields
  const nameRef = useRef();
  const emailRef = useRef();
  const idRef = useRef();
  const passwordRef = useRef();

  const handleKeyDown = (event, nextFieldRef) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (nextFieldRef) {
        nextFieldRef.current.focus();
      } else {
        if (register) {
          handleRegister();
        } else {
          handleLogin();
        }
      }
    }
  };

  return (
    <>
      <Container>
        <Row className='w-100 mt-5' style={{ height: "100vh" }}>
          <Col md={1}></Col>

          <Col sm={12} md={10} className='d-flex justify-content-center align-items-center'>
            <form className=''>
              <h4 className='text-center mb-3'>Forverse</h4>
              {!register ? <h5 className='mb-4'>Sign into your Account</h5> : <h5 className='mb-4'>Sign Up your Account</h5>}

              {register && <input ref={nameRef} onKeyDown={(e) => handleKeyDown(e, emailRef)} type="text" placeholder='Employee Name' className='form-control mb-2' onChange={(e) => { setEmpDetails({ ...empDetails, employeeName: e.target.value }) }} />}
              {register && <input ref={emailRef} onKeyDown={(e) => handleKeyDown(e, idRef)} type="text" placeholder='Email ID' className='form-control mb-2' onChange={(e) => { setEmpDetails({ ...empDetails, email: e.target.value }) }} />}
              
              <input ref={idRef} onKeyDown={(e) => handleKeyDown(e, passwordRef)} type="text" placeholder='Employee ID' className='form-control mb-2' onChange={(e) => { setEmpDetails({ ...empDetails, employeeID: e.target.value }) }} />
              <input ref={passwordRef} onKeyDown={(e) => handleKeyDown(e, null)} type="password" placeholder='Password' className='form-control mb-2' onChange={(e) => { setEmpDetails({ ...empDetails, password: e.target.value }) }} />

              {!register ? (
                <div className='d-flex justify-content-center align-items-center flex-column my-3'>
                  <button type='button' className='btn btn-primary' onClick={handleLogin} >Login</button>
                  <p className='mt-2'>New user? Click here to <Link to={'/register'}>Register</Link></p>
                </div>
              ) : (
                <div className='d-flex justify-content-center align-items-center flex-column my-3'>
                  <button type='button' className='btn btn-primary' onClick={handleRegister}>Register</button>
                  <p className='mt-2'>Already a user? Click here to <Link to={'/login'}>Login</Link></p>
                </div>
              )}
            </form>
          </Col>

          <Col md={1}></Col>
        </Row>
      </Container>

      <ToastContainer position='top-center' autoClose={2000} theme='dark' transition={Flip} />
    </>
  );
}

export default SignIn;
