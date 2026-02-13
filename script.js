// Function to personalize the name from URL (e.g., website.com?name=Sita)
window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get('name');
    
    if (name) {
        document.getElementById("main-question").innerText = `Will you be my Valentine, ${name}?`;
    }
};

// Function to handle "Yes" button click
function handleYes() {
    document.getElementById("question-screen").style.display = "none";
    document.getElementById("success-screen").style.display = "block";
    document.getElementById("success-screen").classList.remove("hidden");
    
    // Trigger Confetti Animation
    triggerConfetti();
}

// Function to move "No" button randomly
function moveButton() {
    const noBtn = document.getElementById("no-btn");
    const container = document.querySelector(".container");
    
    // Get container dimensions
    const containerRect = container.getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();
    
    // Calculate random position within the container
    // Subtracting button size to ensure it stays inside
    const maxX = containerRect.width - btnRect.width;
    const maxY = containerRect.height - btnRect.height;
    
    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);
    
    // Apply new position
    noBtn.style.position = "absolute";
    noBtn.style.left = randomX + "px";
    noBtn.style.top = randomY + "px";
}

// Confetti Effect Configuration
function triggerConfetti() {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min, max) => Math.random() * (max - min) + min;

    const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        
        // Launch confetti from both sides
        confetti(Object.assign({}, defaults, { 
            particleCount, 
            origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } 
        }));
        confetti(Object.assign({}, defaults, { 
            particleCount, 
            origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } 
        }));
    }, 250);
}
