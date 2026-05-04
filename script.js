// ===== SPACE BACKGROUND =====
(function() {
  const canvas = document.getElementById('space-canvas');
  const ctx = canvas.getContext('2d');
  let w, h, stars, nebulae, t = 0;

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    createStars();
  }

  function createStars() {
    const count = Math.floor((w * h) / 6000);
    stars = [];
    for (let i = 0; i < count; i++) {
      stars.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() < 0.03 ? Math.random() * 2 + 1.5 : Math.random() * 1.2 + 0.3,
        baseAlpha: Math.random() * 0.6 + 0.2,
        pulse: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.02 + 0.005,
      });
    }
  }

  nebulae = [
    { x: 0.15, y: 0.2, rx: 350, ry: 250, r: 70, g: 130, b: 240, alpha: 0.17, phase: 0 },
    { x: 0.8, y: 0.5, rx: 300, ry: 300, r: 140, g: 60, b: 220, alpha: 0.14, phase: 2 },
    { x: 0.4, y: 0.75, rx: 280, ry: 200, r: 90, g: 80, b: 200, alpha: 0.12, phase: 4 },
    { x: 0.7, y: 0.15, rx: 200, ry: 180, r: 60, g: 120, b: 230, alpha: 0.10, phase: 1 },
  ];

  resize();
  window.addEventListener('resize', resize);

  function drawNebulae() {
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    const mult = isLight ? 0.4 : 1;

    nebulae.forEach(n => {
      const cx = n.x * w + Math.sin(t * 0.0003 + n.phase) * 30;
      const cy = n.y * h + Math.cos(t * 0.0002 + n.phase) * 20;
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(n.rx, n.ry));
      const a = n.alpha * mult;
      if (isLight) {
        grad.addColorStop(0, `rgba(${n.r},${n.g},${n.b},${a * 0.6})`);
        grad.addColorStop(0.4, `rgba(${n.r},${n.g},${n.b},${a * 0.3})`);
        grad.addColorStop(1, 'transparent');
      } else {
        grad.addColorStop(0, `rgba(${n.r},${n.g},${n.b},${a})`);
        grad.addColorStop(0.5, `rgba(${n.r},${n.g},${n.b},${a * 0.4})`);
        grad.addColorStop(1, 'transparent');
      }
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.ellipse(cx, cy, n.rx, n.ry, 0, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  function drawStars() {
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    stars.forEach(s => {
      s.pulse += s.speed;
      const flicker = s.baseAlpha + Math.sin(s.pulse) * 0.25;
      const alpha = Math.max(0.05, Math.min(1, flicker));
      const displayAlpha = isLight ? alpha * 0.25 : alpha;
      if (s.r > 1.5) {
        // Bright stars get a soft glow
        const glow = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.r * 4);
        glow.addColorStop(0, `rgba(180,200,255,${displayAlpha * 0.6})`);
        glow.addColorStop(1, 'transparent');
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r * 4, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.fillStyle = isLight
        ? `rgba(40,60,120,${displayAlpha})`
        : `rgba(220,230,255,${displayAlpha})`;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  function draw() {
    t++;
    ctx.clearRect(0, 0, w, h);
    drawNebulae();
    drawStars();
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
