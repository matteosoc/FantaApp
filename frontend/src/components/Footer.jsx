import Nav from 'react-bootstrap/Nav';

function Footer() {
    return (
        <>
            <Nav className="justify-content-center bg-body-tertiary" fixed="bottom">
                <Nav.Item>
                    <p className="text-center mt-4 mb-4">
                        © Progetto interamente realizzato da Matteo Soccal
                    </p>
                </Nav.Item>
            </Nav>
        </>
    );
}

export default Footer;