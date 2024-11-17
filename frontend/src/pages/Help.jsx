import React from 'react';
import { Container, Row, Col, Card, Accordion, ListGroup } from 'react-bootstrap';



const Help = () => {
    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col md={8}>
                    <h2 className="text-center mb-4">Guida al Gioco</h2>

                    <div className="mb-3 p-4 myCard">
                        <div className='mb-2'>
                            <h5>Come Partecipare al Gioco</h5>
                        </div>
                        <div>
                            <ListGroup variant="flush">
                                <ListGroup.Item>1. Registrati e fai il login.</ListGroup.Item>
                                <ListGroup.Item>2. Crea o unisciti a una lega.</ListGroup.Item>
                                <ListGroup.Item>3. Crea la tua squadra scegliendo i giocatori.</ListGroup.Item>
                                <ListGroup.Item>4. Osserva i punteggi e la classifica della tua lega.</ListGroup.Item>
                                <ListGroup.Item>5. Alla fine di ogni giornata, verifica i bonus/malus assegnati.</ListGroup.Item>
                            </ListGroup>
                        </div>
                    </div>

                    <div className="mb-4 p-4 myCard">
                        <div className='mb-3'>
                            <h5>Creazione della Lega</h5>
                        </div>
                        <div>
                            <Accordion>
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header>Requisiti per Creare una Lega</Accordion.Header>
                                    <Accordion.Body>
                                        Come admin, puoi creare una lega impostando:
                                        <ul>
                                            <li>Nome della lega</li>
                                            <li>Password</li>
                                            <li>Numero di partecipanti</li>
                                        </ul>
                                        Dopo la creazione, potrai aggiungere i giocatori e i bonus/malus.
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="1">
                                    <Accordion.Header>Gestione della Lega</Accordion.Header>
                                    <Accordion.Body>
                                        Una volta creata la lega, puoi:
                                        <ul>
                                            <li>Aggiungere o modificare i giocatori.</li>
                                            <li>Assegnare i bonus e malus ai giocatori.</li>
                                            <li>Terminare la giornata e decretare un vincitore.</li>
                                        </ul>
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        </div>
                    </div>

                    <div className="mb-4 p-4 myCard">
                        <div className='mb-3'>
                            <h5>Creazione della Squadra</h5>
                        </div>
                        <div>
                            <p>
                                Ogni giocatore ha un valore che incide sul budget della tua squadra. 
                                Rispetta il budget totale e seleziona i giocatori che ritieni più competitivi.
                            </p>
                            <p>
                                Una volta formata la tua squadra, potrai vedere i risultati alla fine di ogni giornata.
                            </p>
                        </div>
                    </div>

                    <div className="mb-4 p-4 myCard">
                        <div className='mb-3'>
                            <h5>Domande Frequenti</h5>
                        </div>
                        <div>
                            <Accordion>
                                <Accordion.Item eventKey="2">
                                    <Accordion.Header>Come faccio a iscrivermi a una lega?</Accordion.Header>
                                    <Accordion.Body>
                                        Per iscriverti a una lega, inserisci il nome della lega e la password fornita dall'admin. 
                                        Successivamente, potrai creare la tua squadra e competere con gli altri partecipanti.
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="3">
                                    <Accordion.Header>Come vengono calcolati i punteggi?</Accordion.Header>
                                    <Accordion.Body>
                                        I punteggi vengono calcolati in base alle performance dei giocatori reali e ai bonus/malus 
                                        assegnati dall'admin. I punteggi vengono aggiornati alla fine di ogni giornata.
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="4">
                                    <Accordion.Header>Posso cambiare i giocatori della mia squadra?</Accordion.Header>
                                    <Accordion.Body>
                                        No, una volta creata la squadra, non è possibile modificarla. Tuttavia, puoi monitorare 
                                        le performance dei tuoi giocatori durante la competizione.
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Help;