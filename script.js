// --- TOOL SCORES DATA ---
const toolScores = {
    'Google Workspace': 10, 'Figma': 9, 'Adobe Color': 9, 'Miro Collaboration Platform': 8,
    'Adobe XD': 8, 'Jira': 7, 'Adobe Firefly': 7, 'Slack': 6, 'After Effects': 6, 
    'Adobe Premiere Pro': 6, 'Adobe Photoshop': 6, 'Adobe Illustrator': 6, 'Blender': 5
};

// --- RENDER FUNCTIONS ---

// Function to inject proficiency bars into the collapsible Skills section
function renderProficiencyBars(scores) {
    const container = document.getElementById('proficiency-container');
    if (!container) return;

    const html = Object.entries(scores).map(([tool, score]) => `
        <div class="text-sm">
            <p>${tool} (${score}/10)</p>
            <div class="progress-bar">
                <div class="progress-fill" style="width: ${score * 10}%;"></div>
            </div>
        </div>
    `).join('');
    container.innerHTML = html;
}

// Placeholder function for the Spotlight Effect (CSS approximation)
function initSpotlightBackground() {
    const container = document.getElementById('spotlight-container');
    if (!container) return;
    
    // Apply full-screen dark background and gradient effect using CSS properties
    container.style.position = 'fixed';
    container.style.top = '0';
    container.style.left = '0';
    container.style.width = '100%';
    container.style.height = '100%';
    container.style.zIndex = '-1';
    container.style.backgroundColor = 'rgba(0,0,0,0.96)';
    
    // Create a subtle radial gradient 'spotlight' (CSS approximation)
    container.style.background = `
        radial-gradient(
            circle at 50% 50%, 
            rgba(99, 102, 241, 0.15) 0%, 
            rgba(15, 23, 42, 1) 75%
        ),
        ${container.style.backgroundColor}
    `;
}


// --- SCROLL ANIMATION & PARALLAX EFFECT ---
function checkScrollAnimations() {
    const elements = document.querySelectorAll('.scroll-animate');
    const scrollPos = window.scrollY || window.pageYOffset;
    const windowHeight = window.innerHeight;

    elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        const elTop = rect.top + scrollPos;
        const elBottom = rect.bottom + scrollPos;

        const isVisible = elTop < (scrollPos + windowHeight * 0.85) && elBottom > scrollPos;

        if (isVisible) {
            el.classList.add('scroll-visible');
        } else {
            el.classList.remove('scroll-visible');
            el.classList.add('scroll-animate');
        }
    });
}

// --- PROJECT CAROUSEL DRAGGING & CONTROLS ---
const carousel = document.getElementById('project-carousel');
const prevButton = document.querySelector('.carousel-prev-btn');
const nextButton = document.querySelector('.carousel-next-btn');

let isDown = false;
let startX;
let scrollLeft;

if (carousel) {
    // DRAGGING LOGIC
    carousel.addEventListener('mousedown', (e) => {
        isDown = true;
        carousel.classList.add('active');
        startX = e.pageX - carousel.offsetLeft;
        scrollLeft = carousel.scrollLeft;
    });
    carousel.addEventListener('mouseleave', () => {
        isDown = false;
        carousel.classList.remove('active');
    });
    carousel.addEventListener('mouseup', () => {
        isDown = false;
        carousel.classList.remove('active');
    });
    carousel.addEventListener('mousemove', (e) => {
        if(!isDown) return;
        e.preventDefault();
        const x = e.pageX - carousel.offsetLeft;
        const walk = (x - startX) * 2; // Scroll-speed multiplier
        carousel.scrollLeft = scrollLeft - walk;
    });

    // CONTROL BUTTONS LOGIC
    const scrollDistance = 350; 

    if (prevButton) {
        prevButton.addEventListener('click', () => {
            carousel.scrollBy({
                left: -scrollDistance,
                behavior: 'smooth'
            });
        });
    }

    if (nextButton) {
        nextButton.addEventListener('click', () => {
            carousel.scrollBy({
                left: scrollDistance,
                behavior: 'smooth'
            });
        });
    }
}


// --- Initialize Application ---
window.onload = function () {
    // 1. Render the dynamic proficiency bars
    renderProficiencyBars(toolScores);

    // 2. Initialize the Spotlight background (CSS approximation)
    initSpotlightBackground();
    
    // 3. Initial check for elements in viewport on load
    checkScrollAnimations();
};

// Add scroll event listener
window.addEventListener('scroll', checkScrollAnimations);
