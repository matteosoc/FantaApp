// Base URL dell'API
const BASE_URL = "http://localhost:5000/api/v1";

// Funzione per il login
export const login = async (loginFormValue) => {
    try {
        console.log("inizio fetch login");

        const res = await fetch(`${BASE_URL}/auth/login`, {
            headers: {
                "Content-Type": "application/json",
            },
            method: 'POST',
            body: JSON.stringify(loginFormValue)
        });

        if (res.ok) {
            const data = await res.json();
            console.log("fine fetch login");
            return data;
        } else {
            const errorData = await res.json();
            return { error: errorData.message || 'Errore di login' };
        }

    } catch (error) {
        return { error: 'Errore nel login' };
    }
};

// Funzione per la registrazione
export const register = async (registerFormValue) => {
    try {
        console.log("inizio fetch registrazione");
        console.log(registerFormValue)

        const res = await fetch(`${BASE_URL}/auth/register`, {
            headers: {
                "Content-Type": "application/json",
            },
            method: 'POST',
            body: JSON.stringify(registerFormValue)
        });

        if (res.ok) {
            const data = await res.json();
            console.log("fine fetch registrazione");
            return data;
        } else {
            const errorData = await res.json();
            return { error: errorData.message || 'Errore di registrazione' };
        }

    } catch (error) {
        return { error: 'Errore nella registrazione' };
    }
};

// Funzione per ottenere i dati dell'utente autenticato (me)
export const me = async (token) => {
    try {
        console.log("inizio fetch me");

        const res = await fetch(`${BASE_URL}/auth/me`, {
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });

        if (res.ok) {
            const data = await res.json();
            console.log("fine fetch me");
            return data;
        } else {
            const errorData = await res.json();
            return { error: errorData.message || 'Errore nel recupero dati utente' };
        }

    } catch (error) {
        return { error: 'Errore nel recupero dati utente' };
    }
};

// Funzione per ottenere le leghe
export const getMyLeagues = async (token) => {
    try {
        console.log("inizio fetch leghe dell'utente");

        const res = await fetch(`${BASE_URL}/leagues/my-leagues/`, {
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });
        console.log("fine fetch leghe dell'utente");


        if (res.ok) {
            const data = await res.json();
            console.log(data);

            console.log("fine fetch leghe");
            return data;
        } else {
            const errorData = await res.json();
            return { error: errorData.message || 'Errore nel recupero delle leghe' };
        }

    } catch (error) {
        return { error: 'Errore nel recupero delle leghe' };
    }
};

// Funzione per creare una nuova lega
export const createLeague = async (leagueFormValue, token) => {

    console.log(leagueFormValue);
    console.log(token);


    try {
        console.log("inizio fetch creazione lega");

        const res = await fetch(`${BASE_URL}/leagues`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            method: 'POST',
            body: JSON.stringify(leagueFormValue)
        });

        console.log("dopo la fetch");

        const data = await res.json()

        return data;

    } catch (error) {
        return { error: 'Errore nella creazione della lega' };
    }
};

// crea giocatore e aggiunge a una lega
export const postPlayer = async (token, playerForm) => {
    try {
        console.log("Dentro fetch AddPlayers")

        console.log(token)
        console.log(playerForm)

        const res = await fetch(`${BASE_URL}/players/`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            method: 'POST',
            body: JSON.stringify(playerForm),
        });

        if (res.ok) {
            console.log("Res.Ok postPlayer")
            const responseData = await res.json();
            return responseData;
        } else {
            const errorData = await res.json();
            return { error: errorData.message || 'Errore nell\'aggiunta dei giocatori o dei bonus/malus' };
        }
    } catch (error) {
        return { error: 'Errore nell\'aggiunta dei giocatori o dei bonus/malus' };
    }
};

