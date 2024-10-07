
document.getElementById('mobile-menu').addEventListener('click', function() {
    console.log('Menu burger cliqué !');  // Ligne de test
    const navLinks = document.getElementById('nav-links');
    const menuToggle = document.getElementById('mobile-menu');
    
    // Basculer l'état actif du menu burger et des liens de navigation
    navLinks.classList.toggle('active');
    menuToggle.classList.toggle('active');
});


