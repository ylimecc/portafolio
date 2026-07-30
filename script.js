(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

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

  // --- Secuencia de entrada del hero ---
  setTimeout(() => document.documentElement.classList.add('is-loaded'), 60);

  // La terminal del hero se reproduce línea a línea; los comandos se teclean
  const term = document.getElementById('term');
  if (term) {
    const lines = Array.from(term.querySelectorAll('.t-line'));
    if (reduce || document.hidden) {
      term.classList.add('is-static');
    } else {
      let idx = 0;
      function nextLine() {
        if (idx >= lines.length) return;
        const line = lines[idx++];
        const type = line.querySelector('.t-type');
        line.classList.add('is-shown');
        if (type) {
          const texto = type.dataset.text;
          type.textContent = '';
          let i = 0;
          (function tick() {
            type.textContent = texto.slice(0, ++i);
            if (i < texto.length) setTimeout(tick, 55);
            else setTimeout(nextLine, 280);
          })();
        } else {
          setTimeout(nextLine, 170);
        }
      }
      setTimeout(nextLine, 650);
    }
  }

  // --- Animación de entrada al hacer scroll ---
  // (el hero tiene su propia secuencia de carga; aquí va el resto)
  const targets = document.querySelectorAll(
    '.about__text, .about__skills, .certs__lead, .cert, .project, .work__note, .contact__title, .contact__lead, .contact__email, .contact__social'
  );
  targets.forEach(el => el.classList.add('fade-in'));

  // Escalonado dentro de la cuadrícula de certificaciones
  document.querySelectorAll('.certs__grid .cert').forEach((el, i) => {
    el.style.setProperty('--d', `${(i % 3) * 70}ms`);
  });

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
    targets.forEach(el => el.classList.add('is-visible'));
  }

  // --- Benny ---
  const box = document.getElementById('bennyBox');
  const cv = document.getElementById('benny');
  if (box && cv && cv.getContext) {
    const g = cv.getContext('2d');
    const SPR = 2;
    const DPRB = Math.min(window.devicePixelRatio || 1, 2);
    cv.width = 56 * DPRB; cv.height = 40 * DPRB;
    g.scale(DPRB, DPRB);
    g.imageSmoothingEnabled = false;

    // Sprite de Benny (28x20): K contorno, O pelo, D oreja/cola, W pecho
    const PAL = { K: '#1a1208', O: '#b5651d', D: '#7a4310', W: '#f2e3c4' };
    const BODY = [
      '.KKK.............KKKKKK.....',
      'KDDDK...........KOOOOOOK....',
      'KDDDK..........KDDOOOOOK....',
      'KDDDDK.......KDDDOOOOOOK....',
      '.KDDDK......KDDDDOOOKKOOOKK.',
      '..KDDK......KDDDDOOOKKOOOKK.',
      '...KDK......KDDDOOOOOOOOOOOK',
      '....KDK......KDDOOOOOOOKKKK.',
      '....KKKKKKKKKKKOOWWWWK......',
      '....KOOOOOOOOOOOOWWWWWK.....',
      '....KOOOOOOOOOOOOWWWWWK.....',
      '....KOOOOOOOOOOOOWWWWK......',
      '....KOOOOOOOOOOOWWWWK.......',
      '.....KOOOOOOOOOOWWWK........',
      '.....KOOOOOOOOOOWWK.........',
      '......KKOOOOOOOKKK..........',
    ];
    const LEGS_A = [
      '.....KOK......KOK...........',
      '.....KOK......KOK...........',
      '....KOOK.....KOOK...........',
      '....KKK......KKK............',
    ];
    const LEGS_B = [
      '.......KOK..KOK.............',
      '.......KOK..KOK.............',
      '.......KOOK.KOOK............',
      '........KK...KK.............',
    ];
    const F_A = BODY.concat(LEGS_A);
    const F_B = BODY.concat(LEGS_B);

    function draw(rows) {
      g.clearRect(0, 0, 56, 40);
      for (let r = 0; r < rows.length; r++) {
        const row = rows[r];
        for (let c = 0; c < row.length; c++) {
          const k = row[c];
          if (k === '.') continue;
          g.fillStyle = PAL[k];
          g.fillRect(c * SPR, r * SPR, SPR, SPR);
        }
      }
    }
    draw(F_A);

    const ground = box.parentElement;
    const tip = document.getElementById('bennyTip');
    let x = 8, dir = 1, frame = false, frameT = 0, last = null;
    let pausedUntil = 0;
    let nextIdle = 4000 + Math.random() * 4000;
    let onScreen = true;

    if ('IntersectionObserver' in window) {
      new IntersectionObserver(entries => { onScreen = entries[0].isIntersecting; }, { threshold: 0 }).observe(ground);
    }

    let tipTimer = null;
    function saludar(conSalto) {
      pausedUntil = performance.now() + 4500;
      if (tip) {
        tip.classList.add('is-on');
        clearTimeout(tipTimer);
        tipTimer = setTimeout(() => tip.classList.remove('is-on'), 4500);
      }
      if (conSalto && !reduce && cv.animate) {
        cv.animate([
          { transform: `scaleX(${dir}) translateY(0)` },
          { transform: `scaleX(${dir}) translateY(-24px)`, offset: 0.45 },
          { transform: `scaleX(${dir}) translateY(0)` },
        ], { duration: 480, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' });
        draw(F_B);
        setTimeout(() => draw(F_A), 480);
      }
    }
    box.addEventListener('pointerdown', e => {
      if (e.target !== tip) saludar(true);
    });
    box.addEventListener('focusin', () => saludar(false));

    if (reduce) {
      // Sin movimiento: Benny descansa cerca del inicio de la línea
      box.style.transform = 'translateX(8px)';
    } else {
      function step(ts) {
        if (last === null) last = ts;
        const dt = Math.min((ts - last) / 1000, 0.05);
        last = ts;
        if (onScreen && !document.hidden && performance.now() >= pausedUntil) {
          x += 26 * dt * dir;
          const maxX = Math.max(40, ground.clientWidth - 68);
          if (x >= maxX) { x = maxX; dir = -1; }
          if (x <= 0) { x = 0; dir = 1; }
          frameT += dt;
          if (frameT >= 0.15) { frameT = 0; frame = !frame; draw(frame ? F_B : F_A); }
          nextIdle -= dt * 1000;
          if (nextIdle <= 0) {
            pausedUntil = performance.now() + 1600 + Math.random() * 1400;
            nextIdle = 5000 + Math.random() * 5000;
            draw(F_A);
          }
          box.style.transform = `translateX(${x}px)`;
          cv.style.transform = `scaleX(${dir})`;
        }
        requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }
  }
})();
