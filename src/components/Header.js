import { categories } from '../data/software.js';

export default function Header() {
  return `
    <header class="header">
      <div class="container header-inner">
        <a href="/" data-link class="logo">
          <span class="logo-icon">⚡</span>
          <span class="logo-text">PinoyPC</span>
        </a>
        <nav class="nav-desktop">
          <a href="/" data-link>Home</a>
          <a href="/software" data-link>Software</a>
          <a href="/guides" data-link>Guides</a>
          <a href="/about" data-link>About</a>
          <a href="/contact" data-link>Contact</a>
        </nav>
        <div class="header-actions">
          <button class="search-toggle" id="searchToggle" aria-label="Search">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.35-4.35"/>
            </svg>
          </button>
          <button class="mobile-toggle" id="mobileToggle" aria-label="Menu">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          </button>
        </div>
      </div>
      <div class="search-panel" id="searchPanel">
        <div class="container">
          <div class="search-box">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.35-4.35"/>
            </svg>
            <input type="text" id="globalSearch" placeholder="Search software, tools, games, guides..." autocomplete="off">
            <button class="search-close" id="searchClose" aria-label="Close search">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 6 6 18M6 6l12 12"/>
              </svg>
            </button>
          </div>
          <div class="search-results" id="searchResults"></div>
        </div>
      </div>
      <nav class="nav-mobile" id="mobileNav">
        <a href="/" data-link>Home</a>
        <a href="/software" data-link>Software</a>
        <a href="/guides" data-link>Guides</a>
        <a href="/about" data-link>About</a>
        <a href="/contact" data-link>Contact</a>
      </nav>
    </header>
  `;
}
