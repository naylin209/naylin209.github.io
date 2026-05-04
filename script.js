// ===== PARTICLES =====
(function() {
  const canvas = document.getElementById('particles-canvas');
  const ctx = canvas.getContext('2d');
  let w, h, particles;

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  function createParticles() {
    const count = Math.floor((w * h) / 18000);
    particles = [];
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.2 + 0.3,
        dx: (Math.random() - 0.5) * 0.15,
        dy: (Math.random() - 0.5) * 0.1,
        opacity: Math.random() * 0.4 + 0.1,
        pulse: Math.random() * Math.PI * 2,
      });
    }
  }
  createParticles();

  function draw() {
    ctx.clearRect(0, 0, w, h);
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    particles.forEach(p => {
      p.x += p.dx;
      p.y += p.dy;
      p.pulse += 0.008;
      if (p.x < -10) p.x = w + 10;
      if (p.x > w + 10) p.x = -10;
      if (p.y < -10) p.y = h + 10;
      if (p.y > h + 10) p.y = -10;
      const flicker = p.opacity + Math.sin(p.pulse) * 0.15;
      const alpha = Math.max(0, Math.min(1, flicker));
      if (isLight) {
        ctx.fillStyle = `rgba(61,125,217,${alpha * 0.4})`;
      } else {
        ctx.fillStyle = `rgba(91,156,246,${alpha * 0.5})`;
      }
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }
  draw();
})();

// ===== NAV SCROLL =====
window.addEventListener('scroll', () => {
  document.getElementById('nav').classList.toggle('scrolled', scrollY > 50);
});

// ===== REVEAL ON SCROLL =====
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      obs.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

// ===== TYPING EFFECT =====
const roles = [
  'Building AI pipelines & full-stack systems',
  'Data Scientist · Data Engineer',
  'Backend Developer · Cloud Engineer',
  'RIT Computing & IT · May 2026'
];
let ri = 0, ci = 0, del = false;
const roleEl = document.getElementById('roleText');
function type() {
  const s = roles[ri];
  if (!del) {
    roleEl.textContent = s.slice(0, ++ci);
    if (ci === s.length) { del = true; setTimeout(type, 2600); return; }
  } else {
    roleEl.textContent = s.slice(0, --ci);
    if (ci === 0) { del = false; ri = (ri + 1) % roles.length; }
  }
  setTimeout(type, del ? 34 : 60);
}
setTimeout(type, 1600);

// ===== CONTACT FORM =====
function handleSubmit() {
  const n = document.getElementById('fname').value.trim();
  const e = document.getElementById('femail').value.trim();
  const m = document.getElementById('fmsg').value.trim();
  if (!n || !e || !m) { alert('Please fill in all fields.'); return; }
  const btn = document.querySelector('.cf-submit');
  btn.textContent = 'Sending...';
  btn.disabled = true;
  emailjs.send('service_yb4yek5', 'template_w5moqnm', { name: n, email: e, message: m })
    .then(() => {
      btn.textContent = 'Message Sent!';
      btn.style.background = '#5b9cf6';
      document.getElementById('fname').value = '';
      document.getElementById('femail').value = '';
      document.getElementById('fmsg').value = '';
      setTimeout(() => { btn.textContent = 'Send Message'; btn.style.background = ''; btn.disabled = false; }, 4000);
    })
    .catch(() => {
      btn.textContent = 'Failed. Try Again';
      btn.style.background = '#c0392b';
      btn.style.color = '#fff';
      setTimeout(() => { btn.textContent = 'Send Message'; btn.style.background = ''; btn.style.color = ''; btn.disabled = false; }, 4000);
    });
}

// ===== THEME TOGGLE =====
const themeBtn = document.getElementById('themeToggle');
const sunIcon = `<svg viewBox="0 0 24 24"><path d="M12 18a6 6 0 1 1 0-12 6 6 0 0 1 0 12zm0-2a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm0-12a1 1 0 0 1 1 1v2a1 1 0 0 1-2 0V5a1 1 0 0 1 1-1zm0 15a1 1 0 0 1 1 1v2a1 1 0 0 1-2 0v-2a1 1 0 0 1 1-1zm8-8a1 1 0 0 1 0 2h-2a1 1 0 0 1 0-2h2zM7 12a1 1 0 0 1-1 1H4a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1zm10.07-5.07a1 1 0 0 1 0 1.41l-1.41 1.42a1 1 0 1 1-1.42-1.42l1.42-1.41a1 1 0 0 1 1.41 0zM8.76 15.24a1 1 0 0 1 0 1.42l-1.42 1.41a1 1 0 1 1-1.41-1.41l1.41-1.42a1 1 0 0 1 1.42 0zm8.48 2.83a1 1 0 0 1-1.41 0l-1.42-1.41a1 1 0 1 1 1.42-1.42l1.41 1.42a1 1 0 0 1 0 1.41zM8.76 8.76a1 1 0 0 1-1.42 0L5.93 7.34a1 1 0 0 1 1.41-1.41l1.42 1.41a1 1 0 0 1 0 1.42z"/></svg>`;
const moonIcon = `<svg viewBox="0 0 24 24"><path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.39 5.39 0 0 1-4.4 2.26 5.4 5.4 0 0 1-3.14-9.8C13.06 3.04 12.54 3 12 3z"/></svg>`;

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  themeBtn.innerHTML = theme === 'dark' ? sunIcon : moonIcon;
}

// Init theme
const savedTheme = localStorage.getItem('theme') || 'dark';
setTheme(savedTheme);

themeBtn.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  setTheme(current === 'dark' ? 'light' : 'dark');
});

