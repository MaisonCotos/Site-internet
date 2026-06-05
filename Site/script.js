// ─── Navigation scroll state ─────────────────────────────────
(function () {
  const nav = document.getElementById('site-nav');
  if (!nav) return;
  const onScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
})();

// ─── Intersection Observer — fade-in on scroll ───────────────
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    if (el.classList.contains('fade-in-group')) {
      el.querySelectorAll('.fade-item').forEach((item, i) => {
        setTimeout(() => item.classList.add('visible'), i * 180);
      });
    } else {
      el.classList.add('visible');
    }
    observer.unobserve(el);
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.fade-in, .fade-in-group').forEach(el => observer.observe(el));

// ─── Form ────────────────────────────────────────────────────
const form = document.getElementById('emailForm');
const emailInput = document.getElementById('email');
const emailError = document.getElementById('emailError');
const formSuccess = document.getElementById('formSuccess');

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim());
    if (!valid) {
      emailInput.classList.add('error');
      emailError.classList.add('visible');
      return;
    }
    emailInput.classList.remove('error');
    emailError.classList.remove('visible');
    form.style.transition = 'opacity 400ms ease';
    form.style.opacity = '0';
    setTimeout(() => {
      form.style.display = 'none';
      formSuccess.style.display = 'block';
      requestAnimationFrame(() => formSuccess.classList.add('visible'));
    }, 400);
  });
  emailInput.addEventListener('input', () => {
    emailInput.classList.remove('error');
    emailError.classList.remove('visible');
  });
}
