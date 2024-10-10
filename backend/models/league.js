import { Schema, model } from 'mongoose';

const leagueSchema = new Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true
        },
        password: { // Password hashata per la lega
            type: String,
            trim: true,
            required: true
        },
        players: [{ type: Schema.Types.ObjectId, ref: "Player" }], // Giocatori nella lega
        bonusMalus: [{ type: Schema.Types.ObjectId, ref: 'BonusMalus' }],
        numberOfParticipants: { type: Number, required: true }, // numero di squadra che possono iscriversi
        teams: [{ type: Schema.Types.ObjectId, ref: "Team" }], // squadre referenziate della lega
        admin: { type: Schema.Types.ObjectId, ref: 'User', required: true }  // Riferimento all'amministratore
    },
    {
        collection: "leagues"
    }
)

const League = model('League', leagueSchema);

export default League;