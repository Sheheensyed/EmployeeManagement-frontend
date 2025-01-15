import React, { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { Flip, toast, ToastContainer } from 'react-toastify';

function SignIn({ register,admin }) {

  const navigate = useNavigate()
  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    password: ""
  })
  console.log(userDetails);


  const handleRegister = () => {
    const { username, email, password } = userDetails
    if (!username || !email || !password) {
      toast.info('Please fill the form')
    } else {
      toast.success('Registration success')
      // setUserDetails({
      //   username:"",
      //   email:"",
      //   password:""
      // })
      navigate('/login')
    }
  }

  const handleLogin = () => {
    const { username, password } = userDetails
    if (!username || !password) {
      toast.info('Please fill the form completely')
    } else {
      toast.success('Login success')
      navigate('/dashboard')
    }
  }


  return (
    <>
      <Container>
        <Row className='w-100 mt-5' style={{ height: "100vh" }}>

          <Col md={1}></Col>

          <Col sm={12} md={10} className='d-flex justify-content-center align-items-center'>

            <form className=''>
              <h4 className='text-center mb-3'>Forverse</h4>

              {!register ? <h5 className='mb-4'>Sign into your Account</h5>
                :
                <h5 className='mb-4'>Sign Up your Account</h5>
              }


              {register && <input type="text" placeholder='Username' className='form-control mb-2' onChange={(e) => { setUserDetails({ ...userDetails, username: e.target.value }) }} />}
              <input type="text" placeholder='Email id' className='form-control mb-2' onChange={(e) => { setUserDetails({ ...userDetails, email: e.target.value }) }} />
              <input type="password" placeholder='Password' className='form-control mb-2' onChange={(e) => { setUserDetails({ ...userDetails, password: e.target.value }) }} />


              {!register ?
                <div className='d-flex justify-content-center align-items-center flex-column my-3'>
                  <button type='button' className='btn btn-primary' onClick={handleLogin}>Login</button>
                 {/* {admin &&  */}
                 <p className='mt-2'>New user? Click here to <Link to={'/register'}>Register</Link></p>
                 {/* } */}
                </div>
                :
                <div className='d-flex justify-content-center align-items-center flex-column my-3'>
                  <button type='button' className='btn btn-primary' onClick={handleRegister}>Register</button>
                  <p className='mt-2'>Already a user? Click here to <Link to={'/login'}>Login</Link></p>
                </div>
              }
            </form>


          </Col>

          <Col md={1}></Col>

        </Row>
      </Container>

      <ToastContainer position='top-center' autoClose={2000} theme='dark' />
    </>
  )
}

export default SignIn
