const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');
const yearEl = document.getElementById('year');
const navLinks = document.querySelectorAll('.main-nav a[href^="#"]');

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

if (menuToggle && mainNav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.16 });

document.querySelectorAll('.reveal').forEach((el, i) => {
  el.style.transitionDelay = `${Math.min(i * 60, 280)}ms`;
  observer.observe(el);
});

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const id = entry.target.getAttribute('id');
    navLinks.forEach((link) => {
      const active = link.getAttribute('href') === `#${id}`;
      link.classList.toggle('active', active);
    });
  });
}, { threshold: 0.42 });

document.querySelectorAll('main section[id]').forEach((section) => sectionObserver.observe(section));

const heroMetaItems = document.querySelectorAll('.hero-meta > div');
window.addEventListener('mousemove', (event) => {
  const x = (event.clientX / window.innerWidth - 0.5) * 2;
  const y = (event.clientY / window.innerHeight - 0.5) * 2;
  heroMetaItems.forEach((item, idx) => {
    const offset = (idx + 1) * 2.2;
    item.style.transform = `translate(${x * offset}px, ${y * offset}px)`;
  });
});
