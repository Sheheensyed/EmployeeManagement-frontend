import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import Employee from "./pages/Employee";
import PageNotFound from "./pages/PageNotFound";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ContactUs from "./pages/ContactUs";
import Products from "./pages/Products";
import Admin from "./pages/Admin";
import ContextShare from "./context/ContextShare";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <>
      <ContextShare>
        <Header />
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/register" element={<SignIn register={true} />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/products" element={<Products />} />

          {/* Employee Protected Route */}
          <Route element={<ProtectedRoute allowedRoles={["employee"]} />}>
            <Route path="/dashboard" element={<Employee />} />
          </Route>

          {/* Admin Protected Route */}
          <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
            <Route path="/admin" element={<Admin />} />
          </Route>

          {/* 404 Page */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Footer />
      </ContextShare>
    </>
  );
}

export default App;
