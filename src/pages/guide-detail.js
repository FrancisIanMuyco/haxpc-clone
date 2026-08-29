import Header from '../components/Header.js';
import Footer from '../components/Footer.js';
import { guides } from '../data/software.js';
import { icon } from '../utils/icons.js';
import { breadcrumbs } from '../utils/renderers.js';
import { formatDate } from '../utils/format.js';

export default function GuideDetail() {
  const hash = window.location.hash;
  const parts = hash.replace('#/', '').split('/');
  const id = parts[1] || '';
  const guide = guides.find(g => g.id === id);

  if (!guide) {
    return `${Header()}<main class="container" style="padding-top:40px"><div class="empty"><h3>Guide not found</h3><div class="empty-actions"><a href="#/guides" class="btn btn-primary">All Guides</a></div></div></main>${Footer()}`;
  }

  const related = guides.filter(g => g.id !== guide.id).slice(0, 2);

  return `
    ${Header()}
    <main>
      <div class="container">
        <div class="article-wrap">
          ${breadcrumbs([{ label: 'Guides', href: '#/guides' }, { label: guide.title }])}
          <article>
            <header class="article-head">
              <span class="badge badge-blue" style="background:var(--accent-soft);color:var(--accent)">${guide.category}</span>
              <h1>${guide.title}</h1>
              <div class="guide-meta-row">
                <span>${icon('calendar', 13)} ${formatDate(guide.date)}</span>
                <span>${icon('clock', 13)} ${guide.readTime} read</span>
              </div>
            </header>
            <div class="article-body">
              <p style="font-size:16px;color:var(--text);font-weight:500">${guide.excerpt}</p>
              ${(guide.body || []).map(sec => `
                <h2>${sec.h}</h2>
                <p>${sec.p}</p>
              `).join('')}
            </div>
          </article>

          ${related.length ? `
            <div style="margin-top:34px">
              <h2 style="font-size:20px;margin-bottom:16px">More Guides</h2>
              <div class="guide-list">
                ${related.map(g => `
                  <a href="#/guides/${g.id}" class="guide-card" style="background:var(--bg-card)">
                    <span class="guide-thumb">${icon('fileText', 28, 1.8)}</span>
                    <span class="guide-main">
                      <h3 style="font-size:16px;margin-top:0">${g.title}</h3>
                      <p>${g.excerpt}</p>
                      <span class="guide-meta-row">
                        <span>${icon('clock', 13)} ${g.readTime} read</span>
                      </span>
                    </span>
                    <span class="btn btn-secondary btn-sm" style="align-self:center;flex-shrink:0">Read ${icon('arrowRight', 14)}</span>
                  </a>
                `).join('')}
              </div>
            </div>
          ` : ''}
        </div>
      </div>
    </main>
    ${Footer()}
  `;
}
