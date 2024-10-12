import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Button, Container, Navbar } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext, useState } from "react";




function Header() {
    const { token, setToken } = useContext(AuthContext);
    const navigate = useNavigate()

    const handleLogout = () => {
        setToken(null)
        localStorage.removeItem('token')
        navigate('/')
    }

    return (
        <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand as={Link} to="/">FantaApp</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        { token && <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>}
                    </Nav>
                    <Nav>
                        <Nav.Link href="#deets">More deets</Nav.Link>
                        {token && <Button className="ms-2 me-2" variant="primary" onClick={handleLogout}>
                            Logout
                        </Button>}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
};

export default Header;