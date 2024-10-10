import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { getBonusMalus } from '../data/fetch';


// Funzione per applicare il bonus/malus al giocatore
const applyBonusToPlayer = async (playerId, bonusId) => {
    const response = await fetch(`/players/${playerId}/apply-bonus`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ bonusId }),
    });

    if (response.ok) {
        const data = await response.json();
        return data;
    } else {
        const error = await response.json();
        throw new Error(error.message);
    }
};

const ApplyBonusPage = () => {
    const { playerId } = useParams(); // Recupera playerId dai parametri URL
    const { token } = useContext(AuthContext);

    const navigate = useNavigate(); // Per navigare a altre pagine
    const [bonuses, setBonuses] = useState([]); // Stato per i bonus/malus
    const [selectedBonus, setSelectedBonus] = useState(''); // Stato per il bonus selezionato

    // Effettua il fetch dei bonus/malus all'inizializzazione del componente
    useEffect(() => {
        const loadBonusMalus = async () => {
            const loadedBonuses = await getBonusMalus(token);
            setBonuses(loadedBonuses);
        };

        loadBonusMalus();
    }, []);

    // Gestisce l'applicazione del bonus/malus al giocatore
    const handleBonusApplication = async () => {
        try {
            await applyBonusToPlayer(playerId, selectedBonus);
            alert('Bonus/Malus applicato con successo!');
            navigate(-1); // Torna indietro alla schermata precedente
        } catch (error) {
            alert(`Errore nell'applicazione del Bonus/Malus: ${error.message}`);
        }
    };

    return (
        <div>
            <h2>Applica Bonus/Malus al Giocatore: {playerId} </h2>

            {/* Dropdown per selezionare un bonus/malus */}
            <label>Seleziona Bonus/Malus:</label>
            <select value={selectedBonus} onChange={(e) => setSelectedBonus(e.target.value)}>
                <option value="">-- Seleziona un Bonus/Malus --</option>
                {bonuses.map((bonus) => (
                    <option key={bonus._id} value={bonus._id}>
                        {bonus.name} ({bonus.value > 0 ? `+${bonus.value}` : bonus.value})
                    </option>
                ))}
            </select>

            {/* Bottone per applicare il bonus/malus */}
            <button onClick={handleBonusApplication} disabled={!selectedBonus}>
                Applica Bonus/Malus
            </button>
        </div>
    );
};

export default ApplyBonusPage;