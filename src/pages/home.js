import Header from '../components/Header.js';
import Footer from '../components/Footer.js';
import { software, categories, guides } from '../data/software.js';

export default function Home() {
  const featured = software.slice(0, 3);
  const latest = software.slice(0, 6);

  return `
    ${Header()}
    <main>
      <section class="hero">
        <div class="container">
          <h1>Everything Your PC Needs, In One Place.</h1>
          <p>Discover useful software, PC tools, Windows apps, games, and practical guides.</p>
          <div class="hero-actions">
            <a href="#/software" class="btn-primary">Browse Software</a>
          </div>
          <div class="hero-search">
            <div class="search-box-large">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.35-4.35"/>
              </svg>
              <input type="text" id="homeSearch" placeholder="Search software, tools, games, guides..." autocomplete="off">
            </div>
          </div>
        </div>
      </section>

      <section class="categories">
        <div class="container">
          <h2>Quick Categories</h2>
          <div class="category-grid">
            ${categories.map(cat => `
              <a href="#/software?category=${cat.id}" class="category-card">
                <span class="category-icon">${cat.icon}</span>
                <h3>${cat.name}</h3>
                <p>${cat.count} apps</p>
              </a>
            `).join('')}
          </div>
        </div>
      </section>

      <section class="featured">
        <div class="container">
          <h2>Featured Software</h2>
          <div class="software-grid">
            ${featured.map(app => `
              <a href="#/software/${app.id}" class="software-card">
                <div class="software-icon">${app.icon}</div>
                <div class="software-info">
                  <h3>${app.name}</h3>
                  <p class="software-category">${app.category}</p>
                  <p class="software-desc">${app.description}</p>
                  <div class="software-meta">
                    <span>${app.version}</span>
                    <span>${app.platform}</span>
                    <span>${app.updated}</span>
                  </div>
                </div>
                <div class="software-action">
                  <span class="btn-arrow">&rarr;</span>
                </div>
              </a>
            `).join('')}
          </div>
        </div>
      </section>

      <section class="latest">
        <div class="container">
          <h2>Latest Updates</h2>
          <div class="software-list">
            ${latest.map(app => `
              <a href="#/software/${app.id}" class="software-list-item">
                <span class="software-list-icon">${app.icon}</span>
                <div class="software-list-info">
                  <h4>${app.name}</h4>
                  <p>${app.category}</p>
                </div>
                <span class="software-list-size">${app.size}</span>
                <span class="software-list-date">${app.updated}</span>
                <span class="btn-arrow">&rarr;</span>
              </a>
            `).join('')}
          </div>
          <div class="section-footer">
            <a href="#/software" class="btn-secondary">View All Software</a>
          </div>
        </div>
      </section>

      <section class="guides">
        <div class="container">
          <h2>Latest Guides</h2>
          <div class="guides-grid">
            ${guides.map(guide => `
              <a href="#/guides/${guide.id}" class="guide-card">
                <div class="guide-meta">
                  <span class="guide-category">${guide.category}</span>
                  <span class="guide-date">${guide.date}</span>
                </div>
                <h3>${guide.title}</h3>
                <p>${guide.excerpt}</p>
                <span class="guide-read">${guide.readTime} read</span>
              </a>
            `).join('')}
          </div>
          <div class="section-footer">
            <a href="#/guides" class="btn-secondary">All Guides</a>
          </div>
        </div>
      </section>
    </main>
    ${Footer()}
  `;
}
