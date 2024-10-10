import express from 'express';
import * as authController from '../controllers/auth.controller.js';
import auth from '../middlewares/auth.js';
import passport from 'passport';

const authenticationRouter = express.Router();

authenticationRouter.post('/register', authController.register);
authenticationRouter.post('/login', authController.login);
// authenticationRouter.post('/logout', auth, authController.logout);
authenticationRouter.get('/me', auth, authController.me);


// lo scopo di questa rotta è di ridirezionarci alla pagina di Google
// passando l'app id e il segreto in maniera che ci identifichi
// il middleware fa già tutto, non è necessario un controller
authenticationRouter.get(
    '/login-google', 
    passport.authenticate('google', { scope: ['profile', 'email'] }) // middleware di passport che ci ridireziona alla pagina di Google
);

// questa rotta recupera l'utente dal db oppure lo crea se non è già presente
// poi genera il jwt con l'id dell'utente nel payload
// quindi ridireziona al frontend passando il jwt come query string nell'url
authenticationRouter.get(
    '/callback-google',
    passport.authenticate('google', { session: false }), // riceve i dati del profilo e crea il jwt aggiungendolo in req.user
    authController.callbackGoogle // ridireziona al frontend passando il jwt come query string nell'url
);

export default authenticationRouter;