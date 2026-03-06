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


