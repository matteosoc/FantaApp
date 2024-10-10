import League from '../models/league.js';
import User from '../models/user.js';
import mongoose from 'mongoose';

// mostra tutte le leghe
export const getAllLeagues = async (req, res) => {
    console.log("getAllLeagues")

    try {
        const leagues = await League.find();
        res.send(leagues);
    }
    catch (error) {
        console.log(error);

        res.status(500).send({ error: error.message });
    }
}

// mostra una lega in particolare
export const getLeague = async (req, res) => {
    console.log("getLeague");

    try {
        const id = req.params.id;

        const league = await League.findById(id).populate('admin players bonusMalus')  // Popolare le risorse collegate

        if (!league) throw new Error({ message: "league not found" });

        res.send(league);
    } catch (err) {
        console.log(err);

        res.status(500).send({ error: err.message });
    }
};

// crea nuova lega
export const postNewLeague = async (req, res) => {
    try {
        console.log(req.loggedUser._id)
        console.log("Dati dal client:", req.body);
        const { name, password, numberOfParticipants } = req.body;

        const newLeague = new League({ 
            name,
            password,
            numberOfParticipants, 
            admin: req.loggedUser._id,
            players: [],  // Saranno aggiunti in un secondo momento
            bonusMalus: [],  // Saranno aggiunti in un secondo momento
            teams: []
        });
        console.log("Nuova lega:", newLeague);

        console.log("prima del save")

        await newLeague.save();

        console.log("dopo il save")

        // inserisce l'id della lega nell'utente
        await User.findByIdAndUpdate(newLeague.admin, { $push: { leagues: newLeague._id } });

        res.status(201).json(newLeague);

    } catch (error) {
        console.log(error)
        res.status(400).json({ error: error.message });
    }
}

// aggiorna lega
export const updateLeague = async (req, res) => {
    try {
        const id = req.params.id

        const updatedLeague = await League.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedLeague) return res.status(404).json({ error: 'League not found' });

        res.json(updatedLeague);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// cancella lega
export const deleteLeague = async (req, res) => {
    try {
        const deletedLeague = await League.findByIdAndDelete(req.params.id);
        if (!deletedLeague) return res.status(404).json({ error: 'League not found' });

        // rimuove l'id della lega dall'admin
        await User.findByIdAndUpdate(deletedLeague.admin, { $pull: { leagues: deletedLeague._id } });


        res.json({ message: 'League deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// classifica lega
export const leaderboardLeague = async (req, res) => {
    const leagueId = req.params.id;
    const league = await League.findById(leagueId).populate({
        path: 'teams',
        populate: {
            path: 'players',
            model: 'Player'
        }
    });

    const leaderboard = league.teams.map(team => {
        const totalScore = team.players.reduce((acc, player) => acc + player.score, 0);
        return {
            teamName: team.name,
            totalScore: totalScore
        };
    }).sort((a, b) => b.totalScore - a.totalScore);

    res.status(200).json(leaderboard);
};

// verifica aggiunta squadra a lega
export const joinLeague = async (req, res) => {

    const { leagueName, leaguePassword } = req.body;
    const userId = req.loggedUser._id;

    console.log(userId)

    try {

        console.log("Cercando la lega con nome:" + leagueName);

        // Trova la lega in base al nome
        const league = await League.findOne({ name: `${leagueName}` }).populate('teams.owner');

        console.log(league)

        if (!league) {
            return res.status(404).json({ message: 'Lega non trovata.' });
        }

        if (league.password !== leaguePassword ) {
            return res.status(401).json({ message: 'Password errata.' });
        }

        console.log("fino a qui ok")

        // Verifica se l'utente è già iscritto alla lega
        const isAlreadyParticipant = league.teams.some(team => String(team.owner) === String(userId));
        
        if (isAlreadyParticipant) {
            return res.status(400).json({ message: 'Sei già iscritto a questa lega.' });
        }

        // Rimanda alla creazione della squadra
        res.status(200).json({ message: 'Lega trovata. Procedi con la creazione della squadra.', leagueId: league._id });
    } catch (error) {
        res.status(500).json({ message: 'Errore del server', error });
    }
}

// Funzione per ottenere le leghe di cui l'utente è admin
export const getLeaguesByAdmin = async (req, res) => {
    try {
        console.log("getLeaguesByAdmin")

        // Recupera l'ID dell'utente loggato, che deve essere passato tramite la richiesta (es. da JWT o sessione)
        const userId = req.loggedUser._id;

        console.log(userId)

        // Trova tutte le leghe dove l'utente è l'admin
        const leagues = await League.find({ admin: userId });

        // Ritorna le leghe trovate
        res.status(200).json(leagues);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Errore durante il recupero delle leghe" });
    }
};

