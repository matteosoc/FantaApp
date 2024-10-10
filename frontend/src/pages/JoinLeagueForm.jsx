import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const JoinLeagueForm = ({ onJoinLeague }) => {
    const [leagueName, setLeagueName] = useState('');
    const [leaguePassword, setLeaguePassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onJoinLeague(leagueName, leaguePassword);
    };

    return (
        <div>
            <h3>Iscriviti a una Lega</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Nome Lega</Form.Label>
                    <Form.Control 
                        type="text" 
                        value={leagueName} 
                        onChange={(e) => setLeagueName(e.target.value)} 
                        placeholder="Inserisci il nome della lega" 
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Password Lega</Form.Label>
                    <Form.Control 
                        type="password" 
                        value={leaguePassword} 
                        onChange={(e) => setLeaguePassword(e.target.value)} 
                        placeholder="Inserisci la password della lega" 
                    />
                </Form.Group>

                <Button type="submit" variant="primary">Iscriviti</Button>
            </Form>
        </div>
    );
};

export default JoinLeagueForm;