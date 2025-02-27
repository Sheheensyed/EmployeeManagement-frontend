import React, { useEffect, useState } from "react";
import {
  getAssignedTaskApi,
  updateTaskStatusApi,
  checkInApi,
  checkOutApi,
} from "../../services/allApi";
import { ToastContainer, toast } from "react-toastify";
import { faCheck, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Employee() {
  const [tasks, setTasks] = useState([]);
  const [status, setStatus] = useState("Pending");
  const [checkedIn, setCheckedIn] = useState(false);
  const employeeId = localStorage.getItem("employeeID");
  const employeeName = localStorage.getItem("employeeName");

  // ✅ Fetch tasks on page load
  useEffect(() => {
    const fetchTasks = async () => {
      if (!employeeId) return;
      try {
        const response = await getAssignedTaskApi(employeeId);
        if (response.status === 200 && response.data.tasks) {
          setTasks(
            response.data.tasks.map((task) => ({
              name: task,
              status: response.data.status,
            }))
          );
        } else {
          setTasks([]);
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
        toast.error("Failed to fetch tasks");
      }
    };

    fetchTasks();
  }, [employeeId]);

  // ✅ Handle Check-in
  const handleCheckIn = async () => {
    try {
      const response = await checkInApi(employeeId);
      if (response.status === 200) {
        toast.success("Checked in successfully!");
        setCheckedIn(true);
      } else {
        toast.warning("Check-in failed");
      }
    } catch (error) {
      toast.error("Error during check-in");
    }
  };

  // ✅ Handle Check-out
  const handleCheckOut = async () => {
    try {
      const response = await checkOutApi(employeeId);
      if (response.status === 200) {
        toast.success("Checked out successfully!");
        setCheckedIn(false);
      } else {
        toast.warning("Check-out failed");
      }
    } catch (error) {
      toast.error("Error during check-out");
    }
  };

  // ✅ Handle Task Status Update
  const handleStatusUpdate = async (taskName, newStatus) => {
    try {
      const response = await updateTaskStatusApi({
        employeeId,
        task: taskName,
        status: newStatus,
      });

      if (response.status === 200) {
        toast.success(`Task "${taskName}" marked as ${newStatus}`);

        // Remove task if completed
        setTasks((prevTasks) =>
          prevTasks
            .map((task) =>
              task.name === taskName ? { ...task, status: newStatus } : task
            )
            .filter((task) => task.status !== "Completed")
        );
      } else {
        toast.warning("Failed to update status");
      }
    } catch (error) {
      toast.error("Error updating task status");
    }
  };

  return (
    <>
      <div className="container w-100 mt-5 p-5" style={{ height: "100vh" }}>
        {/* ✅ Employee Name Display */}
        <h1 className="text-center mt-5 fw-bolder">
          Hello <span className="text-secondary">{employeeName || "Employee"}</span>
        </h1>

        {/* ✅ Check-in & Check-out Buttons */}
        <div className="text-center my-4">
          <strong>Status:</strong> {status}
          <div className="mt-3">
            {!checkedIn ? (
              <button className="btn btn-success me-2" onClick={handleCheckIn}>
                Check In
              </button>
            ) : (
              <button className="btn btn-danger" onClick={handleCheckOut}>
                Check Out
              </button>
            )}
          </div>
        </div>

        {/* ✅ Task Table */}
        <div className="col-md-8 offset-md-2">
          <h4 className="text-center mt-5">Today's Work</h4>
          <table className="table table-bordered table-responsive">
            <thead>
              <tr>
                <th className="text-center">S.no</th>
                <th className="text-center">Task</th>
                <th className="text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              {tasks.length > 0 ? (
                tasks.map((task, index) => (
                  <tr key={index}>
                    <td className="text-center">{index + 1}</td>
                    <td className="text-center">{task.name}</td>
                    <td className="text-center">
                      <button
                        className="btn btn-success me-2 w-25"
                        onClick={() => handleStatusUpdate(task.name, "Completed")}
                      >
                        <FontAwesomeIcon icon={faCheck} />
                      </button>
                      <button
                        className="btn btn-warning w-25"
                        onClick={() => handleStatusUpdate(task.name, "In-Progress")}
                      >
                        <FontAwesomeIcon icon={faX} />
                      </button>
                      <button
                        className="btn btn-danger w-25 ms-2"
                        onClick={() => handleStatusUpdate(task.name, "Pending")}
                      >
                        Pending
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center text-danger">
                    No tasks assigned today...
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <ToastContainer position="top-center" theme="dark" />
    </>
  );
}

export default Employee;
