import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles }) => {
  const userRole = localStorage.getItem("role");

  console.log("🔹 Allowed Roles:", allowedRoles);
  console.log("🔹 User Role:", userRole);

  if (!userRole) {
    console.log("🔸 No Role Found → Redirecting to Login");
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(userRole)) {
    console.log("🔸 Role Not Allowed → Redirecting to Home");
    return <Navigate to="/" replace />;
  }

  console.log("✅ Access Granted");
  return <Outlet />;
};

export default ProtectedRoute;
