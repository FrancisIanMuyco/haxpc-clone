import Header from '../components/Header.js';
import Footer from '../components/Footer.js';
import { icon } from '../utils/icons.js';
import { AppIcon } from '../components/AppIcon.js';
import { formatDate, licenseBadge } from '../utils/format.js';
import { breadcrumbs } from '../utils/renderers.js';

function row(app, numbered, idx) {
  const b = licenseBadge(app.license);
  return `
    <a href="#/software/${app.id}" class="dir-row">
      ${numbered ? `<span class="pr-num" style="width:26px;height:26px;display:grid;place-items:center;font-weight:700;color:var(--text-faint);background:var(--bg-hover);border-radius:7px;flex-shrink:0">${idx + 1}</span>` : ''}
      ${AppIcon(app, 'lg')}
      <span class="dir-main">
        <span class="dir-top">
          <span class="dir-name">${app.name}</span>
          <span class="badge ${b.cls}">${b.label}</span>
        </span>
        <span class="dir-desc">${app.description}</span>
        <span class="dir-meta">
          <span>${icon('folder', 13)} ${app.category}</span>
          <span>${icon('hardDrive', 13)} ${app.size}</span>
          <span>${icon('award', 13)} ${app.developer}</span>
          <span>${icon('clock', 13)} ${formatDate(app.updated)}</span>
        </span>
      </span>
      <span class="dir-actions btn btn-secondary btn-sm" style="pointer-events:none">Details ${icon('arrowRight', 14)}</span>
    </a>
  `;
}

export default function ListPage({ title, subtitle, items, crumb, numbered }) {
  return `
    ${Header()}
    <main>
      <div class="container">
        <div class="breadcrumbs-wrap">
          ${breadcrumbs([{ label: crumb }])}
        </div>
        <div class="page-head">
          <h1>${title}</h1>
          <p>${subtitle}</p>
        </div>
        <div class="directory-list" style="margin-top:8px">
          ${items.map(row).join('')}
        </div>
      </div>
    </main>
    ${Footer()}
  `;
}
