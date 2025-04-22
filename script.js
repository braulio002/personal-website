document.addEventListener('DOMContentLoaded', function() {
    const lastUpdated = new Date(document.lastModified).toLocaleDateString();
    document.getElementById('last-updated').textContent = lastUpdated;
    document.getElementById('footer-last-updated').textContent = lastUpdated;
    
    const isMobile = /Mobi|Android/i.test(navigator.userAgent);
    
    if (!isMobile) {
        createCursorTrail();
        
        if (Math.random() > 0.5) {
            addFallingStars();
        }
    }
    
    styleRetroImages();
    
    setupGuestbookButton();
    
    if (!isMobile && Math.random() > 0.7) {
        addBackgroundMusicControls();
    }
    
    if (isMobile) {
        addMobileTouchFeedback();
    }
});

function createCursorTrail() {
    const trail = document.createElement('div');
    trail.id = 'cursor-trail';
    trail.style.position = 'fixed';
    trail.style.height = '8px';
    trail.style.width = '8px';
    trail.style.backgroundColor = '#FF00FF';
    trail.style.borderRadius = '50%';
    trail.style.pointerEvents = 'none';
    trail.style.zIndex = '9999';
    trail.style.transform = 'translate(-50%, -50%)';
    document.body.appendChild(trail);
    
    let posX = 0, posY = 0;
    const delay = 5;
    const trailElements = [];
    const trailLength = 5;
    
    for (let i = 0; i < trailLength; i++) {
        const element = document.createElement('div');
        element.style.position = 'fixed';
        element.style.height = `${8 - i}px`;
        element.style.width = `${8 - i}px`;
        element.style.backgroundColor = `rgba(255, 0, 255, ${1 - (i * 0.2)})`;
        element.style.borderRadius = '50%';
        element.style.pointerEvents = 'none';
        element.style.zIndex = '9998';
        element.style.transform = 'translate(-50%, -50%)';
        document.body.appendChild(element);
        trailElements.push({
            element,
            x: 0,
            y: 0,
            timer: (i + 1) * delay
        });
    }
    
    document.addEventListener('mousemove', function(e) {
        posX = e.clientX;
        posY = e.clientY;
    });
    
    function updateTrail() {
        trail.style.left = `${posX}px`;
        trail.style.top = `${posY}px`;
        
        trailElements.forEach((trailEl, index) => {
            if (trailEl.timer <= 0) {
                trailEl.x = posX;
                trailEl.y = posY;
                trailEl.timer = (index + 1) * delay;
            } else {
                trailEl.timer--;
            }
            
            trailEl.element.style.left = `${trailEl.x}px`;
            trailEl.element.style.top = `${trailEl.y}px`;
        });
        
        requestAnimationFrame(updateTrail);
    }
    
    updateTrail();
}

function styleRetroImages() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (!img.classList.contains('retro-border')) {
            img.classList.add('retro-border');
        }
        
        img.style.maxWidth = '100%';
        img.style.height = 'auto';
    });
}

function setupGuestbookButton() {
    const guestbookBtn = document.getElementById('fake-guestbook-button');
    if (guestbookBtn) {
        guestbookBtn.addEventListener('click', function() {
            alert('Error 404: CGI-BIN not found!\n I do not know backend  ༼ つ ಥ_ಥ ༽つ');
        });
    }
}

function addFallingStars() {
    const starCount = 20;
    
    for (let i = 0; i < starCount; i++) {
        createStar();
    }
    
    function createStar() {
        const star = document.createElement('div');
        star.classList.add('falling-star');
        
        // Random position and size
        const size = Math.random() * 3 + 1;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        
        // Random brightness
        const brightness = Math.random() * 0.5 + 0.5;
        star.style.backgroundColor = `rgba(255, 255, 255, ${brightness})`;
        
        // Random position
        const startX = Math.random() * window.innerWidth;
        star.style.left = `${startX}px`;
        star.style.top = '-10px';
        
        document.body.appendChild(star);
        
        // Animation
        const duration = 2000 + Math.random() * 3000;
        const endY = window.innerHeight + 10;
        
        const startTime = performance.now();
        
        function animateStar(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            star.style.top = `${-10 + progress * (endY + 10)}px`;
            
            if (progress < 1) {
                requestAnimationFrame(animateStar);
            } else {
                star.remove();
                createStar();
            }
        }
        
        requestAnimationFrame(animateStar);
    }
}

function addBackgroundMusicControls() {
    const musicContainer = document.createElement('div');
    musicContainer.className = 'music-controls';
    musicContainer.innerHTML = `
        <button id="play-music" class="retro-button">♫ Play Music</button>
        <button id="stop-music" class="retro-button">■ Stop Music</button>
    `;
    
    document.body.appendChild(musicContainer);
    
    // Style the container
    musicContainer.style.position = 'fixed';
    musicContainer.style.bottom = '20px';
    musicContainer.style.right = '20px';
    musicContainer.style.display = 'flex';
    musicContainer.style.gap = '10px';
    musicContainer.style.backgroundColor = 'rgba(0, 0, 51, 0.8)';
    musicContainer.style.padding = '10px';
    musicContainer.style.border = '1px solid #00FFFF';
    musicContainer.style.zIndex = '1000';
    
    // Sample MIDI files (come back to this)
    const midiFiles = [
        'https://www.midiworld.com/download/245',
        'https://www.midiworld.com/download/139'
    ];
    
    const audio = new Audio(midiFiles[Math.floor(Math.random() * midiFiles.length)]);
    audio.loop = true;
    audio.volume = 0.3;
    
    document.getElementById('play-music').addEventListener('click', function() {
        audio.play().catch(e => {
            console.log('Audio playback failed:', e);
            alert('MIDI playback blocked by browser. Try clicking somewhere on the page first!');
        });
    });
    
    document.getElementById('stop-music').addEventListener('click', function() {
        audio.pause();
    });
}

function addMobileTouchFeedback() {
    const buttons = document.querySelectorAll('.retro-button, .nav-button');
    
    buttons.forEach(button => {
        button.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.95)';
            this.style.opacity = '0.8';
        });
        
        button.addEventListener('touchend', function() {
            this.style.transform = 'scale(1)';
            this.style.opacity = '1';
        });
    });
    
    // Prevent zooming on double-tap
    document.addEventListener('dblclick', function(e) {
        e.preventDefault();
    }, { passive: false });
    
    // Make sure links are easily tappable
    const links = document.querySelectorAll('a');
    links.forEach(link => {
        link.style.minHeight = '44px';
        link.style.minWidth = '44px';
        link.style.display = 'inline-flex';
        link.style.alignItems = 'center';
        link.style.justifyContent = 'center';
    });
}