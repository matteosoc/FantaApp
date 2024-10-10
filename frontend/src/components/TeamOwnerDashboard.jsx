import React, { useState, useEffect } from 'react';
import { joinLeague, createTeam, getMyLeagues } from '../data/fetch';
import JoinLeagueForm from '../pages/JoinLeagueForm';
import CreateTeamForm from './CreateTeamForm';
import LeagueList from './LeagueList';

const TeamOwnerDashboard = () => {
    const [players, setPlayers] = useState([]);
    const [budget, setBudget] = useState(100); // Budget iniziale
    const [myLeagues, setMyLeagues] = useState([]);
    const [isJoined, setIsJoined] = useState(false); // Flag per verificare se l'utente è iscritto alla lega

    // Effettua il fetch delle leghe in cui è iscritto il teamOwner
    useEffect(() => {
        const fetchLeagues = async () => {
            const leagues = await getMyLeagues();
            setMyLeagues(leagues);
        };
        fetchLeagues();
    }, []);

    // Funzione per iscriversi a una lega
    const handleJoinLeague = async (leagueName, leaguePassword) => {
        const res = await joinLeague({ leagueName, leaguePassword });
        if (res.success) {
            alert('Iscritto alla lega con successo!');
            setPlayers(res.players); // Popola la lista dei giocatori della lega
            setIsJoined(true); // Imposta il flag a true per visualizzare CreateTeamForm
        } else {
            alert(res.error || 'Errore nell\'iscrizione alla lega');
        }
    };

    // Funzione per aggiornare il budget quando si seleziona un giocatore
    const handleSelectPlayer = (player) => {
        setBudget(budget - player.value);
    };

    // Funzione per creare la squadra
    const handleCreateTeam = async (teamName, selectedPlayers) => {
        const res = await createTeam({ teamName, players: selectedPlayers });
        if (res.success) {
            alert('Squadra creata con successo!');
        } else {
            alert(res.error || 'Errore nella creazione della squadra');
        }
    };

    return (
        <div>
            {/* Mostra il form di iscrizione alla lega */}
            {!isJoined && (
                <JoinLeagueForm onJoinLeague={handleJoinLeague} />
            )}

            {/* Mostra il form per la creazione della squadra solo se iscritto */}
            {isJoined && players.length > 0 && (
                <CreateTeamForm
                    players={players}
                    budget={budget}
                    onSelectPlayer={handleSelectPlayer}
                    onCreateTeam={handleCreateTeam}
                />
            )}

            {/* Mostra la lista delle leghe e la classifica */}
            <LeagueList leagues={myLeagues} />
        </div>
    );
};

export default TeamOwnerDashboard;