// ===== HIGH-FIVE COUNTER =====
const hfBtn = document.getElementById('highfiveBtn');
const hfCount = document.getElementById('hfCount');
let highfives = parseInt(localStorage.getItem('highfives') || '0', 10);
hfCount.textContent = highfives;

hfBtn.addEventListener('click', () => {
  highfives++;
  hfCount.textContent = highfives;
  localStorage.setItem('highfives', highfives);
  hfBtn.classList.add('pop');
  setTimeout(() => hfBtn.classList.remove('pop'), 300);
});

// ===== COMMAND PALETTE =====
const cmdkOverlay = document.getElementById('cmdkOverlay');
const cmdkInput = document.getElementById('cmdkInput');
const cmdkBody = document.getElementById('cmdkBody');

const cmdkItems = [
  { group: 'Navigation', icon: '↑', label: 'Go to Top', shortcut: ['shift', 'H'], action: () => scrollToEl('hero') },
  { group: 'Navigation', icon: '◇', label: 'About', shortcut: ['shift', 'A'], action: () => scrollToEl('about') },
  { group: 'Navigation', icon: '◇', label: 'Experience', shortcut: ['shift', 'E'], action: () => scrollToEl('experience') },
  { group: 'Navigation', icon: '◇', label: 'Projects', shortcut: ['shift', 'P'], action: () => scrollToEl('projects') },
  { group: 'Navigation', icon: '◇', label: 'Skills', shortcut: ['shift', 'S'], action: () => scrollToEl('skills') },
  { group: 'Navigation', icon: '◇', label: 'Contact', shortcut: ['shift', 'C'], action: () => scrollToEl('contact') },
  { group: 'Links', icon: '✉', label: 'Email', shortcut: ['shift', 'M'], action: () => window.open('mailto:naylin2345@gmail.com') },
  { group: 'Links', icon: '⬡', label: 'LinkedIn', shortcut: ['shift', 'L'], action: () => window.open('https://linkedin.com/in/naylin-aung', '_blank') },
  { group: 'Links', icon: '⬡', label: 'GitHub', shortcut: ['shift', 'G'], action: () => window.open('https://github.com/naylin209', '_blank') },
  { group: 'Actions', icon: '☀', label: 'Toggle Theme', shortcut: ['shift', 'T'], action: () => { const c = document.documentElement.getAttribute('data-theme'); setTheme(c === 'dark' ? 'light' : 'dark'); } },
];

function scrollToEl(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

function openCmdk() {
  cmdkOverlay.classList.add('open');
  cmdkInput.value = '';
  renderCmdk('');
  setTimeout(() => cmdkInput.focus(), 50);
}
function closeCmdk() {
  cmdkOverlay.classList.remove('open');
}

function renderCmdk(query) {
  const q = query.toLowerCase();
  const filtered = cmdkItems.filter(item => item.label.toLowerCase().includes(q) || item.group.toLowerCase().includes(q));

  if (filtered.length === 0) {
    cmdkBody.innerHTML = '<div class="cmdk-empty">No results found.</div>';
    return;
  }

  let html = '';
  let lastGroup = '';
  filtered.forEach((item, i) => {
    if (item.group !== lastGroup) {
      lastGroup = item.group;
      html += `<div class="cmdk-group-label">${item.group}</div>`;
    }
    const shortcutHtml = item.shortcut ? item.shortcut.map(k => `<kbd>${k}</kbd>`).join(' + ') : '';
    html += `<div class="cmdk-item" data-index="${i}">
      <span class="cmdk-item-icon">${item.icon}</span>
      <span class="cmdk-item-label">${item.label}</span>
      <span class="cmdk-item-shortcut">${shortcutHtml}</span>
    </div>`;
  });
  cmdkBody.innerHTML = html;

  // Click handlers
  cmdkBody.querySelectorAll('.cmdk-item').forEach(el => {
    el.addEventListener('click', () => {
      const idx = parseInt(el.dataset.index, 10);
      filtered[idx].action();
      closeCmdk();
    });
  });
}

cmdkInput.addEventListener('input', () => renderCmdk(cmdkInput.value));

// Keyboard: Ctrl+K to open, Esc to close
document.addEventListener('keydown', (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault();
    cmdkOverlay.classList.contains('open') ? closeCmdk() : openCmdk();
  }
  if (e.key === 'Escape' && cmdkOverlay.classList.contains('open')) {
    closeCmdk();
  }
});

// Click outside to close
cmdkOverlay.addEventListener('click', (e) => {
  if (e.target === cmdkOverlay) closeCmdk();
});

// Trigger button
document.getElementById('cmdkTrigger').addEventListener('click', openCmdk);

// Global keyboard shortcuts (Shift+key)
document.addEventListener('keydown', (e) => {
  if (cmdkOverlay.classList.contains('open')) return;
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
  if (!e.shiftKey || e.ctrlKey || e.metaKey || e.altKey) return;

  const keyMap = {
    'H': () => scrollToEl('hero'),
    'A': () => scrollToEl('about'),
    'E': () => scrollToEl('experience'),
    'P': () => scrollToEl('projects'),
    'S': () => scrollToEl('skills'),
    'C': () => scrollToEl('contact'),
    'M': () => window.open('mailto:naylin2345@gmail.com'),
    'L': () => window.open('https://linkedin.com/in/naylin-aung', '_blank'),
    'G': () => window.open('https://github.com/naylin209', '_blank'),
    'T': () => { const c = document.documentElement.getAttribute('data-theme'); setTheme(c === 'dark' ? 'light' : 'dark'); },
  };

  if (keyMap[e.key]) {
    e.preventDefault();
    keyMap[e.key]();
  }
});
