//définir la la largeur de la sidebar a 100vw  et faire un overflow hidden

function openNav(){
    document.getElementById("mySidebar").style.width="100vw";
    document.querySelector("body").style.overflow= "hidden"

}

//définir la la largeur de la sidebar a 0  et faire un overflow auto

function closeNav(){
    document.getElementById("mySidebar").style.width="0";
    document.querySelector("body").style.overflow= "auto"

}

// definir le login sign up 

const wrapper = document.querySelector('.wrapper');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');
const btnPopup = document.querySelector('.btnLogin-popup');
const iconClose = document.querySelector('.icon-close');

registerLink.addEventListener('click', ()=> {
    wrapper.classList.add('active');
});

loginLink.addEventListener('click', ()=> {
    wrapper.classList.remove('active');
});

btnPopup.addEventListener('click', ()=> {
    wrapper.classList.add('active-popup');
});

iconClose.addEventListener('click', ()=> {
    wrapper.classList.remove('active-popup');
});

// reservation

function submitReservation(event) {
    event.preventDefault();
    const arrivalDate = document.getElementById('dated').value;
    const departureDate = document.getElementById('datef').value;

    if (!arrivalDate || !departureDate) {
        alert("Veuillez sélectionner les deux dates.");
        return;
    }

    $.ajax({
        type: "POST",
        url: "votre_url_serveur", // Remplacez par l'URL de votre serveur
        data: {
            arrival: arrivalDate,
            departure: departureDate
        },
        success: function(response) {
            alert(`Réservation confirmée! Date d'arrivée: ${arrivalDate} Date de départ: ${departureDate}`);
            // Vous pouvez également rediriger l'utilisateur vers une page de confirmation ou effectuer d'autres actions
        },
        error: function(error) {
            alert("Une erreur s'est produite lors de la réservation. Veuillez réessayer.");
        }
    });
}

