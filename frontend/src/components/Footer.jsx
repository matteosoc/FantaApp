import Nav from 'react-bootstrap/Nav';
import { Button, Container, Navbar } from "react-bootstrap";

import '../App.css';


function Footer() {
    return (
        <>
            <Navbar bg="dark" data-bs-theme="dark" className="justify-content-center" fixed="bottom" >
                <Nav>
                    <Nav.Item>
                        <p className="text-center text-white my-1"><small>
                            © Progetto realizzato da Matteo Soccal
                        </small></p>
                    </Nav.Item>
                </Nav>
            </Navbar>
        </>
    );
}

export default Footer;