import {  faEmpire, faGithub, faInstagram, faLinkedin, faXTwitter } from '@fortawesome/free-brands-svg-icons'
import { faGlobe } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <>
     <div className="container-fluid">
        <div className="row bg-light">

            <div className="col-md-4 p-4">
                <Link to={'/'} style={{textDecoration:"none"}}><h3 ><FontAwesomeIcon icon={faEmpire} className='logo mx-1' /> Forverse</h3></Link>
                <p style={{textAlign:"justify"}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas maiores blanditiis repellendus odit repudiandae explicabo excepturi aliquam assumenda. Aliquid, quia delectus esse alias accusantium impedit dolores aliquam aspernatur odit vitae! Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur quidem autem consectetur culpa, illum veritatis, nulla sit harum repellendus consequatur, sequi ipsa. Provident, consectetur </p>
            </div>

            <div className="col-md-1"></div>

            <div className="col-md-2 p-4">
              <h3 className=''>Guides</h3>
              
              <Link to={'/'} style={{textDecoration:"none"}} className='text-dark'><p className=''>React</p></Link>
              <Link to={'/'} style={{textDecoration:"none"}} className='text-dark'><p className=''>React bootstrap</p></Link>
              <Link to={'/'} style={{textDecoration:"none"}} className='text-dark'><p className=''>Bootswatch</p></Link>
              
              
            </div>
            
            <div className="col-md-1 p-4">
              <h3 className=''>Links</h3>

              <Link to={'/'} style={{textDecoration:"none"}} className='text-dark'><p className=''>Home</p></Link>
              <Link to={'/contact'} style={{textDecoration:"none"}} className='text-dark'><p className=''>Contact</p></Link>
              <Link to={'/products'} style={{textDecoration:"none"}} className='text-dark'><p className=''>Products</p></Link>
              <Link to={'/admin'} style={{textDecoration:"none"}} className='text-dark'><p className=''>Admin</p></Link>
              
              
            </div>
            
            <div className="col-md-4 p-4">
                <h3 className=''>Contact us</h3>
                <div className='d-flex justify-content-center align-items-center py-3'>
                    <input type="text" placeholder='Email id' name="" id="" className='form-control me-2' required />
                    <button className='btn btn-warning w-25 me-2'>Submit</button>

                    </div>
                    <div className='d-flex justify-content-between mt-4 fa-2xl'>

                    <FontAwesomeIcon icon={faInstagram} />
                    <FontAwesomeIcon icon={faGithub} />
                    <FontAwesomeIcon icon={faLinkedin} />
                    <FontAwesomeIcon icon={faGlobe} />
                    <FontAwesomeIcon icon={faXTwitter} />

                </div>
            </div>
            
        </div>
     </div> 
    </>
  )
}

export default Footer
