export default function Footer() {
  return `
    <footer class="footer">
      <div class="container">
        <div class="footer-grid">
          <div class="footer-brand">
            <a href="/" data-link class="logo">
              <span class="logo-icon">⚡</span>
              <span class="logo-text">PinoyPC</span>
            </a>
            <p>Ang iyong premier na destinasyon para sa mataas na kalidad na PC software at tech solutions para sa mga Pinoy.</p>
          </div>
          <div class="footer-links">
            <h4>Explore</h4>
            <a href="/software" data-link>Software</a>
            <a href="/guides" data-link>Guides</a>
            <a href="/about" data-link>About</a>
            <a href="/contact" data-link>Contact</a>
          </div>
          <div class="footer-links">
            <h4>Categories</h4>
            <a href="/software" data-link>Windows</a>
            <a href="/software" data-link>Utilities</a>
            <a href="/software" data-link>Graphics & Design</a>
            <a href="/software" data-link>Multimedia</a>
          </div>
          <div class="footer-links">
            <h4>Company</h4>
            <a href="/about" data-link>About</a>
            <a href="/contact" data-link>Contact</a>
            <a href="/about" data-link>Privacy Policy</a>
            <a href="/about" data-link>Terms</a>
          </div>
        </div>
        <div class="footer-bottom">
          <p>© 2026 PinoyPC. All rights reserved. | Pundar noong 2019</p>
        </div>
      </div>
    </footer>
  `;
}
