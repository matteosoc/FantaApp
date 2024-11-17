import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';

const InviteModal = ({ show, handleClose, handleInvite }) => {
  const [email, setEmail] = useState('');

  const handleSubmit = () => {
    handleInvite(email);
    setEmail(''); // Resetta il campo email dopo l'invio
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Invita un amico</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formFriendEmail" className="mb-3">
            <Form.Label>Email del tuo amico</Form.Label>
            <Form.Control
              type="email"
              placeholder="Inserisci l'email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>
          <Button variant="dark" type="submit" onClick={handleSubmit}>
            Invia
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default InviteModal;