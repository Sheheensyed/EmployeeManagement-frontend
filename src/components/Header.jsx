import { faEmpire } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import AOS from 'aos';
import "aos/dist/aos.css";
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';

function Header() {
    const [isLogin, setIsLogin] = useState(false);
    const navigate = useNavigate(); // Used for redirection after logout

    useEffect(() => {
        AOS.init({
            disable: "phone",
            duration: 700,
            easing: "ease-out-cubic",
        });

        // Check if the user is logged in
        const token = localStorage.getItem('token');
        if (token) {
            setIsLogin(true);
        }
    }, []); // Run only once on mount

    // Logout function
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("employeeID");
        localStorage.removeItem("employeeName");
        localStorage.removeItem("role");
        window.location.href = "/login"; // Redirect to login page
    };


    return (
        <>
            <Navbar bg="dark" data-bs-theme="dark" fixed='top' style={{ height: "70px" }}>
                <Container>
                    <Link to="/" style={{ textDecoration: "none" }} className='d-flex'>
                        <Navbar.Brand>
                            <h4 data-aos="flip-left"
                                data-aos-easing="ease-out-cubic"
                                data-aos-duration="2000">
                                <FontAwesomeIcon icon={faEmpire} className='logo mx-1' /> Forverse
                            </h4>
                        </Navbar.Brand>
                    </Link>
                    <Nav>
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <Nav.Link as={Link} to="/products">Products</Nav.Link>

                        {!isLogin ? (
                            <NavDropdown title="Login" id="basic-nav-dropdown">
                                <NavDropdown.Item as={Link} to="/login">Employee</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item as={Link} to="/admin">ADMIN</NavDropdown.Item>
                            </NavDropdown>
                        ) : (
                            <Nav.Link onClick={handleLogout} style={{ cursor: "pointer" }}>
                                <FontAwesomeIcon icon={faPowerOff} /> Logout
                            </Nav.Link>
                        )}
                    </Nav>
                    <Nav>
                        <Nav.Link as={Link} to="/contact" active>Contact us</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </>
    );
}

export default Header;
