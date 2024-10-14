import League from '../models/league.js';
import User from '../models/user.js';
import mongoose from 'mongoose';
import Team from '../models/team.js';
import Player from '../models/player.js';

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

        const league = await League.findById(id).populate('admin players bonusMalus teams')  // Popolare le risorse collegate

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
        const { name, password, numberOfParticipants, budget } = req.body;

        const newLeague = new League({
            name,
            password,
            numberOfParticipants,
            budget,
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
    const userId = req.loggedUser._id;
    try {
        console.log("Cercando la lega con nome:" + req.body.name);
        // Trova la lega in base al nome
        const league = await League.findOne({ name: `${req.body.name}` }).populate('teams.owner');
        if (!league) {
            return res.status(404).json({ message: 'Lega non trovata.' });
        }
        if (league.password !== req.body.password) {
            return res.status(401).json({ message: 'Password errata.' });
        }
        // Verifica se l'utente è già iscritto alla lega
        const isAlreadyParticipant = league.teams.some(team => String(team.owner) === String(userId));
        if (isAlreadyParticipant) {
            return res.status(400).json({ message: 'Sei già iscritto a questa lega.' });
        }
        // Rimanda alla creazione della squadra
        res.status(200).json({ message: 'Lega trovata. Procedi con la creazione della squadra.', leagueId: league._id });
    } catch (error) {
        console.log(error)
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
        const leagues = await League.find({ admin: userId }).populate("teams");

        // Ritorna le leghe trovate
        res.status(200).json(leagues);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Errore durante il recupero delle leghe" });
    }
};

// mostra bonus malus di un lega in particolare
export const getBonusMalusLeague = async (req, res) => {
    console.log("getBonusMalusLeague");

    try {
        const id = req.params.id;

        const league = await League.findById(id).populate('bonusMalus')  // Popolare le risorse collegate

        if (!league) throw new Error({ message: "league not found" });

        res.status(200).json({
            bonusMalus: league.bonusMalus, // Lista dei bonus/malus della lega
        });
    } catch (err) {
        console.log(err);

        res.status(500).send({ error: err.message });
    }
};

// crea nuova squadra con controllo budget
export const createTeamInLeague = async (req, res) => {
    console.log("inizio createTeamInLeague")
    
    const leagueId = req.params.id; 
    console.log("leagueId", leagueId)

    const userId = req.loggedUser._id;
    console.log("userId", userId)


    try {
        // Trova la lega e i giocatori associati
        const league = await League.findById(leagueId);

        if (!league) {
            return res.status(404).json({ message: 'Lega non trovata.' });
        }

        // Recupera i dati dei giocatori selezionati
        const selectedPlayers = await Player.find({ _id: { $in: req.body.players } });

        // Somma il valore dei giocatori selezionati
        const totalValue = selectedPlayers.reduce((sum, player) => sum + player.value, 0);

        // Controlla che il valore totale dei giocatori non superi il budget della lega
        if (totalValue > league.budget) {
            return res.status(400).json({
                message: `Il valore totale dei giocatori selezionati (${totalValue}) supera il budget a disposizione di (${league.budget}).`
            });
        }

        // Crea la squadra
        const newTeamValue = new Team({
            name: req.body.name,
            players: req.body.players,
            // avatar: avatar,
            owner: userId,
            league: leagueId
        });

        // Salva la squadra e aggiornamenti alla lega e all'utente
        await newTeamValue.save();
        await League.findByIdAndUpdate(leagueId, { $push: { teams: newTeamValue._id } });
        await User.findByIdAndUpdate(userId, { $push: { teams: newTeamValue._id } });

        res.status(201).json({ message: 'Squadra creata con successo.', team: newTeamValue });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Errore del server', error });
    }
}
