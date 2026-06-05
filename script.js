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

// Gestion de la musique
const musicToggle = document.getElementById('musicToggle');
const birthdayMusic = document.getElementById('birthdayMusic');

musicToggle.addEventListener('click', function() {
    if (birthdayMusic.paused) {
        birthdayMusic.play();
        musicToggle.classList.add('playing');
        musicToggle.textContent = '🔊 Musique (en cours)';
    } else {
        birthdayMusic.pause();
        musicToggle.classList.remove('playing');
        musicToggle.textContent = '🔊 Musique';
    }
});

// Essayer de démarrer la musique automatiquement (peut ne pas fonctionner sur certains navigateurs)
window.addEventListener('load', function() {
    // Les navigateurs modernes requirent une interaction utilisateur pour lire l'audio
    //birthdayMusic.play().catch(() => {
    //console.log('Autoplay non autorisé');
    //});
});

// Galerie interactive avec modal
const galleryItems = document.querySelectorAll('.gallery-item');
const photoModal = document.getElementById('photoModal');
const modalImage = document.getElementById('modalImage');
const modalText = document.getElementById('modalText');
const closeBtn = document.querySelector('.close');

// Ouvrir le modal au clic sur une photo
galleryItems.forEach(item => {
    item.addEventListener('click', function() {
        const img = this.querySelector('img');
        const text = this.getAttribute('data-text');
        
        modalImage.src = img.src;
        modalText.textContent = text;
        photoModal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Empêcher le scroll
    });
});

// Fermer le modal au clic sur le X
closeBtn.addEventListener('click', function() {
    photoModal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Réactiver le scroll
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
// SYSTÈME DE DÉVERROUILLAGE PROGRESSIF
// ========================================

function updateGalleryLocks() {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset to midnight
    
    const galleryItems = document.querySelectorAll('.gallery-item');
    let unlockedCount = 0;

    galleryItems.forEach((item, index) => {
        const unlockDateStr = item.getAttribute('data-unlock-date');
        const unlockDate = new Date(unlockDateStr);
        unlockDate.setHours(0, 0, 0, 0);
        
        const unlockDateElement = document.getElementById(`unlock-date-${index + 1}`);
        
        if (today >= unlockDate) {
            // La photo est déverrouillée
            item.classList.add('unlocked');
            item.classList.remove('locked');
            
            if (unlockDateElement) {
                unlockDateElement.textContent = '🔓 Déverrouillée!';
            }
            
            // Ajouter l'événement au clic
            if (!item.classList.contains('event-added')) {
                item.addEventListener('click', openPhotoModal);
                item.classList.add('event-added');
            }
            
            unlockedCount++;
        } else {
            // La photo est verrouillée
            item.classList.add('locked');
            item.classList.remove('unlocked');
            
            // Calculer les jours jusqu'au déverrouillage
            const daysUntil = Math.ceil((unlockDate - today) / (1000 * 60 * 60 * 24));
            if (unlockDateElement) {
                unlockDateElement.textContent = `Déverrouillée dans ${daysUntil} jour${daysUntil > 1 ? 's' : ''}`;
            }
            
            // Retirer l'événement au clic
            item.removeEventListener('click', openPhotoModal);
            item.classList.remove('event-added');
        }
    });

    // Afficher le statut global
    const totalPhotos = galleryItems.length;
    console.log(`📸 Galerie: ${unlockedCount}/${totalPhotos} photos déverrouillées`);
}

// Fonction pour ouvrir une photo (vérifier qu'elle n'est pas verrouillée)
function openPhotoModal(event) {
    const item = event.currentTarget;
    
    // Vérifier si la photo est verrouillée
    if (item.classList.contains('locked')) {
        showNotification('🔒 Cette photo n\'est pas encore déverrouillée!');
        return;
    }

    const img = item.querySelector('img');
    const text = item.getAttribute('data-text');
    
    modalImage.src = img.src;
    modalText.textContent = text;
    photoModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Fonction pour afficher les notifications
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

// Mettre à jour l'état des photos au chargement
window.addEventListener('load', updateGalleryLocks);

// Mettre à jour chaque minute pour les changements de jour
setInterval(updateGalleryLocks, 60000);

// Vérifier aussi à minuit
function checkAtMidnight() {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);

    const timeUntilMidnight = tomorrow - now;
    setTimeout(() => {
        updateGalleryLocks();
        checkAtMidnight(); // Vérifier à nouveau demain
    }, timeUntilMidnight);
}

checkAtMidnight();

// Modifier les événements de la galerie
const galleryItems = document.querySelectorAll('.gallery-item');
galleryItems.forEach(item => {
    // L'événement au clic sera ajouté dynamiquement par updateGalleryLocks
});