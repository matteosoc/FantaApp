import React, { Link, useState, useContext } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { login } from '../data/fetch'; // Importa la funzione login da fetch.js
import { AuthContext } from '../context/AuthContext'; // Context per gestire le autorizzazioni
import { useNavigate } from "react-router-dom";

import '../App.css';

const Login = () => {
  const navigate = useNavigate();
  const { token, setToken } = useContext(AuthContext);

  const [loginFormValue, setLoginFormValue] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);

  // Funzione per gestire il cambiamento di valore nel form
  const handleChange = (e) => {
    setLoginFormValue({ ...loginFormValue, [e.target.name]: e.target.value });
  };


  const handleLogin = async () => {
    try {
      const tokenObj = await login(loginFormValue) //così abbiamo il token da mettere nel localstorage

      if (tokenObj && tokenObj.token) { // controllo se tokenObj e token sono definiti
        localStorage.setItem('token', tokenObj.token) // il setitem accetta 2 parametri: la chiave con cui vuoi salvare e poi il valore
        setToken(tokenObj.token) //dentro token obj c'è la risposta completa dell'end point che è un oggetto e noi dobbiamo prendere solo la propiretà token

        navigate("/");

      } else {
        alert("Credenziali errate, riprova")
      }
    } catch (error) {
      console.log(error)
      alert(error + 'Errore, riporva più tardi')
    }
  }


  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h2 className="text-center mb-4">Login</h2>
          {error && <Alert variant="danger">{error}</Alert>}

          <Form>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Inserisci email"
                value={loginFormValue.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formPassword" className="mt-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Inserisci password"
                value={loginFormValue.password}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Button variant="primary" onClick={handleLogin} className="mt-4 w-100">
              Login
            </Button>
          </Form>

          <hr />

          <Button
            variant="primary"
            className="ms-2"
            onClick={() => {
              window.location.href = 'http://localhost:5000/api/v1/auth/login-google';
            }}
          >
            Login con Google
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;