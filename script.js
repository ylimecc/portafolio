document.addEventListener("DOMContentLoaded", function() {

    // --- LÓGICA PARA LA ANIMACIÓN DE TEXTO (TYPEWRITER) ---
    const texts = ["Web Developer", "Ing. en Sistemas", "Freelancer"];
    let index = 0;
    const textElement = document.getElementById("dynamicText");
    const cursorElement = document.getElementById("cursor");

    function typeText(text, i = 0) {
        if (i < text.length) {
            textElement.textContent += text.charAt(i);
            setTimeout(() => typeText(text, i + 1), 100);
        } else {
            // Espera antes de empezar a borrar
            setTimeout(() => deleteText(), 1500);
        }
    }

    function deleteText(i = textElement.textContent.length) {
        if (i > 0) {
            textElement.textContent = textElement.textContent.substring(0, i - 1);
            setTimeout(() => deleteText(i - 1), 50);
        } else {
            // Cambia al siguiente texto y empieza a escribir de nuevo
            index = (index + 1) % texts.length;
            setTimeout(() => typeText(texts[index]), 500);
        }
    }
    
    // Iniciar la animación
    if (textElement) {
        typeText(texts[index]);
    }


    // --- LÓGICA PARA EL MENÚ HAMBURGUESA ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('nav ul');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            // Alterna la clase 'show' en el menú y 'active' en el botón
            navMenu.classList.toggle('show');
            menuToggle.classList.toggle('active');

            // Actualiza el atributo aria-expanded para accesibilidad
            const isExpanded = navMenu.classList.contains('show');
            menuToggle.setAttribute('aria-expanded', isExpanded);
        });

        // Cierra el menú si se hace clic en un enlace (para SPA o si se queda en la misma página)
        document.querySelectorAll('nav ul li a').forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('show');
                menuToggle.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }
});
