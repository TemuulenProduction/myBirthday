// Configuration de la date d'anniversaire
const birthdayDate = new Date('2026-06-16T00:00:00').getTime();

// Fonction pour mettre à jour le décompte
function updateCountdown() {
    const now = new Date().getTime();
    const distance = birthdayDate - now;

    // Éléments du DOM
    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');
    const countdownElement = document.getElementById('countdown');
    const celebrationMessage = document.getElementById('celebrationMessage');

    if (distance > 0) {
        // Calcul du temps restant
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Affichage avec zéros à gauche
        daysElement.textContent = String(days).padStart(2, '0');
        hoursElement.textContent = String(hours).padStart(2, '0');
        minutesElement.textContent = String(minutes).padStart(2, '0');
        secondsElement.textContent = String(seconds).padStart(2, '0');

        // Afficher le décompte, masquer le message de célébration
        countdownElement.style.display = 'grid';
        celebrationMessage.style.display = 'none';
    } else {
        // C'est l'anniversaire !
        countdownElement.style.display = 'none';
        celebrationMessage.style.display = 'block';
        
        // Arrêter le décompte
        clearInterval(countdownInterval);
        
        // Lancer les confettis
        launchConfetti();
    }
}

// Fonction pour créer des confettis
function launchConfetti() {
    const confettiContainer = document.getElementById('confetti');
    
    for (let i = 0; i < 100; i++) {
        const confetto = document.createElement('div');
        confetto.classList.add('confetti');
        
        // Couleurs festives
        const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2'];
        confetto.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        
        // Position aléatoire
        confetto.style.left = Math.random() * 100 + '%';
        confetto.style.top = Math.random() * -100 - 10 + 'px';
        
        // Durée aléatoire
        const duration = Math.random() * 3 + 2;
        confetto.style.animation = `fall ${duration}s ease-in forwards`;
        
        // Délai aléatoire
        confetto.style.animationDelay = Math.random() * 0.5 + 's';
        
        confettiContainer.appendChild(confetto);
        
        // Retirer le confetto après l'animation
        setTimeout(() => confetto.remove(), (duration + 0.5) * 1000);
    }
}

// Mise à jour initiale
updateCountdown();

// Mise à jour du décompte chaque seconde
const countdownInterval = setInterval(updateCountdown, 1000);

// Confettis au chargement (petit effet)
window.addEventListener('load', () => {
    if (birthdayDate - new Date().getTime() < 0) {
        launchConfetti();
    }
});

