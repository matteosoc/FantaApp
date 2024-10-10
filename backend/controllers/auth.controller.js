import User from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import 'dotenv/config';

export const register = async (req, res) => {
    // verificare che la mail non sia già utilizzata
    const user = await User.findOne({ email: req.body.email });

    if (user) return res.status(500).send('Mail in uso'); // FIXME: check the code

    // se non utilizzata la mail allora salvare il nuovo utente con la password hashata
    // const newUser = new User({...req.body, password: await bcrypt.hash(req.body.password, 10)})
    const newUser = new User({
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        password: await bcrypt.hash(req.body.password, 10),
        roles: req.body.roles,
        verifiedAt: new Date(),
    });

    const userCreated = await newUser.save();

    res.send(userCreated);
};

export const login = async (req, res) => {
    try {
        console.log("prima della ricerca nel database")

        // Cercare la mail nel db più la passaword
        const user = await User.findOne({ email: req.body.email }).select('+password');

        console.log(user)

        if (!user) {
            console.log("user not found");
            return res.status(401).send('Credenziali sbagliate');
        }

        // Verifica della password
        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordCorrect) {
            console.log("Password errata");
            return res.status(401).send('Credenziali sbagliate');
        }

        // Generare il JWT
        const token = jwt.sign(
            { userId: user.id },
            process.env.JWT_SECRET,
            {
                expiresIn: '5h',
            }
        );

        console.log("Token generato:", token);

        res.status(200).json({ token });

        
    } catch (error) {
        res.status(500).json({ error: 'Login fallito' });
    }
};

// va solo tolto il token dal localStorage
//export const logout = (req, res) => {};

export const me = (req, res) => {
    return res.send(req.loggedUser);
};

export const callbackGoogle = async (req, res) => {
    console.log(req)
    
    res.redirect(`http://localhost:3000/?token=${req.user.jwtToken}`)
}