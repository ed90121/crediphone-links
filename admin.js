/**
 * admin.js — Panel de administracion CrediPhone Linktree
 * Todo se guarda en localStorage. Sin servidor, sin base de datos.
 */

/* ============================================================
   DATOS POR DEFECTO
   ============================================================ */

const STORAGE_KEY = 'crediphone_linktree_v2';

const ICONS = {
  whatsapp: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.334.101 11.893c0 2.096.549 4.14 1.595 5.945L0 24l6.335-1.652c1.746.943 3.71 1.444 5.71 1.447h.006c6.585 0 11.946-5.336 11.949-11.896.002-3.176-1.24-6.165-3.48-8.45zM12.045 21.785h-.005c-1.774 0-3.513-.476-5.031-1.37l-.361-.214-3.741.976.998-3.645-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.002-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.993c-.003 5.448-4.437 9.884-9.884 9.884zm5.422-7.403c-.297-.149-1.758-.867-2.03-.967-.273-.099-.473-.148-.672.15-.198.296-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.019-.458.13-.606.134-.133.297-.347.446-.52.148-.174.198-.298.297-.497.1-.198.05-.372-.025-.521-.075-.148-.672-1.618-.922-2.217-.241-.58-.487-.501-.672-.51a12.86 12.86 0 0 0-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" fill="currentColor"/></svg>`,
  instagram: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="2"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>`,
  facebook: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  tiktok: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  youtube: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" stroke="currentColor" stroke-width="2"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" stroke="currentColor" stroke-width="2" stroke-linejoin="round" fill="currentColor"/></svg>`,
  web: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,
  email: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" stroke-width="2"/><polyline points="22,6 12,13 2,6" stroke="currentColor" stroke-width="2"/></svg>`,
  telegram: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.198 2.433a2.242 2.242 0 0 0-1.022.215l-17.5 7.5a2.25 2.25 0 0 0 .122 4.21l3.5 1.167 1.546 4.68a1 1 0 0 0 1.615.447l2.168-1.902 3.927 2.945a2.25 2.25 0 0 0 3.504-1.396l2.942-16.5a2.25 2.25 0 0 0-2.802-2.366z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>`,
  link: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,
};

const ARROW_SVG = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

const DEFAULT_DATA = {
  brand: 'CrediPhone',
  tagline: 'Celulares, accesorios y credito accesible',
  avatar: 'profile.jpg',
  avatarType: 'url',   // 'url' | 'base64' | 'none'
  font: "'Plus Jakarta Sans', system-ui, sans-serif",
  colors: {
    primary:  '#075A58',
    accent:   '#C65B3D',
    bg:       '#F7F3ED',
    surface:  '#FFFFFF',
    text:     '#033130',
  },
  links: [
    { id: 'wa',   label: 'WhatsApp',      url: 'https://wa.me/573001234567',          icon: 'whatsapp', variant: 'primary', visible: true },
    { id: 'ig',   label: 'Instagram',     url: 'https://www.instagram.com/crediphone', icon: 'instagram', variant: 'default', visible: true },
    { id: 'fb',   label: 'Facebook',      url: 'https://www.facebook.com/crediphone',  icon: 'facebook',  variant: 'default', visible: true },
    { id: 'tt',   label: 'TikTok',        url: 'https://www.tiktok.com/@crediphone',   icon: 'tiktok',    variant: 'default', visible: true },
    { id: 'web',  label: 'Tienda en linea', url: 'https://www.crediphone.com',         icon: 'web',       variant: 'accent',  visible: true },
  ],
  password: 'crediphone',
};

const COLOR_PRESETS = [
  { name: 'CrediPhone',   primary: '#075A58', accent: '#C65B3D', bg: '#F7F3ED', surface: '#FFFFFF', text: '#033130' },
  { name: 'Noche',        primary: '#1a1a2e', accent: '#e94560', bg: '#16213e', surface: '#1f2b47', text: '#e0e0e0' },
  { name: 'Lavanda',      primary: '#6c63ff', accent: '#f4a261', bg: '#f5f3ff', surface: '#FFFFFF', text: '#1a1035' },
  { name: 'Rosa',         primary: '#be185d', accent: '#f59e0b', bg: '#fff1f7', surface: '#FFFFFF', text: '#1f0010' },
  { name: 'Bosque',       primary: '#14532d', accent: '#ca8a04', bg: '#f0fdf4', surface: '#FFFFFF', text: '#14532d' },
  { name: 'Carbon',       primary: '#374151', accent: '#3b82f6', bg: '#111827', surface: '#1f2937', text: '#f9fafb' },
];

/* ============================================================
   UTILIDADES
   ============================================================ */

function uid() {
  return Math.random().toString(36).slice(2, 8);
}

function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return JSON.parse(JSON.stringify(DEFAULT_DATA));
    const saved = JSON.parse(raw);
    // Mezclar con defaults para garantizar que campos nuevos existan
    return {
      ...DEFAULT_DATA,
      ...saved,
      colors:  { ...DEFAULT_DATA.colors,  ...(saved.colors  || {}) },
      links:   Array.isArray(saved.links) ? saved.links : DEFAULT_DATA.links,
    };
  } catch {
    return JSON.parse(JSON.stringify(DEFAULT_DATA));
  }
}

function saveData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function showToast(msg, type) {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.style.background = type === 'error' ? 'var(--color-danger)' : 'var(--color-text)';
  el.classList.add('is-visible');
  clearTimeout(el._timer);
  el._timer = setTimeout(() => el.classList.remove('is-visible'), 2800);
}

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1,3), 16);
  const g = parseInt(hex.slice(3,5), 16);
  const b = parseInt(hex.slice(5,7), 16);
  return { r, g, b };
}

function darken(hex, amount) {
  const { r, g, b } = hexToRgb(hex);
  const d = (v) => Math.max(0, Math.min(255, v - amount));
  return '#' + [d(r), d(g), d(b)].map(v => v.toString(16).padStart(2,'0')).join('');
}

function isValidHex(val) {
  return /^#[0-9a-fA-F]{6}$/.test(val);
}

function isValidUrl(val) {
  if (!val) return false;
  try { new URL(val); return true; } catch { return false; }
}

/* ============================================================
   RENDERIZADO DE LA PAGINA PUBLICA
   ============================================================ */

let currentData;

function applyColors(colors) {
  const root = document.documentElement;
  root.style.setProperty('--color-primary',     colors.primary);
  root.style.setProperty('--color-primary-dark', darken(colors.primary, 30));
  root.style.setProperty('--color-primary-soft', lighten(colors.primary, 40));
  root.style.setProperty('--color-accent',       colors.accent);
  root.style.setProperty('--color-accent-dark',  darken(colors.accent, 20));
  root.style.setProperty('--color-accent-darker',darken(colors.accent, 40));
  root.style.setProperty('--color-bg',           colors.bg);
  root.style.setProperty('--color-surface',      colors.surface);
  root.style.setProperty('--color-text',         colors.text);
  root.style.setProperty('--color-focus-ring',   colors.primary);
  root.style.setProperty('--color-text-muted',   darken(colors.text, -20));
  root.style.setProperty('--color-border',       mixHex(colors.bg, colors.surface, 0.5));
}

function lighten(hex, amount) {
  const { r, g, b } = hexToRgb(hex);
  const l = (v) => Math.max(0, Math.min(255, v + amount));
  return '#' + [l(r), l(g), l(b)].map(v => v.toString(16).padStart(2,'0')).join('');
}

function mixHex(hex1, hex2, t) {
  const a = hexToRgb(hex1), b = hexToRgb(hex2);
  const mix = (v1, v2) => Math.round(v1 * (1-t) + v2 * t);
  return '#' + ['r','g','b'].map(k => mix(a[k], b[k]).toString(16).padStart(2,'0')).join('');
}

function applyFont(fontFamily) {
  document.documentElement.style.setProperty('--font-family', fontFamily);
  // Cargar fuente de Google Fonts si es necesaria y no esta cargada
  const fontName = fontFamily.match(/'([^']+)'/)?.[1];
  if (fontName && fontName !== 'Plus Jakarta Sans' && !document.querySelector(`link[data-gfont="${fontName}"]`)) {
    const link = document.createElement('link');
    link.rel  = 'stylesheet';
    link.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(fontName)}:wght@400;500;600;700&display=swap`;
    link.setAttribute('data-gfont', fontName);
    document.head.appendChild(link);
  }
}

