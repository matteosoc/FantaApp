import Nav from 'react-bootstrap/Nav';
import { Button, Container, Navbar } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext, useState } from "react";

import '../App.css';
import { sendEmail } from '../data/fetch';
import InviteModal from '../components/InviteModal'



function Header() {
    const { token, setToken } = useContext(AuthContext);
    const navigate = useNavigate()
    const [showInviteModal, setShowInviteModal] = useState(false);

    const handleInvite = async (email) => {
        try {
            // Effettua una chiamata al backend per inviare l'invito
            const response = await sendEmail(email)

            // Verifica che la risposta abbia un corpo
            if (!response.ok) {
                const errorText = await response.text();
                console.error('Errore nella richiesta:', errorText);
                alert('Errore durante l\'invio dell\'invito: ' + errorText);
                return;
            }

            const data = await response.json();
            alert('Invito inviato con successo!');
            
        } catch (error) {
            console.log(error)
            alert('Si è verificato un errore durante l\'invio dell\'invito.');
        } finally {
            setShowInviteModal(false);
        }
    };


    const handleLogout = () => {
        setToken(null)
        localStorage.removeItem('token')
        navigate('/')
    }

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" data-bs-theme="dark">
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
                            <Button variant="light" onClick={() => setShowInviteModal(true)}>
                                Invita un amico
                            </Button>
                            <InviteModal
                                show={showInviteModal}
                                handleClose={() => setShowInviteModal(false)}
                                handleInvite={handleInvite}
                            />
                        </Nav.Link>
                        <Nav.Link as={Link} to="/help">
                            <Button variant="none">
                                Help
                            </Button>
                        </Nav.Link>
                        {token &&
                            <Nav.Link>
                                <Button variant="none" onClick={handleLogout}>
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