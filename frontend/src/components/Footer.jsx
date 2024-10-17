import Nav from 'react-bootstrap/Nav';
import '../App.css';


function Footer() {
    return (
        <>
            <Nav className="justify-content-center bg-body-tertiary" fixed="bottom">
                <Nav.Item>
                    <p className="text-center my-1"><small>
                        © Progetto realizzato da Matteo Soccal
                        </small></p>
                </Nav.Item>
            </Nav>
        </>
    );
}

export default Footer;