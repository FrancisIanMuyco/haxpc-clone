import './style.css';
import { renderAutocomplete } from './components/Header.js';

const app = document.getElementById('app');

const routes = {
  home: () => import('./pages/home.js'),
  software: () => import('./pages/software.js'),
  'software-detail': () => import('./pages/software-detail.js'),
  categories: () => import('./pages/categories.js'),
  latest: () => import('./pages/latest.js'),
  popular: () => import('./pages/popular.js'),
  guides: () => import('./pages/guides.js'),
  'guide-detail': () => import('./pages/guide-detail.js'),
  about: () => import('./pages/about.js'),
  contact: () => import('./pages/contact.js'),
};

function getRoute() {
  const hash = window.location.hash.slice(1) || '/';
  const [path, query] = hash.split('?');
  return { path: path || '/', query };
}

function resolveRoute(path) {
  if (path === '/' || path === '') return 'home';
  if (path === '/software' || path === '/software/') return 'software';
  if (path.startsWith('/software/')) return 'software-detail';
  if (path === '/categories') return 'categories';
  if (path === '/latest') return 'latest';
  if (path === '/popular') return 'popular';
  if (path === '/guides' || path === '/guides/') return 'guides';
  if (path.startsWith('/guides/')) return 'guide-detail';
  if (path === '/about') return 'about';
  if (path === '/contact') return 'contact';
  return 'home';
}

function render() {
  const { path, query } = getRoute();
  const key = resolveRoute(path);
  const pageModule = routes[key] || routes.home;

  pageModule().then((mod) => {
    app.innerHTML = mod.default();
    // preserve query param context for pages that read location directly
    window.__routeQuery = query || '';
    initInteractions();
    setActiveNav();
    window.scrollTo(0, 0);
  }).catch((err) => {
    console.error(err);
    app.innerHTML = '<div class="container"><div class="empty" style="margin-top:60px"><h3>Page not found</h3><p>The page you are looking for does not exist.</p></div></div>';
  });
}

/* ---------- Theme ---------- */
function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  const icon = document.getElementById('themeIcon');
  if (icon) icon.innerHTML = theme === 'dark'
    ? '<svg class="pc-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>'
    : '<svg class="pc-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>';
  try { localStorage.setItem('pinoypc-theme', theme); } catch (e) {}
}

function initTheme() {
  let saved = null;
  try { saved = localStorage.getItem('pinoypc-theme'); } catch (e) {}
  const theme = saved || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  applyTheme(theme);
}

/* ---------- Active nav ---------- */
function setActiveNav() {
  const { path } = getRoute();
  const navLinks = document.querySelectorAll('.nav-desktop a, .mobile-nav a');
  navLinks.forEach(a => a.classList.remove('active'));
  let target = null;
  if (path === '/') target = '#/';
  else if (path.startsWith('/software') || path === '/software/') target = '#/';
  else if (path === '/categories') target = '#/categories';
  else if (path === '/latest') target = '#/latest';
  else if (path === '/popular') target = '#/popular';
  else if (path.startsWith('/guides')) target = '#/guides';
  else if (path === '/about') target = '#/about';
  else if (path === '/contact') target = '#/contact';
  if (target) navLinks.forEach(a => { if (a.getAttribute('href') === target) a.classList.add('active'); });
}

