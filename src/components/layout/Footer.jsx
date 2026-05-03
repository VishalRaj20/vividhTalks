import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Mail, MapPin, ChevronUp, ChevronDown } from 'lucide-react';
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
  const [email, setEmail] = useState('');

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
              <div className="footer-logo-mark">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"/>
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
                  <line x1="12" y1="19" x2="12" y2="22"/>
                  <line x1="8" y1="22" x2="16" y2="22"/>
                </svg>
              </div>
              <div className="footer-logo-text">
                <span style={{ color: '#fff' }}>VIVIDH</span><span style={{ color: '#FF4D00' }}>TALKS</span>
              </div>
            </Link>
            <p className="footer-tagline">
              India's boldest podcast platform. Where creators, founders, and voices that deserve to be heard come alive.
            </p>
            <div className="ft-social-row">
              <a href="https://facebook.com"  target="_blank" rel="noreferrer" className="footer-social-btn" aria-label="Facebook">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="https://twitter.com"   target="_blank" rel="noreferrer" className="footer-social-btn" aria-label="X / Twitter">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.045 4.126H5.078z"/></svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="footer-social-btn" aria-label="Instagram">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              <a href="https://youtube.com"   target="_blank" rel="noreferrer" className="footer-social-btn" aria-label="YouTube">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>
              </a>
            </div>
            <div className="footer-platforms">
              <span className="footer-platforms-label">LISTEN ON</span>
              <div className="footer-platform-chips">
                <a href="#" className="f-chip">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0zm5.5 17.3c-.2.4-.7.5-1.1.3-2.9-1.8-6.6-2.2-10.9-1.2-.4.1-.8-.2-.9-.6-.1-.4.2-.8.6-.9 4.7-1.1 8.8-.6 12 1.4.4.2.5.7.3 1zm1.5-3.3c-.3.5-.9.6-1.3.3-3.3-2-8.4-2.6-12.3-1.4-.5.2-1.1-.1-1.2-.6-.2-.5.1-1.1.6-1.2 4.5-1.4 10.1-.7 13.9 1.7.4.2.6.9.3 1.2zm.1-3.4C15.2 8.2 8.5 8 4.7 9.2c-.6.2-1.3-.2-1.4-.8-.2-.6.2-1.3.8-1.4 4.4-1.3 11.8-1.1 16.4 1.8.5.3.7 1 .4 1.5-.3.6-1 .7-1.6.3z"/></svg>
                  Spotify
                </a>
                <a href="#" className="f-chip">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0zm0 4.9c3.9 0 7.1 3.2 7.1 7.1 0 3.9-3.2 7.1-7.1 7.1S4.9 15.9 4.9 12 8.1 4.9 12 4.9zm0 2.8c-2.4 0-4.3 1.9-4.3 4.3s1.9 4.3 4.3 4.3 4.3-1.9 4.3-4.3-1.9-4.3-4.3-4.3z"/></svg>
                  Apple
                </a>
                <a href="#" className="f-chip">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>
                  YouTube
                </a>
              </div>
            </div>
          </div>

          {/* Explore */}
          <div className="footer-col">
            <h4 className="footer-col-heading">Explore</h4>
            <nav className="footer-nav-list">
              <Link to="/podcasts" className="footer-nav-link">All Episodes</Link>
              <Link to="/podcasts" className="footer-nav-link">Trending Now</Link>
              <Link to="/podcasts" className="footer-nav-link">Shorts &amp; Clips</Link>
              <Link to="/podcasts" className="footer-nav-link">Categories</Link>
              <Link to="/podcasts" className="footer-nav-link">Guests</Link>
            </nav>
          </div>

          {/* Studio */}
          <div className="footer-col">
            <h4 className="footer-col-heading">Studio</h4>
            <nav className="footer-nav-list">
              <Link to="/book"    className="footer-nav-link">Book a Session</Link>
              <Link to="/about"   className="footer-nav-link">About Us</Link>
              <Link to="/contact" className="footer-nav-link">Contact</Link>
              <Link to="/privacy" className="footer-nav-link">Privacy Policy</Link>
              <Link to="/terms"   className="footer-nav-link">Terms of Use</Link>
            </nav>
          </div>

          {/* Newsletter */}
          <div className="footer-newsletter-col">
            <h4 className="footer-col-heading">Stay In The Loop</h4>
            <p className="footer-newsletter-desc">Fresh episode drops, behind-the-scenes content, and exclusive creator updates.</p>
            <form className="footer-newsletter-form" onSubmit={(e) => { e.preventDefault(); setEmail(''); alert("You're subscribed!"); }}>
              <input type="email" placeholder="Your email address" className="footer-newsletter-input" value={email} onChange={e => setEmail(e.target.value)} required />
              <button type="submit" className="footer-newsletter-btn" aria-label="Subscribe"><ArrowRight size={16} /></button>
            </form>
            <div className="footer-contact-info">
              <div className="footer-contact-row"><Mail size={13} className="footer-contact-icon" /><span>hello@vividhtalks.in</span></div>
              <div className="footer-contact-row"><MapPin size={13} className="footer-contact-icon" /><span>Pune, Maharashtra, India</span></div>
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
          <Link to="/about"   className="mob-footer-link">About Us</Link>
          <Link to="/contact" className="mob-footer-link">Contact Us</Link>
          <Link to="/privacy" className="mob-footer-link">Privacy Policy</Link>
          <Link to="/terms"   className="mob-footer-link">Terms of Use</Link>
        </AccordionSection>

        {/* Accordion: Explore */}
        <AccordionSection title="EXPLORE">
          <Link to="/podcasts" className="mob-footer-link">All Episodes</Link>
          <Link to="/podcasts" className="mob-footer-link">Trending Now</Link>
          <Link to="/podcasts" className="mob-footer-link">Shorts &amp; Clips</Link>
          <Link to="/podcasts" className="mob-footer-link">Categories</Link>
          <Link to="/podcasts" className="mob-footer-link">Guests</Link>
        </AccordionSection>

        {/* Accordion: Studio */}
        <AccordionSection title="STUDIO">
          <Link to="/book"    className="mob-footer-link">Book a Session</Link>
          <Link to="/contact" className="mob-footer-link">Get In Touch</Link>
          <Link to="/book"    className="mob-footer-link">Be a Guest</Link>
        </AccordionSection>

        {/* Address + Socials + Platforms */}
        <div className="mob-footer-bottom-block">
          {/* Address */}
          <div className="mob-footer-address">
            <span>hello@vividhtalks.in</span>
            <span>Pune, Maharashtra, India</span>
          </div>

          {/* Social Icons */}
          <div className="mob-footer-socials">
            <a href="https://facebook.com"  target="_blank" rel="noreferrer" className="mob-social-btn" aria-label="Facebook">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
            <a href="https://twitter.com"   target="_blank" rel="noreferrer" className="mob-social-btn" aria-label="X / Twitter">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.045 4.126H5.078z"/></svg>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="mob-social-btn" aria-label="Instagram">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            </a>
            <a href="https://youtube.com"   target="_blank" rel="noreferrer" className="mob-social-btn" aria-label="YouTube">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>
            </a>
          </div>

          {/* Streaming Platform Round Icons */}
          <div className="mob-footer-platforms">
            <a href="#" className="mob-platform-icon spotify" aria-label="Spotify">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0zm5.5 17.3c-.2.4-.7.5-1.1.3-2.9-1.8-6.6-2.2-10.9-1.2-.4.1-.8-.2-.9-.6-.1-.4.2-.8.6-.9 4.7-1.1 8.8-.6 12 1.4.4.2.5.7.3 1zm1.5-3.3c-.3.5-.9.6-1.3.3-3.3-2-8.4-2.6-12.3-1.4-.5.2-1.1-.1-1.2-.6-.2-.5.1-1.1.6-1.2 4.5-1.4 10.1-.7 13.9 1.7.4.2.6.9.3 1.2zm.1-3.4C15.2 8.2 8.5 8 4.7 9.2c-.6.2-1.3-.2-1.4-.8-.2-.6.2-1.3.8-1.4 4.4-1.3 11.8-1.1 16.4 1.8.5.3.7 1 .4 1.5-.3.6-1 .7-1.6.3z"/></svg>
            </a>
            <a href="#" className="mob-platform-icon apple" aria-label="Apple Podcasts">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0zm0 4.9c3.9 0 7.1 3.2 7.1 7.1 0 3.9-3.2 7.1-7.1 7.1S4.9 15.9 4.9 12 8.1 4.9 12 4.9zm0 2.8c-2.4 0-4.3 1.9-4.3 4.3s1.9 4.3 4.3 4.3 4.3-1.9 4.3-4.3-1.9-4.3-4.3-4.3z"/></svg>
            </a>
            <a href="#" className="mob-platform-icon amazon" aria-label="Amazon Music">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M.045 18.02c.072-.116.187-.124.348-.022 3.636 2.11 7.594 3.166 11.87 3.166 2.852 0 5.668-.533 8.447-1.595l.315-.14c.138-.06.234-.1.293-.13.226-.088.39-.046.525.13.12.174.09.336-.09.48-.256.19-.6.41-1.002.66-1.486.917-3.167 1.63-5.035 2.137-1.875.51-3.76.763-5.656.763-2.645 0-5.15-.534-7.51-1.597-1.27-.56-2.436-1.278-3.496-2.155-.18-.143-.196-.295-.01-.463zm21.704-2.09c-.182-.218-.483-.223-.898-.008-1.697.89-3.39 1.448-5.077 1.673a17.48 17.48 0 0 1-2.32.163c-2.456 0-4.776-.625-6.965-1.874-1.002-.58-1.915-1.256-2.73-2.034-.122-.12-.249-.13-.38-.044-.13.086-.172.218-.122.396.062.2.163.39.3.57.44.564.98 1.087 1.617 1.573 1.52 1.154 3.252 1.98 5.19 2.476 1.204.314 2.44.47 3.707.47 2.145 0 4.13-.448 5.952-1.343.736-.36 1.39-.77 1.965-1.226.27-.217.434-.43.49-.643.07-.243-.03-.408-.23-.5-.028-.01-.06-.022-.093-.034l-.405-.135z"/></svg>
            </a>
            <a href="#" className="mob-platform-icon youtube" aria-label="YouTube">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
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

      {/* Scroll to top */}
      <button className="footer-scroll-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Back to top">↑</button>
    </footer>
  );
};

export default Footer;
