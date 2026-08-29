import Header from '../components/Header.js';
import Footer from '../components/Footer.js';
import { icon } from '../utils/icons.js';
import { breadcrumbs } from '../utils/renderers.js';

export default function Contact() {
  return `
    ${Header()}
    <main>
      <div class="container">
        <div class="breadcrumbs-wrap">
          ${breadcrumbs([{ label: 'Contact' }])}
        </div>
        <div class="page-head">
          <h1>Contact Us</h1>
          <p>Have a question, feedback, or a business inquiry? We'd love to hear from you.</p>
        </div>

        <div class="contact-layout">
          <div class="form-card">
            <form data-demo>
              <div class="form-group">
                <label for="name">Name</label>
                <input type="text" id="name" name="name" required placeholder="Juan dela Cruz">
              </div>
              <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" name="email" required placeholder="you@example.com">
              </div>
              <div class="form-group">
                <label for="subject">Subject</label>
                <select id="subject" name="subject">
                  <option>General inquiry</option>
                  <option>Suggest a software</option>
                  <option>Report a broken link</option>
                  <option>Business partnership</option>
                </select>
              </div>
              <div class="form-group">
                <label for="message">Message</label>
                <textarea id="message" name="message" rows="5" required placeholder="How can we help?"></textarea>
              </div>
              <button type="submit" class="btn btn-primary btn-lg">${icon('mail', 16)} Send Message</button>
              <p id="formSuccess" hidden style="margin-top:14px;font-size:14px;color:var(--green)">${icon('check', 14)} Thank you! Your message has been sent (demo).</p>
            </form>
          </div>

          <div class="contact-side">
            <div class="widget">
              <h3>Get in Touch</h3>
              <p>We value our community and strive to provide the best support possible. Reach out and we'll get back to you as soon as we can.</p>
              <div class="info-list">
                <div class="info-item">
                  <span class="info-ico">${icon('mail', 18)}</span>
                  <div>
                    <strong>Email</strong>
                    <span>hello@pinoypc.ph</span>
                  </div>
                </div>
                <div class="info-item">
                  <span class="info-ico">${icon('mapPin', 18)}</span>
                  <div>
                    <strong>Location</strong>
                    <span>Philippines</span>
                  </div>
                </div>
                <div class="info-item">
                  <span class="info-ico">${icon('clock', 18)}</span>
                  <div>
                    <strong>Response Time</strong>
                    <span>Within 48 hours</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="widget">
              <div class="widget-title">${icon('shieldCheck', 17)} Trust & Safety</div>
              <p style="color:var(--text-muted);font-size:13.5px;margin:0">We only link to official developer sources and never host cracked or pirated files. Reporting broken or unsafe links helps keep PinoyPC safe for everyone.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
    ${Footer()}
  `;
}
