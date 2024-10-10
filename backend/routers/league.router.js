import express from "express";
import * as leaguesController from "../controllers/league.controller.js"
import auth from "../middlewares/auth.js";
import hasRole from '../middlewares/hasRole.js';


const leaguesRouter = express.Router();

// ottieni tutte le leghe di un utente
leaguesRouter.get('/', auth, hasRole('admin'), leaguesController.getAllLeagues);

// Rotta per ottenere le leghe di cui l'utente è admin
leaguesRouter.get("/my-leagues", auth, hasRole('admin'), leaguesController.getLeaguesByAdmin);

//ottieni la leghe dell'utente loggato
leaguesRouter.get('/my-leagues/:id/', auth, hasRole('admin'), leaguesController.getLeague);

// crea una nuova lega
leaguesRouter.post('/', auth, hasRole('admin'), leaguesController.postNewLeague);

// modifica una lega
leaguesRouter.put('/:id', auth, hasRole('admin'), leaguesController.updateLeague);

// cancella una lega
leaguesRouter.delete('/:id', auth, hasRole('admin'), leaguesController.deleteLeague);

// visualizza la classifica della lega da teamOwner
leaguesRouter.get('/:id/leaderboard', auth, leaguesController.leaderboardLeague);

// iscriviti a una lega
leaguesRouter.post('/join', auth, leaguesController.joinLeague);

export default leaguesRouter;