import { Schema, model } from 'mongoose';

const userSchema = new Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true
        },
        surname: { 
            type: String,
            trim: true, 
            required: true 
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true, // converte in minuscolo
            trim: true, // toglie gli spazi vuoti all'inizio e alla fine
        },
        password: {
            type: String
        },
        verifiedAt: Date,
        // verificationCode: String,
        // codeCreatedAt: Date
        
        // aggiungere ruolo admin o user valore stringa [admin, user]
        roles: {
            type: [String],
            enum: ['admin', 'teamOwner'],
            default: ['teamOwner']
        },
        teams: [{ type: Schema.Types.ObjectId, ref:"Team"} ],
        leagues: [{ type: Schema.Types.ObjectId, ref:"League"} ],
        googleId: String
    },
    {
        collection: 'users',
        timestamps: true,
    }
);

const User = model('User', userSchema);
export default User;