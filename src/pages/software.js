import Header from '../components/Header.js';
import Footer from '../components/Footer.js';
import { software } from '../data/software.js';

export default function Software() {
  const hash = window.location.hash;
  const hashParams = hash.split('?')[1] || '';
  const urlParams = new URLSearchParams(hashParams);
  const categoryFilter = urlParams.get('category') || '';

  const filtered = categoryFilter
    ? software.filter(s => s.category.toLowerCase().includes(categoryFilter.toLowerCase()) || s.id === categoryFilter)
    : software;

  return `
    ${Header()}
    <main class="page-software">
      <div class="container">
        <div class="page-header">
          <h1>Software Directory</h1>
          <p>Browse ${software.length} curated applications for your PC</p>
        </div>
        <div class="filters">
          <div class="filter-group">
            <label>Category</label>
            <select id="categoryFilter">
              <option value="">All Categories</option>
              <option value="Graphics & Design">Graphics & Design</option>
              <option value="Video Editing">Video Editing</option>
              <option value="System Utilities">System Utilities</option>
              <option value="Security">Security</option>
              <option value="Mobile Tools">Mobile Tools</option>
              <option value="Productivity">Productivity</option>
            </select>
          </div>
          <div class="filter-group">
            <label>Platform</label>
            <select id="platformFilter">
              <option value="">All Platforms</option>
              <option value="Windows">Windows</option>
              <option value="macOS">macOS</option>
              <option value="Windows / macOS">Windows / macOS</option>
            </select>
          </div>
          <div class="filter-group">
            <label>Sort</label>
            <select id="sortFilter">
              <option value="updated">Latest Updated</option>
              <option value="name">Name A-Z</option>
              <option value="size">Size</option>
            </select>
          </div>
        </div>
        <div class="software-table">
          <div class="table-header">
            <span>Software</span>
            <span>Category</span>
            <span>Platform</span>
            <span>Size</span>
            <span>Updated</span>
            <span></span>
          </div>
          ${filtered.length === 0 ? `
            <div class="empty-state">
              <p>No software found matching your filters.</p>
            </div>
          ` : filtered.map(app => `
            <a href="#/software/${app.id}" class="table-row">
              <div class="table-software">
                <span class="table-icon">${app.icon}</span>
                <div>
                  <strong>${app.name}</strong>
                  <p>${app.developer}</p>
                </div>
              </div>
              <span class="table-category">${app.category}</span>
              <span class="table-platform">${app.platform}</span>
              <span class="table-size">${app.size}</span>
              <span class="table-date">${app.updated}</span>
              <span class="table-arrow">&rarr;</span>
            </a>
          `).join('')}
        </div>
      </div>
    </main>
    ${Footer()}
  `;
}
