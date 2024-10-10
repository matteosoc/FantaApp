import { useState, createContext, useEffect } from "react";
import { me } from "../data/fetch.js"; // Assumo che la funzione `me` faccia una richiesta per ottenere i dati dell'utente autenticato

// Crea il contesto di autenticazione
export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
    // Stato per gestire il token e le informazioni sull'utente
    const [token, setToken] = useState(localStorage.getItem('token')); 
    const [userInfo, setUserInfo] = useState(null);

    // Funzione per ottenere i dati dell'utente autenticato
    const getMe = async () => {
        try {
            const userData = await me(token); // La funzione `me` dovrebbe usare il token per recuperare i dati utente
            console.log(userData)
            setUserInfo(userData); // Salva le informazioni utente nello stato
        } catch (error) {
            console.error("Errore durante il recupero dei dati utente", error);
            setUserInfo(null); // Se c'è un errore, resetta le info utente
        }
    };

    // Effetto che si attiva quando il token cambia (per esempio, al login)
    useEffect(() => {
        if (token) {
            getMe();
        } else {
            setUserInfo(null); // Resetta le info utente se non c'è token
        }
    }, [token]);

    // Valori che saranno disponibili per tutti i componenti figli
    const value = { token, setToken, userInfo, setUserInfo };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}
