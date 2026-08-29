import Header from '../components/Header.js';
import Footer from '../components/Footer.js';
import { guides } from '../data/software.js';
import { icon } from '../utils/icons.js';
import { breadcrumbs } from '../utils/renderers.js';
import { formatDate } from '../utils/format.js';

export default function Guides() {
  return `
    ${Header()}
    <main>
      <div class="container">
        <div class="breadcrumbs-wrap">
          ${breadcrumbs([{ label: 'Guides' }])}
        </div>
        <div class="page-head">
          <h1>Guides & Tutorials</h1>
          <p>Practical, step-by-step help to get the most out of your PC.</p>
        </div>
        <div class="guide-list">
          ${guides.map(g => `
            <a href="#/guides/${g.id}" class="guide-card">
              <span class="guide-thumb">${icon('fileText', 32, 1.8)}</span>
              <span class="guide-main">
                <span class="badge badge-blue" style="background:var(--accent-soft);color:var(--accent)">${g.category}</span>
                <h3>${g.title}</h3>
                <p>${g.excerpt}</p>
                <span class="guide-meta-row">
                  <span>${icon('calendar', 13)} ${formatDate(g.date)}</span>
                  <span>${icon('clock', 13)} ${g.readTime} read</span>
                </span>
              </span>
              <span class="btn btn-secondary btn-sm" style="align-self:center;flex-shrink:0">Read ${icon('arrowRight', 14)}</span>
            </a>
          `).join('')}
        </div>
      </div>
    </main>
    ${Footer()}
  `;
}
