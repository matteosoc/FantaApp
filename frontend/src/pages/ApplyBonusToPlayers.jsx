import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { getBonusMalus, applyBonusToPlayer } from '../data/fetch';


const ApplyBonusPage = () => {
    const { playerId } = useParams(); // Recupera playerId dai parametri URL
    const { token } = useContext(AuthContext);
    const location = useLocation();

    // Recupera il leagueId dallo state passato tramite navigate
    const leagueId = location.state?.leagueId;

    const navigate = useNavigate(); // Per navigare a altre pagine
    const [allBonusMalus, setBonuses] = useState([]); // Stato per i bonus/malus
    const [selectedBonus, setSelectedBonus] = useState(''); // Stato per il bonus selezionato

    // Effettua il fetch dei bonus/malus all'inizializzazione del componente
    useEffect(() => {
        if (!leagueId) {
            console.error('League ID non trovato!');
            return;
        }
        
        console.log(leagueId)

        const loadBonusMalus = async () => {
            const loadedBonuses = await getBonusMalus(leagueId, token);

            console.log("loadedBonuses:" + JSON.stringify(loadedBonuses))

            setBonuses(loadedBonuses);
        };

        loadBonusMalus();
    }, []);

    // Gestisce l'applicazione del bonus/malus al giocatore
    const handleBonusApplication = async () => {
        try {
            const applyBonusMalus = await applyBonusToPlayer(playerId, token, selectedBonus);
            alert('Bonus/Malus applicato con successo!');
            console.log(applyBonusMalus)
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
                {allBonusMalus.map((bonus) => (
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