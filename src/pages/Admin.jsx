import React from 'react'

function Admin() {
    return (
        <>
            <div className="container-fluid p-5 mt-5 w-100" style={{ height: "100vh" }}>
                <h2>Admin</h2>
                <div className="row w-100">

                    <div className="col-md-2"></div>

                    <div className="col-md-8">
                        <h3 className='text-center'>Assign work</h3>

                        <div className='d-flex justify-content-center flex-column'>
                             <input type="text" placeholder='Emp ID' className='form-control w-100 my-3' />
                             <input type="text" placeholder='Employee name' className='form-control w-100 ' />
                             <textarea rows={5} type="text" placeholder='Works' className='form-control w-100 my-3' />
                             <button className='btn btn-light my-3'>Submit</button>
                             </div>
                    </div>

                    <div className="col-md-2"></div>
                </div>


            </div>
        </>
    )
}

export default Admin
