import { icon } from '../utils/icons.js';
import { categories } from '../data/software.js';

export default function Footer() {
  return `
    <footer class="site-footer">
      <div class="container">
        <div class="footer-grid">
          <div class="footer-brand">
            <a href="#/" class="brand">
              <span class="brand-mark">${icon('zap', 19, 2.2)}</span>
              <span class="brand-name">Pinoy<em>PC</em></span>
            </a>
            <p>Ang iyong premier na destinasyon para sa curated, trusted PC software at practical guides para sa mga Pinoy.</p>
            <div class="footer-social">
              <a href="#" aria-label="Facebook">${icon('share2', 16)}</a>
              <a href="#" aria-label="Twitter">${icon('globe', 16)}</a>
              <a href="#" aria-label="YouTube">${icon('video', 16)}</a>
            </div>
          </div>
          <div class="footer-col">
            <h4>Explore</h4>
            <a href="#/software">Software</a>
            <a href="#/categories">Categories</a>
            <a href="#/latest">Latest</a>
            <a href="#/popular">Popular</a>
            <a href="#/guides">Guides</a>
          </div>
          <div class="footer-col">
            <h4>Categories</h4>
            ${categories.slice(0, 5).map(c => `<a href="#/software?category=${encodeURIComponent(c.name)}">${c.name}</a>`).join('')}
          </div>
          <div class="footer-col">
            <h4>Company</h4>
            <a href="#/about">About</a>
            <a href="#/contact">Contact</a>
            <a href="#/about">Privacy Policy</a>
            <a href="#/about">Terms</a>
          </div>
        </div>
        <div class="footer-bottom">
          <p>&copy; 2026 PinoyPC. All rights reserved. &middot; <a href="#/about">Privacy</a> &middot; <a href="#/about">Terms</a></p>
        </div>
      </div>
    </footer>
  `;
}