function renderPage(data) {
  // Titulo del documento
  document.title = data.brand + ' | Links';

  // Nombre y tagline
  document.getElementById('brand-name').textContent    = data.brand;
  document.getElementById('brand-tagline').textContent = data.tagline;
  document.getElementById('footer-brand').textContent  = data.brand;

  // Avatar
  const img      = document.getElementById('avatar-img');
  const fallback = document.getElementById('avatar-fallback');
  const initials = data.brand.split(' ').map(w => w[0]).join('').slice(0,2).toUpperCase();

  fallback.textContent = initials;
  document.getElementById('avatar-preview-fallback') &&
    (document.getElementById('avatar-preview-fallback').textContent = initials);

  if (data.avatarType === 'none') {
    img.style.display      = 'none';
    fallback.style.display = 'flex';
  } else {
    img.src = data.avatar;
    img.style.display      = '';
    fallback.style.display = 'none';
    img.onerror = () => {
      img.style.display      = 'none';
      fallback.style.display = 'flex';
    };
    img.onload = () => {
      img.style.display      = '';
      fallback.style.display = 'none';
    };
  }

  // Colores
  applyColors(data.colors);

  // Fuente
  applyFont(data.font);

  // Links
  const list = document.getElementById('links-list');
  list.innerHTML = '';
  data.links.filter(l => l.visible !== false).forEach(link => {
    const li = document.createElement('li');
    const cls = ['link-btn'];
    if (link.variant === 'primary') cls.push('link-btn--primary');
    if (link.variant === 'accent')  cls.push('link-btn--accent');

    li.innerHTML = `
      <a class="${cls.join(' ')}"
         href="${escapeHtml(link.url)}"
         target="_blank"
         rel="noopener noreferrer"
         aria-label="${escapeHtml(link.label)}">
        <span class="link-btn__icon" aria-hidden="true">${ICONS[link.icon] || ICONS.link}</span>
        <span class="link-btn__label">${escapeHtml(link.label)}</span>
        <span class="link-btn__arrow" aria-hidden="true">${ARROW_SVG}</span>
      </a>`;
    list.appendChild(li);
  });

  // Ano en footer
  document.getElementById('year').textContent = new Date().getFullYear();
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/* ============================================================
   PANEL DE ADMIN — ESTADO
   ============================================================ */

let draftData = null;    // copia de trabajo mientras el panel esta abierto
let isAuthenticated = false;
let dragSrcIndex = null;

/* ============================================================
   LOGIN
   ============================================================ */

function openLogin() {
  const bd = document.getElementById('login-backdrop');
  bd.setAttribute('aria-hidden', 'false');
  bd.classList.add('is-open');
  document.getElementById('login-password').value = '';
  document.getElementById('login-error').textContent = '';
  setTimeout(() => document.getElementById('login-password').focus(), 50);
}

function closeLogin() {
  const bd = document.getElementById('login-backdrop');
  bd.setAttribute('aria-hidden', 'true');
  bd.classList.remove('is-open');
}

document.getElementById('admin-trigger').addEventListener('click', () => {
  if (isAuthenticated) {
    openPanel();
  } else {
    openLogin();
  }
});

document.getElementById('login-cancel').addEventListener('click', closeLogin);

document.getElementById('login-backdrop').addEventListener('click', (e) => {
  if (e.target === e.currentTarget) closeLogin();
});

document.getElementById('login-backdrop').addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLogin();
});

