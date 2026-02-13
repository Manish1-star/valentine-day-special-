// ============================================
// 👇 DATE CHANGE HERE (YYYY-MM-DD)
const startDate = new Date("2024-02-14"); 
// ============================================

const text = "Will you be my Valentine?";
const speed = 100;
let i = 0;

// 1. Start Experience (Plays music & Hides Overlay)
function startExperience() {
    // Hide Overlay
    document.getElementById("overlay").style.opacity = "0";
    setTimeout(() => {
        document.getElementById("overlay").style.display = "none";
    }, 500);

    // Play Music
    const music = document.getElementById("bg-music");
    music.play().catch(error => {
        console.log("Music play failed (user interaction needed): ", error);
    });

    // Check for name and start typing
    const params = new URLSearchParams(window.location.search);
    const name = params.get('name');
    
    if (name) {
        document.getElementById("typewriter").innerHTML = ""; 
        setTimeout(() => {
             document.getElementById("typewriter").innerHTML = `Hi ${name},<br>`;
             setTimeout(typeWriter, 1000);
        }, 500);
    } else {
        setTimeout(typeWriter, 500);
    }
}

// 2. Typing Effect
function typeWriter() {
    if (i < text.length) {
        document.getElementById("typewriter").innerHTML += text.charAt(i);
        i++;
        setTimeout(typeWriter, speed);
    }
}

// 3. Move "No" Button
function moveNo() {
    const noBtn = document.getElementById("no-btn");
    const card = document.querySelector(".glass-card");
    const cardRect = card.getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();
    
    const maxX = cardRect.width - btnRect.width - 20;
    const maxY = cardRect.height - btnRect.height - 20;
    
    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);
    
    noBtn.style.position = "absolute";
    noBtn.style.left = randomX + "px";
    noBtn.style.top = randomY + "px";
}

// 4. Handle Yes Click
function handleYes() {
    document.getElementById("ask-section").style.display = "none";
    document.getElementById("success-section").style.display = "block";
    document.getElementById("success-section").classList.remove("hidden");
    
    setInterval(updateTimer, 1000);
    updateTimer();
    triggerConfetti();
}

// 5. Timer
function updateTimer() {
    const now = new Date();
    const diff = now - startDate;
    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const m = Math.floor((diff / 1000 / 60) % 60);
    const s = Math.floor((diff / 1000) % 60);
    document.getElementById("timer").innerText = `${d} Days : ${h} Hrs : ${m} Mins : ${s} Secs`;
}

// 6. Confetti
function triggerConfetti() {
    const duration = 3000;
    const end = Date.now() + duration;
    (function frame() {
        confetti({ particleCount: 5, angle: 60, spread: 55, origin: { x: 0 } });
        confetti({ particleCount: 5, angle: 120, spread: 55, origin: { x: 1 } });
        if (Date.now() < end) requestAnimationFrame(frame);
    }());
}
