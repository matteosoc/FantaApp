import { Schema, model } from 'mongoose';

const teamSchema = new Schema(
    {
        name: { type: String, trim: true, required: true },
        players: [{ type: Schema.Types.ObjectId, ref: "Player" }],
        avatar: { type: String },
        owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },  // Proprietario della squadra
        league: { type: Schema.Types.ObjectId, ref: 'League', required: true }
    },
    {
        collection: 'teams'
    }
)

const Team = model('Team', teamSchema);

export default Team;