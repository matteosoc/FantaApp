import express from "express";
import * as emailController from "../controllers/email.controller.js"

const emailRouter = express.Router();

// invita un amico
emailRouter.post('/', emailController.sendInvitation);

export default emailRouter;
