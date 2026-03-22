// ─── NAV scroll ────────────────────────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

// ─── Mobile menu ───────────────────────────────────────────────
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.querySelector('.nav-links');
menuToggle?.addEventListener('click', () => {
  const open = menuToggle.classList.toggle('open');
  navLinks.style.display = open ? 'flex' : '';
  if (open) {
    navLinks.style.cssText = `
      display: flex; flex-direction: column; position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(28,28,28,0.97); backdrop-filter: blur(12px);
      z-index: 999; align-items: center; justify-content: center; gap: 32px;
    `;
    navLinks.querySelectorAll('a').forEach(a => {
      a.style.cssText = 'font-size: 1.2rem; letter-spacing: 0.14em;';
    });
  } else {
    navLinks.removeAttribute('style');
    navLinks.querySelectorAll('a').forEach(a => a.removeAttribute('style'));
  }
});
navLinks?.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    menuToggle.classList.remove('open');
    navLinks.removeAttribute('style');
    navLinks.querySelectorAll('a').forEach(b => b.removeAttribute('style'));
  });
});

// ─── Scroll Reveal ─────────────────────────────────────────────
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
revealEls.forEach(el => observer.observe(el));

// ─── Filter buttons ─────────────────────────────────────────────
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    document.querySelectorAll('.project-card').forEach(card => {
      if (filter === 'all' || card.dataset.category === filter) {
        card.style.opacity = '1';
        card.style.pointerEvents = 'auto';
      } else {
        card.style.opacity = '0.25';
        card.style.pointerEvents = 'none';
      }
    });
  });
});

// ─── Image error fallback → show placeholder ──────────────────
document.querySelectorAll('.project-img').forEach(img => {
  img.addEventListener('error', function() {
    this.style.display = 'none';
    const placeholder = this.nextElementSibling;
    if (placeholder?.classList.contains('project-placeholder')) {
      placeholder.style.display = 'flex';
    }
  });
});

// ─── Smooth scroll for internal anchors ───────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ─── Counter animation for stats ──────────────────────────────
const counters = document.querySelectorAll('.dif-number');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      // Support data-raw for formatted numbers (e.g. 1.835)
      const rawVal  = el.dataset.raw ? parseInt(el.dataset.raw) : null;
      const fmt     = el.dataset.format || '';
      const original = el.textContent.trim();
      const num     = rawVal !== null ? rawVal : parseInt(original.replace(/[^0-9]/g, ''));
      const prefix  = rawVal !== null ? '' : (original.match(/^[^0-9]*/)?.[0] || '');
      const suffix  = rawVal !== null ? '' : original.replace(/^[^0-9]*[0-9.,]+/, '');

      function formatNum(n) {
        if (fmt === 'thousands') {
          // Format as X.XXX (dot as thousands separator, Argentine style)
          return n.toLocaleString('es-AR').replace(/,/g, '.');
        }
        return prefix + n + suffix;
      }

      if (!isNaN(num) && num > 0) {
        let current = 0;
        const steps = 50;
        const step = num / steps;
        const timer = setInterval(() => {
          current = Math.min(current + step, num);
          el.textContent = formatNum(Math.round(current));
          if (current >= num) {
            el.textContent = formatNum(num);
            clearInterval(timer);
          }
        }, 25);
      }
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });
counters.forEach(c => counterObserver.observe(c));

// ─── Form submit (UI feedback) ────────────────────────────────
document.querySelector('.form-btn')?.addEventListener('click', function() {
  this.textContent = '✓ Consulta enviada';
  this.style.background = '#9aab9a';
  setTimeout(() => {
    this.textContent = 'Enviar consulta →';
    this.style.background = '';
  }, 3000);
});

// ─── Random order for founders ─────────────────────────
(function() {
  const grid = document.getElementById('founders-grid');
  if (!grid) return;
  const cards = Array.from(grid.children);
  // Fisher-Yates shuffle
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    grid.appendChild(cards[j]);
    cards.splice(j, 1);
  }
  // Re-apply reveal delays in new order
  Array.from(grid.children).forEach((card, idx) => {
    card.classList.remove('reveal-delay-1','reveal-delay-2','reveal-delay-3');
    if (idx === 1) card.classList.add('reveal-delay-1');
    if (idx === 2) card.classList.add('reveal-delay-2');
  });
})();
