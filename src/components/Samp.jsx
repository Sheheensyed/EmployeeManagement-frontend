// import React, { useState } from 'react';
// import { Col, Container, Row } from 'react-bootstrap';
// import { Link } from 'react-router-dom';

// function SignIn({ register }) {
//   const [formData, setFormData] = useState({
//     username: '',
//     email: '',
//     password: ''
//   });
//   const [errors, setErrors] = useState({});
//   const [submitted, setSubmitted] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const validateForm = () => {
//     const newErrors = {};
//     if (register && !formData.username) newErrors.username = 'Username is required';
//     if (!formData.email) newErrors.email = 'Email is required';
//     if (!formData.password) newErrors.password = 'Password is required';
//     return newErrors;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const newErrors = validateForm();
//     if (Object.keys(newErrors).length === 0) {
//       setSubmitted(true);
//       // Perform the submit action (e.g., API call)
//       console.log('Form submitted successfully:', formData);
//     } else {
//       setErrors(newErrors);
//     }
//   };

//   return (
//     <Container>
//       <Row className='w-100 mt-5' style={{ height: "100vh" }}>
//         <Col md={1}></Col>
//         <Col sm={12} md={10} className='d-flex justify-content-center align-items-center'>
//           <form onSubmit={handleSubmit} noValidate>
//             <h4 className='text-center mb-3'>Fourverse</h4>

//             {!register ? (
//               <h5 className='mb-4'>Sign into your Account</h5>
//             ) : (
//               <h5 className='mb-4'>Sign Up your Account</h5>
//             )}

//             {register && (
//               <div className='mb-2'>
//                 <input
//                   type="text"
//                   name="username"
//                   placeholder='Username'
//                   className={`form-control ${errors.username ? 'is-invalid' : ''}`}
//                   value={formData.username}
//                   onChange={handleChange}
//                   aria-describedby="usernameError"
//                   aria-invalid={!!errors.username}
//                 />
//                 {errors.username && <div id="usernameError" className="invalid-feedback">{errors.username}</div>}
//               </div>
//             )}
//             <div className='mb-2'>
//               <input
//                 type="email"
//                 name="email"
//                 placeholder='Email id'
//                 className={`form-control ${errors.email ? 'is-invalid' : ''}`}
//                 value={formData.email}
//                 onChange={handleChange}
//                 aria-describedby="emailError"
//                 aria-invalid={!!errors.email}
//               />
//               {errors.email && <div id="emailError" className="invalid-feedback">{errors.email}</div>}
//             </div>
//             <div className='mb-2'>
//               <input
//                 type="password"
//                 name="password"
//                 placeholder='Password'
//                 className={`form-control ${errors.password ? 'is-invalid' : ''}`}
//                 value={formData.password}
//                 onChange={handleChange}
//                 aria-describedby="passwordError"
//                 aria-invalid={!!errors.password}
//               />
//               {errors.password && <div id="passwordError" className="invalid-feedback">{errors.password}</div>}
//             </div>

//             {!register ? (
//               <div className='d-flex justify-content-center align-items-center flex-column my-3'>
//                 <button className='btn btn-primary' type="submit">Login</button>
//                 <p className='mt-2'>New user? Click here to <Link to={'/register'}>Register</Link></p>
//               </div>
//             ) : (
//               <div className='d-flex justify-content-center align-items-center flex-column'>
//                 <button className='btn btn-primary' type="submit">Register</button>
//                 <p>Already a user? Click here to <Link to={'/login'}>Login</Link></p>
//               </div>
//             )}
//           </form>
//         </Col>
//         <Col md={1}></Col>
//       </Row>
//     </Container>
//   );
// }

// export default SignIn;







// import React from 'react'
// import { ToastContainer } from 'react-bootstrap'
// import { toast } from 'react-toastify'

// function Employee() {

//   const checkIn = () => {
//     toast.success('Checked in successfully')
//   }

//   const checkOut = () => {
//     toast.warning('Checked out successfully')
//   }

//   return (
//     <>
//       <div className="container w-100 mt-5" style={{ height: "100vh" }}>
//         <div className="row mt-5 justify-content-center">
//           <h1 className="text-center">Hello Employee</h1>

//           <div className="col-md-6 col-sm-12 p-3">
//             <table className="table table-bordered bg-light">
//               <thead>
//                 <tr>
//                   <th className="text-center">Check-in</th>
//                   <th className="text-center">Check-out</th>
//                 </tr>
//               </thead>

//               <tbody>
//                 <tr>
//                   <td className="text-center">
//                     <button className="btn btn-success" onClick={checkIn}>Check-in</button>
//                   </td>
//                   <td className="text-center">
//                     <button className="btn btn-warning" onClick={checkOut}>Check-out</button>
//                   </td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>

//       {/* Toast Notifications */}
//       <ToastContainer position="top-center" />
//     </>
//   )
// }

// export default Employee