document.getElementById('toggle-password').addEventListener('click', () => {
  const inp = document.getElementById('login-password');
  inp.type = inp.type === 'password' ? 'text' : 'password';
});

document.getElementById('login-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const val = document.getElementById('login-password').value;
  if (val === currentData.password) {
    isAuthenticated = true;
    closeLogin();
    openPanel();
  } else {
    document.getElementById('login-error').textContent = 'Contrasena incorrecta. Intentalo de nuevo.';
    document.getElementById('login-password').value = '';
    document.getElementById('login-password').focus();
  }
});

/* ============================================================
   PANEL
   ============================================================ */

function openPanel() {
  draftData = JSON.parse(JSON.stringify(currentData));  // deep copy
  populatePanel(draftData);

  const backdrop = document.getElementById('panel-backdrop');
  const panel    = document.getElementById('admin-panel');
  backdrop.classList.add('is-open');
  panel.classList.add('is-open');
  panel.setAttribute('aria-hidden', 'false');
  backdrop.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  setTimeout(() => document.getElementById('panel-close').focus(), 100);
}

function closePanel() {
  const backdrop = document.getElementById('panel-backdrop');
  const panel    = document.getElementById('admin-panel');
  backdrop.classList.remove('is-open');
  panel.classList.remove('is-open');
  panel.setAttribute('aria-hidden', 'true');
  backdrop.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  document.getElementById('admin-trigger').focus();
}

