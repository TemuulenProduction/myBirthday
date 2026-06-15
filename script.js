// Configuration de la date d'anniversaire
const birthdayDate = new Date('2026-06-16T00:00:00+09:00').getTime();

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
        if (typeof countdownInterval !== 'undefined') {
            clearInterval(countdownInterval);
        }
        
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

// ========================================
// SYSTÈME DE DÉVERROUILLAGE PROGRESSIF
// ========================================

function updateGalleryLocks() {
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.classList.remove('locked');
        item.classList.add('unlocked');
        item.addEventListener('click', openPhotoModal);
    });
}

// ========================================
// GESTION DU MODAL DES PHOTOS
// ========================================

const photoModal = document.getElementById('photoModal');
const modalImage = document.getElementById('modalImage');
const modalText = document.getElementById('modalText');
const closeBtn = document.querySelector('.close');

// Fonction pour ouvrir une photo
function openPhotoModal(event) {
    const item = event.currentTarget;
    if (!item) return;

    const img = item.querySelector('img');
    const text = item.getAttribute('data-text') || '';

    if (!img) return;

    modalImage.src = img.src;
    modalText.textContent = text;

    photoModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Fermer le modal au clic sur le X
closeBtn.addEventListener('click', function() {
    photoModal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

// Fermer le modal en cliquant en dehors de l'image
photoModal.addEventListener('click', function(event) {
    if (event.target === photoModal) {
        photoModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Fermer le modal avec la touche Échap
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        photoModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// ========================================
// GESTION DE LA MUSIQUE
// ========================================

const musicToggle = document.getElementById('musicToggle');
const birthdayMusic = document.getElementById('birthdayMusic');

musicToggle.addEventListener('click', function() {
    if (birthdayMusic.paused) {
        birthdayMusic.play();
        musicToggle.classList.add('playing');
        musicToggle.textContent = '🔊 Music (Playing)';
    } else {
        birthdayMusic.pause();
        musicToggle.classList.remove('playing');
        musicToggle.textContent = '🔊 Music';
    }
});

// ========================================
// FONCTION DE NOTIFICATION
// ========================================

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'unlock-notification';
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.add('hide');
        setTimeout(() => notification.remove(), 500);
    }, 2000);
}

// ========================================
// INITIALISATION
// ========================================

document.addEventListener('DOMContentLoaded', () => {

    // Mise à jour initiale
    updateCountdown();
    updateGalleryLocks();

    // Décompte chaque seconde
    const countdownInterval = setInterval(updateCountdown, 1000);

    // Photos (pas besoin de refresh toutes les minutes si c'est statique, mais ok si tu veux garder)
    const galleryInterval = setInterval(updateGalleryLocks, 60000);

    // Gestion minuit heure de Séoul (corrigée)
    function checkAtMidnight() {
        const now = new Date();

        const koreaTime = new Date(
            now.toLocaleString('en-US', { timeZone: 'Asia/Seoul' })
        );

        const tomorrow = new Date(koreaTime);
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(0, 0, 0, 0);

        const timeUntilMidnight = tomorrow.getTime() - koreaTime.getTime();

        setTimeout(() => {
            updateGalleryLocks();
            updateCountdown();
            checkAtMidnight(); // boucle quotidienne
        }, timeUntilMidnight);
    }

    checkAtMidnight();

    // Confettis au chargement
    window.addEventListener('load', () => {
        if (new Date().getTime() > birthdayDate) {
            launchConfetti();
        }
    });

});