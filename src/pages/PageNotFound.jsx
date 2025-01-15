import React from 'react'
import { Link } from 'react-router-dom'

function PageNotFound() {
  return (
    <>
      <div className="container">
        <div className="row">

            <div className="col-md-1"></div>
        
            <div className="col-md-10 d-flex justify-content-center align-items-center flex-column w-100" style={{height:"100vh"}}>
                <h1 className='text-dark'>404</h1>
                <h5 className='text-dark'>Not found</h5>
                <p className='text-dark'>The resource you're looking is not found</p>
                <Link to={'/'}><button className='btn btn-light'>Go home</button></Link>
            </div>
        
            <div className="col-md-1"></div>
        
        </div>
      </div>
    </>
  )
}

export default PageNotFound