document.getElementById('panel-close').addEventListener('click', closePanel);
document.getElementById('panel-backdrop').addEventListener('click', closePanel);

document.getElementById('admin-panel').addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closePanel();
});

document.getElementById('panel-discard').addEventListener('click', () => {
  renderPage(currentData);
  closePanel();
});

document.getElementById('panel-save').addEventListener('click', () => {
  collectDraft();
  currentData = JSON.parse(JSON.stringify(draftData));
  saveData(currentData);
  renderPage(currentData);
  closePanel();
  showToast('Cambios guardados');
});

/* ============================================================
   SECCIONES COLAPSABLES
   ============================================================ */

document.querySelectorAll('.section-toggle').forEach(btn => {
  btn.addEventListener('click', () => {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    const bodyId   = btn.getAttribute('aria-controls');
    const body     = document.getElementById(bodyId);
    btn.setAttribute('aria-expanded', String(!expanded));
    body.classList.toggle('section-body--collapsed', expanded);
  });
});

/* ============================================================
   POBLAR EL PANEL CON LOS DATOS DEL DRAFT
   ============================================================ */

function populatePanel(data) {
  // Perfil
  document.getElementById('edit-brand').value   = data.brand;
  document.getElementById('edit-tagline').value = data.tagline;

  // Avatar preview
  updateAvatarPreview(data);

  // URL del avatar
  document.getElementById('avatar-url').value = data.avatarType === 'url' ? data.avatar : '';

  // Font
  document.getElementById('edit-font').value = data.font;

  // Colores
  Object.entries(data.colors).forEach(([key, val]) => {
    const swatch = document.getElementById('color-' + key);
    const hex    = document.getElementById('color-' + key + '-hex');
    if (swatch) swatch.value = val;
    if (hex)    hex.value    = val;
  });

  // Marcar preset activo
  updatePresetButtons(data.colors);

  // Links
  renderLinksEditor(data.links);

  // Password (vaciar)
  document.getElementById('new-password').value     = '';
  document.getElementById('confirm-password').value = '';
  document.getElementById('password-error').textContent = '';
}

/* ============================================================
   AVATAR EN EL PANEL
   ============================================================ */

function updateAvatarPreview(data) {
  const img      = document.getElementById('avatar-preview');
  const fallback = document.getElementById('avatar-preview-fallback');
  const initials = data.brand.split(' ').map(w => w[0]).join('').slice(0,2).toUpperCase();
  fallback.textContent = initials;

  if (data.avatarType === 'none') {
    img.style.display      = 'none';
    fallback.style.display = 'flex';
  } else {
    img.src = data.avatar;
    img.style.display      = '';
    fallback.style.display = 'none';
    img.onerror = () => {
      img.style.display      = 'none';
      fallback.style.display = 'flex';
    };
  }
}

// Subir imagen (file → base64)
document.getElementById('avatar-file-input').addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (!file) return;
  if (file.size > 2 * 1024 * 1024) {
    showToast('La imagen debe pesar menos de 2 MB', 'error');
    return;
  }
  const reader = new FileReader();
  reader.onload = (ev) => {
    draftData.avatar     = ev.target.result;
    draftData.avatarType = 'base64';
    updateAvatarPreview(draftData);
    renderPage(draftData);
    document.getElementById('avatar-url').value = '';
  };
  reader.readAsDataURL(file);
});

// URL de imagen
document.getElementById('avatar-url').addEventListener('change', (e) => {
  const val = e.target.value.trim();
  if (!val) return;
  draftData.avatar     = val;
  draftData.avatarType = 'url';
  updateAvatarPreview(draftData);
  renderPage(draftData);
});

// Quitar foto
document.getElementById('avatar-remove').addEventListener('click', () => {
  draftData.avatar     = '';
  draftData.avatarType = 'none';
  document.getElementById('avatar-url').value = '';
  updateAvatarPreview(draftData);
  renderPage(draftData);
});

/* ============================================================
   PREVIEW EN VIVO — Perfil y Fuente
   ============================================================ */