/* ---------- Interactions ---------- */
function initInteractions() {
  initTheme();

  // Sticky shrink on scroll
  const header = document.getElementById('siteHeader');
  if (header) {
    const onScroll = () => {
      header.classList.toggle('is-scrolled', window.scrollY > 10);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // Theme toggle
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const cur = document.documentElement.getAttribute('data-theme');
      applyTheme(cur === 'dark' ? 'light' : 'dark');
    });
  }

  // Mobile nav drawer
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileNav = document.getElementById('mobileNav');
  if (mobileToggle && mobileNav) {
    mobileToggle.addEventListener('click', () => {
      const open = mobileNav.hidden;
      mobileNav.hidden = !open;
      mobileToggle.innerHTML = open
        ? '<svg class="pc-icon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>'
        : '<svg class="pc-icon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 6h16"/><path d="M4 12h16"/><path d="M4 18h16"/></svg>';
    });
  }

  // Fullscreen mobile search overlay
  const searchIconMobile = document.getElementById('searchIconMobile');
  const searchOverlay = document.getElementById('searchOverlay');
  const searchOverlayClose = document.getElementById('searchOverlayClose');
  const mobileGlobalSearch = document.getElementById('mobileGlobalSearch');
  const mobileSearchResults = document.getElementById('mobileSearchResults');

  if (searchIconMobile && searchOverlay) {
    searchIconMobile.addEventListener('click', () => {
      searchOverlay.classList.add('open');
      setTimeout(() => mobileGlobalSearch && mobileGlobalSearch.focus(), 50);
    });
  }
  if (searchOverlayClose && searchOverlay) {
    searchOverlayClose.addEventListener('click', () => searchOverlay.classList.remove('open'));
  }
  if (mobileGlobalSearch && mobileSearchResults) {
    mobileGlobalSearch.addEventListener('input', (e) => {
      mobileSearchResults.innerHTML = renderAutocomplete(e.target.value);
      bindAutocompleteClicks(mobileSearchResults);
    });
  }
  // Hot chips in overlay
  const hotChips = document.getElementById('hotChips');
  if (hotChips) {
    hotChips.addEventListener('click', (e) => {
      const chip = e.target.closest('.chip');
      if (chip && chip.dataset.chip) {
        e.preventDefault();
        mobileGlobalSearch.value = chip.dataset.chip;
        mobileSearchResults.innerHTML = renderAutocomplete(chip.dataset.chip);
        bindAutocompleteClicks(mobileSearchResults);
      }
    });
  }

  // Header search with autocomplete + keyboard nav
  const globalSearch = document.getElementById('globalSearch');
  const searchDropdown = document.getElementById('searchDropdown');

  if (globalSearch && searchDropdown) {
    // "/" shortcut to focus search
    window.addEventListener('keydown', (e) => {
      if (e.key === '/' && document.activeElement !== globalSearch && !e.metaKey && !e.ctrlKey) {
        e.preventDefault();
        globalSearch.focus();
      }
    });

    const closeDropdown = () => { searchDropdown.classList.remove('open'); searchDropdown.hidden = true; };

    globalSearch.addEventListener('input', (e) => {
      const html = renderAutocomplete(e.target.value);
      searchDropdown.innerHTML = html;
      if (e.target.value.trim() && window.innerWidth > 1024) {
        searchDropdown.hidden = false;
        searchDropdown.classList.add('open');
      } else if (window.innerWidth <= 1024) {
        closeDropdown();
      }
      bindAutocompleteClicks(searchDropdown);
      bindKeyboardNav(searchDropdown);
    });

    globalSearch.addEventListener('focus', () => {
      if (globalSearch.value.trim() && window.innerWidth > 1024) {
        searchDropdown.classList.add('open');
        searchDropdown.hidden = false;
        bindKeyboardNav(searchDropdown);
      }
    });

    globalSearch.addEventListener('keydown', (e) => {
      const items = Array.from(searchDropdown.querySelectorAll('.sd-item'));
      const idx = items.findIndex(i => i.classList.contains('kb-active'));
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        const step = e.key === 'ArrowDown' ? 1 : -1;
        let next = idx + step;
        if (next >= items.length) next = 0;
        if (next < 0) next = items.length - 1;
        items.forEach(i => i.classList.remove('kb-active'));
        if (items[next]) {
          items[next].classList.add('kb-active');
          items[next].scrollIntoView({ block: 'nearest' });
        }
      } else if (e.key === 'Enter') {
        if (idx >= 0 && items[idx]) {
          e.preventDefault();
          window.location.hash = items[idx].getAttribute('href');
          closeDropdown(); globalSearch.blur();
        } else if (globalSearch.value.trim()) {
          e.preventDefault();
          window.location.hash = '/software?search=' + encodeURIComponent(globalSearch.value.trim());
          closeDropdown(); globalSearch.blur();
        }
      } else if (e.key === 'Escape') {
        closeDropdown();
      }
    });

    document.addEventListener('click', (e) => {
      if (!e.target.closest('.header-search')) closeDropdown();
    });
  }

  // Category tiles / card links that carry icon color style var
  document.querySelectorAll('[data-search-link]').forEach(a => {
    // no-op placeholder; handled via bindAutocompleteClicks
  });

  // Any submit-style forms (contact)
  document.querySelectorAll('form[data-demo]').forEach(f => {
    f.addEventListener('submit', (e) => {
      e.preventDefault();
      const msg = document.getElementById('formSuccess');
      if (msg) { msg.hidden = false; f.reset(); }
    });
  });

  // Home search (Enter or button)
  const homeSearch = document.getElementById('homeSearch');
  const homeSearchBtn = document.getElementById('homeSearchBtn');
  if (homeSearch) {
    const go = () => {
      const t = homeSearch.value.trim();
      window.location.hash = t ? '/software?search=' + encodeURIComponent(t) : '/software';
    };
    homeSearch.addEventListener('keydown', (e) => { if (e.key === 'Enter') go(); });
    if (homeSearchBtn) homeSearchBtn.addEventListener('click', go);
  }

  // Software directory filters
  const applyFilter = (key, el) => {
    const { path } = getRoute();
    if (path !== '/software') return;
    const params = new URLSearchParams(window.location.hash.split('?')[1] || '');
    const val = el.value;
    if (val) params.set(key, val); else params.delete(key);
    const qs = params.toString();
    window.location.hash = '/software' + (qs ? '?' + qs : '');
  };
  const catFilter = document.getElementById('catFilter');
  const licFilter = document.getElementById('licFilter');
  const sortFilter = document.getElementById('sortFilter');
  if (catFilter) catFilter.addEventListener('change', e => applyFilter('category', e.target));
  if (licFilter) licFilter.addEventListener('change', e => applyFilter('license', e.target));
  if (sortFilter) sortFilter.addEventListener('change', e => applyFilter('sort', e.target));
}

function bindAutocompleteClicks(container) {
  if (!container) return;
  container.querySelectorAll('.sd-item').forEach(item => {
    // keyboard-active class events delegated via keyboard nav; clicks navigate naturally
  });
}

function bindKeyboardNav(container) {
  if (!container) return;
  container.querySelectorAll('.sd-item').forEach(i => i.classList.remove('kb-active'));
}

window.addEventListener('hashchange', () => {
  const mobileNav = document.getElementById('mobileNav');
  const searchOverlay = document.getElementById('searchOverlay');
  if (mobileNav) mobileNav.hidden = true;
  if (searchOverlay) searchOverlay.classList.remove('open');
  render();
});

// Initial load
if (!window.location.hash) {
  window.location.hash = '/';
} else {
  render();
}
