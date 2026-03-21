// Hamnurger Menu Toggle 
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

//Close menu when a link is clicked (for mobile)

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
}); 

//NAVbar scroll effect

window.addEventListener('scroll', () => {
    const navbar = document.querySelector('navbar');
    if(window.scrollY > 50){
        navbar.style.borderBottom = '1px solid #FF6B00';
    } else {
        navbar.style.borderBottom = '1px solid #1a1a1a';
    }
});

//Back to the top button

const backToTop = document.createElement('button');
backToTop.innerHTML = '&#8679;'; // Up arrow symbol
backToTop.setAttribute('id', 'backToTop');
document.body.appendChild(backToTop);

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTop.style.display = 'block';
    } else {        backToTop.style.display = 'none';
    }
});


backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});



// PARTICLE ANIMATION
const canvas = document.createElement('canvas');
canvas.id = 'particleCanvas';
canvas.style.cssText = `
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    pointer-events: none;
`;
 
const hero = document.getElementById('hero');
hero.style.position = 'relative';
hero.style.overflow = 'hidden';
hero.insertBefore(canvas, hero.firstChild);
 
// Make hero content sit above canvas
hero.querySelectorAll('h1, p, btn').forEach(el => {
    el.style.position = 'relative';
    el.style.zIndex = '1';
});
 
const ctx = canvas.getContext('2d');
 
function resizeCanvas() {
    canvas.width = hero.offsetWidth;
    canvas.height = hero.offsetHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);
 
const PARTICLE_COUNT = 80;
const particles = [];
 
class Particle {
    constructor() {
        this.reset();
    }
 
    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2.5 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.4;
        this.speedY = (Math.random() - 0.5) * 0.4;
        this.opacity = Math.random() * 0.6 + 0.2;
        this.pulse = Math.random() * Math.PI * 2;
        this.pulseSpeed = Math.random() * 0.02 + 0.005;
    }
 
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.pulse += this.pulseSpeed;
 
        // Wrap around edges
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
    }
 
    draw() {
        const currentOpacity = this.opacity * (0.7 + 0.3 * Math.sin(this.pulse));
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 107, 0, ${currentOpacity})`;
        ctx.fill();
 
        // Subtle glow
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 107, 0, ${currentOpacity * 0.15})`;
        ctx.fill();
    }
}
 
// Draw connecting lines between nearby particles
function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
 
            if (dist < 120) {
                const opacity = (1 - dist / 120) * 0.12;
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.strokeStyle = `rgba(255, 107, 0, ${opacity})`;
                ctx.lineWidth = 0.5;
                ctx.stroke();
            }
        }
    }
}
 
for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push(new Particle());
}
 
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawConnections();
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animate);
}
 
animate();
