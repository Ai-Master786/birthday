// Global cart state
let cartItems = [];

// --- Function Definitions ---

// Digital Card Flip Functionality
function initializeDigitalCard() {
    console.log("[Debug] Initializing digital card...");
    const digitalCard = document.querySelector('.digital-card');
    if (digitalCard) {
        digitalCard.addEventListener('click', () => {
            digitalCard.classList.toggle('flipped');
            // Optional: Trigger confetti here as well/instead of inline HTML
            confetti({
                particleCount: 50,
                spread: 90,
                origin: { y: 0.8 }
            });
        });
    } else {
        console.error("[Debug] Digital card element not found.");
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Check if user is logged in
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    const username = sessionStorage.getItem('username');

    if (!isLoggedIn || !username || username !== 'chachi-hbd@1404.anu') {
        // Clear any invalid session data
        sessionStorage.clear();
        // Redirect to login page
        window.location.replace('index.html');
        return;
    }

    // Update profile name
    const profileName = document.querySelector('.profile-section h3');
    if (profileName) {
        profileName.textContent = 'Chachi';
    }

    // Update welcome message with username
    const welcomeMessage = document.querySelector('.personal-message');
    if (welcomeMessage) {
        welcomeMessage.textContent = 'Welcome back, Chachi!';
    }

    // Update birthday title
    const birthdayTitle = document.querySelector('.retro-title');
    if (birthdayTitle) {
        birthdayTitle.textContent = 'Happy Birthday Chachi! 🎉';
    }

    // Initialize all sections
    initializeDigitalCard();
    initializeFoodCards();
    initializeQuiz();
    initializeSecretChamber();
    initializeOrderSystem();
    createConfetti();
    createBubbleBackground();

    // Make sure all sections are visible by default
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.display = 'block';
        section.style.visibility = 'visible';
        section.style.opacity = '1';
    });
});

// Fun Activities Functions
function playBirthdaySong() {
    const audio = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3');
    audio.play();
}

function showVirtualGifts() {
    const gifts = [
        { name: 'Virtual Cake', icon: '🎂' },
        { name: 'Birthday Wishes', icon: '🎉' },
        { name: 'Special Message', icon: '💌' }
    ];

    const giftContainer = document.createElement('div');
    giftContainer.className = 'gift-container';
    giftContainer.innerHTML = `
        <div class="gift-grid">
            ${gifts.map(gift => `
                <div class="gift-item">
                    <span class="gift-icon">${gift.icon}</span>
                    <h4>${gift.name}</h4>
                </div>
            `).join('')}
        </div>
    `;

    document.querySelector('.fun-section').appendChild(giftContainer);
    setTimeout(() => giftContainer.remove(), 3000);
}

function showWishAnimation() {
    const wishContainer = document.createElement('div');
    wishContainer.className = 'wish-container';
    wishContainer.innerHTML = `
        <div class="candles">
            <span>🕯️</span>
            <span>🕯️</span>
            <span>🕯️</span>
        </div>
        <h3>Make a Wish!</h3>
    `;

    document.querySelector('.fun-section').appendChild(wishContainer);
    setTimeout(() => wishContainer.remove(), 3000);
}

// Games Functions
function startPuzzleGame() {
    alert('Puzzle game coming soon!');
}

function rollDice() {
    const dice = document.createElement('div');
    dice.className = 'dice';
    dice.innerHTML = '🎲';
    dice.style.fontSize = '100px';
    dice.style.animation = 'roll 1s ease';
    
    document.querySelector('.play-section').appendChild(dice);
    setTimeout(() => {
        dice.remove();
    }, 1000);
}

function startMemoryGame() {
    alert('Memory game coming soon!');
}

// Countdown Timer
function initializeCountdown() {
    const birthdayDate = new Date('2027-04-14T00:00:00'); // Set to April 14, 2027
    const countdownContainer = document.querySelector('.countdown-container');
    const digitalClock = document.querySelector('.digital-clock');
    
    if (!countdownContainer || !digitalClock) return;

    function updateDigitalClock() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        digitalClock.textContent = `${hours}:${minutes}:${seconds}`;
    }

    function updateCountdown() {
        const now = new Date();
        const difference = birthdayDate - now;

        if (difference <= 0) {
            countdownContainer.innerHTML = '<h2>Happy Birthday! 🎉</h2>';
            createConfetti();
            return;
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        countdownContainer.innerHTML = `
            <div class="countdown-item">
                <span>${days}</span>
                <span>Days</span>
            </div>
            <div class="countdown-item">
                <span>${hours}</span>
                <span>Hours</span>
            </div>
            <div class="countdown-item">
                <span>${minutes}</span>
                <span>Minutes</span>
            </div>
            <div class="countdown-item">
                <span>${seconds}</span>
                <span>Seconds</span>
            </div>
        `;
    }

    // Initialize timers
    updateDigitalClock();
    updateCountdown();
    setInterval(updateDigitalClock, 1000);
    setInterval(updateCountdown, 1000);
}

