import { useState } from "react";
import { register } from "../data/fetch"; // Assumendo che tu abbia una fetch per la registrazione
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Alert, Row, Col } from 'react-bootstrap';
import LeftArrow from '../components/LeftArrow';


export default function Register() {
  const navigate = useNavigate();

  const [registerForm, setRegisterForm] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    roles: "teamOwner" // Default: teamOwner
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setRegisterForm({
      ...registerForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    const response = await register(registerForm); // Funzione fetch per registrazione
    if (response.error) {
      setErrorMessage(response.error);
    } else {
      navigate("/login");
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={6}>
          <LeftArrow />
          <h2 className="text-center">Registrati</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Inserisci il tuo nome"
                value={registerForm.name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="surname">
              <Form.Label>Cognome</Form.Label>
              <Form.Control
                type="text"
                name="surname"
                placeholder="Inserisci il tuo cognome"
                value={registerForm.surname}
                onChange={handleChange}
                required
              />
            </Form.Group>



            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Inserisci la tua email"
                value={registerForm.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Inserisci la password"
                value={registerForm.password}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="role">
              <Form.Label>Ruolo</Form.Label>
              <Form.Select
                name="roles"
                value={registerForm.roles}
                onChange={handleChange}
                required
              >
                <option value="teamOwner">User</option>
                <option value="admin">Admin</option>
              </Form.Select>
            </Form.Group>

            {errorMessage && (
              <Alert variant="danger">
                {errorMessage}
              </Alert>
            )}

            <Button variant="primary" className="w-100" onClick={handleSubmit}>
              Registrati
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