['edit-brand', 'edit-tagline'].forEach(id => {
  document.getElementById(id).addEventListener('input', livePreview);
});

document.getElementById('edit-font').addEventListener('change', () => {
  draftData.font = document.getElementById('edit-font').value;
  applyFont(draftData.font);
});

function livePreview() {
  draftData.brand   = document.getElementById('edit-brand').value   || DEFAULT_DATA.brand;
  draftData.tagline = document.getElementById('edit-tagline').value || DEFAULT_DATA.tagline;
  document.getElementById('brand-name').textContent    = draftData.brand;
  document.getElementById('brand-tagline').textContent = draftData.tagline;
  document.getElementById('footer-brand').textContent  = draftData.brand;
}

/* ============================================================
   COLORES — PICKER + HEX + PRESETS
   ============================================================ */

['primary', 'accent', 'bg', 'surface', 'text'].forEach(key => {
  const swatch = document.getElementById('color-' + key);
  const hexInp = document.getElementById('color-' + key + '-hex');

  swatch.addEventListener('input', () => {
    const val = swatch.value;
    hexInp.value = val;
    draftData.colors[key] = val;
    applyColors(draftData.colors);
    updatePresetButtons(draftData.colors);
  });

  hexInp.addEventListener('input', () => {
    const val = hexInp.value.trim();
    if (!isValidHex(val)) return;
    swatch.value = val;
    draftData.colors[key] = val;
    applyColors(draftData.colors);
    updatePresetButtons(draftData.colors);
  });
});

document.getElementById('reset-colors').addEventListener('click', () => {
  draftData.colors = { ...DEFAULT_DATA.colors };
  applyColors(draftData.colors);
  Object.entries(draftData.colors).forEach(([key, val]) => {
    const s = document.getElementById('color-' + key);
    const h = document.getElementById('color-' + key + '-hex');
    if (s) s.value = val;
    if (h) h.value = val;
  });
  updatePresetButtons(draftData.colors);
});

// Paletas rapidas
function buildPresets() {
  const container = document.getElementById('color-presets');
  container.innerHTML = '';
  COLOR_PRESETS.forEach((preset, i) => {
    const btn = document.createElement('button');
    btn.className = 'preset-btn';
    btn.setAttribute('aria-label', 'Paleta ' + preset.name);
    btn.setAttribute('title', preset.name);
    btn.setAttribute('aria-pressed', 'false');
    btn.style.background = `linear-gradient(135deg, ${preset.primary} 50%, ${preset.accent} 50%)`;
    btn.addEventListener('click', () => {
      draftData.colors = {
        primary: preset.primary,
        accent:  preset.accent,
        bg:      preset.bg,
        surface: preset.surface,
        text:    preset.text,
      };
      applyColors(draftData.colors);
      Object.entries(draftData.colors).forEach(([key, val]) => {
        const s = document.getElementById('color-' + key);
        const h = document.getElementById('color-' + key + '-hex');
        if (s) s.value = val;
        if (h) h.value = val;
      });
      updatePresetButtons(draftData.colors);
    });
    container.appendChild(btn);
  });
}

function updatePresetButtons(colors) {
  const btns = document.querySelectorAll('.preset-btn');
  btns.forEach((btn, i) => {
    const p = COLOR_PRESETS[i];
    if (!p) return;
    const match =
      p.primary === colors.primary &&
      p.accent  === colors.accent  &&
      p.bg      === colors.bg      &&
      p.surface === colors.surface &&
      p.text    === colors.text;
    btn.setAttribute('aria-pressed', String(match));
  });
}

/* ============================================================
   EDITOR DE LINKS
   ============================================================ */

function renderLinksEditor(links) {
  const container = document.getElementById('links-editor');
  container.innerHTML = '';
  links.forEach((link, index) => {
    container.appendChild(buildLinkEditor(link, index, links));
  });
}