// Quiz Functionality
function initializeQuiz() {
    console.log('[Debug] Initializing quiz...'); // Debug log
    const questions = [
        {
            question: "What's your favorite dessert?",
            options: ["Chocolates", "Shrikhand", "Brownie"],
            correct: 0
        },
        {
            question: "Which drink do you love most?",
            options: ["Dark Coffee", "Tea", "Juice"],
            correct: 0
        },
        {
            question: "What's your go-to comfort food?",
            options: ["Shawarma", "Pizza", "Burger"],
            correct: 1
        },
        {
            question: "How much did you love this dashboard?",
            options: ["Loved it!", "It's okay", "Not sure"],
            correct: 0
        },
        {
            question: "Are you happy with this surprise?",
            options: ["Yes!", "Maybe", "Not really"],
            correct: 0
        }
    ];

    let currentQuestion = 0;
    const quizContainer = document.querySelector('.quiz-container');
    const quizSection = document.querySelector('.quiz-section');
    
    // Debug logs
    console.log('[Debug] Quiz container found:', quizContainer);
    console.log('[Debug] Quiz section found:', quizSection);
    
    if (!quizContainer || !quizSection) {
        console.error('Quiz elements (.quiz-container or .quiz-section) not found!');
        return;
    }

    // Force visibility of quiz section
    quizSection.style.display = 'block';
    quizSection.style.visibility = 'visible';
    quizSection.style.opacity = '1';
    quizSection.style.position = 'relative'; // Ensure it's not positioned off-screen
    quizSection.style.zIndex = '1'; // Ensure it's not behind other elements

    function displayQuestion() {
        console.log('[Debug] Displaying question:', currentQuestion); // Debug log
        if (currentQuestion >= questions.length) {
             console.log('[Debug] Attempted to display question beyond array length.');
             return; // Avoid errors if currentQuestion is out of bounds
         }
        const question = questions[currentQuestion];
        quizContainer.innerHTML = `
            <div class="quiz-question">
                <h3>${question.question}</h3>
                <div class="quiz-options">
                    ${question.options.map((option, index) => `
                        <button class="quiz-btn" data-index="${index}">
                            ${option}
                        </button>
                    `).join('')}
                </div>
            </div>
        `;
        // Add event listeners AFTER buttons are created
        const buttons = quizContainer.querySelectorAll('.quiz-btn');
        buttons.forEach(button => {
            button.addEventListener('click', () => {
                 checkAnswer(parseInt(button.dataset.index)); // Pass index directly
            });
        });
    }

    // Remove the global checkAnswer function, handle it within initializeQuiz scope
    function checkAnswer(selectedIndex) {
        console.log('[Debug] Answer selected index:', selectedIndex); // Debug log
        const buttons = quizContainer.querySelectorAll('.quiz-btn');
        
        buttons.forEach(button => button.disabled = true);
        
        // Always treat the selected answer as "correct" for UI feedback
         if (buttons[selectedIndex]) { // Check if button exists
            buttons[selectedIndex].style.background = 'linear-gradient(45deg, #4caf50, #8bc34a)'; // Apply green "correct" style
         } else {
             console.error('[Debug] Selected button index not found:', selectedIndex);
         }
        
        createConfetti(); // Add confetti for any answer

        // Proceed to the next question or finish quiz after a delay
        setTimeout(() => {
            currentQuestion++;
            if (currentQuestion < questions.length) {
                displayQuestion();
            } else {
                 console.log('[Debug] Quiz complete.'); // Debug log
                quizContainer.innerHTML = `
                    <div class="quiz-question">
                        <h3>Quiz Complete! 🎉</h3>
                        <p>You're amazing! Thanks for sharing your preferences!</p>
                        <button class="quiz-btn special-surprise-btn">View Surprise</button> 
                    </div>
                `;
                 // Add listener for the final button AFTER it's created
                 const surpriseBtn = quizContainer.querySelector('.special-surprise-btn');
                 if (surpriseBtn) {
                     surpriseBtn.addEventListener('click', showSpecialMessage);
                 }
            }
        }, 1000); // 1 second delay before moving on
    };

    // Display the first question immediately
    if (questions.length > 0) {
        displayQuestion();
    } else {
        console.log('[Debug] No questions available for the quiz.');
    }
}

// Food Cards Functionality
function initializeFoodCards() {
    console.log("[Debug] Initializing food cards..."); // Debug log
    const foodCards = document.querySelectorAll('.food-card');
    const cartButton = document.querySelector('.cart-btn'); 
    const cartCount = document.querySelector('.cart-count'); 

    foodCards.forEach((card, index) => {
        const addToCartBtn = card.querySelector('.add-to-cart');
        const itemName = card.dataset.name;
        const itemPrice = parseFloat(card.dataset.price);
        
        console.log(`[Debug] Card ${index}: Name=${itemName}, Price=${itemPrice}, Button Found: ${!!addToCartBtn}`); // Debug log

        if (addToCartBtn) {
             addToCartBtn.addEventListener('click', () => {
                 console.log(`[Debug] Add to Cart clicked for: ${itemName}`); // Debug log
                // Add item to cart array
                if (itemName && !isNaN(itemPrice)) {
                    cartItems.push({ name: itemName, price: itemPrice });
                    console.log('[Debug] Cart items after add:', JSON.stringify(cartItems)); // Debug log
                    updateOrderSummary(); // Update the summary section
                    
                     // Simple button feedback
                    addToCartBtn.textContent = 'Added!';
                    addToCartBtn.style.backgroundColor = '#28a745'; // Green color
                     setTimeout(() => {
                        addToCartBtn.textContent = 'Add to Cart';
                        addToCartBtn.style.backgroundColor = ''; // Revert color
                     }, 1500);

                    // Update general cart count if elements exist
                    if (cartCount) {
                        cartCount.textContent = cartItems.length;
                    }
                     // Optional: Animate cart icon
                     if (cartButton) {
                         cartButton.classList.add('shake');
                         setTimeout(() => cartButton.classList.remove('shake'), 500);
                     }
                    
                    createConfetti(); // Optional: Confetti on add
                } else {
                    console.error("Missing data-name or data-price on food card:", card);
                }
            });
        } else {
            console.error(`[Debug] Add to Cart button not found for card index ${index}:`, card);
        }
    });
}

