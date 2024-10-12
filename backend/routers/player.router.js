import express from 'express';
import * as playerController from '../controllers/player.controller.js';
import auth from '../middlewares/auth.js';
import hasRole from '../middlewares/hasRole.js';

const playerRouter = express.Router();

// mostra un player
playerRouter.get('/:id', auth, hasRole('admin'), playerController.getPlayer);

// pubblica un player
playerRouter.post('/', auth, hasRole('admin'), playerController.postPlayer);

// assegna bonus malus ai giocatori
playerRouter.put('/:playerId/apply-bonus', auth, hasRole('admin'), playerController.applyBonusToPlayer);

//modifica un player
playerRouter.put('/:id', auth, hasRole('admin'), playerController.updatePlayer);

// cancella un player
playerRouter.delete('/:id', auth, hasRole('admin'), playerController.deletePlayer);

export default playerRouter;