const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');
require('dotenv').config();

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Servir les fichiers statiques (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Route de base
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route pour gérer la réservation
app.post('/reserve', (req, res) => {
    const { arrival, departure, email } = req.body;

    console.log(`Received reservation request: arrival=${arrival}, departure=${departure}, email=${email}`);

    // Configuration de Nodemailer
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASS,
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    const mailOptions = {
        from: process.env.GMAIL_USER,
        to: email, // Utiliser l'email fourni par l'utilisateur
        subject: 'Confirmation de Réservation',
        text: `Vous avez réservé chez COYOKY.
               Date d'arrivée: ${arrival}
               Date de départ: ${departure}
               Pour plus d'information : 06 90 41 03 53`,
    };

    

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            return res.status(500).send('Erreur lors de l\'envoi de l\'email');
        }
        console.log('Email sent:', info.response);
        res.send('Réservation confirmée et email envoyé!');
    });
});

// Démarrer le serveur
app.listen(port, () => {
    console.log(`Serveur en cours d'exécution sur http://localhost:${port}`);
});
