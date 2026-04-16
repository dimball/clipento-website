/* ─────────────────────────────────────────────────────────────
   CLIPENTO · main.js
   ───────────────────────────────────────────────────────────── */

// ── Cache-bust images (bump v= when swapping screenshots) ────
const IMG_VERSION = 3;
document.querySelectorAll('img').forEach(img => {
  const src = img.getAttribute('src');
  if (src && !src.startsWith('data:')) img.src = src + '?v=' + IMG_VERSION;
});

// ── Scroll reveal ─────────────────────────────────────────────
const observer = new IntersectionObserver(
  entries => entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
  }),
  { threshold: 0.1 }
);
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ── Smooth scroll for anchor links ───────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 70;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

