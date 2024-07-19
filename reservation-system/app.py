from flask import Flask, render_template, request, jsonify
from flask_mail import Mail, Message
import os
from dotenv import load_dotenv

load_dotenv()  # Charger les variables d'environnement depuis .env

app = Flask(__name__)

# Configuration pour l'envoi d'emails
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USERNAME'] = os.getenv('MAIL_USERNAME')
app.config['MAIL_PASSWORD'] = os.getenv('MAIL_PASSWORD')
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True

mail = Mail(app)

# Route pour servir index.html depuis le répertoire public
@app.route('/')
def index():
    return render_template('index.html')

# Route POST pour gérer la réservation depuis index.html
@app.route('/reserve', methods=['POST'])
def reserve():
    if request.method == 'POST':
        arrival = request.form['arrival']
        departure = request.form['departure']
        email = request.form['email']

        print(f'Received reservation request: arrival={arrival}, departure={departure}, email={email}')

        # Envoi d'un email de confirmation
        msg = Message('Confirmation de Réservation',
                      sender=app.config['MAIL_USERNAME'],
                      recipients=[email])
        msg.body = f'Vous avez réservé chez COYOKY.\nDate d\'arrivée: {arrival}\nDate de départ: {departure}\nPour plus d\'information : 06 90 41 03 53'

        try:
            mail.send(msg)
            return jsonify({'message': 'Réservation confirmée et email envoyé!'})
        except Exception as e:
            print(f'Error sending email: {e}')
            return jsonify({'message': 'Erreur lors de l\'envoi de l\'email'}), 500

if __name__ == '__main__':
    app.run(debug=True)
