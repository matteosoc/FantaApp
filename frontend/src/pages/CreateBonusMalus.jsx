import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { postBonusMalus } from "../data/fetch"; // Funzione che fa la POST dei bonus e malus
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Container, Form, Button, Row, Col, Alert } from 'react-bootstrap';
import LeftArrow from '../components/LeftArrow';

const CreateBonusMalus = () => {
    const { leagueId } = useParams(); // Otteniamo il leagueId dai parametri dell'URL
    const { token } = useContext(AuthContext);

    const [allBonusMalus, setAllBonusMalus] = useState([{ name: "", value: 0, league: leagueId }]);
    const [allImages, setAllImages] = useState([null]); // Stato per le immagini
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Gestisce i cambiamenti nei campi del giocatore
    const handleBonusMalusChange = (index, e) => {
        const newBonusMalus = [...allBonusMalus];
        newBonusMalus[index][e.target.name] = e.target.value;
        setAllBonusMalus(newBonusMalus);
    };

    // Gestisce il caricamento dell'immagine
    const handleImageChange = (index, e) => {
        const newImages = [...allImages];
        newImages[index] = e.target.files[0];
        setAllImages(newImages);
    };

    // Aggiunge un nuovo bonus/malus alla lista
    const addNewBonusMalus = () => {
        setAllBonusMalus([...allBonusMalus, { name: "", value: 0, league: leagueId }]);
        setAllImages([...allImages, null]); // Aggiunge uno spazio per la nuova immagine
    };

    // Gestisce l'invio dei dati al backend
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            for (let i = 0; i < allBonusMalus.length; i++) {
                const formData = new FormData();
                formData.append("name", allBonusMalus[i].name);
                formData.append("value", allBonusMalus[i].value);
                formData.append("league", allBonusMalus[i].league);
                if (allImages[i]) {
                    formData.append("icon", allImages[i]); // Aggiunge il file immagine se esiste
                }

                const response = await postBonusMalus(token, formData); // Modifica la funzione postBonusMalus per accettare FormData

                if (response.error) {
                    setError(response.error);
                    return;
                }
            }

            if (window.confirm('Bonus/Malus creati, torna alla dashboard')) {
                navigate(`/dashboard`);
            }

        } catch (error) {
            setError("Errore durante l'invio dei bonus/malus");
        }
    };

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col md={6}>
                    <LeftArrow />
                    <h1 className="mb-2">Crea Bonus e Malus</h1>
                    <Form onSubmit={handleSubmit} className="p-3">
                        {allBonusMalus.map((bonusMalus, index) => (
                            <Row key={index} className="mb-2">
                                <Form.Group className="mb-2" controlId={`bonusMalusName-${index}`}>
                                    <Form.Label>{index+1}. Nome Bonus/Malus</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="name"
                                        value={bonusMalus.name}
                                        placeholder="Nome Bonus/Malus"
                                        onChange={(e) => handleBonusMalusChange(index, e)}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group className="mb-2" controlId={`bonusMalusValue-${index}`}>
                                    <Form.Label>Valore</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="value"
                                        value={bonusMalus.value}
                                        placeholder="Valore"
                                        onChange={(e) => handleBonusMalusChange(index, e)}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group className="mb-4" controlId={`bonusMalusImage-${index}`}>
                                    <Form.Label>Immagine Bonus/Malus</Form.Label>
                                    <Form.Control
                                        name="icon"
                                        type="file"
                                        onChange={(e) => handleImageChange(index, e)}
                                    />
                                </Form.Group>
                                <hr></hr>
                            </Row>
                        ))}
                        <Button variant="light" type="button" onClick={addNewBonusMalus} className="mb-2 w-100">
                            Aggiungi un altro bonus/malus
                        </Button>
                        <Button variant="dark" type="submit" className="w-100">
                            Salva e termina creazione
                        </Button>
                    </Form>
                    {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
                </Col>
            </Row>
        </Container>
    );
};

export default CreateBonusMalus;