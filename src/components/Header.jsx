import { faEmpire } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import AOS from 'aos'
import "aos/dist/aos.css";
import { faPowerOff } from '@fortawesome/free-solid-svg-icons'

function Header() {
    const [islogin, setIsLogin] = useState(false)
    useEffect(() => {
        AOS.init({
            disable: "phone",
            duration: 700,
            easing: "ease-out-cubic",
        });
    }, []);

    useEffect(() => {
        if (sessionStorage.getItem('token')) {
            setIsLogin(true)
        } else {
            setIsLogin(false)
        }
    },[islogin])
    return (
        <>
            <Navbar bg="dark" data-bs-theme="dark" fixed='top' style={{ height: "70px" }}>
                <Container>
                    <Link to={'/'} style={{ textDecoration: "none" }} className='d-flex'> <Navbar.Brand href=""><h4 data-aos="flip-left"
                        data-aos-easing="ease-out-cubic"
                        data-aos-duration="2000" ><FontAwesomeIcon icon={faEmpire} className='logo mx-1' id='' /> Forverse</h4></Navbar.Brand></Link>
                    <Nav className="">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/products">Products</Nav.Link>

                        {islogin == false ?
                            <NavDropdown title="login" id="basic-nav-dropdown">
                                <NavDropdown.Item ><Link to={'/login'} className='text-dark' style={{ textDecoration: "none" }}>Employee</Link></NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item>
                                    <Link to={'/admin'} className='text-dark' style={{ textDecoration: "none" }}>ADMIN</Link>
                                </NavDropdown.Item>
                            </NavDropdown>
                            :
                            <Nav.Link href="/"><FontAwesomeIcon icon={faPowerOff} /> Logout</Nav.Link>}

                    </Nav>
                    <Nav>

                        <Nav.Link href="/contact" active>Contact us</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </>
    )
}

export default Header 