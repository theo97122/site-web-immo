const nodemailer = require('nodemailer');

// Créer un transporteur SMTP réutilisable pour envoyer des e-mails via Gmail
let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
      user: 'theoambraisse@gmail.com',
      pass: 'Lekrageul12'
  },
  tls: {
      rejectUnauthorized: false
  }
});

// Fonction pour envoyer un e-mail de confirmation de réservation
function sendReservationEmail(arrivalDate, departureDate) {
    // Options de l'e-mail
    let mailOptions = {
        from: 'theoambraissegmail@gmail.com',
        to: 'theoambraisse@gmail.com', // Remplacez par l'adresse e-mail du destinataire
        subject: 'Confirmation de réservation',
        text: `Votre réservation a été confirmée! \nDate d'arrivée: ${arrivalDate} \nDate de départ: ${departureDate}`
    };

    // Envoyer l'e-mail
    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('E-mail envoyé: ' + info.response);
        }
    });
}

// Utilisation de la fonction sendReservationEmail
sendReservationEmail('date_arrivée', 'date_départ');
