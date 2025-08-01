document.addEventListener("DOMContentLoaded", function() {

    // --- LÓGICA PARA EL MENÚ HAMBURGUESA ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('nav ul');
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('show');
            menuToggle.classList.toggle('active');
            menuToggle.setAttribute('aria-expanded', navMenu.classList.contains('show'));
        });
        document.querySelectorAll('nav ul li a').forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('show');
                menuToggle.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // --- LÓGICA PARA LA ANIMACIÓN DE TEXTO (TYPEWRITER) ---
    const dynamicTextElement = document.getElementById("dynamicText");
    if (dynamicTextElement) {
        const texts = {
            es: ["Web Developer", "Ing. en Sistemas", "Freelancer"],
            en: ["Web Developer", "Systems Engineer", "Freelancer"]
        };
        let textIndex = 0;
        let currentLangForTyping = 'es'; // Se actualizará con el idioma actual

        function typeText(text, i = 0) {
            if (i < text.length) {
                dynamicTextElement.textContent += text.charAt(i);
                setTimeout(() => typeText(text, i + 1), 100);
            } else {
                setTimeout(deleteText, 1500);
            }
        }

        function deleteText() {
            let currentText = dynamicTextElement.textContent;
            if (currentText.length > 0) {
                dynamicTextElement.textContent = currentText.substring(0, currentText.length - 1);
                setTimeout(deleteText, 50);
            } else {
                textIndex = (textIndex + 1) % texts[currentLangForTyping].length;
                setTimeout(() => typeText(texts[currentLangForTyping][textIndex]), 500);
            }
        }
        
        // Iniciar la animación con el idioma detectado
        document.addEventListener('languageChanged', (e) => {
            currentLangForTyping = e.detail.lang;
            dynamicTextElement.textContent = ''; // Limpiar texto anterior
            textIndex = 0; // Reiniciar índice
            typeText(texts[currentLangForTyping][textIndex]);
        });
    }

    // --- LÓGICA PARA EL CARRUSEL DE PROYECTOS ---
    const carousel = document.querySelector('.carousel-slides');
    if (carousel) {
        const slides = Array.from(carousel.children);
        const nextButton = document.querySelector('.next-button');
        const prevButton = document.querySelector('.prev-button');
        const dotsNav = document.querySelector('.carousel-dots');
        let currentIndex = 0;

        slides.forEach((slide, index) => {
            const dot = document.createElement('button');
            dot.classList.add('carousel-dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => moveToSlide(index));
            dotsNav.appendChild(dot);
        });

        const dots = Array.from(dotsNav.children);

        const moveToSlide = (targetIndex) => {
            const slideWidth = slides[0].getBoundingClientRect().width;
            carousel.style.transform = 'translateX(-' + slideWidth * targetIndex + 'px)';
            dots[currentIndex].classList.remove('active');
            dots[targetIndex].classList.add('active');
            currentIndex = targetIndex;
        };

        nextButton.addEventListener('click', () => {
            let nextIndex = (currentIndex + 1) % slides.length;
            moveToSlide(nextIndex);
        });

        prevButton.addEventListener('click', () => {
            let prevIndex = (currentIndex - 1 + slides.length) % slides.length;
            moveToSlide(prevIndex);
        });
        
        window.addEventListener('resize', () => moveToSlide(currentIndex));
    }

    // --- LÓGICA PARA LAS PESTAÑAS DE "ACERCA DE MÍ" ---
    const tabsContainer = document.querySelector('.tabs-container');
    if (tabsContainer) {
        tabsContainer.addEventListener('click', (e) => {
            const clickedTab = e.target.closest('.tab-link');
            if (!clickedTab) return;
            
            const tabLinks = tabsContainer.querySelectorAll('.tab-link');
            const tabContents = document.querySelectorAll('.tab-content');
            
            tabLinks.forEach(link => link.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            const tabId = clickedTab.dataset.tab;
            const targetContent = document.getElementById(tabId);
            
            // Activar la pestaña correcta para el idioma actual
            const currentLang = document.documentElement.lang;
            document.querySelectorAll(`.tab-link[data-tab="${tabId}"]`).forEach(t => t.classList.add('active'));
            
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    }

    // --- LÓGICA PARA CAMBIAR DE IDIOMA ---
    const langToggle = document.getElementById('lang-toggle');
    const langElements = document.querySelectorAll('[data-lang]');

    const setLanguage = (lang) => {
        document.documentElement.lang = lang;
        localStorage.setItem('language', lang);
        
        langElements.forEach(el => {
            if (el.dataset.lang === lang) {
                el.style.display = ''; // Muestra el elemento del idioma correcto
            } else {
                el.style.display = 'none'; // Oculta el del otro idioma
            }
        });

        langToggle.textContent = lang === 'es' ? 'EN' : 'ES';
        
        // Disparar evento personalizado para que otros scripts (como el typewriter) reaccionen
        document.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang: lang } }));
    };

    langToggle.addEventListener('click', () => {
        const newLang = document.documentElement.lang === 'es' ? 'en' : 'es';
        setLanguage(newLang);
    });

    // Cargar el idioma guardado o el del navegador al iniciar
    const savedLang = localStorage.getItem('language') || (navigator.language.startsWith('en') ? 'en' : 'es');
    setLanguage(savedLang);
});