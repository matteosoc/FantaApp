import 'dotenv/config';
import transport from '../services/mail.service.js';


export const sendInvitation = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ error: 'Email è richiesta' });
    }

    try {
        await transport.sendMail(
            {
                from: 'noreply@fantaapp.it', // mittente
                to: email, // destinatario
                subject: 'Iscriviti anche tu su FantaApp', // oggetto
                text: 'Ciao! Sei stato invitato a unirti alla nostra app. Clicca qui per iscriverti: [link di iscrizione]', // testo visualizzato se non ha supporto html'
            })

        res.status(200).json({ message: 'Invito inviato con successo' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Errore nell\'invio dell\'email' });
    }
};