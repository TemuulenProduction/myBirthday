const HEART_EMOJIS = ['❤️','💕','💖','💗','💓','💞','🌹','✨','💘','🌸'];
let particleTimer = null;

/* =========================
   PARTICULES
========================= */

function startHeartParticles() {
    stopHeartParticles();
    particleTimer = setInterval(createHeartParticle, 280);
}

function stopHeartParticles() {
    if (particleTimer) {
        clearInterval(particleTimer);
        particleTimer = null;
    }
}

function createHeartParticle() {
    const el = document.createElement('div');
    el.className = 'particle';

    el.textContent = HEART_EMOJIS[Math.floor(Math.random() * HEART_EMOJIS.length)];

    el.style.left = (Math.random() * 92 + 2) + 'vw';
    el.style.bottom = '0';

    const dur = (Math.random() * 3 + 3).toFixed(1);
    el.style.animationDuration = dur + 's';

    document.body.appendChild(el);

    setTimeout(() => el.remove(), parseFloat(dur) * 1000);
}

/* =========================
   MUSIQUE (FIX 100%)
========================= */

document.addEventListener("DOMContentLoaded", () => {

    const music = document.getElementById("bg-music");
    const btn = document.getElementById("musicToggle");

    if (!music || !btn) {
        console.log("❌ elements introuvables");
        return;
    }

    let isPlaying = false;

    btn.addEventListener("click", async () => {
        try {
            if (!isPlaying) {
                const playPromise = music.play();

                if (playPromise !== undefined) {
                    await playPromise;
                }

                btn.textContent = "🔈 Pause Music";
                btn.classList.add("playing");
                isPlaying = true;

            } else {
                music.pause();
                btn.textContent = "🔊 Music";
                btn.classList.remove("playing");
                isPlaying = false;
            }

        } catch (err) {
            console.log("❌ AUDIO ERROR:", err);
        }
    });

});

/* =========================
   INIT
========================= */

window.addEventListener('load', startHeartParticles);