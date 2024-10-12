import Team from '../models/team.js';
import User from '../models/user.js';
import League from '../models/league.js';
import Player from '../models/player.js';

// mostra una squadra da id
export const getTeam = async (req, res) => {
    try {
        console.log("getTeam")

        const id = req.params.id

        const team = await Team.findById(id).populate('players')

        if (!team) return res.status(404).json({ error: 'Team not found' });

        res.json(team);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message });
    }
}

// crea nuova squadra
export const postTeam = async (req, res) => {
    try {
        const newTeam = new Team({ ...req.body, owner: req.loggedUser._id });
        await newTeam.save();

        // Aggiornare l'utente proprietario della squadra
        await User.findByIdAndUpdate(newTeam.owner, { $push: { teams: newTeam._id } });

        // Aggiornare la lega per includere la squadra
        await League.findByIdAndUpdate(newTeam.league, { $push: { teams: newTeam._id } });

        res.status(201).json(newTeam);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// crea nuova squadra con controllo budget
export const postTeamTwo = async (req, res) => {
    const { leagueId, newTeam } = req.body;
    const userId = req.loggedUser._id;

    try {
        // Trova la lega e i giocatori associati
        const league = await League.findById(leagueId).populate('players');

        if (!league) {
            return res.status(404).json({ message: 'Lega non trovata.' });
        }


        if (!validPlayers) {
            return res.status(400).json({ message: 'Uno o più giocatori non appartengono a questa lega.' });
        }

        // Recupera i dati dei giocatori selezionati
        const selectedPlayers = await Player.find({ _id: { $in: newTeam.players } });

        // Somma il valore dei giocatori selezionati
        const totalValue = selectedPlayers.reduce((sum, player) => sum + player.value, 0);

        // Controlla che il valore totale dei giocatori non superi il budget della lega
        if (totalValue > league.budget) {
            return res.status(400).json({
                message: `Il valore totale dei giocatori selezionati (${totalValue}) supera il budget a disposizione di (${league.budget}).`
            });
        }

        // Crea la squadra
        const newTeam = new Team({
            name: teamName,
            players: playerIds,            // avatar: avatar,
            owner: userId,
            league: leagueId
        });

        // Salva la squadra e aggiornamenti alla lega e all'utente
        await newTeam.save();
        await League.findByIdAndUpdate(leagueId, { $push: { teams: newTeam._id } });
        await User.findByIdAndUpdate(userId, { $push: { teams: newTeam._id } });

        res.status(201).json({ message: 'Squadra creata con successo.', team: newTeam });
    } catch (error) {
        res.status(500).json({ message: 'Errore del server', error });
    }
}

// modifica squadra
export const updateTeam = async (req, res) => {
    try {
        const id = req.params.id

        const updatedTeam = await Team.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedTeam) return res.status(404).json({ error: 'Team not found' });

        res.json(updatedTeam);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// cancella squadra
export const deleteTeam = async (req, res) => {
    try {
        const id = req.params.id

        const deletedTeam = await Team.findByIdAndDelete(id);

        if (!deletedTeam) return res.status(404).json({ error: 'Team not found' });

        // Rimuovere la squadra dall'utente e dalla lega
        await User.findByIdAndUpdate(deletedTeam.owner, { $pull: { teams: deletedTeam._id } });
        await League.findByIdAndUpdate(deletedTeam.league, { $pull: { teams: deletedTeam._id } });

        res.json({ message: 'Team deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// visualizza le squadre dell'utente loggato
export const getMyTeams = async (req, res) => {
    console.log("inizio getMyTeams" )
    const userId = req.loggedUser._id;

    try {
        const teams = await Team.find({ owner: userId });
        console.log("teams", teams )

        res.status(200).json(teams);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message });
    }
}