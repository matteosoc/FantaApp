import Nav from 'react-bootstrap/Nav';
import { Button, Container, Navbar } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext, useState } from "react";

import '../App.css';



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
                <Navbar.Brand as={Link} to="/">
                    <h4>FantaApp</h4>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        {token &&
                            <Nav.Link as={Link} to="/dashboard">
                                <Button variant="none">
                                    Dashboard
                                </Button>
                            </Nav.Link>}
                    </Nav>
                    <Nav>
                        <Nav.Link>
                            <Button variant="outline-secondary">
                                Invita un amico
                            </Button>
                        </Nav.Link>
                        <Nav.Link as={Link} to="/help">
                            <Button variant="link">
                                Help
                            </Button>
                        </Nav.Link>
                        {token &&
                            <Nav.Link>
                                <Button variant="primary" onClick={handleLogout}>
                                    Logout
                                </Button>
                            </Nav.Link>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
};

export default Header;