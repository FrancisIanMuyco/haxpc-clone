import './style.css';

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

function navigate(path) {
  window.history.pushState({}, '', path);
  render(path);
}

function render(path) {
  const url = new URL(path, window.location.origin);
  const pathname = url.pathname;

  let pageModule;

  if (pathname === '/' || pathname === '/index.html') {
    pageModule = routes.home;
  } else if (pathname === '/software' || pathname === '/software/') {
    pageModule = routes.software;
  } else if (pathname.startsWith('/software/')) {
    pageModule = routes['software-detail'];
  } else if (pathname === '/guides' || pathname === '/guides/') {
    pageModule = routes.guides;
  } else if (pathname.startsWith('/guides/')) {
    pageModule = routes['guide-detail'];
  } else if (pathname === '/about') {
    pageModule = routes.about;
  } else if (pathname === '/contact') {
    pageModule = routes.contact;
  } else {
    pageModule = routes.home;
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
          s.name.toLowerCase().includes(term) ||
          s.category.toLowerCase().includes(term) ||
          s.description.toLowerCase().includes(term)
        ).slice(0, 5);

        const gdResults = guides.filter(g =>
          g.title.toLowerCase().includes(term) ||
          g.excerpt.toLowerCase().includes(term)
        ).slice(0, 3);

        let html = '';
        swResults.forEach(s => {
          html += `<a href="/software/${s.id}" data-link class="search-result-item">${s.icon} ${s.name} — ${s.category}</a>`;
        });
        gdResults.forEach(g => {
          html += `<a href="/guides/${g.id}" data-link class="search-result-item">📝 ${g.title} — ${g.category}</a>`;
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

window.addEventListener('popstate', () => render(window.location.pathname));

document.addEventListener('click', (e) => {
  const link = e.target.closest('a[data-link]');
  if (link) {
    e.preventDefault();
    navigate(link.getAttribute('href'));
  }
});

render(window.location.pathname);
