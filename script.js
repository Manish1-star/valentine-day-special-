// ============================================
// 👇 CUSTOMIZE DATE HERE IF YOU WANT
// Format: YYYY-MM-DD (Example: 2024-02-14)
const startDate = new Date("2025-02-14"); 
// ============================================

const text = "Will you be my Valentine?";
const speed = 100;
let i = 0;

// 1. Typing Effect (Runs automatically)
function typeWriter() {
    if (i < text.length) {
        document.getElementById("typewriter").innerHTML += text.charAt(i);
        i++;
        setTimeout(typeWriter, speed);
    }
}

// 2. Check for URL Name & Start Typing
window.onload = function() {
    const params = new URLSearchParams(window.location.search);
    const name = params.get('name');
    
    if (name) {
        // If name exists, append it
        document.getElementById("typewriter").innerHTML = ""; 
        setTimeout(() => {
             document.getElementById("typewriter").innerHTML = `Hi ${name},<br>`;
             setTimeout(typeWriter, 1000);
        }, 500);
    } else {
        setTimeout(typeWriter, 500);
    }
};

// 3. Music Toggle
function toggleMusic() {
    const music = document.getElementById("bg-music");
    const btn = document.querySelector(".music-btn");
    
    if (music.paused) {
        music.play();
        btn.innerHTML = "⏸ Pause Music";
    } else {
        music.pause();
        btn.innerHTML = "🎵 Play Music";
    }
}

// 4. "No" Button Runs Away (Mobile & Desktop)
function moveNo() {
    const noBtn = document.getElementById("no-btn");
    const card = document.querySelector(".glass-card");
    
    // Get dimensions
    const cardRect = card.getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();
    
    // Calculate random position strictly within the card
    const maxX = cardRect.width - btnRect.width - 20;
    const maxY = cardRect.height - btnRect.height - 20;
    
    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);
    
    noBtn.style.position = "absolute";
    noBtn.style.left = randomX + "px";
    noBtn.style.top = randomY + "px";
}

// 5. "Yes" Button Action
function handleYes() {
    document.getElementById("ask-section").style.display = "none";
    document.getElementById("success-section").style.display = "block";
    document.getElementById("success-section").classList.remove("hidden");
    
    // Play sound if not playing
    const music = document.getElementById("bg-music");
    if(music.paused) { music.play(); }

    // Start Timer
    setInterval(updateTimer, 1000);
    updateTimer();
    
    // Confetti Explosion
    triggerConfetti();
}

// 6. Love Timer Logic
function updateTimer() {
    const now = new Date();
    const diff = now - startDate;
    
    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const m = Math.floor((diff / 1000 / 60) % 60);
    const s = Math.floor((diff / 1000) % 60);
    
    document.getElementById("timer").innerText = 
        `${d} Days : ${h} Hrs : ${m} Mins : ${s} Secs`;
}

// 7. Confetti Effect
function triggerConfetti() {
    const duration = 3000;
    const end = Date.now() + duration;

    (function frame() {
        confetti({ particleCount: 5, angle: 60, spread: 55, origin: { x: 0 } });
        confetti({ particleCount: 5, angle: 120, spread: 55, origin: { x: 1 } });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());
}
