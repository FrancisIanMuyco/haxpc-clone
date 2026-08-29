import Header from '../components/Header.js';
import Footer from '../components/Footer.js';
import { categories, software } from '../data/software.js';
import { icon } from '../utils/icons.js';
import { breadcrumbs, catTile } from '../utils/renderers.js';

export default function Categories() {
  const counts = {};
  software.forEach(s => { counts[s.category] = (counts[s.category] || 0) + 1; });

  return `
    ${Header()}
    <main>
      <div class="container">
        <div class="breadcrumbs-wrap">
          ${breadcrumbs([{ label: 'Categories' }])}
        </div>
        <div class="page-head">
          <h1>Browse by Category</h1>
          <p>Everything organised by type — ${software.length} apps across ${categories.length} categories.</p>
        </div>
        <div class="cat-tiles" style="grid-template-columns:repeat(auto-fill,minmax(220px,1fr))">
          ${categories.map(c => `
            <a href="#/software?category=${encodeURIComponent(c.name)}" class="cat-tile" style="--cat-color:${c.color};flex-direction:column;align-items:flex-start;text-align:left">
              <span class="cat-tile-icon" style="width:48px;height:48px">${icon(c.icon, 22, 1.9)}</span>
              <span>
                <span class="cat-tile-name" style="font-size:15px">${c.name}</span><br>
                <span class="cat-tile-count">${counts[c.name] || 0} app${counts[c.name] === 1 ? '' : 's'}</span>
              </span>
            </a>
          `).join('')}
        </div>
      </div>
    </main>
    ${Footer()}
  `;
}
