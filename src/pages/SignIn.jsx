import React, { useEffect, useState, useRef } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { loginApi, requestApi } from '../../services/allApi';
import { Flip } from 'react-toastify/unstyled';

function SignIn({ register }) {
  const navigate = useNavigate();

  // State to store input values
  const [empDetails, setEmpDetails] = useState({
    employeeName: "",
    employeeID: "",
    email: "",
    password: ""
  });

  // Check if user is already logged in
  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role === "admin") {
      navigate("/admin");
    } else if (role === "employee") {
      navigate("/dashboard");
    }
  }, [navigate]);

  console.log(empDetails);

  // Registration Function
  const handleRegister = async () => {
    const { employeeID, employeeName, email, password } = empDetails;
    if (!employeeID || !employeeName || !email || !password) {
      toast.info('Please fill the form');
      return;
    }

    try {
      const result = await requestApi(empDetails);
      if (result.status === 200) {
        toast.success(`Registration successful`);
        setEmpDetails({ employeeName: "", employeeID: "", email: "", password: "" });

        setTimeout(() => {
          navigate('/login'); // Redirect to login after registration
        }, 1500);
      } else {
        toast.error(result.data.message || "Something went wrong");
      }
    } catch (error) {
      toast.error("Server error, try again later");
    }
  };

  // Login Function
  const handleLogin = async (e) => {
    if (e) e.preventDefault();
  
    console.log("Logging in with:", empDetails); // ✅ Debug Input
  
    const { employeeID, password } = empDetails; // ✅ Extract correct values
  
    if (!employeeID || !password) {
      toast.warning("Please enter both Employee ID and password.");
      return;
    }
  
    try {
      const response = await loginApi({ employeeID, password });
  
      console.log("API Response:", response.data); // ✅ Log the API response
  
      if (response.status === 200 && response.data.existingEmployee) {
        const user = response.data.existingEmployee; // ✅ Extract user details
  
        // ✅ Store correct values
        localStorage.setItem("employeeID", user.employeeID);
        localStorage.setItem("employeeName", user.employeeName);
        localStorage.setItem("role", user.role === "user" ? "employee" : user.role);

        localStorage.setItem("token", response.data.token);
        console.log("User Role:", localStorage.getItem("role"));

  
        toast.success("Login successful!");
  
        // ✅ Redirect based on role
        if (user.role === "admin") {
          navigate("/admin");
        } else if (user.role === "user") {
          localStorage.setItem('role','employee')
          navigate("/dashboard");
        } else {
          navigate("/");
        }
      } else {
        toast.error("Login failed. Check your credentials.");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Error logging in. Try again.");
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
        // ✅ Ensure handleLogin is called correctly without an event parameter
        register ? handleRegister() : handleLogin(new Event("submit"));
      }
    }
  };
  

  return (
    <>
      <Container>
        <Row className='w-100 mt-5' style={{ height: "100vh" }}>
          <Col md={1}></Col>

          <Col sm={12} md={10} className='d-flex justify-content-center align-items-center'>
            <form className='' onSubmit={register ? handleRegister : handleLogin}>
              <h4 className='text-center mb-3'>Forverse</h4>
              <h5 className='mb-4'>{register ? "Sign Up Your Account" : "Sign Into Your Account"}</h5>

              {register && (
                <>
                  <input ref={nameRef} onKeyDown={(e) => handleKeyDown(e, emailRef)} type="text" placeholder='Employee Name' className='form-control mb-2' onChange={(e) => setEmpDetails({ ...empDetails, employeeName: e.target.value })} />
                  <input ref={emailRef} onKeyDown={(e) => handleKeyDown(e, idRef)} type="text" placeholder='Email ID' className='form-control mb-2' onChange={(e) => setEmpDetails({ ...empDetails, email: e.target.value })} />
                </>
              )}

              <input ref={idRef} onKeyDown={(e) => handleKeyDown(e, passwordRef)} type="text" placeholder='Employee ID' className='form-control mb-2' onChange={(e) => setEmpDetails({ ...empDetails, employeeID: e.target.value })} />

              <input ref={passwordRef} onKeyDown={(e) => handleKeyDown(e, null)} type="password" placeholder='Password' className='form-control mb-2' onChange={(e) => setEmpDetails({ ...empDetails, password: e.target.value })} />

              <div className='d-flex justify-content-center align-items-center flex-column my-3'>
                <button type='submit' className='btn btn-primary'>
                  {register ? "Register" : "Login"}
                </button>
                <p className='mt-2'>
                  {register ? "Already a user?" : "New user?"} Click here to <Link to={register ? '/login' : '/register'}>{register ? "Login" : "Register"}</Link>
                </p>
              </div>
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
