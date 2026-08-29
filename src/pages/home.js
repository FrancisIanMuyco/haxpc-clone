import Header from '../components/Header.js';
import Footer from '../components/Footer.js';
import { software, categories } from '../data/software.js';
import { icon } from '../utils/icons.js';
import {
  sectionHeader, featuredLarge, cardPremium, softRow, pickCard,
  catTile, homeSidebar,
} from '../utils/renderers.js';

const POPULAR_SEARCHES = ['7-Zip', 'VLC', 'OBS', 'Blender', 'VS Code'];

export default function Home() {
  const featured = software.filter(s => s.featured);
  const [featMain, ...featSide] = featured.length ? featured : software.slice(0, 5);

  const latest = [...software].sort((a, b) => new Date(b.updated) - new Date(a.updated)).slice(0, 5);
  const editorsPicks = software.filter(s => s.editorsPick).slice(0, 4);
  const openSource = software.filter(s => s.openSource && !editorsPicks.includes(s)).slice(0, 3);

  const counts = {};
  software.forEach(s => { counts[s.category] = (counts[s.category] || 0) + 1; });

  return `
    ${Header()}
    <main>
      <!-- Compact intro -->
      <section class="intro">
        <div class="container intro-inner">
          <div class="intro-text">
            <span class="intro-eyebrow">${icon('sparkles', 15)} Discover Better PC Software</span>
            <h1>Find useful, trusted <span>Windows software</span> without the confusion.</h1>
            <p class="intro-sub">Curated, official downloads and practical guides — no digging through messy download pages.</p>
          </div>
          <div class="intro-search">
            <div class="is-wrap">
              ${icon('search', 20)}
              <input type="text" id="homeSearch" placeholder="Search software, tools, utilities..." aria-label="Search software" autocomplete="off">
              <button class="is-enter" id="homeSearchBtn" aria-label="Search">${icon('arrowRight', 18)}</button>
            </div>
            <div class="is-popular">
              <span><b>Popular:</b></span>
              ${POPULAR_SEARCHES.map(p => `<a href="#/software?search=${encodeURIComponent(p)}">${p}</a>`).join('')}
            </div>
          </div>
        </div>
      </section>

      <!-- Featured -->
      <section class="section" id="featured-section">
        <div class="container">
          ${sectionHeader({ tag: 'Pick of the week', title: 'Featured Software', link: '#/software', linkText: 'All software' })}
          <div class="featured-grid">
            ${featuredLarge(featMain)}
            <div class="feat-side-grid">
              ${featSide.slice(0, 4).map(cardPremium).join('')}
            </div>
          </div>
        </div>
      </section>

      <!-- Latest + sidebar -->
      <section class="section">
        <div class="container">
          <div class="layout-split">
            <div class="layout-main">
              ${sectionHeader({ tag: 'Fresh releases', title: 'Latest Software', link: '#/latest', linkText: 'More updates' })}
              <div>
                ${latest.map(softRow).join('')}
              </div>
            </div>
            <aside class="layout-side">
              ${homeSidebar()}
            </aside>
          </div>
        </div>
      </section>

      <!-- Editor's picks -->
      <section class="section">
        <div class="container">
          ${sectionHeader({ tag: 'Handpicked', title: "Editor's Picks", link: '#/software', linkText: 'Browse all' })}
          <div>
            ${editorsPicks.map(p => pickCard(p)).join('')}
          </div>
        </div>
      </section>

      <!-- Open source -->
      <section class="section">
        <div class="container">
          ${sectionHeader({ tag: 'Community-driven', title: 'Open Source Picks', link: '#/software?license=Open%20Source', linkText: 'More open source' })}
          <div>
            ${openSource.map(p => pickCard(p)).join('')}
          </div>
        </div>
      </section>

      <!-- Categories -->
      <section class="section">
        <div class="container">
          ${sectionHeader({ tag: 'Browse by type', title: 'Explore Categories', link: '#/categories', linkText: 'All categories' })}
          <div class="cat-tiles">
            ${categories.map(c => catTile(c, counts[c.name] || 0)).join('')}
          </div>
        </div>
      </section>
    </main>
    ${Footer()}
  `;
}
