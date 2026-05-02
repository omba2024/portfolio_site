/* ============================================================
   Header — scroll effect
============================================================ */
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

/* ============================================================
   Hamburger menu
============================================================ */
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');

hamburger.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  hamburger.classList.toggle('active', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

nav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    hamburger.classList.remove('active');
    document.body.style.overflow = '';
  });
});

/* ============================================================
   Scroll fade-up animation
============================================================ */
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, i * 90);
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -48px 0px' }
);

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

/* ============================================================
   Contact form — demo submit handler
============================================================ */
const form = document.getElementById('contact-form');
const submitBtn = document.getElementById('form-submit');

if (form && submitBtn) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameVal    = document.getElementById('name')?.value.trim();
    const emailVal   = document.getElementById('email')?.value.trim();
    const messageVal = document.getElementById('message')?.value.trim();

    if (!nameVal || !emailVal || !messageVal) return;

    submitBtn.classList.add('sent');
    submitBtn.querySelector('.form-submit__text').textContent = '送信しました！';

    setTimeout(() => {
      submitBtn.classList.remove('sent');
      submitBtn.querySelector('.form-submit__text').textContent = '送信する';
      form.reset();
    }, 3500);
  });
}

/* ============================================================
   Smooth anchor scroll (補正: fixed header 分)
============================================================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = header.offsetHeight + 16;
    const top    = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});
