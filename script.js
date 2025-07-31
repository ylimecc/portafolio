document.addEventListener("DOMContentLoaded", function() {

    // --- LÓGICA PARA LA ANIMACIÓN DE TEXTO (TYPEWRITER) ---
    const texts = ["Web Developer", "Ing. en Sistemas", "Freelancer"];
    let index = 0;
    const textElement = document.getElementById("dynamicText");

    function typeText(text, i = 0) {
        if (textElement && i < text.length) {
            textElement.textContent += text.charAt(i);
            setTimeout(() => typeText(text, i + 1), 100);
        } else {
            setTimeout(deleteText, 1500);
        }
    }

    function deleteText() {
        if (textElement) {
            let currentText = textElement.textContent;
            if (currentText.length > 0) {
                textElement.textContent = currentText.substring(0, currentText.length - 1);
                setTimeout(deleteText, 50);
            } else {
                index = (index + 1) % texts.length;
                setTimeout(() => typeText(texts[index]), 500);
            }
        }
    }
    
    if (textElement) {
        typeText(texts[index]);
    }

    // --- LÓGICA PARA EL MENÚ HAMBURGUESA ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('nav ul');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('show');
            menuToggle.classList.toggle('active');

            const isExpanded = navMenu.classList.contains('show');
            menuToggle.setAttribute('aria-expanded', isExpanded);
        });

        document.querySelectorAll('nav ul li a').forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('show');
                menuToggle.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }
});