function buildLinkEditor(link, index, links) {
  const wrap = document.createElement('div');
  wrap.className = 'link-item-editor';
  wrap.setAttribute('data-index', index);
  wrap.setAttribute('draggable', 'true');

  const isVisible = link.visible !== false;

  wrap.innerHTML = `
    <div class="link-item-editor__header">
      <span class="link-drag-handle" title="Arrastrar para reordenar" aria-hidden="true">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="9"  cy="6"  r="1.5" fill="currentColor"/>
          <circle cx="15" cy="6"  r="1.5" fill="currentColor"/>
          <circle cx="9"  cy="12" r="1.5" fill="currentColor"/>
          <circle cx="15" cy="12" r="1.5" fill="currentColor"/>
          <circle cx="9"  cy="18" r="1.5" fill="currentColor"/>
          <circle cx="15" cy="18" r="1.5" fill="currentColor"/>
        </svg>
      </span>
      <span class="link-item-label-preview">${escapeHtml(link.label)}</span>
      <button class="link-item-toggle" data-action="toggle-visible" aria-label="${isVisible ? 'Ocultar link' : 'Mostrar link'}">
        ${isVisible
          ? `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2"/></svg> Visible`
          : `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><line x1="1" y1="1" x2="23" y2="23" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg> Oculto`
        }
      </button>
    </div>
    <div class="link-item-editor__body">
      <div class="field-group">
        <label class="field-label" for="link-label-${link.id}">Nombre del boton</label>
        <input class="field-input" type="text" id="link-label-${link.id}" value="${escapeHtml(link.label)}" data-field="label" maxlength="40" />
      </div>
      <div class="field-group">
        <label class="field-label" for="link-url-${link.id}">URL (direccion del enlace)</label>
        <input class="field-input" type="url" id="link-url-${link.id}" value="${escapeHtml(link.url)}" data-field="url" placeholder="https://" />
      </div>
      <div class="link-item-editor__row">
        <div class="field-group">
          <label class="field-label" for="link-icon-${link.id}">Icono</label>
          <select class="field-input field-input--select" id="link-icon-${link.id}" data-field="icon">
            ${Object.keys(ICONS).map(k => `<option value="${k}" ${link.icon===k?'selected':''}>${k.charAt(0).toUpperCase()+k.slice(1)}</option>`).join('')}
          </select>
        </div>
        <div class="field-group">
          <span class="field-label">Estilo del boton</span>
          <div class="btn-style-picker">
            ${['default','primary','accent'].map(v => `
              <button class="btn-style-opt" data-variant="${v}" aria-pressed="${link.variant===v}" title="${v}">
                ${v === 'default' ? 'Normal' : v === 'primary' ? 'Lleno' : 'Acento'}
              </button>`).join('')}
          </div>
        </div>
      </div>
      <div class="link-item-editor__actions">
        <button class="btn btn--ghost btn--sm btn--danger" data-action="delete-link">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><polyline points="3 6 5 6 21 6" stroke="currentColor" stroke-width="2"/><path d="M19 6l-1 14H6L5 6M10 11v6M14 11v6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M9 6V4h6v2" stroke="currentColor" stroke-width="2"/></svg>
          Eliminar
        </button>
      </div>
    </div>`;

  // Eventos de campos
  wrap.querySelectorAll('[data-field]').forEach(inp => {
    inp.addEventListener('input', () => {
      const field = inp.getAttribute('data-field');
      draftData.links[index][field] = inp.value;
      if (field === 'label') {
        wrap.querySelector('.link-item-label-preview').textContent = inp.value || '(sin nombre)';
      }
      renderPage(draftData);
    });
  });

  // Variante
  wrap.querySelectorAll('.btn-style-opt').forEach(btn => {
    btn.addEventListener('click', () => {
      const variant = btn.getAttribute('data-variant');
      draftData.links[index].variant = variant;
      wrap.querySelectorAll('.btn-style-opt').forEach(b => b.setAttribute('aria-pressed', String(b === btn)));
      renderPage(draftData);
    });
  });

  // Toggle visible
  wrap.querySelector('[data-action="toggle-visible"]').addEventListener('click', () => {
    draftData.links[index].visible = !draftData.links[index].visible;
    renderLinksEditor(draftData.links);
    renderPage(draftData);
  });

  // Eliminar
  wrap.querySelector('[data-action="delete-link"]').addEventListener('click', () => {
    if (!confirm('Eliminar el link "' + link.label + '"?')) return;
    draftData.links.splice(index, 1);
    renderLinksEditor(draftData.links);
    renderPage(draftData);
  });

  // Drag & drop para reordenar
  wrap.addEventListener('dragstart', (e) => {
    dragSrcIndex = index;
    e.dataTransfer.effectAllowed = 'move';
    wrap.style.opacity = '0.5';
  });

  wrap.addEventListener('dragend', () => {
    wrap.style.opacity = '';
  });

  wrap.addEventListener('dragover', (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    wrap.classList.add('drag-over');
  });

  wrap.addEventListener('dragleave', () => {
    wrap.classList.remove('drag-over');
  });

  wrap.addEventListener('drop', (e) => {
    e.preventDefault();
    wrap.classList.remove('drag-over');
    if (dragSrcIndex === null || dragSrcIndex === index) return;
    const moved = draftData.links.splice(dragSrcIndex, 1)[0];
    draftData.links.splice(index, 0, moved);
    dragSrcIndex = null;
    renderLinksEditor(draftData.links);
    renderPage(draftData);
  });

  return wrap;
}

// Agregar nuevo link
document.getElementById('add-link').addEventListener('click', () => {
  const newLink = {
    id:      uid(),
    label:   'Nuevo link',
    url:     'https://',
    icon:    'link',
    variant: 'default',
    visible: true,
  };
  draftData.links.push(newLink);
  renderLinksEditor(draftData.links);
  renderPage(draftData);
  // Scroll al ultimo item
  const container = document.getElementById('links-editor');
  container.lastElementChild?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
});

/* ============================================================
   RECOLECTAR DRAFT ANTES DE GUARDAR
   ============================================================ */

function collectDraft() {
  draftData.brand   = document.getElementById('edit-brand').value.trim()   || DEFAULT_DATA.brand;
  draftData.tagline = document.getElementById('edit-tagline').value.trim() || DEFAULT_DATA.tagline;
  draftData.font    = document.getElementById('edit-font').value;
  // colores y links ya se actualizan en tiempo real vía eventos
}

/* ============================================================
   CONTRASENA
   ============================================================ */

document.getElementById('save-password').addEventListener('click', () => {
  const newPwd  = document.getElementById('new-password').value;
  const confirm = document.getElementById('confirm-password').value;
  const errEl   = document.getElementById('password-error');

  errEl.textContent = '';

  if (newPwd.length < 4) {
    errEl.textContent = 'La contrasena debe tener al menos 4 caracteres.';
    return;
  }
  if (newPwd !== confirm) {
    errEl.textContent = 'Las contrasenas no coinciden.';
    return;
  }

  draftData.password = newPwd;
  document.getElementById('new-password').value     = '';
  document.getElementById('confirm-password').value = '';
  showToast('Contrasena actualizada. Guardala para no olvidarla.');
});

/* ============================================================
   INICIO
   ============================================================ */

buildPresets();
currentData = loadData();
renderPage(currentData);

/* ------------------------------------------------------------------
   ACCESO SECRETO AL PANEL
   El boton de engranaje es completamente invisible por defecto.
   Se activa de dos formas:
   1. URL con ?edit  →  yoursite.com/index.html?edit
   2. Tocar/clic el NOMBRE de la pagina 5 veces en menos de 2 s
   ------------------------------------------------------------------ */

const trigger = document.getElementById('admin-trigger');

function revealAdminTrigger() {
  trigger.classList.remove('admin-trigger--hidden');
  trigger.classList.add('admin-trigger--visible');
  trigger.removeAttribute('tabindex');
}

// Metodo 1: parametro ?edit en la URL
if (new URLSearchParams(window.location.search).has('edit')) {
  revealAdminTrigger();
}

// Metodo 2: 5 toques rapidos en el nombre (<2 s entre primero y ultimo)
(function setupSecretTap() {
  const target   = document.getElementById('brand-name');
  const TAPS     = 5;
  const WINDOW   = 2000;  // ms
  let taps       = [];

  function onTap(e) {
    // en movil ignorar si es scroll (touchmove)
    const now = Date.now();
    taps.push(now);
    // descarta toques viejos
    taps = taps.filter(t => now - t <= WINDOW);
    if (taps.length >= TAPS) {
      taps = [];
      revealAdminTrigger();
      // abrir directamente el login para agilizar
      if (isAuthenticated) {
        openPanel();
      } else {
        openLogin();
      }
    }
  }

  target.addEventListener('click', onTap);
  // soporte tactil (evita el doble disparo click+touchend)
  target.addEventListener('touchend', (e) => {
    e.preventDefault();
    onTap(e);
  }, { passive: false });
})();
