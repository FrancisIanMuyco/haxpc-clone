import './style.css';
import { BASE } from './config.js';

const routes = {
  home: () => import('./pages/home.js'),
  software: () => import('./pages/software.js'),
  'software-detail': () => import('./pages/software-detail.js'),
  guides: () => import('./pages/guides.js'),
  'guide-detail': () => import('./pages/guide-detail.js'),
  about: () => import('./pages/about.js'),
  contact: () => import('./pages/contact.js'),
};

const app = document.getElementById('app');

// Get the app-relative path (stripped of base path)
function getAppPath() {
  const params = new URLSearchParams(window.location.search);
  const redirectPath = params.get('path');
  if (redirectPath) {
    // Coming from 404 redirect — use the original path
    return redirectPath;
  }
  // Normal navigation — strip the base path
  const pathname = window.location.pathname;
  if (pathname.startsWith(BASE)) {
    return pathname.substring(BASE.length - 1); // Keep the leading /
  }
  return pathname;
}

// Get the full path with base prepended for navigation
function fullPath(appPath) {
  // appPath is like '/software' or '/software/some-id'
  // BASE is like '/' or '/haxpc-clone/'
  if (BASE === '/') return appPath;
  // Remove leading / from appPath to avoid double slashes
  return BASE + appPath.replace(/^\//, '');
}

function navigate(path) {
  const url = fullPath(path);
  window.history.pushState({}, '', url);
  render();
}

function render() {
  const appPath = getAppPath();

  let pageModule;

  if (appPath === '/' || appPath === '/index.html' || appPath === '') {
    pageModule = routes.home;
  } else if (appPath === '/software' || appPath === '/software/') {
    pageModule = routes.software;
  } else if (appPath.startsWith('/software/')) {
    pageModule = routes['software-detail'];
  } else if (appPath === '/guides' || appPath === '/guides/') {
    pageModule = routes.guides;
  } else if (appPath.startsWith('/guides/')) {
    pageModule = routes['guide-detail'];
  } else if (appPath === '/about') {
    pageModule = routes.about;
  } else if (appPath === '/contact') {
    pageModule = routes.contact;
  } else {
    pageModule = routes.home;
  }

  // If we came from a 404 redirect, clean up the URL
  const params = new URLSearchParams(window.location.search);
  if (params.get('path')) {
    const cleanUrl = fullPath(appPath);
    window.history.replaceState({}, '', cleanUrl);
  }

  pageModule().then((mod) => {
    app.innerHTML = '';
    app.appendChild(mod.default());
    initInteractions();
  }).catch(() => {
    app.innerHTML = '<div class="container"><h1>404 - Page Not Found</h1></div>';
  });
}

function initInteractions() {
  const searchToggle = document.getElementById('searchToggle');
  const searchPanel = document.getElementById('searchPanel');
  const searchClose = document.getElementById('searchClose');
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileNav = document.getElementById('mobileNav');
  const globalSearch = document.getElementById('globalSearch');
  const searchResults = document.getElementById('searchResults');
  const homeSearch = document.getElementById('homeSearch');

  if (searchToggle && searchPanel) {
    searchToggle.addEventListener('click', () => {
      searchPanel.classList.toggle('active');
      if (searchPanel.classList.contains('active') && globalSearch) {
        globalSearch.focus();
      }
    });
  }

  if (searchClose && searchPanel) {
    searchClose.addEventListener('click', () => {
      searchPanel.classList.remove('active');
    });
  }

  if (mobileToggle && mobileNav) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileNav.style.display === 'flex';
      mobileNav.style.display = isOpen ? 'none' : 'flex';
    });
  }

  if (globalSearch) {
    globalSearch.addEventListener('input', (e) => {
      const term = e.target.value.toLowerCase();
      if (!term) {
        searchResults.innerHTML = '';
        return;
      }
      import('./data/software.js').then(({ software, guides }) => {
        const swResults = software.filter(s =>
          s.name.toLowerCase().includes(term) || s.category.toLowerCase().includes(term) || s.description.toLowerCase().includes(term)
        ).slice(0, 5);

        const gdResults = guides.filter(g =>
          g.title.toLowerCase().includes(term) || g.excerpt.toLowerCase().includes(term)
        ).slice(0, 3);

        let html = '';
        swResults.forEach(s => {
          html += `<a href="${fullPath('/software/' + s.id)}" data-link class="search-result-item">${s.icon} ${s.name} — ${s.category}</a>`;
        });
        gdResults.forEach(g => {
          html += `<a href="${fullPath('/guides/' + g.id)}" data-link class="search-result-item">📝 ${g.title} — ${g.category}</a>`;
        });
        if (!html) {
          html = '<div class="search-result-item">No results found. Try another keyword.</div>';
        }
        searchResults.innerHTML = html;
      });
    });
  }

  if (homeSearch) {
    homeSearch.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const term = e.target.value.trim();
        if (term) {
          navigate(`/software?search=${encodeURIComponent(term)}`);
        }
      }
    });
  }
}

window.addEventListener('popstate', () => render());

document.addEventListener('click', (e) => {
  const link = e.target.closest('a[data-link]');
  if (link) {
    e.preventDefault();
    navigate(link.getAttribute('href'));
  }
});

render();