// aggiungi giocatore a una lega
export const postBonusMalus = async (token, bonusMalusForm) => {
    try {
        console.log("Dentro fetch post BonusMalus")

        console.log(token)
        console.log(bonusMalusForm)

        const res = await fetch(`${BASE_URL}/bonus_malus/`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            method: 'POST',
            body: JSON.stringify(bonusMalusForm),
        });

        if (res.ok) {
            console.log("Res.Ok post bonus malus")
            const responseData = await res.json();
            return responseData;
        } else {
            const errorData = await res.json();
            return { error: errorData.message || 'Errore nell\'aggiunta dei giocatori o dei bonus/malus' };
        }
    } catch (error) {
        console.log(error)
        return { error: 'Errore nell\'aggiunta dei giocatori o dei bonus/malus' };
    }
};

// Funzione per partecipare a una lega
export const joinLeague = async (leagueForm, token) => {
    try {
        console.log("inizio fetch join lega");

        const response = await fetch(`${BASE_URL}/leagues/join`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(leagueForm)
        });

        // Controlla se la risposta è ok
        console.log('Raw response:', response);  // Log della risposta grezza

        // Leggi il body solo una volta
        if (!response.ok) {
            throw new Error(`Errore HTTP! status: ${response.status}`);
        }

        const data = await response.json();  // Qui leggi il JSON dalla risposta
        console.log('Response data:', data);

        return data; // Restituisci i dati della risposta


    } catch (error) {
        console.error('Errore durante l\'iscrizione alla lega:', error);
        throw error;
    }
};

// Funzione per creare una squadra in una lega
export const createTeam = async (leagueId, newTeam, token) => {
    try {
        console.log("inizio fetch creazione squadra");

        const res = await fetch(`${BASE_URL}/leagues/${leagueId}/create-team`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            method: 'POST',
            body: JSON.stringify(newTeam)
        });

        if (res.ok) {
            const data = await res.json();
            console.log("fine fetch creazione squadra");
            return data;
        } else {
            const errorData = await res.json();
            return { error: errorData.message || 'Errore nella creazione della squadra' };
        }

    } catch (error) {
        return { error: 'Errore nella creazione della squadra' };
    }
};

// Funzione per creare una squadra in una lega
export const getLeagueDetails = async (leagueId, token) => {
    try {
        console.log("prima della fetch getLeagueDetails")

        console.log("leagueId" + leagueId)
        console.log("token" + token)


        const response = await fetch(`${BASE_URL}/leagues/my-leagues/${leagueId}/`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        // Verifica se la risposta è valida
        if (!response.ok) {
            throw new Error('Errore nella fetch dei dettagli della lega');
        }

        // Assicurati di leggere il corpo della risposta una sola volta
        const leagueData = await response.json();
        console.log("dopo la fetch getLeagueDetails", leagueData);

        return leagueData;  // Restituisci i dati della lega

    } catch (error) {
        console.log(error)
    }
};

export const getTeamDetails = async (teamId, token) => {

    console.log("prima della fetch getTeamDetails")

        console.log("teamdId" + teamId)
        console.log("token" + token)

    try {
        const response = await fetch(`${BASE_URL}/teams/my-teams/${teamId}`, {
            headers: {
                'Authorization': `Bearer ${token}` // Aggiungi il token se richiesto
            }
        });
        // Verifica se la risposta è valida
        if (!response.ok) {
            throw new Error('Errore nella fetch dei dettagli della lega');
        }

        // Assicurati di leggere il corpo della risposta una sola volta
        const teamData = await response.json();
        console.log("dopo la fetch getTeamDetails", teamData);

        return teamData;  // Restituisci i dati della squadra

    } catch (error) {
        console.error(error);
        throw error;
    }
};

// Funzione per ottenere i giocatori di una lega
export const getPlayersInLeague = async (leagueId, token) => {
    try {
        console.log("inizio fetch giocatori nella lega");

        const res = await fetch(`${BASE_URL}/players?league=${leagueId}`, {
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });

        if (res.ok) {
            const data = await res.json();
            console.log("fine fetch giocatori nella lega");
            return data;
        } else {
            const errorData = await res.json();
            return { error: errorData.message || 'Errore nel recupero dei giocatori' };
        }

    } catch (error) {
        return { error: 'Errore nel recupero dei giocatori' };
    }
};

// Funzione per assegnare bonus/malus a un player
export const assignBonusMalus = async (playerId, bonusMalusId, token) => {
    try {
        console.log("inizio fetch assegnazione bonus/malus");

        const res = await fetch(`${BASE_URL}/players/${playerId}/bonusMalus`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            method: 'PUT',
            body: JSON.stringify({ bonusMalusId })
        });

        if (res.ok) {
            const data = await res.json();
            console.log("fine fetch assegnazione bonus/malus");
            return data;
        } else {
            const errorData = await res.json();
            return { error: errorData.message || 'Errore nell\'assegnazione del bonus/malus' };
        }

    } catch (error) {
        return { error: 'Errore nell\'assegnazione del bonus/malus' };
    }
};

