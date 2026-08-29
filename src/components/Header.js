import { icon } from '../utils/icons.js';
import { AppIcon } from './AppIcon.js';
import { software, guides } from '../data/software.js';

const NAV = [
  { href: '#/', label: 'Software' },
  { href: '#/categories', label: 'Categories' },
  { href: '#/latest', label: 'Latest' },
  { href: '#/popular', label: 'Popular' },
];

function popularChips() {
  const popular = [...software].sort((a, b) => b.popular - a.popular).slice(0, 4);
  return popular.map(s => s.name).join(', ');
}

export default function Header() {
  return `
    <header class="site-header" id="siteHeader" data-theme-init>
      <div class="container header-top">
        <a href="#/" class="brand" aria-label="PinoyPC home">
          <span class="brand-mark">${icon('zap', 19, 2.2)}</span>
          <span class="brand-name">Pinoy<em>PC</em></span>
        </a>

        <nav class="nav-desktop" aria-label="Primary">
          ${NAV.map(n => `<a href="${n.href}" class="nav-link" data-nav="${n.href}">${n.label}</a>`).join('')}
        </nav>

        <div class="header-search">
          <div class="search-wrap" id="headerSearchWrap">
            <span>${icon('search', 18)}</span>
            <input type="text" id="globalSearch" placeholder="Search software, tools, utilities..." autocomplete="off" aria-label="Search">
            <span class="search-kbd">/</span>
          </div>
          <div class="search-dropdown" id="searchDropdown" hidden></div>
        </div>

        <div class="header-actions">
          <button class="header-btn search-mobile-icon" id="searchIconMobile" aria-label="Search">
            ${icon('search', 20)}
          </button>
          <button class="header-btn theme-toggle" id="themeToggle" aria-label="Toggle theme">
            <span id="themeIcon">${icon('sun', 20)}</span>
          </button>
          <button class="header-btn mobile-toggle" id="mobileToggle" aria-label="Menu">
            ${icon('menu', 22)}
          </button>
        </div>
      </div>

      <nav class="mobile-nav" id="mobileNav" hidden>
        ${NAV.map(n => `<a href="${n.href}" data-nav="${n.href}">${n.label}</a>`).join('')}
        <a href="#/guides" data-nav="#/guides">Guides</a>
        <a href="#/about" data-nav="#/about">About</a>
        <a href="#/contact" data-nav="#/contact">Contact</a>
      </nav>

      <!-- Fullscreen mobile search -->
      <div class="search-overlay" id="searchOverlay">
        <div class="so-top">
          <div class="so-input">
            <span>${icon('search', 20)}</span>
            <input type="text" id="mobileGlobalSearch" placeholder="Search software..." autocomplete="off" aria-label="Search">
          </div>
          <button class="header-btn" id="searchOverlayClose" aria-label="Close search" style="border-color:var(--header-border)">
            ${icon('x', 22)}
          </button>
        </div>
        <div class="so-results" id="mobileSearchResults"></div>
        <div class="so-hot">
          <div class="so-hot-label">Popular searches</div>
          <div class="so-chips" id="hotChips">
            ${popularChips().split(',').map(c => `<a href="#" class="chip" data-chip="${c.trim()}">${c.trim()}</a>`).join('')}
          </div>
        </div>
      </div>
    </header>
  `;
}

// Shared autocomplete renderer used by both header + mobile overlays.
export function renderAutocomplete(term, { max = 6 } = {}) {
  const t = term.trim().toLowerCase();
  if (!t) {
    return `<div class="sd-empty">Start typing to search software and guides.</div>`;
  }

  const sw = software
    .filter(s =>
      s.name.toLowerCase().includes(t) ||
      s.category.toLowerCase().includes(t) ||
      s.description.toLowerCase().includes(t) ||
      s.developer.toLowerCase().includes(t)
    )
    .slice(0, 6);

  const gd = guides
    .filter(g => g.title.toLowerCase().includes(t) || g.excerpt.toLowerCase().includes(t))
    .slice(0, 2);

  let html = '';

  if (sw.length) {
    html += `<div class="sd-group">Software</div>`;
    html += sw.map(s => `
      <a href="#/software/${s.id}" class="sd-item" data-sd>
        ${AppIcon(s, 'sm')}
        <span class="sd-meta">
          <span class="sd-name">${s.name}</span>
          <span class="sd-sub">${s.category} &middot; ${s.license}</span>
        </span>
        ${icon('arrowRight', 16)}
      </a>
    `).join('');
  }

  if (gd.length) {
    html += `<div class="sd-group">Guides</div>`;
    html += gd.map(g => `
      <a href="#/guides/${g.id}" class="sd-item" data-sd>
        <span class="app-icon app-icon--sm" style="--app-accent:#7C3AED">${icon('fileText', 20, 1.9)}</span>
        <span class="sd-meta">
          <span class="sd-name">${g.title}</span>
          <span class="sd-sub">Guide &middot; ${g.readTime} read</span>
        </span>
        ${icon('arrowRight', 16)}
      </a>
    `).join('');
  }

  if (!sw.length && !gd.length) {
    return `<div class="sd-empty">No software found for &ldquo;${esc(t)}&rdquo;.<br><span style="font-size:12.5px;color:var(--text-faint)">Check spelling or browse categories.</span></div>`;
  }

  html += `<div class="sd-footer">${sw.length} result${sw.length === 1 ? '' : 's'} &middot; Press Enter to view all</div>`;
  return html;
}

function esc(s) {
  return s.replace(/[&<>"']/g, c => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[c]));
}
