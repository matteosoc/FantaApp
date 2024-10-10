import express from 'express';
import * as teamController from '../controllers/team.controller.js';
import auth from '../middlewares/auth.js';
import hasRole from '../middlewares/hasRole.js';

const teamRouter = express.Router();

// visualizza squadra da id
teamRouter.get('/:id', auth, hasRole('teamOwner'), teamController.getTeam);

// crea squadra
// teamRouter.post('/', auth, hasRole('teamOwner'), teamController.postTeam);

// crea squadra con controllo budget
teamRouter.post('/', auth, hasRole('teamOwner'), teamController.postTeamTwo);


// modifica squadra
teamRouter.put('/:id', auth, hasRole('teamOwner'), teamController.updateTeam);

// cancella squadra, consentito solo ad admin
teamRouter.delete('/:id', auth, hasRole('admin'), teamController.deleteTeam);

// visualizza le mie squadre
teamRouter.get('my', auth, hasRole('teamOwner'), teamController.myTeams);

export default teamRouter;