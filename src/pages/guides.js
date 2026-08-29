import Header from '../components/Header.js';
import Footer from '../components/Footer.js';
import { guides } from '../data/software.js';

export default function Guides() {
  return `
    ${Header()}
    <main class="page-guides">
      <div class="container">
        <div class="page-header">
          <h1>Guides & Tutorials</h1>
          <p>Practical guides to help you get the most out of your PC</p>
        </div>
        <div class="guides-list">
          ${guides.map(guide => `
            <a href="#/guides/${guide.id}" class="guide-card-horizontal">
              <div class="guide-content">
                <span class="guide-category">${guide.category}</span>
                <h3>${guide.title}</h3>
                <p>${guide.excerpt}</p>
                <div class="guide-meta">
                  <span>${guide.date}</span>
                  <span>${guide.readTime} read</span>
                </div>
              </div>
              <span class="btn-arrow">&rarr;</span>
            </a>
          `).join('')}
        </div>
      </div>
    </main>
    ${Footer()}
  `;
}
