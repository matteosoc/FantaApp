import express from "express";
import * as userController from '../controllers/user.controller.js'

const userRouter = express.Router();

// recupera tutti gli utenti
userRouter.get('/', userController.getAllUsers);

// recupera un utente
userRouter.get('/:id', userController.getUser);

// crea nuovo utente
userRouter.post('/', userController.createUser);

// modifica un utente
userRouter.put('/:id', userController.updateUser);

// cancella utente
userRouter.delete('/:id', userController.deleteUser);

export default userRouter;