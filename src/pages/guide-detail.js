import Header from '../components/Header.js';
import Footer from '../components/Footer.js';
import { guides } from '../data/software.js';

export default function GuideDetail() {
  const path = window.location.pathname;
  const id = path.split('/')[2];
  const guide = guides.find(g => g.id === id);

  if (!guide) {
    return `${Header()}<main class="container"><h1>Guide not found</h1></main>${Footer()}`;
  }

  return `
    ${Header()}
    <main class="page-guide-detail">
      <div class="container">
        <nav class="breadcrumbs">
          <a href="/" data-link>Home</a>
          <span>/</span>
          <a href="/guides" data-link>Guides</a>
          <span>/</span>
          <span>${guide.title}</span>
        </nav>
        <article class="guide-article">
          <span class="guide-category">${guide.category}</span>
          <h1>${guide.title}</h1>
          <div class="guide-meta">
            <span>${guide.date}</span>
            <span>${guide.readTime} read</span>
          </div>
          <div class="guide-body">
            <p>${guide.excerpt}</p>
            <p>This is a comprehensive guide designed to help Filipino PC users navigate common challenges and optimize their computing experience. Whether you're a beginner or an experienced user, these practical tips will help you make the most of your Windows PC.</p>
            <h2>Getting Started</h2>
            <p>Before diving into advanced configurations, it's important to ensure your system is running optimally. Regular maintenance, proper software selection, and good security habits form the foundation of a great PC experience.</p>
            <h2>Best Practices</h2>
            <p>Always download software from official sources. Keep your system updated, and use reputable security tools. Back up your important files regularly to avoid data loss.</p>
          </div>
        </article>
      </div>
    </main>
    ${Footer()}
  `;
}
