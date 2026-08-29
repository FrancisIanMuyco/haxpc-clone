import Header from '../components/Header.js';
import Footer from '../components/Footer.js';
import { software, categories } from '../data/software.js';
import { icon } from '../utils/icons.js';
import { AppIcon } from '../components/AppIcon.js';
import { formatDate, licenseBadge } from '../utils/format.js';
import { breadcrumbs, emptyState, catTile } from '../utils/renderers.js';

function dirRow(app) {
  const b = licenseBadge(app.license);
  return `
    <a href="#/software/${app.id}" class="dir-row">
      ${AppIcon(app, 'lg')}
      <span class="dir-main">
        <span class="dir-top">
          <span class="dir-name">${app.name}</span>
          <span class="badge ${b.cls}">${b.label}</span>
          ${app.openSource ? `<span class="badge badge-teal" style="background:var(--teal-soft);color:var(--teal)">Open Source</span>` : ''}
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

export default function Software() {
  const hash = window.location.hash;
  const queryStr = (hash.split('?')[1] || '') + (window.__routeQuery || '');
  const params = new URLSearchParams(queryStr);
  const catFilter = params.get('category') || '';
  const searchTerm = params.get('search') || '';
  const licFilter = params.get('license') || '';
  const sort = params.get('sort') || 'updated';

  const counts = {};
  software.forEach(s => { counts[s.category] = (counts[s.category] || 0) + 1; });

  let list = [...software];

  if (catFilter) {
    list = list.filter(s => s.category === catFilter || s.category.toLowerCase().includes(catFilter.toLowerCase()));
  }
  if (searchTerm) {
    const t = searchTerm.toLowerCase();
    list = list.filter(s =>
      s.name.toLowerCase().includes(t) ||
      s.description.toLowerCase().includes(t) ||
      s.category.toLowerCase().includes(t) ||
      s.developer.toLowerCase().includes(t)
    );
  }
  if (licFilter === 'Open Source') {
    list = list.filter(s => s.openSource);
  }

  if (sort === 'name') list.sort((a, b) => a.name.localeCompare(b.name));
  else if (sort === 'size') list.sort((a, b) => a.size.localeCompare(b.size));
  else list.sort((a, b) => new Date(b.updated) - new Date(a.updated));

  const queriedCategory = categories.find(c => c.name === catFilter);

  return `
    ${Header()}
    <main>
      <div class="container">
        <div class="breadcrumbs-wrap">
          ${breadcrumbs([{ label: 'Software', href: '#/software' }])}
        </div>

        <div class="page-head">
          <h1>${queriedCategory ? queriedCategory.name : catFilter ? catFilter : 'Software Directory'}</h1>
          <p>${searchTerm ? `Results for &ldquo;${searchTerm}&rdquo;` : `Browse ${list.length} curated applications for your PC`}</p>
        </div>

        <div class="filters-bar">
          <div class="filter-group">
            <label>Category</label>
            <select class="filter-control" id="catFilter">
              <option value="">All Categories</option>
              ${categories.map(c => `<option value="${c.name}" ${c.name === catFilter ? 'selected' : ''}>${c.name} (${counts[c.name] || 0})</option>`).join('')}
            </select>
          </div>
          <div class="filter-group">
            <label>License</label>
            <select class="filter-control" id="licFilter">
              <option value="">All Licenses</option>
              <option value="Open Source" ${licFilter === 'Open Source' ? 'selected' : ''}>Open Source</option>
              <option value="Freeware" ${licFilter === 'Freeware' ? 'selected' : ''}>Freeware</option>
              <option value="Freemium" ${licFilter === 'Freemium' ? 'selected' : ''}>Freemium</option>
            </select>
          </div>
          <div class="filter-group">
            <label>Sort</label>
            <select class="filter-control" id="sortFilter">
              <option value="updated" ${sort === 'updated' ? 'selected' : ''}>Latest Updated</option>
              <option value="name" ${sort === 'name' ? 'selected' : ''}>Name A-Z</option>
              <option value="size" ${sort === 'size' ? 'selected' : ''}>Size</option>
            </select>
          </div>
        </div>

        <div class="result-count"><b>${list.length}</b> app${list.length === 1 ? '' : 's'}${searchTerm ? ` for "${searchTerm}"` : ''}</div>

        ${
          list.length === 0
            ? emptyState(
                `No software found${searchTerm ? ` for &ldquo;${searchTerm}&rdquo;` : ''}`,
                'Try a different search or explore the categories.',
                ['Checking the spelling', 'Browsing categories', 'Using fewer keywords'],
                `<a href="#/software" class="btn btn-primary">Browse Software</a><a href="#/categories" class="btn btn-secondary">View Categories</a>`
              )
            : `<div class="directory-list">${list.map(dirRow).join('')}</div>`
        }

        ${!searchTerm && !catFilter ? `
          <div style="margin-top:44px">
            <h2 style="font-size:20px;margin-bottom:18px">Browse by Category</h2>
            <div class="cat-tiles">
              ${categories.map(c => catTile(c, counts[c.name] || 0)).join('')}
            </div>
          </div>
        ` : ''}
      </div>
    </main>
    ${Footer()}
  `;
}
