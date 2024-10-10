import { Schema, model } from 'mongoose';

const bonusmalusSchema = new Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true
        },
        value: {
            type: Number,
            required: true
        },
        league: { type: Schema.Types.ObjectId, ref: 'League' }
    },
    {
        collection: "bonusmalus"
    }
);

const BonusMalus = model('BonusMalus', bonusmalusSchema);

export default BonusMalus;