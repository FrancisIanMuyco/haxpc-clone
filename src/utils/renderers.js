import { icon } from './icons.js';
import { AppIcon } from '../components/AppIcon.js';
import { categories, software } from '../data/software.js';
import { formatDate, licenseBadge } from './format.js';

export function badge(app) {
  const b = licenseBadge(app.license);
  return `<span class="badge ${b.cls}">${b.label}</span>`;
}

// Section header with optional title-tag and view-all link
export function sectionHeader({ tag, title, link, linkText }) {
  return `
    <div class="section-head">
      <div>
        ${tag ? `<div class="title-tag">${tag}</div>` : ''}
        <h2>${title}</h2>
      </div>
      ${link ? `<a href="${link}" class="section-link">${linkText || 'View all'} ${icon('arrowRight', 15)}</a>` : ''}
    </div>
  `;
}

// Large featured card (used on home)
export function featuredLarge(app) {
  return `
    <a href="#/software/${app.id}" class="feat-lg" style="--app-accent:${app.color || '#2563EB'}">
      <div class="fg-glow"></div>
      <div class="feat-lg-top">
        ${AppIcon(app, 'lg')}
        ${badge(app)}
      </div>
      <div class="feat-lg-body">
        <h3>${app.name}</h3>
        <p>${app.description}</p>
        <div class="feat-lg-meta">
          ${[app.category, 'v' + app.version, app.license].map(t => `<span class="badge">${t}</span>`).join('')}
        </div>
        <div class="feat-lg-btns">
          <span class="btn btn-primary">${icon('download', 16)} View Details</span>
          <span class="btn btn-secondary">${icon('externalLink', 15)} Official Website</span>
        </div>
      </div>
    </a>
  `;
}

// Small premium card (featured, editor's picks grid, popular)
export function cardPremium(app) {
  return `
    <a href="#/software/${app.id}" class="card-premium">
      <div class="cp-head">
        ${AppIcon(app, 'md')}
        <div style="min-width:0">
          <div class="cp-name">${app.name}</div>
          <div class="cp-cat">${app.category}</div>
        </div>
        ${badge(app)}
      </div>
      <div class="cp-desc">${app.description}</div>
      <div class="cp-foot">
        <span class="cp-meta">v${app.version} &middot; ${formatDate(app.updated)}</span>
        <span class="section-link">Details ${icon('arrowRight', 14)}</span>
      </div>
    </a>
  `;
}

// Compact software row (latest, recently updated, search results)
export function softRow(app) {
  return `
    <a href="#/software/${app.id}" class="soft-row">
      ${AppIcon(app, 'md')}
      <span class="sr-main">
        <span class="sr-name">${app.name} ${badge(app)}</span>
        <span class="sr-sub">${app.developer} &middot; ${app.category}</span>
      </span>
      <span class="sr-meta">
        <span>v${app.version}</span>
        <span>Updated ${formatDate(app.updated)}</span>
      </span>
      <span class="sr-arrow">${icon('arrowRight', 18)}</span>
    </a>
  `;
}

// Horizontal pick card (editor's picks, open source)
export function pickCard(app, extraLabel) {
  return `
    <a href="#/software/${app.id}" class="pick-card">
      ${AppIcon(app, 'lg')}
      <span class="pick-main">
        <span class="pick-top">
          <span class="pick-name">${app.name}</span>
          ${badge(app)}
          ${app.openSource ? `<span class="badge badge-teal" style="background:var(--teal-soft);color:var(--teal)">Open Source</span>` : ''}
        </span>
        <span class="pick-desc">${app.description}</span>
        <span class="pick-meta">
          <span>${icon('folder', 13)} ${app.category}</span>
          <span>${icon('hardDrive', 13)} ${app.size}</span>
          <span>${icon('clock', 13)} ${formatDate(app.updated)}</span>
        </span>
      </span>
      <span class="pick-action btn btn-secondary btn-sm">Details ${icon('arrowRight', 14)}</span>
    </a>
  `;
}

// Category tile
export function catTile(cat, count) {
  return `
    <a href="#/software?category=${encodeURIComponent(cat.name)}" class="cat-tile" style="--cat-color:${cat.color}">
      <span class="cat-tile-icon">${icon(cat.icon, 20, 1.9)}</span>
      <span>
        <span class="cat-tile-name">${cat.name}</span><br>
        <span class="cat-tile-count">${count} app${count === 1 ? '' : 's'}</span>
      </span>
    </a>
  `;
}

// Sidebar popular widget
export function popularWidget(items) {
  return `
    <div class="widget">
      <div class="widget-title">${icon('star', 17)} Popular Today</div>
      ${items.map((s, i) => `
        <a href="#/software/${s.id}" class="pop-row">
          <span class="pr-num">${i + 1}</span>
          ${AppIcon(s, 'sm')}
          <span class="pop-main">
            <span class="pop-name">${s.name}</span><br>
            <span class="pop-cat">${s.category}</span>
          </span>
        </a>
      `).join('')}
    </div>
  `;
}

// Sidebar categories widget (two-column)
export function categoriesWidget() {
  const counts = {};
  software.forEach(s => { counts[s.category] = (counts[s.category] || 0) + 1; });
  return `
    <div class="widget">
      <div class="widget-title">${icon('grid', 17)} Categories</div>
      <div class="cat-widget-list">
        ${categories.map(c => {
          const count = counts[c.name] || 0;
          return `<a href="#/software?category=${encodeURIComponent(c.name)}" style="--cat-color:${c.color}">${icon(c.icon, 15)} ${c.name}</a>`;
        }).join('')}
      </div>
    </div>
  `;
}

// Sidebar recently updated widget
export function recentlyWidget(items) {
  return `
    <div class="widget">
      <div class="widget-title">${icon('clock', 17)} Recently Updated</div>
      ${items.map(s => `
        <a href="#/software/${s.id}" class="recent-row">
          ${AppIcon(s, 'sm')}
          <span class="recent-main">
            <span class="recent-name">${s.name}</span><br>
            <span class="recent-meta">v${s.version} &middot; ${formatDate(s.updated)}</span>
          </span>
        </a>
      `).join('')}
    </div>
  `;
}

// Empty state
export function emptyState(title, message, hints, actions) {
  return `
    <div class="empty">
      <div class="empty-icon">${icon('search', 26)}</div>
      <h3>${title}</h3>
      <p>${message}</p>
      ${hints && hints.length ? `<ul>${hints.map(h => `<li>${h}</li>`).join('')}</ul>` : ''}
      ${actions ? `<div class="empty-actions">${actions}</div>` : ''}
    </div>
  `;
}

export function breadcrumbs(items) {
  return `
    <nav class="breadcrumbs" aria-label="Breadcrumb">
      <a href="#/">Home</a>
      ${items.map((it, i) => {
        const last = i === items.length - 1;
        return `<span class="sep">${icon('chevronRight', 14)}</span>${last ? `<span class="current">${it.label}</span>` : `<a href="${it.href}">${it.label}</a>`}`;
      }).join('')}
    </nav>
  `;
}

// Build the home sidebar widgets
export function homeSidebar() {
  const popular = [...software].filter(s => s.popular > 0).sort((a, b) => a.popular - b.popular).slice(0, 5);
  const recently = [...software].sort((a, b) => new Date(b.updated) - new Date(a.updated)).slice(0, 4);
  return popularWidget(popular) + categoriesWidget() + recentlyWidget(recently);
}
