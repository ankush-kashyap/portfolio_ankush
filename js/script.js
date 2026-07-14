
/* ── PROJECTS DATA ───────────────────────────────────── */
const projects = [
  {
    title: "PlayNexa — Gaming Platform",
    description: "A full-stack gaming web platform with secure PHP authentication, MySQL database, admin panel, and a fully responsive frontend.",
    imageUrl: "./images/logo_playnexa1.jpg",
    liveUrl: "https://playnexa.kesug.com",
    codeUrl: "https://github.com/ankush-kashyap/PalyNexa.git",
    tech: ["HTML5", "CSS3", "JavaScript", "PHP", "MySQL"]
  },
  {
    title: "E-commerce Concept",
    description: "A frBuilt a responsive Amazon-inspired e-commerce application using React and Vite with product search, category filters, wishlist, shopping cart, protected checkout, product details, local storage, and responsive design.ont-end implementation for an e-commerce platform with clean UI, responsive product grids, and a streamlined checkout flow.",
    imageUrl: "./images/logo_amazon.png",
    liveUrl: "https://ecommerce0anx.netlify.app/",
    codeUrl: "https://github.com/ankush-kashyap/ecommere-app",
    tech: ["HTML5", "CSS3", "JavaScript","React.js","Responsive Design"]
  },
  {
    title: "Habit Tracker",
    description: "A monthly habit tracking dashboard with daily check-ins, score charts, and a yearly progress overview. Features user auth and persistent data.",
    imageUrl: "./images/logo_habit_tracker1.jpg",
    liveUrl: "https://habitrackeranx.netlify.app/",
    codeUrl: "https://github.com/ankush-kashyap/habit_tracker.git",
    tech: ["HTML5", "CSS3", "JavaScript", "Chart.js", "LocalStorage"]
  }
];

/* ── RENDER PROJECTS ─────────────────────────────────── */
const renderProjects = () => {
  const container = document.querySelector('.projects-container');
  if (!container) return;
  container.innerHTML = projects.map(p => `
    <div class="project-card reveal">
      <div class="project-image-container">
        <img src="${p.imageUrl}" alt="${p.title}" class="project-image" loading="lazy">
        <div class="project-overlay">
          <a href="${p.liveUrl}" class="overlay-btn" target="_blank" rel="noopener">Live Demo</a>
          <a href="${p.codeUrl}" class="overlay-btn" target="_blank" rel="noopener">View Code</a>
        </div>
      </div>
      <div class="project-info">
        <h3>${p.title}</h3>
        <p>${p.description}</p>
        <div class="project-tech">${p.tech.map(t => `<span>${t}</span>`).join('')}</div>
        <div class="project-links">
          <a href="${p.liveUrl}" target="_blank" rel="noopener">Live Demo</a>
          <a href="${p.codeUrl}" target="_blank" rel="noopener">View Code</a>
        </div>
      </div>
    </div>
  `).join('');
  observeReveal();
};

/* ── TYPING EFFECT ───────────────────────────────────── */
const typingWords = [
  "Responsive Websites.",
  "Clean UI Components.",
  "Interactive Web Apps.",
  "Engaging Experiences."
];
let wordIdx = 0, charIdx = 0, isDeleting = false;
const typingEl = document.getElementById('typingText');

const type = () => {
  if (!typingEl) return;
  const word = typingWords[wordIdx];
  typingEl.textContent = isDeleting ? word.slice(0, charIdx--) : word.slice(0, charIdx++);

  if (!isDeleting && charIdx > word.length) {
    setTimeout(() => { isDeleting = true; type(); }, 1800);
    return;
  }
  if (isDeleting && charIdx < 0) {
    isDeleting = false;
    wordIdx = (wordIdx + 1) % typingWords.length;
  }
  setTimeout(type, isDeleting ? 50 : 80);
};

/* ── SCROLL REVEAL ───────────────────────────────────── */
const observeReveal = () => {
  const els = document.querySelectorAll('.reveal');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), i * 100);
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  els.forEach(el => obs.observe(el));
};

/* ── ACTIVE NAV ON SCROLL ────────────────────────────── */
const updateActiveNav = () => {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  const scrollY = window.pageYOffset;

  sections.forEach(sec => {
    const top = sec.offsetTop - 120;
    const bottom = top + sec.offsetHeight;
    if (scrollY >= top && scrollY < bottom) {
      navLinks.forEach(l => l.classList.remove('active'));
      const active = document.querySelector(`.nav-link[href="#${sec.id}"]`);
      if (active) active.classList.add('active');
    }
  });
};

/* ── SMOOTH SCROLL ───────────────────────────────────── */
const initSmoothScroll = () => {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      const offset = 80;
      window.scrollTo({ top: target.getBoundingClientRect().top + window.pageYOffset - offset, behavior: 'smooth' });
      // close mobile menu
      const navUl = document.querySelector('header nav ul');
      if (navUl) navUl.classList.remove('active');
    });
  });
};

/* ── SCROLL TO TOP BUTTON ────────────────────────────── */
const initScrollTop = () => {
  const btn = document.createElement('button');
  btn.className = 'scroll-top';
  btn.innerHTML = '↑';
  btn.setAttribute('aria-label', 'Scroll to top');
  document.body.appendChild(btn);
  window.addEventListener('scroll', () => btn.classList.toggle('visible', window.pageYOffset > 500));
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
};

/* ── THEME TOGGLE ────────────────────────────────────── */
const themeToggle = document.querySelector('#theme-toggle');
const html = document.documentElement;

themeToggle?.addEventListener('change', () => {
  const theme = themeToggle.checked ? 'dark' : 'light';
  html.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
});

(() => {
  const saved = localStorage.getItem('theme');
  if (saved) {
    html.setAttribute('data-theme', saved);
    if (themeToggle && saved === 'dark') themeToggle.checked = true;
  }
})();

/* ── HAMBURGER MENU ──────────────────────────────────── */
const menuToggle = document.querySelector('.menu-toggle');
const navUl = document.querySelector('header nav ul');

menuToggle?.addEventListener('click', () => {
  const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', !expanded);
  navUl?.classList.toggle('active');
});

/* ── CONTACT FORM ────────────────────────────────────── */
const initContactForm = () => {
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  if (!form || !status) return;

  form.addEventListener('submit', async e => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.textContent = 'Sending...';
    status.style.display = 'none';

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      });
      if (res.ok) {
        status.textContent = '✅ Thank you! Your message has been sent.';
        status.className = 'success';
        form.reset();
      } else {
        const data = await res.json();
        status.textContent = data.errors?.map(e => e.message).join(', ') || 'Something went wrong.';
        status.className = 'error';
      }
    } catch {
      status.textContent = '⚠️ Network error. Please check your connection.';
      status.className = 'error';
    } finally {
      btn.disabled = false;
      btn.textContent = 'Send Message 🚀';
      status.style.display = 'block';
    }
  });
};

/* ── INIT ────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  renderProjects();
  observeReveal();
  initSmoothScroll();
  initScrollTop();
  initContactForm();
  type();
});

window.addEventListener('scroll', updateActiveNav, { passive: true });