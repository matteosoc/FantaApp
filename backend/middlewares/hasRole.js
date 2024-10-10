import User from '../models/user.js';

const hasRole = (requiredRole) => {
  return async (req, res, next) => {
    try {

      // Assicurati che l'utente sia autenticato
      if (!req.loggedUser) {
        return res.status(401).json({ message: 'Accesso negato: non autenticato' });
      }

      // se ha ruolo admin manda avanti
      if (req.loggedUser.roles.includes("admin")) return next();


      // Controlla se l'utente ha il ruolo richiesto
      if (!req.loggedUser.roles || !req.loggedUser.roles.includes(requiredRole)) {
        return res.status(403).json({ message: 'Accesso negato: ruolo non autorizzato' });
      }
      
      // Se l'utente ha il ruolo richiesto, passa al middleware successivo
      next();

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Errore interno del server' });
    }
  };
};

export default hasRole;