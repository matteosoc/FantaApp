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
                "Authorization": `Bearer ${token}`,
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
export const joinLeague = async (leagueId, password, token) => {
    try {
        console.log("inizio fetch join lega");

        const res = await fetch(`${BASE_URL}/leagues/${leagueId}/join`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            method: 'POST',
            body: JSON.stringify({ password })
        });

        if (res.ok) {
            const data = await res.json();
            console.log("fine fetch join lega");
            return data;
        } else {
            const errorData = await res.json();
            return { error: errorData.message || 'Errore nell\'iscrizione alla lega' };
        }

    } catch (error) {
        console.error("Errore catturato:", error); // Logga l'errore
        return { error: 'Errore nell\'iscrizione alla lega' };
    }
};

// Funzione per creare una squadra in una lega
export const createTeam = async (teamFormValue, token) => {
    try {
        console.log("inizio fetch creazione squadra");

        const res = await fetch(`${BASE_URL}/teams`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            method: 'POST',
            body: JSON.stringify(teamFormValue)
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
            },
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
export const getLeagueRanking = async (leagueId, token) => {
    try {
        console.log("inizio fetch classifica lega");

        const res = await fetch(`${BASE_URL}/leagues/${leagueId}/ranking`, {
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
export const getBonusMalus = async (token) => {
    try {
        console.log("inizio fetch leghe dell'utente");

        const res = await fetch(`${BASE_URL}/bonus_malus/`, {
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
