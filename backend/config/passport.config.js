import User from "../models/user.js";
import GoogleStrategy from 'passport-google-oauth20';

// import { callbackGoogle } from '../controllers/authentication.controller'
import jwt from 'jsonwebtoken';
import "dotenv/config";

const googleStrategy = new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${process.env.HOST}:${process.env.PORT}${process.env.GOOGLE_CALLBACK}`
},

    async function (accessToken, refreshToken, profile, passportNext) {

        console.log(profile) //nel profile ci viene passato quello che ho scritto sopra nell'oggetto

        //nel db cherchiamo l'utente
        const { given_name: name, family_name: surname, email, sub: googleId } = profile._json

        let user = await User.findOne({ googleId })

        if (!user) {
            const newUser = new User({
                googleId,
                name,
                surname,
                email
            })

            user = await newUser.save()
        }
        
        jwt.sign(
            { userId: user.id },
            process.env.JWT_SECRET,
            {
                expiresIn: '1h'
            },
            (err, jwtToken) => {

                if (err) return res.status(500).send();

                //chiamiamo il prossimo middlewere di passport
                return passportNext(null, { jwtToken })
            }
        )
    }
)

export default googleStrategy;