import Header from '../components/Header.js';
import Footer from '../components/Footer.js';

export default function About() {
  return `
    ${Header()}
    <main class="page-about">
      <div class="container">
        <div class="page-header">
          <h1>About PinoyPC</h1>
          <p>Your trusted source for PC software and tech guides</p>
        </div>
        <div class="about-content">
          <p>PinoyPC is a premier destination for high-quality software insights, digital resources, and tech solutions tailored for Filipino PC users. Founded in 2019, we started as a passion project by a team of tech enthusiasts who realized how difficult it could be to find reliable, safe, and up-to-date software resources online.</p>
          <p>We carefully curate, test, and share top-tier software and tech guides that save you time, optimize your workflow, and enhance your digital environment. We do the heavy lifting of searching and vetting so you can download and use your favorite tools with complete peace of mind.</p>
          <h2>Our Mission</h2>
          <p>To provide Filipino PC users with reliable, safe, and up-to-date software resources and practical guides that empower them to get the most out of their computers.</p>
          <h2>What We Offer</h2>
          <ul>
            <li>Curated software directory with official download links</li>
            <li>Practical guides for Windows, productivity, and security</li>
            <li>Clean, fast, and mobile-friendly experience</li>
            <li>Trusted resources vetted for safety and quality</li>
          </ul>
        </div>
      </div>
    </main>
    ${Footer()}
  `;
}
