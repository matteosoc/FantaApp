import Player from '../models/player.js';
import League from '../models/league.js';
import Team from '../models/team.js';
import BonusMalus from '../models/bonusmalus.js';

// mostra un giocatore
export const getPlayer = async (req, res) => {
    try {
        const id = req.params.id

        const player = await Player.findById(req.params.id).populate('bonusesApplied')

        if (!player) return res.status(404).json({ error: 'Player not found' });

        res.json(player);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// crea un giocatore
export const postPlayer = async (req, res) => {
    try {
        const newPlayer = new Player(req.body);
        await newPlayer.save();

        // inserisce l'id della lega
        await League.findByIdAndUpdate(newPlayer.league, { $push: { players: newPlayer._id } });

        res.status(201).json(newPlayer);
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: error.message });
    }
}

// elimina giocatore
export const deletePlayer = async (req, res) => {
    try {
        const id = req.params.id

        const deletedPlayer = await Player.findByIdAndDelete(id);

        if (!deletedPlayer) return res.status(404).json({ error: 'Player not found' });

        // rimuove l'id della lega dall'admin
        await League.findByIdAndUpdate(deletedPlayer.league, { $pull: { players: deletedPlayer._id } });

        res.json({ message: 'Player deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// assegna bonus malus ai giocatori
export const applyBonusToPlayer = async (req, res) => {
    try {
        const { bonusId } = req.body;
        const { playerId } = req.params;

        console.log("bonusId" + bonusId);
        console.log("playerId" + playerId)

        // Trova il giocatore
        const player = await Player.findById(playerId);

        if (!player) {
            return res.status(404).json({ message: "Giocatore non trovato." });
        }

        // Trova il bonus/malus
        const bonusMalus = await BonusMalus.findById(bonusId);
        
        if (!bonusMalus) {
            return res.status(404).json({ message: "Bonus/Malus non trovato." });
        }

        // Applica il bonus/malus al giocatore
        player.score += bonusMalus.value;
        player.bonusesApplied.push(bonusMalus._id);
        await player.save();

        res.status(200).json({ message: "bonus o malus applicato con successo", player });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Errore del server", error });
    }
};

// aggiorna giocatore
export const updatePlayer = async (req, res) => {
    try {
        const id = req.params.id

        const updatedPlayer = await Player.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedPlayer) return res.status(404).json({ error: 'Player not found' });

        res.json(updatedPlayer);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}


