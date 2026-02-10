/**
 * Valentine Proposal Website - Main JavaScript
 * Handles page transitions, interactive elements, and celebration animations
 */

// ===== PAGE NAVIGATION =====
/**
 * Navigate between pages with smooth transitions
 * @param {number} pageNumber - The page number to navigate to (1-5)
 */
function goToPage(pageNumber) {
    // Remove active class from all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));
    
    // Add active class to target page
    const targetPage = document.getElementById(`page${pageNumber}`);
    targetPage.classList.add('active');
    
    // Special handling for Page 3 (auto-transition after 2 seconds)
    if (pageNumber === 3) {
        setTimeout(() => {
            goToPage(4);
        }, 2000);
    }
    
    // Special handling for Page 5 (celebration)
    if (pageNumber === 5) {
        startCelebration();
    }
}

// ===== PAGE 4: MOVING "NO" BUTTON =====
/**
 * Move the "No" button to a random position when user tries to hover/click
 * Makes it impossible to select "No"
 */
function moveButton() {
    const noButton = document.getElementById('noButton');
    const container = noButton.parentElement.parentElement;
    
    // Get container dimensions
    const containerRect = container.getBoundingClientRect();
    const buttonRect = noButton.getBoundingClientRect();
    
    // Calculate maximum positions (ensure button stays within viewport)
    const maxX = window.innerWidth - buttonRect.width - 40; // 40px padding
    const maxY = window.innerHeight - buttonRect.height - 40;
    
    // Generate random position
    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;
    
    // Apply position with smooth transition
    noButton.style.position = 'fixed';
    noButton.style.left = `${randomX}px`;
    noButton.style.top = `${randomY}px`;
    noButton.style.transition = 'all 0.3s ease';
}

// ===== PAGE 5: CELEBRATION ANIMATIONS =====
/**
 * Start celebration animations when user says YES
 * Includes floating hearts and confetti
 */
function startCelebration() {
    createFloatingHearts();
    createConfetti();
}

/**
 * Create floating hearts animation
 */
function createFloatingHearts() {
    const heartsContainer = document.getElementById('heartsContainer');
    const heartEmojis = ['❤️', '💕', '💖', '💗', '💓', '💝', '🤍'];
    
    // Create hearts at intervals
    setInterval(() => {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
        
        // Random horizontal position
        heart.style.left = `${Math.random() * 100}%`;
        
        // Random animation delay
        heart.style.animationDelay = `${Math.random() * 2}s`;
        
        heartsContainer.appendChild(heart);
        
        // Remove heart after animation completes
        setTimeout(() => {
            heart.remove();
        }, 4000);
    }, 300);
}

/**
 * Create confetti animation
 */
function createConfetti() {
    const confettiContainer = document.getElementById('confettiContainer');
    const colors = ['#FF6B9D', '#FFA3C7', '#C490E4', '#FFB6C1', '#FF1744', '#FF5252'];
    
    // Create confetti pieces
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            
            // Random color
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            
            // Random horizontal position
            confetti.style.left = `${Math.random() * 100}%`;
            
            // Random animation delay and duration
            confetti.style.animationDelay = `${Math.random() * 3}s`;
            confetti.style.animationDuration = `${2 + Math.random() * 2}s`;
            
            confettiContainer.appendChild(confetti);
            
            // Remove confetti after animation
            setTimeout(() => {
                confetti.remove();
            }, 5000);
        }, i * 100);
    }
    
    // Continue creating confetti
    setInterval(() => {
        for (let i = 0; i < 10; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.className = 'confetti';
                confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.left = `${Math.random() * 100}%`;
                confetti.style.animationDuration = `${2 + Math.random() * 2}s`;
                
                confettiContainer.appendChild(confetti);
                
                setTimeout(() => {
                    confetti.remove();
                }, 5000);
            }, i * 100);
        }
    }, 3000);
}

// ===== RESET FUNCTION =====
/**
 * Reset the entire experience back to Page 1
 * Allows user to start over
 */
function resetExperience() {
    // Clear any existing intervals (stop confetti/hearts creation)
    const heartsContainer = document.getElementById('heartsContainer');
    const confettiContainer = document.getElementById('confettiContainer');
    
    if (heartsContainer) heartsContainer.innerHTML = '';
    if (confettiContainer) confettiContainer.innerHTML = '';
    
    // Reset "No" button position
    const noButton = document.getElementById('noButton');
    if (noButton) {
        noButton.style.position = 'relative';
        noButton.style.left = 'auto';
        noButton.style.top = 'auto';
    }
    
    // Go back to Page 1
    goToPage(1);
}

// ===== PREVENT ACCIDENTAL PAGE REFRESH =====
/**
 * Prevent accidental page refresh on Page 5
 */
window.addEventListener('beforeunload', (e) => {
    const page5 = document.getElementById('page5');
    if (page5 && page5.classList.contains('active')) {
        e.preventDefault();
        e.returnValue = '';
    }
});

// ===== INITIALIZE =====
/**
 * Initialize the website on page load
 */
document.addEventListener('DOMContentLoaded', () => {
    // Ensure Page 1 is active on load
    goToPage(1);
    
    // Add touch event listeners for mobile
    const noButton = document.getElementById('noButton');
    if (noButton) {
        noButton.addEventListener('touchstart', (e) => {
            e.preventDefault();
            moveButton();
        });
    }
});
