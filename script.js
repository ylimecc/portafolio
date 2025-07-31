document.addEventListener('DOMContentLoaded', () => {
    // --- Lógica para el texto dinámico ---
    const texts = ["Web Developer", "Ing. en Sistemas", "Freelancer"];
    let index = 0;
    const textElement = document.getElementById("dynamicText");
    const cursorElement = document.getElementById("cursor");

    function typeText(text, i = 0) {
        if (i <= text.length) {
            textElement.textContent = text.slice(0, i);
            setTimeout(() => typeText(text, i + 1), 100);
        } else {
            setTimeout(() => deleteText(text), 2000); // Aumentamos la pausa
        }
    }

    function deleteText(text, i = text.length) {
        if (i >= 0) {
            textElement.textContent = text.slice(0, i);
            setTimeout(() => deleteText(text, i - 1), 50);
        } else {
            index = (index + 1) % texts.length;
            setTimeout(() => typeText(texts[index]), 500);
        }
    }

    // Iniciar la animación de escritura
    typeText(texts[0]);

    // --- Lógica para el menú hamburguesa ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('nav ul');

    menuToggle.addEventListener('click', function() {
        const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
        navMenu.classList.toggle('show');
        menuToggle.setAttribute('aria-expanded', !isExpanded);
    });

    // Opcional: Cerrar menú al hacer clic en un enlace (para SPA o navegación en la misma página)
    document.querySelectorAll('nav ul li a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('show');
            menuToggle.setAttribute('aria-expanded', 'false');
        });
    });
});
