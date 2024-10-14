import Nav from 'react-bootstrap/Nav';
import '../App.css';


function Footer() {
    return (
        <>
            <Nav className="justify-content-center bg-body-tertiary" fixed="bottom">
                <Nav.Item>
                    <p className="text-center pt-4 pb-4">
                        © Progetto interamente realizzato da Matteo Soccal
                    </p>
                </Nav.Item>
            </Nav>
        </>
    );
}

export default Footer;