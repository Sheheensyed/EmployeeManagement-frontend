import React from 'react'
import { ToastContainer } from 'react-bootstrap'
import { toast } from 'react-toastify'

function Employee() {

  const checkIn = () => {
    toast.success('Checked in successfully')

  }

  const checkOut = () => {
    toast.warning('Checked out successfully')
  }

  return (
    <>
      <div className="container w-100 mt-5" style={{ height: "100vh" }}>

        <div className="row mt-5">
          <h1 className='ms-5 mt-5 text-center'> Hello Employee</h1>

          <div className="col-md-4"></div>

          <div className="col-md-4 p-3">
            <table className='table table-bordered bg-light table-responsive'>
              <thead>
                <tr>
                  <th className='text-center'>Check-in</th>
                  <th className='text-center'>Check-out</th>
                </tr>
              </thead>
              <tbody>
                <tr className=''>
                  <td className=''>
                    <div className='d-flex justify-content-center'>
                      <button className='btn btn-success' onClick={checkIn}>Check-in</button>
                    </div>
                  </td>
                  <td className=''>
                    <div className='d-flex justify-content-center'>
                      <button className='btn btn-warning' onClick={checkOut}>Check-out</button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="col-md-4"></div>

          <div className="col-md-2"></div>

          <div className="col-md-8">
            <h4 className='text-center mt-5'>Todays work</h4>

            <table className='table table-bordered table-responsive'>
              <thead>
                <tr>
                  <th className='text-center'>S.no</th>
                  <th className='text-center'>Particular</th>
                  <th className='text-center'>Completed</th>
                  <th className='text-center'>Pending</th>
                </tr>
              </thead>

              <tbody>

                <tr>
                  <td className='text-center'>1</td>
                  <td className='text-center'>Build database using mongoDB</td>
                  <td className='text-center'>
                    <button className='btn btn-success me-2 w-25'>Yes</button>
                    <button className='btn btn-warning w-25'>No</button>
                  </td>
                  <td className='text-center'>
                    <button className='btn btn-danger'>Pending</button>
                  </td>
                </tr>

                <tr>
                  <td className='text-center'>2</td>
                  <td className='text-center'>Setup json server</td>
                  <td className='text-center'>
                    <button className='btn btn-success me-2 w-25'>Yes</button>
                    <button className='btn btn-warning w-25'>No</button>
                  </td>
                  <td className='text-center'>
                    <button className='btn btn-danger'>Pending</button>
                  </td>
                </tr>

                <tr>
                  <td className='text-center'>3</td>
                  <td className='text-center'>Make frontend for the client</td>
                  <td className='text-center'>
                    <button className='btn btn-success me-2 w-25'>Yes</button>
                    <button className='btn btn-warning w-25'>No</button>
                  </td>
                  <td className='text-center'>
                    <button className='btn btn-danger'>Pending</button>
                  </td>
                </tr>


              </tbody>
            </table>

            <h3 className='text-center'>No works assigned yet...</h3>

          </div>

          <div className="col-md-2"></div>

        </div>
      </div>





      <ToastContainer position='top-center' />
    </>
  )
}

export default Employee
