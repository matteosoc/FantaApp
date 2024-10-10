import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { postPlayer } from "../data/fetch"; // Funzione che fa la POST dei giocatori
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const CreatePlayersPage = () => {
    const { leagueId } = useParams(); // Otteniamo il leagueId dai parametri dell'URL
    const { token, userInfo } = useContext(AuthContext);

    const [players, setPlayers] = useState([{ name: "", value: 0, league: leagueId }]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Gestisce i cambiamenti nei campi del giocatore
    const handlePlayerChange = (index, e) => {
        const newPlayers = [...players];
        newPlayers[index][e.target.name] = e.target.value;
        setPlayers(newPlayers);
        console.log(newPlayers);
    };

    // Aggiunge un nuovo giocatore alla lista
    const addNewPlayer = () => {
        setPlayers([...players, { name: "", value: 0, league: leagueId }]);
    };

    // Gestisce l'invio dei dati al backend
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Invio dei giocatori uno per uno
            for (const player of players) {
                console.log("handle sumbit player:" + player)

                const response = await postPlayer(token, player);

                if (response.error) {
                    setError(response.error);
                    return;
                }
            }

            // Redirect or success message after creation
            if (window.confirm('Giocatori creati, passa alla creazione dei bonusmalus')) {
                // console.log(leagueId);
                // Una volta terminata l'aggiunta dei giocatori, reindirizza alla pagina per inserire i bonus/malus
                navigate(`/create-bonus-malus/${leagueId}`);
            };

        } catch (error) {
            console.log(error)
            setError("Errore durante l'invio dei giocatori");
        }
    };

    return (
        <div>
            <h1>Inserisci Giocatori per la Lega: {leagueId}</h1>
            <form>
                {players.map((player, index) => (
                    <div key={index}>
                        <input
                            type="text"
                            name="name"
                            value={player.name}
                            placeholder="Nome giocatore"
                            onChange={(e) => handlePlayerChange(index, e)}
                        />
                        <input
                            type="number"
                            name="value"
                            value={player.value}
                            placeholder="Valore"
                            onChange={(e) => handlePlayerChange(index, e)}
                        />
                    </div>
                ))}
                <button type="button" onClick={addNewPlayer}>
                    Aggiungi un altro giocatore
                </button>
                <button onClick={handleSubmit}>Salva Giocatori e Continua</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    );
};

export default CreatePlayersPage;