import BonusMalus from '../models/bonusmalus.js';
import League from '../models/league.js';

// mostra un bonus o malus
export const getBonusMalus = async (req, res) => {
    try {
        const id = req.params.id
        
        const bonusmalus = await BonusMalus.findById(id);

        if (!bonusmalus) return res.status(404).json({ error: 'BonusMalus not found' });

        res.json(bonusmalus);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// crea nuovo bonus malus 
export const postBonusMalus = async (req, res) => {
    try {
        const newBonusMalus = new BonusMalus(req.body);
        await newBonusMalus.save();

        // inserisce l'id del bonusmalus nella lega
        await League.findByIdAndUpdate(newBonusMalus.league, { $push: { bonusMalus: newBonusMalus._id } });

        res.status(201).json(newBonusMalus);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export const updateBonusMalus = async (req, res) => {
    try {
        const updateBonusMalus = await BonusMalus.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updateBonusMalus) return res.status(404).json({ error: 'BonusMalus not found' });
        res.json(updateBonusMalus);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export const deleteBonusMalus = async ( req, res) => {
    try {
        const deletedBonusMalus = await BonusMalus.findByIdAndDelete(req.params.id);
        if (!deletedBonusMalus) return res.status(404).json({ error: 'BonusMalus not found' });

        // rimuove l'id della lega dall'admin
        await League.findByIdAndUpdate(deletedBonusMalus.league, { $pull: { bonusMalus: deletedBonusMalus._id } });


        res.json({ message: 'BonusMalus deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const getAllBonusMalusOfLeague = async (req, res) => {
    try {
        const id = req.params.id
        
        const bonusmalus = await BonusMalus.find({ league: leagueId });

        if (!bonusmalus) return res.status(404).json({ error: 'BonusMalus not found' });

        res.json(bonusmalus);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
