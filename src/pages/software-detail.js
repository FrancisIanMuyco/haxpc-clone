import Header from '../components/Header.js';
import Footer from '../components/Footer.js';
import { software } from '../data/software.js';
import { icon } from '../utils/icons.js';
import { AppIcon } from '../components/AppIcon.js';
import { formatDate, licenseBadge } from '../utils/format.js';
import { breadcrumbs } from '../utils/renderers.js';

export default function SoftwareDetail() {
  const hash = window.location.hash;
  const parts = hash.replace('#/', '').split('/');
  const id = parts[1] || '';
  const app = software.find(s => s.id === id);

  if (!app) {
    return `${Header()}<main class="container" style="padding-top:40px"><div class="empty"><h3>Software not found</h3><p>The app you're looking for isn't in our directory.</p><div class="empty-actions"><a href="#/software" class="btn btn-primary">Browse Software</a></div></div></main>${Footer()}`;
  }

  const b = licenseBadge(app.license);
  const related = software.filter(s => s.id !== app.id && s.category === app.category);
  const relatedMore = related.length >= 3 ? related : [...related, ...software.filter(s => s.id !== app.id && s.category !== app.category)].slice(0, 3);

  const metaNew = app.whatsnew || [
    `Faster startup and improved performance on recent Windows versions`,
    `Bug fixes and stability improvements`,
    `Updated language support including Filipino`,
  ];

  return `
    ${Header()}
    <main>
      <div class="container">
        ${breadcrumbs([
          { label: app.category, href: '#/software?category=' + encodeURIComponent(app.category) },
          { label: app.name },
        ])}

        <div class="detail-layout">
          <div class="detail-main">
            <!-- Head -->
            <div class="detail-head">
              ${AppIcon(app, 'xl')}
              <div style="min-width:0">
                <h1>${app.name}</h1>
                <p class="detail-desc">${app.description}</p>
                <div class="detail-badges">
                  <span class="badge ${b.cls}">${icon('check', 12)} ${b.label}</span>
                  ${app.openSource ? `<span class="badge badge-teal" style="background:var(--teal-soft);color:var(--teal)">${icon('box', 12)} Open Source</span>` : ''}
                  <span class="badge badge-blue" style="background:var(--accent-soft);color:var(--accent)">${icon('monitor', 12)} Windows</span>
                </div>
                <div class="detail-dev">
                  ${icon('users', 15)} By <a href="#/software?search=${encodeURIComponent(app.developer)}">${app.developer}</a> &middot; ${app.category}
                </div>
              </div>
            </div>

            <!-- Overview -->
            <section class="detail-section">
              <h2><span class="section-kicker"></span>Overview</h2>
              <p>${app.description} ${app.name} is ${b.label.toLowerCase()} ${app.openSource ? ', meaning its source code is open and community-reviewed' : ''}. Download directly from the developer to get the latest official version without third-party installers.</p>
            </section>

            <!-- Features -->
            <section class="detail-section">
              <h2><span class="section-kicker"></span>Key Features</h2>
              <ul class="feature-list">
                ${app.features.map(f => `<li>${icon('check', 16)} ${f}</li>`).join('')}
              </ul>
            </section>

            <!-- System requirements -->
            <section class="detail-section">
              <h2><span class="section-kicker"></span>System Requirements</h2>
              <div class="req-grid">
                ${[
                  { label: 'OS', value: app.requirements.os, ic: 'monitor' },
                  { label: 'RAM', value: app.requirements.ram, ic: 'cpu' },
                  { label: 'Storage', value: app.requirements.storage, ic: 'hardDrive' },
                  { label: 'GPU', value: app.requirements.gpu, ic: 'zap' },
                ].map(r => `
                  <div class="req-item">
                    <div class="req-ico">${icon(r.ic, 17)}</div>
                    <span class="req-label">${r.label}</span>
                    <span class="req-value">${r.value}</span>
                  </div>
                `).join('')}
              </div>
            </section>

            <!-- What's new -->
            <section class="detail-section">
              <h2><span class="section-kicker"></span>What's New</h2>
              <ul class="whatsnew">
                ${metaNew.map(t => `<li>${t}</li>`).join('')}
              </ul>
            </section>

            <!-- Notes -->
            <section class="detail-section">
              <h2><span class="section-kicker"></span>Installation Notes</h2>
              <p>Download the installer from the official source, run it, and follow the on-screen prompts. We recommend choosing the 64-bit version for newer systems and always keeping your software updated for the best security and performance.</p>
            </section>
          </div>

          <!-- Right download panel -->
          <div class="detail-panel-sticky">
            <div class="dl-panel">
              <div class="dl-panel-head">
                ${icon('download', 17)}
                <h3>Download Information</h3>
              </div>
              <div class="dl-panel-body">
                <dl class="dl-list">
                  <div class="dl-item"><dt>Version</dt><dd>${app.version}</dd></div>
                  <div class="dl-item"><dt>File Size</dt><dd>${app.size}</dd></div>
                  <div class="dl-item"><dt>License</dt><dd>${app.license}</dd></div>
                  <div class="dl-item"><dt>Architecture</dt><dd>${app.architecture || '64-bit'}</dd></div>
                  <div class="dl-item"><dt>Platform</dt><dd>${app.platform}</dd></div>
                  <div class="dl-item"><dt>Updated</dt><dd>${formatDate(app.updated)}</dd></div>
                </dl>
                <div class="dl-actions">
                  <a href="${app.officialUrl}" target="_blank" rel="noopener" class="btn btn-primary btn-block btn-lg">${icon('download', 17)} Official Download</a>
                  <a href="${app.officialUrl}" target="_blank" rel="noopener" class="btn btn-secondary btn-block">${icon('externalLink', 15)} Visit Official Website</a>
                </div>
                <div class="dl-note">
                  ${icon('shieldCheck', 16)}
                  <span>Downloads redirect to the developer's official source to ensure the latest and most secure version.</span>
                </div>
                <div class="trust-list">
                  <div class="trust-item">${icon('check', 15)} Official source verified link</div>
                  <div class="trust-item">${icon('check', 15)} ${app.openSource ? 'Open source & community reviewed' : 'Published by ' + app.developer}</div>
                  <div class="trust-item">${icon('clock', 15)} Checked ${formatDate(app.updated)}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Related -->
        <div style="margin-top:34px;border-top:1px solid var(--border);padding-top:28px">
          <h2 style="font-size:20px;margin-bottom:18px">Related Software</h2>
          <div class="related-grid">
            ${relatedMore.map(r => `
              <a href="#/software/${r.id}" class="related-card">
                ${AppIcon(r, 'md')}
                <strong>${r.name}</strong>
                <span>${r.category}</span>
              </a>
            `).join('')}
          </div>
        </div>
      </div>
    </main>
    ${Footer()}
  `;
}
