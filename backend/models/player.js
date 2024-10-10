import { Schema, model } from 'mongoose';

const playerSchema = new Schema(
    {
        name: { type: String, trim: true, required: true },
        score: { type: Number, default: 0 },
        value: { type: Number, default: 0 },
        league: { type: Schema.Types.ObjectId, ref: 'League', required: true },
        team: { type: Schema.Types.ObjectId, ref: 'Team' },
        bonusesApplied: [{ type: Schema.Types.ObjectId, ref: 'BonusMalus' }]
    },
    {
        collection: 'players'
    }
)

const Player = model('Player', playerSchema);

export default Player;