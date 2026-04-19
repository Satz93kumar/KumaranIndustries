/* PrecisionTech CNC — Main JS */

// ─── Config ──────────────────────────────────────────────────────────────────
const WA_NUMBER = '919791543130';   // 91 + 10-digit mobile
const PHONE    = '+919791543130';

// ─── Hamburger menu ───────────────────────────────────────────────────────────
const menuBtn   = document.getElementById('menuBtn');
const mobileNav = document.getElementById('mobileNav');
const menuIcon  = document.getElementById('menuIcon');
const closeIcon = document.getElementById('closeIcon');

if (menuBtn && mobileNav) {
  menuBtn.addEventListener('click', () => {
    const open = mobileNav.classList.toggle('open');
    menuIcon.classList.toggle('hidden', open);
    closeIcon.classList.toggle('hidden', !open);
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!menuBtn.contains(e.target) && !mobileNav.contains(e.target)) {
      mobileNav.classList.remove('open');
      menuIcon.classList.remove('hidden');
      closeIcon.classList.add('hidden');
    }
  });
}

// ─── Sticky header ────────────────────────────────────────────────────────────
const header = document.getElementById('mainHeader');
if (header) {
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });
}

// ─── Scroll reveal ────────────────────────────────────────────────────────────
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); } });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

// ─── Animated counters ────────────────────────────────────────────────────────
function runCounter(el) {
  const target = +el.dataset.target;
  const suffix = el.dataset.suffix || '';
  const duration = 1800;
  const startTime = performance.now();

  function tick(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const value = Math.round(progress * target);
    el.textContent = value.toLocaleString() + suffix;
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

const counterObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting && !e.target.dataset.counted) {
      e.target.dataset.counted = '1';
      runCounter(e.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('[data-target]').forEach(el => counterObs.observe(el));

// ─── Active nav highlight ─────────────────────────────────────────────────────
const page = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-link').forEach(a => {
  const href = a.getAttribute('href');
  if (href === page || (page === '' && href === 'index.html')) {
    a.classList.add('text-blue-400');
  }
});

// ─── Quote form ───────────────────────────────────────────────────────────────
const form = document.getElementById('quoteForm');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name  = form.querySelector('[name=name]')?.value?.trim()  || '';
    const phone = form.querySelector('[name=phone]')?.value?.trim() || '';
    const req   = form.querySelector('[name=requirement]')?.value?.trim() || '';
    const qty   = form.querySelector('[name=quantity]')?.value?.trim() || '';

    const msg = [
      'Hello PrecisionTech CNC!',
      '',
      'I would like to request a quote.',
      name  ? `Name: ${name}`        : '',
      phone ? `Phone: ${phone}`      : '',
      req   ? `Requirement: ${req}`  : '',
      qty   ? `Quantity: ${qty}`     : '',
    ].filter(Boolean).join('\n');

    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
  });
}

// ─── Contact form ─────────────────────────────────────────────────────────────
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name    = contactForm.querySelector('[name=name]')?.value?.trim()    || '';
    const phone   = contactForm.querySelector('[name=phone]')?.value?.trim()   || '';
    const email   = contactForm.querySelector('[name=email]')?.value?.trim()   || '';
    const service = contactForm.querySelector('[name=service]')?.value?.trim() || '';
    const message = contactForm.querySelector('[name=message]')?.value?.trim() || '';

    const msg = [
      'Hello PrecisionTech CNC!',
      '',
      name    ? `Name: ${name}`       : '',
      phone   ? `Phone: ${phone}`     : '',
      email   ? `Email: ${email}`     : '',
      service ? `Service: ${service}` : '',
      message ? `Message:\n${message}`: '',
    ].filter(Boolean).join('\n');

    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
  });
}
