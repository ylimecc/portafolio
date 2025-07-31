document.addEventListener("DOMContentLoaded", function() {

    // --- (TYPEWRITER) ---
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

    // --- MENÚ HAMBURGUESA ---
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

// --- LÓGICA PARA EL CARRUSEL DE PROYECTOS ---
const carousel = document.querySelector('.carousel-slides');

// Solo ejecutar el código del carrusel si estamos en la página de proyectos
if (carousel) {
    const slides = Array.from(carousel.children);
    const nextButton = document.querySelector('.next-button');
    const prevButton = document.querySelector('.prev-button');
    const dotsNav = document.querySelector('.carousel-dots');

    // Crear los puntos de navegación
    slides.forEach((slide, index) => {
        const dot = document.createElement('button');
        dot.classList.add('carousel-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
            moveToSlide(index);
        });
        dotsNav.appendChild(dot);
    });

    const dots = Array.from(dotsNav.children);
    const slideWidth = slides[0].getBoundingClientRect().width;
    let currentIndex = 0;

    const moveToSlide = (targetIndex) => {
        carousel.style.transform = 'translateX(-' + slideWidth * targetIndex + 'px)';
        
        // Actualizar el punto activo
        dots[currentIndex].classList.remove('active');
        dots[targetIndex].classList.add('active');
        
        currentIndex = targetIndex;
    };

    // Event Listeners para los botones
    nextButton.addEventListener('click', () => {
        let nextIndex = currentIndex + 1;
        if (nextIndex >= slides.length) {
            nextIndex = 0; // Vuelve al inicio
        }
        moveToSlide(nextIndex);
    });

    prevButton.addEventListener('click', () => {
        let prevIndex = currentIndex - 1;
        if (prevIndex < 0) {
            prevIndex = slides.length - 1; // Va al final
        }
        moveToSlide(prevIndex);
    });
    
    // Ajustar el tamaño del carrusel si la ventana cambia de tamaño
    window.addEventListener('resize', () => {
        const newSlideWidth = slides[0].getBoundingClientRect().width;
        carousel.style.transform = 'translateX(-' + newSlideWidth * currentIndex + 'px)';
    });
}

// --- LÓGICA PARA LAS PESTAÑAS DE "ACERCA DE MÍ" ---
const tabsContainer = document.querySelector('.tabs-container');

// Solo ejecutar si estamos en la página "Acerca de Mí"
if (tabsContainer) {
    const tabLinks = document.querySelectorAll('.tab-link');
    const tabContents = document.querySelectorAll('.tab-content');

    tabsContainer.addEventListener('click', (e) => {
        const clickedTab = e.target.closest('.tab-link');
        if (!clickedTab) return;

        // Remover clase 'active' de todos los links y contenidos
        tabLinks.forEach(link => link.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));

        // Añadir 'active' al link y contenido seleccionados
        clickedTab.classList.add('active');
        const tabId = clickedTab.dataset.tab;
        const targetContent = document.getElementById(tabId);
        if (targetContent) {
            targetContent.classList.add('active');
        }
    });
}