// Birthday Countdown Function
function startBirthdayCountdown() {
    const birthdayDate = new Date('2027-04-14T00:00:00');
    const countdownContainer = document.querySelector('.countdown-container');
    const countdownTimer = document.querySelector('.countdown-timer');
    
    if (!countdownContainer || !countdownTimer) return;

    function updateCountdown() {
        const now = new Date();
        const difference = birthdayDate - now;

        if (difference <= 0) {
            countdownContainer.innerHTML = '<h2>Happy Birthday! 🎉</h2>';
            createConfetti();
            return;
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        countdownContainer.innerHTML = `
            <div class="countdown-item">
                <span>${days}</span>
                <span>Days</span>
            </div>
            <div class="countdown-item">
                <span>${hours}</span>
                <span>Hours</span>
            </div>
            <div class="countdown-item">
                <span>${minutes}</span>
                <span>Minutes</span>
            </div>
            <div class="countdown-item">
                <span>${seconds}</span>
                <span>Seconds</span>
            </div>
        `;
    }

    // Update countdown immediately and then every second
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Secret Chamber Functionality
function initializeSecretChamber() {
    const secretBtn = document.querySelector('.secret-chamber-btn'); // Updated selector
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-btn">&times;</span>
            <h2>🔐 Enter Password</h2>
            <input type="password" id="secretPassword" placeholder="Enter the secret password..." autocomplete="off">
            <button id="submitPassword">Unlock</button>
        </div>
    `;
    document.body.appendChild(modal);

    const closeBtn = modal.querySelector('.close-btn');
    const submitBtn = modal.querySelector('#submitPassword');
    const passwordInput = modal.querySelector('#secretPassword');
    
    if (!secretBtn || !modal || !closeBtn || !submitBtn || !passwordInput) return;

    const correctPasswords = ['DEAREST', 'dearest', 'Dearest']; // Accept different cases

    secretBtn.addEventListener('click', () => {
        modal.style.display = 'block';
        modal.style.animation = 'modalFadeIn 0.3s ease-out';
        passwordInput.value = ''; // Clear previous input
        passwordInput.focus(); // Focus the input field
        createConfetti(); // Add confetti when opening secret chamber
    });

    closeBtn.addEventListener('click', () => {
        modal.style.animation = 'modalFadeOut 0.3s ease-out';
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.animation = 'modalFadeOut 0.3s ease-out';
            setTimeout(() => {
                modal.style.display = 'none';
            }, 300);
        }
    });

    // Add keypress event for Enter key
    passwordInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            submitBtn.click();
        }
    });

    submitBtn.addEventListener('click', () => {
        const enteredPassword = passwordInput.value;
        
        if (correctPasswords.includes(enteredPassword)) {
            // --- Start Adding Visualizer ---
            modal.style.animation = 'modalFadeIn 0.5s ease-out'; // Keep fade-in
            modal.innerHTML = `
                <div class="modal-content-stunning secret-revealed">
                    <button class="close-btn-red-stunning">&times;</button>
                    <div class="secret-content-wrapper-stunning">
                        
                        <div class="message-section-stunning">
                            <h3 class="section-title-stunning handwritten-text">A Secret Note For You...</h3>
                            <div class="message-box-stunning para-1-stunning reveal-up-stunning">
                                <p>Welcome to the inner circle, Dearest Chachi! This secret space is reserved *only* for someone as incredibly important and cherished as you are. You\'re not just family; you\'re our rock, our confidante, the one who holds the key to so many of our happiest memories and moments. 🔑❤️</p>
                            </div>
                            <div class="message-box-stunning para-2-stunning reveal-down-stunning">
                                <p>Like a rare and hidden gem, your presence adds a priceless sparkle and immeasurable value to our lives. This little secret chamber is just a small way for us to acknowledge the unique and special place you hold securely within our hearts. Thank you for being *you*! ✨💎🤗</p>
                            </div>
                        </div>
                        
                        <div class="song-section-stunning">
                             <h3 class="section-title-stunning handwritten-text">Melodies For You...</h3>
                            <div class="song-list-stunning">
                                <!-- Songs and visualizers will be dynamically added here -->
                            </div>
                        </div>

                    </div>
                </div>
            `;

            const songListContainer = modal.querySelector('.song-list-stunning');
            let audioContext = null; // Use a single AudioContext
            const visualizerStates = {}; // To store analyser and animation frame IDs

            if (songListContainer) {
                const songs = [
                    { title: "Special Verse 1", file: "Verse 1_.mp3" },
                    { title: "Special Verse 2", file: "Verse 1_ (1).mp3" },
                    { title: "Special Verse 3", file: "Verse 1_ (2).mp3" },
                    { title: "Special Verse 4", file: "Verse 1_ (3).mp3" }
                ];

                let songHTML = '';
                songs.forEach((song, index) => {
                    const canvasId = `visualizer-canvas-${index}`;
                    songHTML += `
                        <div class="song-item-stunning">
                            <span class="song-title-stunning">${song.title}</span>
                            <div class="audio-visualizer-wrapper">
                                <audio controls src="${song.file}" class="audio-player-stunning" data-canvas-id="${canvasId}"></audio>
                                <canvas id="${canvasId}" class="visualizer-canvas-stunning" width="150" height="40"></canvas> 
                            </div>
                        </div>
                    `;
                });
                songListContainer.innerHTML = songHTML;

                // Add event listeners and setup visualizers AFTER adding HTML
                const audioPlayers = songListContainer.querySelectorAll('.audio-player-stunning');
                audioPlayers.forEach(player => {
                    player.addEventListener('play', handlePlay);
                    player.addEventListener('pause', handlePauseOrEnd);
                    player.addEventListener('ended', handlePauseOrEnd);
                });

            } else {
                console.error('Song list container not found!');
            }

            function handlePlay(event) {
                const player = event.target;
                const canvasId = player.dataset.canvasId;
                const canvas = document.getElementById(canvasId);
                if (!canvas) return;
                const canvasCtx = canvas.getContext('2d');

                // Initialize AudioContext only once on first play
                if (!audioContext) {
                    audioContext = new (window.AudioContext || window.webkitAudioContext)();
                }

                // Check if visualizer already setup for this player
                if (!visualizerStates[canvasId]) {
                     try {
                        const source = audioContext.createMediaElementSource(player);
                        const analyser = audioContext.createAnalyser();
                        analyser.fftSize = 128; // Smaller size for fewer bars

                        source.connect(analyser);
                        analyser.connect(audioContext.destination); // Connect to speakers

                        visualizerStates[canvasId] = { analyser, source, animationFrameId: null };
                     } catch (error) {
                        console.error("Error setting up audio node for player:", player, error);
                        // Avoid starting visualization if setup failed
                        return;
                     }
                }
                
                // Start visualization if context is running (needed after user interaction)
                if (audioContext.state === 'suspended') {
                   audioContext.resume();
                }
                
                // Ensure we have the analyser before starting
                 if (visualizerStates[canvasId] && visualizerStates[canvasId].analyser) {
                    startVisualization(canvasId, canvas, canvasCtx);
                 } else {
                     console.error("Analyser not found for canvas:", canvasId);
                 }
            }

            function handlePauseOrEnd(event) {
                const player = event.target;
                const canvasId = player.dataset.canvasId;
                 if (visualizerStates[canvasId] && visualizerStates[canvasId].animationFrameId) {
                    cancelAnimationFrame(visualizerStates[canvasId].animationFrameId);
                    visualizerStates[canvasId].animationFrameId = null;

                    // Clear canvas on pause/end
                     const canvas = document.getElementById(canvasId);
                     if(canvas) {
                        const canvasCtx = canvas.getContext('2d');
                        canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
                     }
                 }
            }

            function startVisualization(canvasId, canvas, canvasCtx) {
                // Ensure analyser exists before proceeding
                if (!visualizerStates[canvasId] || !visualizerStates[canvasId].analyser) {
                     console.error("Cannot start visualization, analyser missing for:", canvasId);
                     return;
                 }
                 const { analyser } = visualizerStates[canvasId];
                const bufferLength = analyser.frequencyBinCount;
                const dataArray = new Uint8Array(bufferLength);

                function draw() {
                    // Stop drawing if animationFrameId was cancelled (e.g., by handlePauseOrEnd)
                    if (!visualizerStates[canvasId] || visualizerStates[canvasId].animationFrameId === null) {
                        return;
                    }
                    visualizerStates[canvasId].animationFrameId = requestAnimationFrame(draw);

                    analyser.getByteFrequencyData(dataArray);

                    canvasCtx.clearRect(0, 0, canvas.width, canvas.height);

                    const barWidth = (canvas.width / bufferLength) * 1.5; // Slightly wider bars
                    let barHeight;
                    let x = 0;

                    for (let i = 0; i < bufferLength; i++) {
                        barHeight = dataArray[i] / 2.5; // Scale height

                        // Use a gradient or dynamic color
                        const gradient = canvasCtx.createLinearGradient(0, canvas.height, 0, canvas.height - barHeight);
                        gradient.addColorStop(0, '#ff8fa3'); // Pink base
                        gradient.addColorStop(1, '#c9184a'); // Deeper top

                        canvasCtx.fillStyle = gradient;
                        canvasCtx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);

                        x += barWidth + 1; // Add spacing between bars
                    }
                }
                // Check if animation is already running before starting a new one
                if (visualizerStates[canvasId].animationFrameId === null) {
                    draw();
                }
            }

            // Add/Update styles
            const additionalStyle = document.createElement('style');
            additionalStyle.id = 'secretChamberStyleStunning';
            additionalStyle.textContent = `
                @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&family=Poppins:wght@400;600&display=swap');
                
                .modal-content-stunning {
                    background: linear-gradient(145deg, #f8f0ff, #e8f5ff);
                    border-radius: 20px;
                    padding: 2rem 2.5rem;
                    position: relative;
                    box-shadow: 0 10px 35px rgba(100, 100, 150, 0.15);
                    border: 1px solid rgba(255, 255, 255, 0.5);
                    max-height: 80vh;
                    overflow-y: auto;
                    font-family: 'Poppins', sans-serif;
                    color: #4a4e69;
                }
                .close-btn-red-stunning {
                    position: absolute;
                    top: 15px;
                    right: 15px;
                    width: 32px;
                    height: 32px;
                    border-radius: 50%;
                    border: none;
                    background: #ff8fa3;
                    color: white;
                    font-size: 18px;
                    line-height: 32px;
                    text-align: center;
                    cursor: pointer;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.15);
                    transition: all 0.3s ease;
                    z-index: 1001;
                }
                .close-btn-red-stunning:hover {
                    background: #ff758f;
                    transform: scale(1.1) rotate(90deg);
                    box-shadow: 0 4px 12px rgba(255, 117, 143, 0.4);
                }
                .secret-content-wrapper-stunning {
                    display: flex;
                    gap: 30px;
                    margin-top: 1rem;
                }
                .message-section-stunning {
                    flex: 1.5;
                    display: flex;
                    flex-direction: column;
                    gap: 1.5rem;
                }
                .song-section-stunning {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                    background: rgba(255, 255, 255, 0.4);
                    padding: 1.5rem;
                    border-radius: 15px;
                    border: 1px solid rgba(255, 255, 255, 0.6);
                    box-shadow: inset 0 1px 3px rgba(0,0,0,0.05);
                }
                .section-title-stunning {
                    font-family: 'Dancing Script', cursive;
                    font-size: 2.2rem;
                    color: #c9184a;
                    text-align: center;
                    margin-bottom: 0.5rem;
                    font-weight: 700;
                }
                .message-box-stunning {
                    background: rgba(255, 255, 255, 0.7);
                    padding: 1.5rem;
                    border-radius: 12px;
                    box-shadow: 0 4px 15px rgba(150, 150, 200, 0.1);
                    border-left: 4px solid #ff8fa3;
                    line-height: 1.7;
                    font-size: 1.05rem;
                    opacity: 0;
                }
                .message-box-stunning p {
                    margin: 0;
                }
                .song-list-stunning {
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    gap: 15px;
                }
                .song-item-stunning {
                    width: 100%;
                    padding: 10px 15px;
                    background: rgba(255, 255, 255, 0.8);
                    border-radius: 8px;
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                    box-shadow: 0 2px 5px rgba(0,0,0,0.08);
                    opacity: 0;
                    transform: translateY(15px);
                    animation: fadeInSlideUpStunning 0.6s ease-out forwards;
                }
                .song-item-stunning:nth-child(1) { animation-delay: 0.5s; }
                .song-item-stunning:nth-child(2) { animation-delay: 0.65s; }
                .song-item-stunning:nth-child(3) { animation-delay: 0.8s; }
                .song-item-stunning:nth-child(4) { animation-delay: 0.95s; }
                .song-title-stunning {
                    font-weight: 600;
                    color: #c9184a;
                    font-size: 0.95rem;
                    text-align: center;
                }
                .audio-visualizer-wrapper {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    width: 100%;
                }
                .audio-player-stunning {
                    flex-grow: 1;
                    height: 40px;
                }
                .audio-player-stunning::-webkit-media-controls-panel {
                    background-color: #f1f3f4;
                    border-radius: 8px;
                    box-shadow: none;
                }
                .audio-player-stunning::-webkit-media-controls-play-button {
                    background-color: #ff8fa3;
                    border-radius: 50%;
                    color: white;
                }
                .audio-player-stunning::-webkit-media-controls-timeline {
                    background-color: #ddd;
                    border-radius: 4px;
                }
                .visualizer-canvas-stunning {
                    width: 150px;
                    height: 40px;
                    background-color: rgba(0,0,0,0.05);
                    border-radius: 4px;
                }
                .reveal-up-stunning {
                    animation: revealUpStunning 0.8s ease-out 0.3s forwards;
                }
                .reveal-down-stunning {
                    animation: revealDownStunning 0.8s ease-out 0.5s forwards;
                }
                @keyframes revealUpStunning {
                    from { opacity: 0; transform: translateY(30px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes revealDownStunning {
                    from { opacity: 0; transform: translateY(-30px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes fadeInSlideUpStunning {
                    from { opacity: 0; transform: translateY(15px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `;
            
            // Clean up previous styles first
             const oldStyle = document.getElementById('secretChamberStyleStunning'); 
             if(oldStyle) oldStyle.remove(); 
             const oldAdditionalStyle = modal.querySelector('style');
             if (oldAdditionalStyle) oldAdditionalStyle.remove();

            document.head.appendChild(additionalStyle);

            // Reattach close button event listener
            const newCloseBtn = modal.querySelector('.close-btn-red-stunning');
            newCloseBtn.addEventListener('click', () => {
                modal.style.animation = 'modalFadeOut 0.3s ease-out';
                // Stop all visualizers and handle context when modal closes
                 Object.keys(visualizerStates).forEach(canvasId => {
                     if (visualizerStates[canvasId] && visualizerStates[canvasId].animationFrameId) {
                         cancelAnimationFrame(visualizerStates[canvasId].animationFrameId);
                         visualizerStates[canvasId].animationFrameId = null; // Mark as stopped
                     }
                     // Optional: Clean up audio nodes if desired (might cause issues if modal is reopened quickly)
                     // if (visualizerStates[canvasId] && visualizerStates[canvasId].source) {
                     //    visualizerStates[canvasId].source.disconnect();
                     // }
                 });
                 // Consider closing context only if sure it won't be needed again soon
                 // if (audioContext && audioContext.state !== 'closed') {
                 //      audioContext.close().then(() => audioContext = null);
                 // }

                setTimeout(() => {
                    modal.style.display = 'none';
                    const styleTag = document.getElementById('secretChamberStyleStunning');
                    if (styleTag) styleTag.remove();
                }, 300);
            });
            
            createConfetti(); 
            // --- End Adding Visualizer ---

        } else {
            passwordInput.style.borderColor = '#f44336';
            passwordInput.style.animation = 'shake 0.5s ease-in-out';
            setTimeout(() => {
                passwordInput.style.borderColor = '#e73c7e';
                passwordInput.style.animation = '';
            }, 1000);
        }
    });

    // Add necessary styles for initial modal (password entry)
    const style = document.createElement('style');
    style.textContent = `
        .modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            backdrop-filter: blur(8px);
            z-index: 1000;
        }

        .modal-content {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: white;
            padding: 2rem;
            border-radius: 20px;
            text-align: center;
            max-width: 90%;
            width: 400px;
            box-shadow: 0 5px 25px rgba(0, 0, 0, 0.2);
        }

       .modal-content h2 {
            color: #333;
            margin-bottom: 1.5rem;
        }

        .close-btn {
            position: absolute;
            top: 10px;
            right: 15px;
            font-size: 24px;
            cursor: pointer;
            color: #aaa;
            transition: all 0.3s ease;
        }

        .close-btn:hover {
            transform: scale(1.2);
            color: #555;
        }

        #secretPassword {
            width: calc(100% - 40px);
            padding: 12px 20px;
            margin: 15px 0;
            border: 1px solid #ccc;
            border-radius: 25px;
            font-size: 1rem;
            outline: none;
            transition: border-color 0.3s ease;
        }
        #secretPassword:focus {
             border-color: #ff8fa3;
             box-shadow: 0 0 0 3px rgba(255, 143, 163, 0.2);
        }

        #submitPassword {
            background: linear-gradient(45deg, #ff8fa3, #c9184a);
            color: white;
            border: none;
            padding: 12px 30px;
            border-radius: 25px;
            font-size: 1rem;
            cursor: pointer;
            transition: all 0.3s ease;
            margin-top: 10px;
        }

        #submitPassword:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(255, 117, 143, 0.3);
        }

        @keyframes modalFadeIn {
            from { opacity: 0; transform: translate(-50%, -55%); }
            to { opacity: 1; transform: translate(-50%, -50%); }
        }

        @keyframes modalFadeOut {
            from { opacity: 1; transform: translate(-50%, -50%); }
            to { opacity: 0; transform: translate(-50%, -45%); }
        }

        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-10px); }
            75% { transform: translateX(10px); }
        }
        
        /* Initial hide for stunning modal content style block */
        #secretChamberStyleStunning { display: none; } 
    `;
    document.head.appendChild(style);
}

// Revamped showSpecialMessage function
function showSpecialMessage() {
    // Remove existing styles/elements if they exist to prevent duplicates
    const existingOverlay = document.querySelector('.message-overlay-unique');
    const existingContainer = document.querySelector('.special-message-container-unique');
    const existingStyle = document.getElementById('specialMessageStyleUnique');
    if (existingOverlay) existingOverlay.remove();
    if (existingContainer) existingContainer.remove();
    if (existingStyle) existingStyle.remove();

    const overlay = document.createElement('div');
    overlay.className = 'message-overlay-unique';

    const messageContainer = document.createElement('div');
    messageContainer.className = 'special-message-container-unique';

    // Elaborated 9th message split into two paragraphs
    messageContainer.innerHTML = `
        <div class="special-message-content-unique">
            <button class="close-message-btn-red-unique">&times;</button>
            <div class="message-para-1 reveal-up">
                <p class="handwritten-text">Dear Chachi,</p>
                <p class="main-text">More than anything, we wish you a world overflowing with happiness – the kind that bubbles up in everyday moments and the deep joy that comes from seeing dreams come true. 😊 We wish you vibrant health, boundless energy, and a peaceful mind to enjoy every single day to its fullest. 💪🧘‍♀️</p>
            </div>
            <div class="separator-line fade-in-delay"></div>
            <div class="message-para-2 reveal-down">
                <p class="main-text">May you always be surrounded by love – the unwavering love of family, the cherished connection with friends, and the quiet strength of self-love. ❤️ You bring so much light into the world, and you truly deserve all the best things life has to offer. Never forget how incredibly valued and deserving you are! 💐✨</p>
                <p class="signature-text handwritten-text">- Your Loving Family</p>
            </div>
        </div>
        <div class="particle-effect"></div>
    `;

    document.body.appendChild(overlay);
    document.body.appendChild(messageContainer);

    const style = document.createElement('style');
    style.id = 'specialMessageStyleUnique';
    style.textContent = `
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&family=Poppins:wght@400;600&display=swap');

        .message-overlay-unique {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, rgba(255, 105, 135, 0.85), rgba(255, 158, 105, 0.85));
            backdrop-filter: blur(10px);
            z-index: 999;
            animation: fadeInOverlay 0.5s ease-out;
            overflow: hidden;
        }

        .particle-effect::before, .particle-effect::after {
            content: '';
            position: absolute;
            width: 5px;
            height: 5px;
            background: rgba(255, 255, 255, 0.6);
            border-radius: 50%;
            animation: floatParticles 20s linear infinite;
        }
        .particle-effect::before { top: 10%; left: 20%; animation-duration: 15s; }
        .particle-effect::after { top: 70%; left: 80%; animation-duration: 25s; opacity: 0.7; }

        @keyframes floatParticles {
            0% { transform: translate(0, 0); }
            50% { transform: translate(20px, -50px); opacity: 0.8; }
            100% { transform: translate(0, -100vh); opacity: 0; }
        }


        .special-message-container-unique {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) scale(0.8);
            background: rgba(255, 255, 255, 0.9);
            border-radius: 25px;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
            z-index: 1000;
            width: 90%;
            max-width: 550px;
            padding: 2.5rem;
            border: 1px solid rgba(255, 255, 255, 0.2);
            animation: popInContainer 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.2s forwards;
            opacity: 0;
        }

        .special-message-content-unique {
            text-align: center;
            font-family: 'Poppins', sans-serif;
            color: #444;
        }

        .close-message-btn-red-unique {
            position: absolute;
            top: 10px;
            right: 10px;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            border: none;
            background: #ff6b6b;
            color: white;
            font-size: 18px;
            line-height: 30px;
            text-align: center;
            cursor: pointer;
            box-shadow: 0 2px 8px rgba(0,0,0,0.2);
            transition: all 0.3s ease;
            z-index: 1001;
        }

        .close-message-btn-red-unique:hover {
            background: #ff4757;
            transform: scale(1.15) rotate(90deg);
            box-shadow: 0 4px 12px rgba(255, 71, 87, 0.4);
        }

        .message-para-1, .message-para-2 {
            margin-bottom: 1.5rem;
            opacity: 0;
            transform: translateY(20px);
        }

        .message-para-1 { animation: revealUp 0.8s ease-out 0.5s forwards; }
        .message-para-2 { animation: revealDown 0.8s ease-out 0.7s forwards; }

        .handwritten-text {
            font-family: 'Dancing Script', cursive;
            font-size: 1.8rem;
            color: #e84393;
            margin-bottom: 0.5rem;
            font-weight: 700;
        }

        .main-text {
            font-size: 1.1rem;
            line-height: 1.7;
            color: #555;
        }

        .separator-line {
            width: 50%;
            height: 1px;
            background: linear-gradient(to right, transparent, #e84393, transparent);
            margin: 2rem auto;
            opacity: 0;
            animation: fadeIn 1s ease 1s forwards;
        }

        .signature-text {
            margin-top: 1.5rem;
            font-size: 1.6rem;
            text-align: right;
            color: #e84393;
        }

        @keyframes fadeInOverlay {
            from { opacity: 0; }
            to { opacity: 1; }
        }

        @keyframes popInContainer {
            from { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
            to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        }

        @keyframes revealUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
        }
         @keyframes revealDown {
            from { opacity: 0; transform: translateY(-30px); }
            to { opacity: 1; transform: translateY(0); }
        }

        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }

         @keyframes fadeOut {
             from { opacity: 1; }
             to { opacity: 0; }
         }

         @keyframes scaleDown {
             from { opacity: 1; transform: translate(-50%, -50%) scale(1); }
             to { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
         }

    `;
    document.head.appendChild(style);

    // Close function
    const closeMessage = () => {
        messageContainer.style.animation = 'scaleDown 0.4s ease-in forwards';
        overlay.style.animation = 'fadeOut 0.4s ease-in forwards';
        setTimeout(() => {
            overlay.remove();
            messageContainer.remove();
            const styleTag = document.getElementById('specialMessageStyleUnique');
            if (styleTag) styleTag.remove();
        }, 400);
    };

    // Event listener for the X button
    const closeSpecialMessageBtn = messageContainer.querySelector('.close-message-btn-red-unique');
    closeSpecialMessageBtn.addEventListener('click', closeMessage);

    // Event listener for clicking outside the message box (on the overlay)
    overlay.addEventListener('click', closeMessage);

    // Prevent clicks inside the container from closing it (important!)
    messageContainer.addEventListener('click', (event) => {
        event.stopPropagation();
    });

    // createConfetti();
}

// Confetti Animation
function createConfetti() {
    const colors = ['#FF577F', '#FF884B', '#FDBF50', '#4BC0C0', '#9F5AFF', '#FF4B91', '#FFC107', '#03A9F4'];
    const confettiCount = 200;
    const container = document.body;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        
        const size = Math.random() * 12 + 5;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const shape = Math.random() > 0.7 ? 
                    (Math.random() > 0.5 ? 'triangle' : 'star') : 
                    (Math.random() > 0.5 ? 'circle' : 'square');
        
        const startX = Math.random() * window.innerWidth;
        const startY = -30;
        
        const duration = Math.random() * 4 + 2;
        const delay = Math.random() * 0.5;
        
        confetti.style.left = `${startX}px`;
        confetti.style.top = `${startY}px`;
        confetti.style.width = `${size}px`;
        confetti.style.height = `${size}px`;
        confetti.style.backgroundColor = color;
        
        if (shape === 'circle') {
            confetti.style.borderRadius = '50%';
        } else if (shape === 'triangle') {
            confetti.style.backgroundColor = 'transparent';
            confetti.style.borderBottom = `${size}px solid ${color}`;
            confetti.style.borderLeft = `${size/2}px solid transparent`;
            confetti.style.borderRight = `${size/2}px solid transparent`;
            confetti.style.height = '0';
            confetti.style.width = '0';
        } else if (shape === 'star') {
            confetti.style.backgroundColor = 'transparent';
            confetti.style.boxShadow = `0 0 0 ${color}, 0 0 0 ${color}, 0 0 0 ${color}, 0 0 0 ${color}`;
            confetti.className = 'confetti star';
        }
        
        confetti.style.opacity = Math.random() * 0.5 + 0.5;
        confetti.style.animationDelay = `${delay}s`;
        confetti.style.animation = `confettiFall ${duration}s ease-in forwards`;
        confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
        
        container.appendChild(confetti);
        
        setTimeout(() => {
            confetti.remove();
        }, (duration + delay) * 1000);
    }
}

// Add floating bubbles to the background
function createBubbleBackground() {
    const bubbleContainer = document.createElement('div');
    bubbleContainer.className = 'bubble-container';
    document.body.appendChild(bubbleContainer);
    
    for (let i = 0; i < 20; i++) {
        const bubble = document.createElement('div');
        bubble.className = 'bubble';
        
        const size = Math.random() * 60 + 20;
        const position = Math.random() * 100;
        const delay = Math.random() * 15;
        const duration = Math.random() * 10 + 10;
        
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        bubble.style.left = `${position}%`;
        bubble.style.animationDelay = `${delay}s`;
        bubble.style.animationDuration = `${duration}s`;
        
        bubbleContainer.appendChild(bubble);
    }
}

// Create fireworks effect
function createFireworks() {
    const fireworksContainer = document.createElement('div');
    fireworksContainer.className = 'fireworks-container';
    document.body.appendChild(fireworksContainer);
    
    const colors = ['#FF577F', '#FF884B', '#FDBF50', '#4BC0C0', '#9F5AFF', '#FF4B91'];
    
    function createFirework() {
        const firework = document.createElement('div');
        firework.className = 'firework';
        
        const posX = Math.random() * window.innerWidth;
        const posY = window.innerHeight + Math.random() * 50;
        
        firework.style.left = `${posX}px`;
        firework.style.top = `${posY}px`;
        
        const targetX = posX + (Math.random() * 200 - 100);
        const targetY = Math.random() * (window.innerHeight * 0.5);
        
        fireworksContainer.appendChild(firework);
        
        const rocketDuration = Math.random() * 0.5 + 1;
        firework.animate([
            { top: `${posY}px`, opacity: 1 },
            { top: `${targetY}px`, opacity: 0.8 }
        ], {
            duration: rocketDuration * 1000,
            easing: 'ease-out'
        }).onfinish = () => {
            firework.remove();
            createExplosion(targetX, targetY, colors[Math.floor(Math.random() * colors.length)]);
        };
    }
    
    function createExplosion(x, y, color) {
        const particleCount = 50 + Math.floor(Math.random() * 50);
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'firework-particle';
            
            particle.style.left = `${x}px`;
            particle.style.top = `${y}px`;
            particle.style.backgroundColor = color;
            
            const size = Math.random() * 6 + 2;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            
            fireworksContainer.appendChild(particle);
            
            const angle = Math.random() * Math.PI * 2;
            const velocity = Math.random() * 5 + 5;
            const vx = Math.cos(angle) * velocity;
            const vy = Math.sin(angle) * velocity;
            
            const duration = Math.random() * 1 + 0.8;
            particle.animate([
                { 
                    transform: 'translate(0, 0) scale(1)', 
                    opacity: 1 
                },
                { 
                    transform: `translate(${vx * 20}px, ${vy * 20}px) scale(0)`,
                    opacity: 0 
                }
            ], {
                duration: duration * 1000,
                easing: 'ease-out'
            }).onfinish = () => {
                particle.remove();
            };
        }
    }
    
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            createFirework();
        }, i * 300);
    }
}

// --- Add New Functions for Order System ---

function initializeOrderSystem() {
    const orderNowBtn = document.getElementById('order-now-btn');
    const paymentModal = document.getElementById('payment-modal');
    const paymentForm = document.getElementById('payment-form');
    const closePaymentBtn = paymentModal.querySelector('.close-payment-btn');
    const paymentError = document.getElementById('payment-error');

    // Show payment modal
    orderNowBtn.addEventListener('click', () => {
        if (cartItems.length > 0) {
            paymentModal.style.display = 'flex';
            paymentError.style.display = 'none'; // Hide previous errors
        }
    });

    // Close payment modal
    closePaymentBtn.addEventListener('click', () => {
        paymentModal.style.display = 'none';
    });
    paymentModal.addEventListener('click', (event) => {
        if (event.target === paymentModal) { // Click outside content
            paymentModal.style.display = 'none';
        }
    });

    // Handle payment form submission
    paymentForm.addEventListener('submit', (event) => {
        event.preventDefault();
        paymentError.style.display = 'none'; // Hide previous errors

        const cardNameInput = document.getElementById('cardName');
        const cardNumberInput = document.getElementById('cardNumber');
        const cardExpiryInput = document.getElementById('cardExpiry');
        const cardCVVInput = document.getElementById('cardCVV');

        // --- Strict Validation --- 
        const expectedName = "Zakiurrehman";
        const expectedNumber = "5340100063653220";
        const expectedExpiry = "03/28";
        const expectedCVV = "102";

        // Normalize input (remove spaces, compare case-insensitively for name if needed)
        const enteredName = cardNameInput.value.trim();
        const enteredNumber = cardNumberInput.value.replace(/\s+/g, ''); // Remove spaces
        const enteredExpiry = cardExpiryInput.value.trim();
        const enteredCVV = cardCVVInput.value.trim();

        if (
            enteredName === expectedName &&
            enteredNumber === expectedNumber &&
            enteredExpiry === expectedExpiry &&
            enteredCVV === expectedCVV
        ) {
            // Payment Success
            paymentModal.style.display = 'none';
            paymentForm.reset(); // Clear form
            showOrderPlacedAnimation();
            cartItems = []; // Clear the cart
            updateOrderSummary(); // Update UI
        } else {
            // Payment Failed
            paymentError.textContent = "Invalid payment details. Please check and try again.";
            paymentError.style.display = 'block';
        }
    });
    
    // Initial summary update (in case of page reload with items? Though cart is not persistent now)
    updateOrderSummary();
    addOrderSystemStyles(); // Inject CSS
}

function updateOrderSummary() {
    console.log('[Debug] updateOrderSummary called. Cart length:', cartItems.length); // Debug log
    const orderItemsList = document.getElementById('order-items');
    const orderTotalElement = document.getElementById('order-total');
    const orderNowBtn = document.getElementById('order-now-btn');

    // Ensure elements exist before proceeding
    if (!orderItemsList || !orderTotalElement || !orderNowBtn) {
        console.error("[Debug] Order summary elements not found!");
        return;
    }

    orderItemsList.innerHTML = ''; // Clear previous items

    if (cartItems.length === 0) {
        orderItemsList.innerHTML = '<li class="no-items">Your cart is empty.</li>';
        orderTotalElement.textContent = '₹0.00';
        orderNowBtn.disabled = true;
    } else {
        let total = 0;
        cartItems.forEach(item => {
            const li = document.createElement('li');
            li.className = 'order-item';
            li.innerHTML = `
                <span class="item-name">${item.name}</span>
                <span class="item-price">₹${item.price.toFixed(2)}</span>
            `;
            orderItemsList.appendChild(li);
            // Ensure price is a number before adding
            if (typeof item.price === 'number' && !isNaN(item.price)) {
                 total += item.price;
            } else {
                 console.warn(`[Debug] Invalid price found for item: ${item.name}`, item.price);
            }
        });
        orderTotalElement.textContent = `₹${total.toFixed(2)}`;
        orderNowBtn.disabled = false;
    }
}

function showOrderPlacedAnimation() {
    const animationContainer = document.getElementById('order-placed-animation');
    if (!animationContainer) return;

    const messageElement = animationContainer.querySelector('p');
    if (messageElement) {
         messageElement.textContent = 'Order Placed!'; // Reset text initially
         messageElement.style.opacity = '0'; // Hide text initially
         messageElement.style.transform = 'translateY(10px)'; // Start slightly lower
     }

    animationContainer.style.display = 'flex';

    // Restart CSS animation for checkmark
    const checkmark = animationContainer.querySelector('.checkmark');
    // Optional: Force reflow/restart animation if needed
    checkmark.style.animation = 'none';
    checkmark.offsetHeight; /* trigger reflow */
    checkmark.style.animation = ''; 

    // Wait for checkmark animation to roughly finish (around 1.2s)
    setTimeout(() => {
        if (messageElement) {
             messageElement.textContent = 'Order Placed! Estimated Delivery: 14/04/2027';
             messageElement.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
             messageElement.style.opacity = '1';
             messageElement.style.transform = 'translateY(0)';
         }
    }, 1500); // Show message after 1.5 seconds
    
    // Hide the entire overlay after a longer duration
    setTimeout(() => {
        animationContainer.style.display = 'none';
    }, 3500); // Increased display time to show the date
}

// Add styles for the order summary, payment modal, and animation
function addOrderSystemStyles() {
     const styleId = 'orderSystemStyles';
     if (document.getElementById(styleId)) return; // Don't add styles multiple times

    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
        .order-summary-section {
            background: linear-gradient(to right, #fce3ec, #fde4e4); /* Soft pink gradient */
            padding: 25px;
            border-radius: 15px;
            margin: 20px auto;
            max-width: 800px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
        }
        .order-summary-container {
            background: rgba(255, 255, 255, 0.7);
            padding: 20px;
            border-radius: 10px;
            backdrop-filter: blur(5px);
        }
        .order-items-list {
            list-style: none;
            padding: 0;
            margin: 0 0 15px 0;
            max-height: 150px; /* Limit height and allow scroll */
            overflow-y: auto;
        }
        .order-item {
            display: flex;
            justify-content: space-between;
            padding: 8px 5px;
            border-bottom: 1px dashed #ffc2d1;
            font-size: 0.95rem;
        }
        .order-item:last-child {
            border-bottom: none;
        }
        .item-name { color: #5c2751; }
        .item-price { font-weight: bold; color: #e85d75; }
        .no-items {
            text-align: center;
            color: #888;
            padding: 15px;
            font-style: italic;
        }
        .order-total-container {
            display: flex;
            justify-content: flex-end;
            align-items: center;
            font-size: 1.2rem;
            font-weight: bold;
            margin-top: 15px;
            padding-top: 10px;
            border-top: 1px solid #ffc2d1;
        }
        .total-label { margin-right: 10px; color: #5c2751; }
        .total-price { color: #e85d75; }

        .order-now-button {
            display: block;
            width: 100%;
            padding: 12px;
            margin-top: 20px;
            background: linear-gradient(45deg, #ff758f, #c9184a);
            color: white;
            border: none;
            border-radius: 8px;
            font-size: 1.1rem;
            cursor: pointer;
            transition: all 0.3s ease;
            text-align: center;
        }
        .order-now-button:disabled {
            background: #ccc;
            cursor: not-allowed;
            opacity: 0.7;
        }
        .order-now-button:not(:disabled):hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 10px rgba(201, 24, 74, 0.3);
        }

        /* Payment Modal Styles */
        .payment-modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.7);
            backdrop-filter: blur(5px);
            display: flex; /* Use flex to center content */
            align-items: center;
            justify-content: center;
            z-index: 1050; /* Above other modals */
            opacity: 0; /* Start hidden for animation */
            animation: fadeInOverlay 0.3s ease forwards;
        }
        .payment-modal-content {
            background: white;
            padding: 30px;
            border-radius: 15px;
            max-width: 450px;
            width: 90%;
            position: relative;
            box-shadow: 0 5px 25px rgba(0,0,0,0.2);
            transform: scale(0.9); /* Start smaller */
            animation: scaleInModal 0.3s ease forwards;
        }
         .payment-modal-content h3 {
            text-align: center;
            margin-top: 0;
            margin-bottom: 25px;
            color: #333;
         }
        .close-payment-btn {
            position: absolute;
            top: 10px;
            right: 15px;
            background: none;
            border: none;
            font-size: 24px;
            color: #aaa;
            cursor: pointer;
        }
         .close-payment-btn:hover { color: #555; }

        #payment-form .form-group {
            margin-bottom: 15px;
        }
        #payment-form label {
            display: block;
            margin-bottom: 5px;
            font-size: 0.9rem;
            color: #555;
        }
        #payment-form input[type="text"],
        #payment-form input[type="password"] {
            width: 100%;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 5px;
            font-size: 1rem;
            box-sizing: border-box; /* Include padding in width */
        }
         #payment-form input:focus {
            border-color: #ff8fa3;
            box-shadow: 0 0 0 2px rgba(255, 143, 163, 0.2);
            outline: none;
        }
        #payment-form .form-row {
            display: flex;
            gap: 15px;
        }
        #payment-form .form-row .form-group {
            flex: 1;
        }
        .pay-now-button {
             display: block;
            width: 100%;
            padding: 12px;
            margin-top: 20px;
            background: linear-gradient(45deg, #56ab2f, #a8e063); /* Green gradient */
            color: white;
            border: none;
            border-radius: 8px;
            font-size: 1.1rem;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        .pay-now-button:hover {
             background: linear-gradient(45deg, #4a9a27, #94c754);
             transform: translateY(-1px);
             box-shadow: 0 3px 8px rgba(86, 171, 47, 0.3);
        }

        /* Order Placed Animation Styles */
        #order-placed-animation {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.7);
            backdrop-filter: blur(5px);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            z-index: 1100; /* Above payment modal */
            color: white;
            font-size: 1.5rem;
        }
        .checkmark__circle {
            stroke-dasharray: 166;
            stroke-dashoffset: 166;
            stroke-width: 2;
            stroke-miterlimit: 10;
            stroke: #7ac142;
            fill: none;
            animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
        }
        .checkmark {
            width: 100px;
            height: 100px;
            border-radius: 50%;
            display: block;
            stroke-width: 3;
            stroke: #fff;
            stroke-miterlimit: 10;
            margin: 10% auto;
            box-shadow: inset 0px 0px 0px #7ac142;
            animation: fill .4s ease-in-out .4s forwards, scale .3s ease-in-out .9s both;
            margin-bottom: 20px;
        }
        .checkmark__check {
            transform-origin: 50% 50%;
            stroke-dasharray: 48;
            stroke-dashoffset: 48;
            animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards;
        }
        @keyframes stroke {
            100% { stroke-dashoffset: 0; }
        }
        @keyframes scale {
            0%, 100% { transform: none; }
            50% { transform: scale3d(1.1, 1.1, 1); }
        }
        @keyframes fill {
            100% { box-shadow: inset 0px 0px 0px 50px #7ac142; }
        }
         @keyframes fadeInOverlay {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes scaleInModal {
            from { opacity: 0; transform: scale(0.9); }
            to { opacity: 1; transform: scale(1); }
        }

    `;
    document.head.appendChild(style);
}