// Funzione per visualizzare la classifica di una lega
export const getLeagueLeaderboard = async (leagueId, token) => {
    try {
        console.log("inizio fetch classifica lega");

        const res = await fetch(`${BASE_URL}/leagues/leaderboard/${leagueId}`, {
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });

        if (res.ok) {
            const data = await res.json();
            console.log("fine fetch classifica lega");
            return data;
        } else {
            const errorData = await res.json();
            return { error: errorData.message || 'Errore nel recupero della classifica' };
        }

    } catch (error) {
        return { error: 'Errore nel recupero della classifica' };
    }
};

// funzione per caricare i bonus e malus di una lega
export const getBonusMalus = async (leagueId, token) => {
    try {
        console.log("inizio fetch getBonusMalus");

        const res = await fetch(`${BASE_URL}/leagues/my-leagues/${leagueId}/bonus-malus`, {
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });
        console.log("dopo fetch getBonusMalus");

        if (res.ok) {
            const data = await res.json();

            console.log("fine fetch getBonusMalus ecco i dati: " + data);
            return data.bonusMalus;

        } else {
            const errorData = await res.json();
            return { error: errorData.message || 'Errore nel recupero' };
        }

    } catch (error) {
        return { error: 'Errore nel recupero delle leghe' };
    }
};

// Funzione per applicare il bonus/malus al giocatore
export const applyBonusToPlayer = async (playerId, token, bonusId) => {
    try {
        console.log("prima della fetch bonusId: " + bonusId)
        console.log("prima della fetch token: " + token)
        console.log(JSON.stringify({ bonusId })); // Controlla il contenuto del body della richiesta


        const response = await fetch(`${BASE_URL}/players/${playerId}/apply-bonus`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ bonusId })
        });
        console.log("dopo fetch applyBonusToPlayer")

        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            const error = await response.json();
            throw new Error(error.message);
        }
    } catch (err) {
        console.log(err)
    }
};

export const getMyTeams = async (token) => {
    try {
        console.log("inizio fetch getMyTeams");

        const res = await fetch(`${BASE_URL}/teams/my-teams/`, {
            headers: {
                "Authorization": `Bearer ${token}`
            },
        });
        console.log("fine fetch leghe dell'utente");

        console.log("Raw response:", res); // Aggiungi questo per visualizzare la risposta grezza

        // Controlla se `res` è effettivamente in formato JSON
        const text = await res.text();
        console.log("Response text:", text); // Log del testo della risposta

        // Prova a fare il parsing del JSON solo se possibile
        const data = JSON.parse(text);

        if (res.ok) {
            console.log(data);
            return data;
        } else {
            return { error: data.message || 'Errore nel recupero delle squadre' };
        }
    } catch (error) {
        console.log(error)
        return { error: 'Errore nel recupero delle leghe' };
    }
} 

export const getPlayer = async (playerId, token) => {
    console.log("playerId", playerId)
    console.log("token", token)


    try {
        console.log("inizio fetch getPlayer");

        const res = await fetch(`${BASE_URL}/players/${playerId}/`, {
            headers: {
                "Authorization": `Bearer ${token}`
            },
        });
        console.log("fine fetch getPlayer");

        // Prova a fare il parsing del JSON solo se possibile
        const data = res.json();

        if (res.ok) {
            console.log(data);
            return data;
        } else {
            return { error: data.message || 'Errore nel recupero del player' };
        }
    } catch (error) {
        console.log(error)
        return { error: 'Errore nel recupero del player' };
    }
}