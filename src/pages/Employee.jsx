import { faCheck, faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { checkInApi, checkOutApi, getAssignedTaskApi, updateTaskStatusApi } from '../../services/allApi';

function Employee() {
  const [taskList, setTaskList] = useState([]);
  const employeeId = localStorage.getItem("employeeID");

  const handleCheckIn = async () => {
    const employeeID = localStorage.getItem("employeeID");

    try {
        const response = await checkInApi( employeeID );

        if (response.status === 200) {
            toast.success("Checked in successfully");
        } else {
            toast.warning(response.data.message);
        }
    } catch (error) {
        toast.error("Error checking in");
    }
};

const handleCheckOut = async () => {
    const employeeID = localStorage.getItem("employeeID");

    try {
        const response = await checkOutApi(employeeID );

        if (response.status === 200) {
            toast.success("Checked out successfully");
        } else {
            toast.warning(response.data.message);
        }
    } catch (error) {
        toast.error("Error checking out");
    }
};

  // Redirect to login if no employeeId is found
  useEffect(() => {
    if (!employeeId) {
      console.error("Employee ID missing. Redirecting to login.");
      setTimeout(() => {
        window.location.href = "/login";
      }, 500);
    }
  }, [employeeId]);

  // Fetch assigned tasks
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await getAssignedTaskApi(employeeId);
        if (response.data.tasks.length > 0) {
          setTaskList(response.data.tasks);
        } else {
          setTaskList([]);
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    if (employeeId) fetchTasks();
  }, [employeeId]);

  // ✅ Function to update task status
  const updateStatus = async (taskName, newStatus) => {
    try {
      const response = await updateTaskStatusApi({
        employeeID: employeeId,
        taskName,
        status: newStatus
      });

      if (response.status === 200) {
        toast.success(`Task "${taskName}" marked as ${newStatus}`);

        // ✅ Remove updated task from UI
        setTaskList((prevTasks) => prevTasks.filter(task => task !== taskName));
      } else {
        toast.error("Failed to update task status");
      }
    } catch (error) {
      console.error("Error updating task status:", error);
      toast.error("Error updating task status");
    }
  };

  return (
    <>
      <div className="container w-100 mt-5" style={{ height: "100vh" }}>
        <div className="row mt-5">
          <h1 className='ms-5 mt-5 text-center'>Hello <span className='text-success'>{employeeId}</span></h1>

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
                <tr>
                  <td className='text-center'><button onClick={handleCheckIn} className='btn btn-success'>Check-in</button></td>
                  <td className='text-center'><button onClick={handleCheckOut} className='btn btn-warning'>Check-out</button></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="col-md-4"></div>

          <div className="col-md-2"></div>
          <div className="col-md-8">
            <h4 className='text-center mt-5'>Today's Work</h4>
            <table className='table table-bordered table-responsive'>
              <thead>
                <tr>
                  <th className='text-center'>S.no</th>
                  <th className='text-center'>Task</th>
                  <th className='text-center'>Status</th>
                </tr>
              </thead>
              <tbody>
                {taskList.length > 0 ? (
                  taskList.map((task, index) => (
                    <tr key={index}>
                      <td className='text-center'>{index + 1}</td>
                      <td className='text-center'>{task}</td>
                      <td className='text-center'>
                        <button className='btn btn-success me-2 w-25' onClick={() => updateStatus(task, "Completed")}>
                          <FontAwesomeIcon icon={faCheck} />
                        </button>
                        <button className='btn btn-warning w-25' onClick={() => updateStatus(task, "In-Progress")}>
                          <FontAwesomeIcon icon={faX} />
                        </button>
                        <button className='btn btn-danger w-25 ms-2' onClick={() => updateStatus(task, "Pending")}>
                          Pending
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="text-center text-danger">No tasks assigned yet...</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="col-md-2"></div>
        </div>
      </div>

      <ToastContainer position='top-center' theme='dark' />
    </>
  );
}

export default Employee;
