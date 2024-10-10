import 'dotenv/config';
import express from "express";
import mongoose from 'mongoose';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import GoogleStrategy from './config/passport.config.js';
import passport from 'passport';


import authenticationRouter from './routers/auth.router.js';
import leaguesRouter from './routers/league.router.js';
import userRouter from './routers/user.router.js';
import teamRouter from './routers/team.router.js';
import playerRouter from './routers/player.router.js';
import bonusMalusRouter from './routers/bonusmalus.router.js';


const host = process.env.HOST;
const port = process.env.PORT;

const app = express();

app.use(express.json());

// passport per autenticazione su google
passport.use("google", GoogleStrategy);

// installazioni per fare upload immagini npm i multer morgan helmet cors
app.use(morgan('dev'));
app.use(helmet());
// postizionato prima della rotte
app.use(cors());


app.use('/api/v1/leagues', leaguesRouter); // rotta per le leghe
app.use('/api/v1/teams/', teamRouter); // rotta per le squadre
app.use('/api/v1/players/', playerRouter); // rotta per i giocatori
app.use('/api/v1/bonus_malus/', bonusMalusRouter); // rotta per i bonus e malus
app.use('/api/v1/users', userRouter); // rotta per le leghe

app.use('/api/v1/auth', authenticationRouter); // rotta autenticazione

app.listen(port, () => console.log(`server connesso su ${host}:${port}`));

await mongoose
    .connect(process.env.MONGODB_CONNECTION_URI)
    .then(() => console.log('database connesso'))
    .catch((err) => console.log('errore:', err));