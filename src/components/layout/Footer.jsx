import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, ChevronUp, ChevronDown, Phone } from 'lucide-react';
import './Footer.css';

/* ── Accordion section (mobile only) ── */
const AccordionSection = ({ title, children }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={`mob-accordion ${open ? 'open' : ''}`}>
      <button className="mob-accordion-hd" onClick={() => setOpen(!open)}>
        <span>{title}</span>
        {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>
      <div className="mob-accordion-body">
        <div className="mob-accordion-inner">{children}</div>
      </div>
    </div>
  );
};

const Footer = () => {

  return (
    <footer className="footer">
      {/* Top accent line */}
      <div className="footer-accent-line"></div>

      {/* ════════════════════════════════
          DESKTOP LAYOUT  (>= 641px)
      ════════════════════════════════ */}
      <div className="footer-main footer-desktop-only">
        <div className="container footer-grid">

          {/* Brand */}
          <div className="footer-brand">
            <Link to="/" className="footer-logo-link">
              <img loading="lazy" src="/Vividh Talks DP With Tagline White.webp" alt="Vividh Talks" className="footer-logo-img" style={{ height: '100px', width: 'auto' }} />
            </Link>
            <p className="footer-tagline">
              India's emerging podcast platform exploring inspiring human stories.
            </p>
            <div className="ft-social-row">
              <a href="https://www.facebook.com/vividhtalks" target="_blank" rel="noreferrer" className="footer-social-btn" aria-label="Facebook">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
              </a>
              <a href="https://www.x.com/VividhTalks" target="_blank" rel="noreferrer" className="footer-social-btn" aria-label="X / Twitter">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.045 4.126H5.078z" /></svg>
              </a>
              <a href="https://www.instagram.com/vividhtalks" target="_blank" rel="noreferrer" className="footer-social-btn" aria-label="Instagram">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
              </a>
              <a href="https://www.youtube.com/@TalksVividh" target="_blank" rel="noreferrer" className="footer-social-btn" aria-label="YouTube">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" /><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" /></svg>
              </a>
            </div>
            <div className="footer-platforms">
              <span className="footer-platforms-label">LISTEN ON</span>
              <div className="footer-platform-chips">
                <a href="https://open.spotify.com/show/6VuPnQLjpYCCymWC1q3D1Z?si=a3e5efbd65f34d51" target="_blank" rel="noreferrer" className="f-chip">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0zm5.5 17.3c-.2.4-.7.5-1.1.3-2.9-1.8-6.6-2.2-10.9-1.2-.4.1-.8-.2-.9-.6-.1-.4.2-.8.6-.9 4.7-1.1 8.8-.6 12 1.4.4.2.5.7.3 1zm1.5-3.3c-.3.5-.9.6-1.3.3-3.3-2-8.4-2.6-12.3-1.4-.5.2-1.1-.1-1.2-.6-.2-.5.1-1.1.6-1.2 4.5-1.4 10.1-.7 13.9 1.7.4.2.6.9.3 1.2zm.1-3.4C15.2 8.2 8.5 8 4.7 9.2c-.6.2-1.3-.2-1.4-.8-.2-.6.2-1.3.8-1.4 4.4-1.3 11.8-1.1 16.4 1.8.5.3.7 1 .4 1.5-.3.6-1 .7-1.6.3z" /></svg>
                  Spotify
                </a>
                <a href="https://www.youtube.com/@TalksVividh" target="_blank" rel="noreferrer" className="f-chip">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" /><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" /></svg>
                  YouTube
                </a>
              </div>
            </div>
          </div>

          {/* About */}
          <div className="footer-col">
            <h4 className="footer-col-heading">About</h4>
            <nav className="footer-nav-list">
              <Link to="/about" className="footer-nav-link">About Us</Link>
              <Link to="/host" className="footer-nav-link">Our Host</Link>
              <Link to="/featured-guests" className="footer-nav-link">Featured Guests</Link>
              <Link to="/partner" className="footer-nav-link">Partner With Us</Link>
            </nav>
          </div>

          {/* Explore */}
          <div className="footer-col">
            <h4 className="footer-col-heading">Explore</h4>
            <nav className="footer-nav-list">
              <Link to="/episodes" className="footer-nav-link">All Episodes</Link>
              <Link to="/episodes" className="footer-nav-link">Trending Now</Link>
              <Link to="/episodes" className="footer-nav-link">Shorts &amp; Clips</Link>
              <Link to="/episodes" className="footer-nav-link">Categories</Link>
            </nav>
          </div>

          {/* Studio */}
          <div className="footer-col">
            <h4 className="footer-col-heading">Studio</h4>
            <nav className="footer-nav-list">
              <Link to="/book" className="footer-nav-link">Book a Session</Link>
              <Link to="/contact" className="footer-nav-link">Contact</Link>
              <Link to="/privacy" className="footer-nav-link">Privacy Policy</Link>
              <Link to="/terms" className="footer-nav-link">Terms of Use</Link>
            </nav>
          </div>

          {/* Newsletter */}
          <div className="footer-newsletter-col">
            <h4 className="footer-col-heading">Stay In The Loop</h4>
            <p className="footer-newsletter-desc">Fresh episode drops, behind-the-scenes content and exclusive creator updates.</p>
            <div className="footer-contact-info">
              <a href={`https://wa.me/919031806915?text=Hi%20Vividh%20Talks,%20I'm%20interested%20in%20booking%20the%20podcast%20studio!`} target="_blank" rel="noreferrer" className="footer-contact-row" style={{ textDecoration: 'none' }}><Phone size={13} className="footer-contact-icon" /><span>9031806915</span></a>
              <a href="mailto:vividhtalks@gmail.com?subject=Studio%20Booking%20Inquiry" className="footer-contact-row" style={{ textDecoration: 'none' }}><Mail size={13} className="footer-contact-icon" /><span>vividhtalks@gmail.com</span></a>
              <div className="footer-contact-row"><MapPin size={13} className="footer-contact-icon" /><span style={{ fontSize: '11px', lineHeight: '1.4' }}>4th Floor, Above Apollo Dental, Rajeev Nagar Main Road, Patna, Bihar - 800024, India</span></div>
            </div>
          </div>

        </div>
      </div>

      {/* ════════════════════════════════
          MOBILE LAYOUT  (<= 640px)
      ════════════════════════════════ */}
      <div className="footer-mobile-only">

        {/* Accordion: About */}
        <AccordionSection title="ABOUT">
          <Link to="/about" className="mob-footer-link">About Us</Link>
          <Link to="/host" className="mob-footer-link">Our Host</Link>
          <Link to="/featured-guests" className="mob-footer-link">Featured Guests</Link>
          <Link to="/partner" className="mob-footer-link">Partner With Us</Link>
        </AccordionSection>

        {/* Accordion: Explore */}
        <AccordionSection title="EXPLORE">
          <Link to="/episodes" className="mob-footer-link">All Episodes</Link>
          <Link to="/episodes" className="mob-footer-link">Trending Now</Link>
          <Link to="/episodes" className="mob-footer-link">Shorts &amp; Clips</Link>
          <Link to="/episodes" className="mob-footer-link">Categories</Link>
        </AccordionSection>

        {/* Accordion: Studio */}
        <AccordionSection title="STUDIO">
          <Link to="/book" className="mob-footer-link">Book a Session</Link>
          <Link to="/contact" className="mob-footer-link">Contact</Link>
          <Link to="/privacy" className="mob-footer-link">Privacy Policy</Link>
          <Link to="/terms" className="mob-footer-link">Terms of Use</Link>
        </AccordionSection>

        {/* Address + Socials + Platforms */}
        <div className="mob-footer-bottom-block">
          {/* Address */}
          <div className="mob-footer-address">
            <span><a href={`https://wa.me/919031806915?text=Hi%20Vividh%20Talks,%20I'm%20interested%20in%20booking%20the%20podcast%20studio!`} target="_blank" rel="noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>9031806915</a></span>
            <span><a href="mailto:vividhtalks@gmail.com?subject=Studio%20Booking%20Inquiry" style={{ textDecoration: 'none', color: 'inherit' }}>vividhtalks@gmail.com</a></span>
            <span style={{ fontSize: '11px', lineHeight: '1.4', marginTop: '6px' }}>4th Floor, Above Apollo Dental, Keshri Nagar, Rajeev Nagar Main Road, Patna, Bihar - 800024, India</span>
          </div>

          {/* Social Icons */}
          <div className="mob-footer-socials">
            <a href="https://www.facebook.com/vividhtalks" target="_blank" rel="noreferrer" className="mob-social-btn" aria-label="Facebook">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
            </a>
            <a href="https://www.instagram.com/vividhtalks" target="_blank" rel="noreferrer" className="mob-social-btn" aria-label="Instagram">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
            </a>
            <a href="https://www.youtube.com/@TalksVividh" target="_blank" rel="noreferrer" className="mob-social-btn" aria-label="YouTube">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" /><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" /></svg>
            </a>
          </div>

          {/* Streaming Platform Round Icons */}
          <div className="mob-footer-platforms">
            <a href="https://open.spotify.com/show/6VuPnQLjpYCCymWC1q3D1Z?si=a3e5efbd65f34d51" target="_blank" rel="noreferrer" className="mob-platform-icon spotify" aria-label="Spotify">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0zm5.5 17.3c-.2.4-.7.5-1.1.3-2.9-1.8-6.6-2.2-10.9-1.2-.4.1-.8-.2-.9-.6-.1-.4.2-.8.6-.9 4.7-1.1 8.8-.6 12 1.4.4.2.5.7.3 1zm1.5-3.3c-.3.5-.9.6-1.3.3-3.3-2-8.4-2.6-12.3-1.4-.5.2-1.1-.1-1.2-.6-.2-.5.1-1.1.6-1.2 4.5-1.4 10.1-.7 13.9 1.7.4.2.6.9.3 1.2zm.1-3.4C15.2 8.2 8.5 8 4.7 9.2c-.6.2-1.3-.2-1.4-.8-.2-.6.2-1.3.8-1.4 4.4-1.3 11.8-1.1 16.4 1.8.5.3.7 1 .4 1.5-.3.6-1 .7-1.6.3z" /></svg>
            </a>
            <a href="https://www.youtube.com/@TalksVividh" target="_blank" rel="noreferrer" className="mob-platform-icon youtube" aria-label="YouTube">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
            </a>
          </div>
        </div>
      </div>

      {/* ── Bottom Copyright Bar (shared) ── */}
      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p className="footer-copyright">
            Copyright © 2026 Vividh Talks · All rights reserved
          </p>
          <div className="footer-bottom-links footer-desktop-only">
            <Link to="/privacy">Privacy</Link>
            <span className="f-dot">·</span>
            <Link to="/terms">Terms</Link>
            <span className="f-dot">·</span>
            <a href="https://www.vividhcommunications.com/" target="_blank" rel="noreferrer">Parent Company</a>
          </div>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
