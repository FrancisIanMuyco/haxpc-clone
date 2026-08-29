import Header from '../components/Header.js';
import Footer from '../components/Footer.js';
import { icon } from '../utils/icons.js';
import { breadcrumbs } from '../utils/renderers.js';

export default function About() {
  const stats = [
    { n: '15+', l: 'Curated apps', ic: 'package' },
    { n: '11', l: 'Categories', ic: 'grid' },
    { n: '2019', l: 'Founded', ic: 'award' },
    { n: '100%', l: 'Official links', ic: 'shieldCheck' },
  ];

  return `
    ${Header()}
    <main>
      <div class="container" style="max-width:820px">
        <div class="breadcrumbs-wrap">
          ${breadcrumbs([{ label: 'About' }])}
        </div>
        <div class="page-head" style="text-align:center;border:none">
          <h1 style="font-size:30px">About PinoyPC</h1>
          <p style="max-width:520px;margin:10px auto 0">Your trusted Philippine source for curated PC software and practical tech guides.</p>
        </div>

        <div class="cat-tiles" style="grid-template-columns:repeat(auto-fill,minmax(150px,1fr));margin-bottom:34px">
          ${stats.map(s => `
            <div class="cat-tile" style="flex-direction:column;align-items:center;text-align:center;gap:8px">
              <span class="cat-tile-icon" style="width:44px;height:44px;background:var(--accent-soft);color:var(--accent)">${icon(s.ic, 20)}</span>
              <span>
                <span class="cat-tile-name" style="font-size:22px;font-weight:800">${s.n}</span><br>
                <span class="cat-tile-count">${s.l}</span>
              </span>
            </div>
          `).join('')}
        </div>

        <div class="article-body">
          <p style="font-size:15.5px;line-height:1.8;color:var(--text-body)">PinoyPC is a premier destination for high-quality software insights, digital resources, and tech solutions tailored for Filipino PC users. Founded in 2019, we started as a passion project by a team of tech enthusiasts who realized how difficult it could be to find reliable, safe, and up-to-date software resources online.</p>
          <p style="font-size:15.5px;line-height:1.8;color:var(--text-body)">We carefully curate, test, and share top-tier software and tech guides that save you time, optimize your workflow, and enhance your digital environment. We do the heavy lifting of searching and vetting so you can download and use your favorite tools with confidence.</p>

          <h2>Our Mission</h2>
          <p style="font-size:15.5px;line-height:1.8;color:var(--text-body)">To provide Filipino PC users with reliable, safe, and up-to-date software resources and practical guides that empower them to get the most out of their computers.</p>

          <h2>What We Offer</h2>
          <div class="feature-list" style="grid-template-columns:1fr">
            ${[
              'Curated software directory with official download links',
              'Practical guides for Windows, productivity and security',
              'Clean, fast, and mobile-friendly experience',
              'Resources linked only to verified official sources',
            ].map(t => `<li>${icon('check', 16)} ${t}</li>`).join('')}
          </div>
        </div>
      </div>
    </main>
    ${Footer()}
  `;
}
