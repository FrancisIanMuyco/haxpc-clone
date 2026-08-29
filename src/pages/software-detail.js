import Header from '../components/Header.js';
import Footer from '../components/Footer.js';
import { software } from '../data/software.js';

export default function SoftwareDetail() {
  const hash = window.location.hash;
  // Hash is like #/software/obs-studio — extract the ID
  const parts = hash.replace('#/', '').split('/');
  const id = parts[1] || '';
  const app = software.find(s => s.id === id);

  if (!app) {
    return `${Header()}<main class="container"><h1>Software not found</h1></main>${Footer()}`;
  }

  return `
    ${Header()}
    <main class="page-detail">
      <div class="container">
        <nav class="breadcrumbs">
          <a href="#/">Home</a>
          <span>/</span>
          <a href="#/software">Software</a>
          <span>/</span>
          <span>${app.name}</span>
        </nav>

        <div class="detail-hero">
          <div class="detail-icon">${app.icon}</div>
          <div class="detail-header">
            <h1>${app.name}</h1>
            <p class="detail-desc">${app.description}</p>
            <div class="detail-meta">
              <span class="meta-item"><strong>Version:</strong> ${app.version}</span>
              <span class="meta-item"><strong>Developer:</strong> ${app.developer}</span>
              <span class="meta-item"><strong>Platform:</strong> ${app.platform}</span>
              <span class="meta-item"><strong>License:</strong> ${app.license}</span>
              <span class="meta-item"><strong>Updated:</strong> ${app.updated}</span>
            </div>
            <div class="detail-actions">
              <a href="${app.officialUrl}" target="_blank" rel="noopener" class="btn-primary">Official Download</a>
              <a href="${app.officialUrl}" target="_blank" rel="noopener" class="btn-secondary">Official Website</a>
            </div>
          </div>
        </div>

        <div class="detail-sections">
          <section class="detail-section">
            <h2>Overview</h2>
            <p>${app.description}</p>
          </section>

          <section class="detail-section">
            <h2>Key Features</h2>
            <ul class="feature-list">
              ${app.features.map(f => `<li>${f}</li>`).join('')}
            </ul>
          </section>

          <section class="detail-section">
            <h2>System Requirements</h2>
            <div class="requirements-grid">
              <div class="req-item"><strong>OS</strong><span>${app.requirements.os}</span></div>
              <div class="req-item"><strong>RAM</strong><span>${app.requirements.ram}</span></div>
              <div class="req-item"><strong>Storage</strong><span>${app.requirements.storage}</span></div>
              <div class="req-item"><strong>GPU</strong><span>${app.requirements.gpu}</span></div>
            </div>
          </section>

          <section class="detail-section">
            <h2>Related Software</h2>
            <div class="related-grid">
              ${software.filter(s => s.id !== app.id).slice(0, 3).map(r => `
                <a href="#/software/${r.id}" class="related-card">
                  <span class="related-icon">${r.icon}</span>
                  <strong>${r.name}</strong>
                  <p>${r.category}</p>
                </a>
              `).join('')}
            </div>
          </section>
        </div>
      </div>
    </main>
    ${Footer()}
  `;
}
