import Header from '../components/Header.js';
import Footer from '../components/Footer.js';

export default function Contact() {
  return `
    ${Header()}
    <main class="page-contact">
      <div class="container">
        <div class="page-header">
          <h1>Contact Us</h1>
          <p>Have a question, feedback, or a business inquiry?</p>
        </div>
        <div class="contact-layout">
          <form class="contact-form" onsubmit="event.preventDefault(); alert('Message sent! (demo)');">
            <div class="form-group">
              <label for="name">Name</label>
              <input type="text" id="name" name="name" required>
            </div>
            <div class="form-group">
              <label for="email">Email</label>
              <input type="email" id="email" name="email" required>
            </div>
            <div class="form-group">
              <label for="message">Message</label>
              <textarea id="message" name="message" rows="5" required></textarea>
            </div>
            <button type="submit" class="btn-primary">Send Message</button>
          </form>
          <div class="contact-info">
            <h3>Get in Touch</h3>
            <p>We value our community and strive to provide the best support possible. Reach out and we will get back to you as soon as possible.</p>
            <div class="info-items">
              <div class="info-item">
                <strong>Email</strong>
                <span>hello@pinoypc.ph</span>
              </div>
              <div class="info-item">
                <strong>Location</strong>
                <span>Philippines</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    ${Footer()}
  `;
}
