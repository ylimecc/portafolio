(() => {
  // --- Menú móvil ---
  const toggle = document.querySelector('.nav__toggle');
  const menu = document.getElementById('menu');

  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      const isOpen = menu.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', isOpen);
    });

    // Cerrar menú al hacer click en un enlace (mobile)
    menu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menu.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // --- Animación de entrada al hacer scroll ---
  // Marca elementos relevantes y los revela cuando entran al viewport
  const targets = document.querySelectorAll(
    '.hero__title, .hero__lead, .hero__cta, .about__text, .about__skills, .certs__lead, .cert, .project, .work__note, .contact__title, .contact__lead, .contact__email, .contact__social'
  );
  targets.forEach(el => el.classList.add('fade-in'));

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    targets.forEach(el => io.observe(el));
  } else {
    // Fallback: mostrar todo
    targets.forEach(el => el.classList.add('is-visible'));
  }
})();
