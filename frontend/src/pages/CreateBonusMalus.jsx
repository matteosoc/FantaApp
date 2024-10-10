import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { postBonusMalus, postPlayer } from "../data/fetch"; // Funzione che fa la POST dei bonus e malus
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const CreateBonusMalus = () => {
    const { leagueId } = useParams(); // Otteniamo il leagueId dai parametri dell'URL
    const { token, userInfo } = useContext(AuthContext);

    const [allBonusMalus, setAllBonusMalus] = useState([{ name: "", value: 0, league: leagueId }]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Gestisce i cambiamenti nei campi del giocatore
    const handleBonusMalusChange = (index, e) => {
        const newBonusMalus = [...allBonusMalus];
        newBonusMalus[index][e.target.name] = e.target.value;
        setAllBonusMalus(newBonusMalus);
        console.log(newBonusMalus);
    };

    // Aggiunge un nuovo giocatore alla lista
    const addNewBonusMalus = () => {
        setAllBonusMalus([...allBonusMalus, { name: "", value: 0, league: leagueId }]);
    };

    // Gestisce l'invio dei dati al backend
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Invio dei giocatori uno per uno
            for (const oneBonusMalus of allBonusMalus) {
                console.log("handle sumbit bonus/malus:" + oneBonusMalus)

                const response = await postBonusMalus(token, oneBonusMalus);

                if (response.error) {
                    setError(response.error);
                    return;
                }
            }

            // Redirect or success message after creation
            if (window.confirm('Bonus/Malus creati, torna alla dashboard')) {
                // console.log(leagueId);
                // Una volta terminata l'aggiunta dei giocatori, reindirizza alla pagina per inserire i bonus/malus
                navigate(`/dashboard`);
            };

        } catch (error) {
            console.log(error)
            setError("Errore durante l'invio dei giocatori");
        }
    };

    return (
        <div>
            <h1>Inserisci Bonus e Malus per la Lega: {leagueId}</h1>
            <form>
                {allBonusMalus.map((bonusMalus, index) => (
                    <div key={index}>
                        <input
                            type="text"
                            name="name"
                            value={bonusMalus.name}
                            placeholder="Nome Bonus/Malus"
                            onChange={(e) => handleBonusMalusChange(index, e)}
                        />
                        <input
                            type="number"
                            name="value"
                            value={bonusMalus.value}
                            placeholder="Valore"
                            onChange={(e) => handleBonusMalusChange(index, e)}
                        />
                    </div>
                ))}
                <button type="button" onClick={addNewBonusMalus}>
                    Aggiungi un altro bonus/malus
                </button>
                <button onClick={handleSubmit}>Salva la lega</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    );
};

export default CreateBonusMalus;