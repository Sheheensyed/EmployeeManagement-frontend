import React, { useEffect, useRef, useState } from 'react'
import AddProducts from '../components/AddProducts'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrash, faX } from '@fortawesome/free-solid-svg-icons'
import { assignWorkApi, deleteEmployeeApi, getAllEmployeesApi, getAllProductsApi, getAllTaskLogsApi, getAssignedTaskApi, getAttendanceLogsApi, requestApi, updateEmployeeApi } from '../../services/allApi'
import { toast, ToastContainer } from 'react-toastify'
import { Button, Modal } from 'react-bootstrap'

function Admin({ register }) {

    const [section, setSection] = useState('register')
    const [empDetails, setEmpDetails] = useState({
        employeeName: "",
        employeeID: "",
        email: "",
        phone: "",
        designation: "",
        gender: "",
        password: ""
    })
    console.log(empDetails);

    const [taskLogs, setTaskLogs] = useState([])
    console.log('Task Logs:', taskLogs);

    const handleRegister = async () => {
        try {
            const { employeeID, employeeName, email, password, phone, designation, gender } = empDetails
            if (!employeeID || !employeeName || !email || !password || !phone || !designation || !gender) {
                toast.info('Please fill the form')
                return
            }
            const result = await requestApi(empDetails)
            toast.success(`Registration successful`)
            setEmpDetails({
                employeeName: "",
                employeeID: "",
                email: "",
                phone: "",
                designation: "",
                gender: "",
                password: ""
            })
        } catch (error) {
            if (error.response && error.response.status === 406) {
                toast.warning(error.response.data)
            } else {
                toast.error(`Something went wrong`)
            }
        }
    }

    const [workDetails, setWorkDetails] = useState({
        employeeID: "",
        employeeName: '',
        work1: '',
        work2: '',
        work3: ''
    })

    const handleAssignWork = async () => {
        const { employeeID, employeeName, work1, work2, work3 } = workDetails;
        if (!employeeID || !employeeName || !work1 || !work2 || !work3) {
            toast.info(`Please fill the form completely`)
        } else {
            const workArray = [work1, work2, work3]
            try {
                const result = await assignWorkApi({ employeeID, work: workArray })

                if (result.status == 200) {
                    toast.success(`Work assigned successfully`);
                    setWorkDetails({
                        employeeID: "",
                        employeeName: '',
                        work1: '',
                        work2: '',
                        work3: ''
                    })

                } else {
                    toast.error(`Failed to assign work`)
                }

            } catch (error) {
                toast.error(`Error:${error.message}`)
            }
        }
    }
    // use refs for input fields
    const nameRef = useRef()
    const emailRef = useRef()
    const idRef = useRef()
    const passwordRef = useRef()

    const handleKeyDown = (event, nextFieldRef) => {
        if (event.key === "Enter") {
            event.preventDefault()
            if (nextFieldRef) {
                nextFieldRef.current.focus()
            } else {
                if (register) {
                    handleRegister()
                } else {
                    // handleLogin()
                }
            }
        }
    }

    const [products, setProducts] = useState([])
    const fetchProducts = async () => {
        try {
            const result = await getAllProductsApi()
            if (result.status == 200) {
                setProducts(result.data)
            } else {
                toast.warning(`Failed to fetch products`)
            }
        } catch (error) {
            console.log(`Error fetching products:`, error);
            toast.error(`Error fetching products`)

        }
    }
    console.log(products);


    const [attendanceLogs, setAttendanceLogs] = useState([]);
    console.log(attendanceLogs);

    const handleDelete = async (employeeID) => {
        if (window.confirm(`Are you sure you want to remove this employee?`)) {
            try {
                const result = await deleteEmployeeApi(employeeID);
                if (result.status === 200) {
                    toast.success("Employee removed successfully");
                    setEmployees(employees.filter(emp => emp.employeeID !== employeeID));
                } else {
                    toast.error("Failed to remove employee");
                }
            } catch (error) {
                toast.error("Error removing employee");
            }
        }
    };

    const [showEdit, setShowEdit] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    // 🔹 Handle Edit Button Click
    const handleEdit = (employee) => {
        setSelectedEmployee(employee);
        setShowEdit(true);
    };

    // 🔹 Handle Close Edit Modal
    const handleCloseEdit = () => {
        setShowEdit(false);
        setSelectedEmployee(null);
    };

    // 🔹 Handle Update Employee
    const handleUpdateEmployee = async (updatedEmployee) => {
        try {
            const result = await updateEmployeeApi(updatedEmployee);
            if (result.status === 200) {
                toast.success("Employee updated successfully");
                setShowEdit(false);

                // Update UI with new details
                setEmployees(prevEmployees =>
                    prevEmployees.map(emp =>
                        emp.employeeID === updatedEmployee.employeeID ? updatedEmployee : emp
                    )
                );
            } else {
                toast.warning("Failed to update employee");
            }
        } catch (error) {
            console.error("Error updating employee:", error);
            toast.error("Error updating employee details");
        }
    };






    const [employees, setEmployees] = useState([]);
    console.log(employees);

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const result = await getAllEmployeesApi();
                if (result.status === 202) {
                    setEmployees(result.data);
                } else {
                    setEmployees([]);
                }
            } catch (error) {
                console.error("Error fetching employees:", error);
            }
        };
        fetchEmployees();
    }, []);


    useEffect(() => {
        const fetchAttendanceLogs = async () => {
            try {
                const result = await getAttendanceLogsApi();
                console.log("API Response:", result.data); // Debugging
                if (result.data.logs && result.data.logs.length > 0) {
                    console.log("Setting Attendance Logs:", result.data.logs);
                    setAttendanceLogs(result.data.logs);
                } else {
                    console.log("No Attendance Logs Found");
                    setAttendanceLogs([]);
                }
            } catch (error) {
                console.error("Error fetching attendance logs:", error);
            }
        };
        fetchAttendanceLogs();
    }, []);


    useEffect(() => {
        const fetTaskLogs = async () => {
            try {
                const result = await getAllTaskLogsApi()
                console.log(result);
                if (result.data.tasks.length > 0) {
                    setTaskLogs(result.data.tasks);
                } else {
                    setTaskLogs([]);
                }
            } catch (error) {
                console.warn(`Error fetching task logs:`, error);

            }
        }
        fetTaskLogs()
    }, [])

    useEffect(() => {
        fetchProducts()
    }, [])
    // ✅ Callback function to update products after adding a new one
    const handleProductAdded = () => {
        fetchProducts();
    };

    return (
        <>
            <div className="container d-flex p-5 mt-5 " >

                <aside className='bg-light text-white p-3 my-3' style={{ width: "250px" }}>
                    <h4 className='text-center'>Admin Panel</h4>

                    <div className=''>
                        <button className='btn btn-light w-100 my-4' onClick={() => setSection('register')}>Register Employee</button>
                        <button className='btn btn-light w-100 my-4' onClick={() => setSection('assign')}>Assign Work</button>
                        <button className='btn btn-light w-100 my-4' onClick={() => setSection('attendance')}>Attendance Log</button>
                        <button className='btn btn-light w-100 my-4' onClick={() => setSection('work')}>Work Log</button>
                        <button className='btn btn-light w-100 my-4' onClick={() => setSection('manage')}>Manage Employee</button>
                        <button className='btn btn-light w-100 my-4' onClick={() => setSection('products')}>Add products</button>
                    </div>

                </aside>

                {/* Contents */}
                <div className="container p-3 w-100">

                    {/* register employee */}

                    {section === "register" && (

                        <div className='mt-3'>
                            <h3 className='text-center'>Register Employee</h3>
                            <div className="container">
                                <form className='mt-3'>
                                    <div className="row">
                                        <div className="col-md-6">

                                            <input onChange={(e) => setEmpDetails({ ...empDetails, employeeName: e.target.value })} type="text" value={empDetails.employeeName} placeholder='Employee Name' className='form-control my-2' name="" id="" />
                                            <input onChange={(e) => setEmpDetails({ ...empDetails, employeeID: e.target.value })} type="text" value={empDetails.employeeID} placeholder='Employee ID' className='form-control my-2' name="" id="" />
                                            <input onChange={(e) => setEmpDetails({ ...empDetails, email: e.target.value })} type="text" value={empDetails.email} placeholder='Email ID' className='form-control my-2' name="" id="" />
                                            <input onChange={(e) => setEmpDetails({ ...empDetails, password: e.target.value })} type="password" value={empDetails.password} placeholder='Password' className='form-control my-2' name="" id="" />
                                        </div>
                                        <div className="col-md-6">
                                            <input onChange={(e) => setEmpDetails({ ...empDetails, phone: e.target.value })} type="text" value={empDetails.phone} placeholder='Phone no.' className='form-control my-2' name="" id="" />
                                            <input onChange={(e) => setEmpDetails({ ...empDetails, designation: e.target.value })} type="text" value={empDetails.designation} placeholder='Designation' className='form-control  my-2' name="" id="" />

                                            {/* <input onChange={(e) => setEmpDetails({ ...empDetails, gender: e.target.value })} type="text" value={empDetails.gender} placeholder='Gender ( M / F )' className='form-control my-2' name="" id="" /> */}
                                            <select className="form-control my-2" value={empDetails.gender}
                                                onChange={(e) => setEmpDetails({ ...empDetails, gender: e.target.value })}>
                                                <option value="">Select Gender</option>
                                                <option value="M">Male</option>
                                                <option value="F">Female</option>
                                            </select>

                                        </div>
                                    </div>
                                </form>
                                <button className='btn btn-primary w-100 my-2' onClick={handleRegister}>Register</button>
                            </div>
                        </div>
                    )
                    }

                    {/* Work assignment*/}

                    {section === "assign" && (

                        <div className='mt-3'>
                            <h3 className='text-center'>Assign Works</h3>
                            <form className='d-flex justify-content-center align-items-center flex-column'>

                                <input type="text" placeholder='Emp ID' className='form-control w-50 my-2' onChange={(e) => setWorkDetails({ ...workDetails, employeeID: e.target.value })} />

                                <input type="text" placeholder='Employee name' className='form-control w-50 my-2 ' onChange={(e) => setWorkDetails({ ...workDetails, employeeName: e.target.value })} />

                                <input type="text" placeholder='work1' className='form-control w-50 my-2' onChange={(e) => setWorkDetails({ ...workDetails, work1: e.target.value })} />

                                <input type="text" placeholder='work2' className='form-control w-50 my-2' onChange={(e) => setWorkDetails({ ...workDetails, work2: e.target.value })} />

                                <input type="text" placeholder='work3' className='form-control w-50 my-2' onChange={(e) => setWorkDetails({ ...workDetails, work3: e.target.value })} />

                                <button type='button' className='btn btn-light w-50 my-3' onClick={handleAssignWork}>Submit</button>
                            </form>
                        </div>
                    )
                    }

                    {/* Attendance */}

                    {section === "attendance" && (

                        <div className='mt-3' >
                            <h3 className='text-center'>Attendance Log</h3>
                            <table className='table table-responsive table-bordered'>
                                <thead>
                                    <tr>
                                        {/* <th className='text-center'>Name</th> */}
                                        <th className='text-center'>EmpID</th>
                                        {/* <th className='text-center'>Date</th> */}
                                        <th className='text-center'>Check-in</th>
                                        <th className='text-center'>Check-out</th>
                                        <th className='text-center'>Duration</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {attendanceLogs.length > 0 ? (
                                        attendanceLogs.map((log, index) => (
                                            <tr key={index}>
                                                <td className='text-center'>{log.employeeID || 'N/A'}</td>
                                                <td className='text-center'>{new Date(log.checkIn).toLocaleString()}</td>
                                                <td className='text-center'>{log.checkOut ? new Date(log.checkOut).toLocaleString() : 'Not Checked Out'}</td>
                                                <td className='text-center'>{log.duration || 'N/A'}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="4" className="text-center text-danger">No attendance logs found.</td>
                                        </tr>
                                    )}
                                </tbody>

                            </table>
                        </div>
                    )
                    }

                    {/* Work */}

                    {section === "work" && (

                        <div className="container mt-3">
                            <h3 className="text-center">Work Log</h3>
                            <table className="table table-bordered table-responsive">
                                <thead>
                                    <tr>
                                        <th className="text-center">Employee ID</th>
                                        <th className="text-center">Task</th>
                                        <th className="text-center">Status</th>
                                        <th className="text-center">Time</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {taskLogs.length > 0 ? (
                                        taskLogs.map((task, index) => (
                                            <tr key={index}>
                                                <td className="text-center">{task.employeeID || "N/A"}</td>
                                                <td className="text-center">
                                                    {Array.isArray(task.work) ? task.work.join(", ") : "No tasks"}
                                                </td>
                                                <td className="text-center">
                                                    <span
                                                        className={`badge ${task.status === "Completed"
                                                            ? "bg-success"
                                                            : task.status === "In-Progress"
                                                                ? "bg-warning text-black"
                                                                : "bg-danger"
                                                            }`}
                                                    >
                                                        {task.status || "Pending"}
                                                    </span>
                                                </td>
                                                <td className="text-center">
                                                    {task.assignedAt
                                                        ? new Date(task.assignedAt).toLocaleString()
                                                        : "N/A"}
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="4" className="text-center text-danger">
                                                No task logs found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>

                            </table>
                        </div>

                    )
                    }
                    {/*  className='table table-bordered mt-3 table-hover table-striped' */}
                    {/* Manage employee */}

                    {section === "manage" && (
                        <div className="mt-5">
                            <h3 className="text-center">Manage Employees</h3>
                            <table className="table table-bordered mt-3">
                                <thead>
                                    <tr>
                                        <th className="text-center">Employee ID</th>
                                        <th className="text-center">Name</th>
                                        <th className="text-center">Email</th>
                                        <th className="text-center">Phone</th>
                                        <th className="text-center">Designation</th>
                                        <th className="text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {employees.length > 0 ? (
                                        employees.map((emp, index) => (
                                            <tr key={index}>
                                                <td className="text-center">{emp.employeeID}</td>
                                                <td className="text-center">{emp.employeeName}</td>
                                                <td className="text-center">{emp.email}</td>
                                                <td className="text-center">{emp.phone}</td>
                                                <td className="text-center">{emp.designation}</td>
                                                <td className="text-center">
                                                    <button className="btn me-2" onClick={() => handleEdit(emp)}>
                                                        <FontAwesomeIcon icon={faPenToSquare} />
                                                    </button>
                                                    <button className="btn text-danger" onClick={() => handleDelete(emp.employeeID)}>
                                                        <FontAwesomeIcon icon={faX} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="6" className="text-center text-danger">No employees found.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {/* 🔹 Edit Employee Modal */}
                    <Modal show={showEdit} onHide={handleCloseEdit} centered>
                        <Modal.Header closeButton>
                            <Modal.Title>Edit Employee</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {selectedEmployee && (
                                <>
                                    <input type="text" value={selectedEmployee.employeeName} className="form-control my-2"
                                        onChange={(e) => setSelectedEmployee({ ...selectedEmployee, employeeName: e.target.value })} />

                                    <input type="text" value={selectedEmployee.email} className="form-control my-2"
                                        onChange={(e) => setSelectedEmployee({ ...selectedEmployee, email: e.target.value })} />

                                    <input type="text" value={selectedEmployee.phone} className="form-control my-2"
                                        onChange={(e) => setSelectedEmployee({ ...selectedEmployee, phone: e.target.value })} />

                                    <input type="text" value={selectedEmployee.designation} className="form-control my-2"
                                        onChange={(e) => setSelectedEmployee({ ...selectedEmployee, designation: e.target.value })} />

                                    <select className="form-control my-2" value={selectedEmployee.gender}
                                        onChange={(e) => setSelectedEmployee({ ...selectedEmployee, gender: e.target.value })}>
                                        <option value="M">Male</option>
                                        <option value="F">Female</option>
                                    </select>
                                </>
                            )}
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleCloseEdit}>Cancel</Button>
                            <Button variant="primary" onClick={() => handleUpdateEmployee(selectedEmployee)}>Save Changes</Button>
                        </Modal.Footer>
                    </Modal>



                    {/* Add products */}
                    {section === "products" && (

                        <div className="mt-3">
                            <h3 className="text-center">Add & Manage Products</h3>
                            <AddProducts onProductAdded={handleProductAdded} />

                            {/* ✅ Product List */}
                            <div className="mt-4">
                                {products.length > 0 ? (
                                    products.map((product, index) => (
                                        <div key={product._id} className="bg-light mt-3 p-2 rounded d-flex justify-content-between align-items-center">
                                            <h5>{product.productName}</h5>
                                            <div className="d-flex">
                                                <FontAwesomeIcon icon={faTrash} className="fa-xl me-4 text-danger" />
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-center text-danger mt-3">No products available</p>
                                )}
                            </div>
                        </div>
                    )
                    }

                </div>




            </div>
            <ToastContainer autoClose={2000} theme='dark' position='top-center' />
        </>
    )
}

export default Admin
