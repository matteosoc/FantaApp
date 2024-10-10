import express from "express";
import * as bonusMalusController from "../controllers/bonusmalus.controller.js";
import hasRole from "../middlewares/hasRole.js";
import auth from "../middlewares/auth.js";


const bonusMalusRouter = express.Router();

// ottieni tutti i bonusmalus di una lega
bonusMalusRouter.get('/:id', auth, hasRole('admin'), bonusMalusController.getBonusMalus);

// crea una nuovo bonus malus
bonusMalusRouter.post('/', auth, hasRole('admin'), bonusMalusController.postBonusMalus);

// // modifica un bonus malus
bonusMalusRouter.put('/:id', auth, hasRole('admin'), bonusMalusController.updateBonusMalus);

// // cancella un bonus malus
bonusMalusRouter.delete('/:id', auth, hasRole('admin'), bonusMalusController.deleteBonusMalus);

export default bonusMalusRouter;