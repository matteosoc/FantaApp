import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Stack, Image, Alert, Card, Col, Container, Row, ListGroup, Modal, Button } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';
import { getBonus, deleteBonus } from '../data/fetch'; // Funzioni per recuperare i dati
import { useNavigate } from 'react-router-dom';
import LeftArrow from '../components/LeftArrow';
import SpinnerComponent from '../components/spinner/Spinner';
import BonusCard from '../components/BonusCard';



const BonusDetails = () => {
    const { bonusId } = useParams();
    const { token } = useContext(AuthContext);
    const navigate = useNavigate();


    const [bonus, setBonus] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false); // Stato per il modal


    useEffect(() => {
        // Funzione per recuperare i dettagli del giocatore
        const fetchBonusDetails = async () => {
            try {
                const data = await getBonus(bonusId, token);
                console.log(data)
                setBonus(data);
            } catch (err) {
                setError('Errore nel recuperare i dettagli del giocatore');
            } finally {
                setLoading(false);
            }
        };
        fetchBonusDetails();
    }, [bonusId]);

    const handleDeleteBonus = async () => {
        const result = await deleteBonus(bonusId, token);
        if (!result.error) {
            // Operazione completata con successo
            alert('Bonus eliminato con successo.');
            navigate(-1); // Torna indietro di una pagina  
        } else {
            // Gestisci l'errore, ad esempio mostrando un messaggio all'utente
            alert(result.error);
        }
    };

    const confirmDelete = () => {
        handleDeleteBonus();
        setShowModal(false); // Chiudi il modal dopo la conferma
    };

    if (loading) {
        return <SpinnerComponent />;
    }

    if (error) {
        return (
            <Alert variant="danger">
                {error}
            </Alert>
        );
    }

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col md={6}>
                    <LeftArrow />
                    <BonusCard bonus={bonus} />
                    <Button className='w-100' variant="outline-dark" onClick={() => setShowModal(true)}>
                        Elimina bonus
                    </Button>

                    {/* Modal di conferma per l'eliminazione del bonus */}
                    <Modal show={showModal} onHide={() => setShowModal(false)}>
                        <Modal.Header closeButton>
                            <Modal.Title>Conferma Eliminazione</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            Sei sicuro di voler eliminare questo bonus? Questa azione non può essere annullata.
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="dark" onClick={() => setShowModal(false)}>
                                Annulla
                            </Button>
                            <Button variant="light" onClick={confirmDelete}>
                                Elimina
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </Col>
            </Row>
        </Container >
    );
};

export default BonusDetails;