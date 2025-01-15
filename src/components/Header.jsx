import { faEmpire } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect } from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import AOS from 'aos'
import "aos/dist/aos.css";

function Header() {

       useEffect(() => {
            AOS.init({
              disable: "phone",
              duration: 700,
              easing: "ease-out-cubic",
            });
          }, []);
    return (
        <>
            <Navbar bg="dark" data-bs-theme="dark" fixed='top' style={{ height: "70px" }}>
                <Container>
                    <Link to={'/'} style={{ textDecoration: "none" }} className='d-flex'> <Navbar.Brand href=""><h4 data-aos="flip-left"
                        data-aos-easing="ease-out-cubic"
                        data-aos-duration="2000" ><FontAwesomeIcon icon={faEmpire} className='mx-1' /> Forverse</h4></Navbar.Brand></Link>
                    <Nav className="">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/products">Products</Nav.Link>
                        <Nav.Link href="/login">Login</Nav.Link>

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
