document.addEventListener('DOMContentLoaded', function() {
    // Example: Toggle mobile menu (if you need it)
    const menuButton = document.querySelector('.menu-button');
    const menu = document.querySelector('.menu');

    menuButton.addEventListener('click', function() {
        menu.classList.toggle('active');
    });
});
