import React, { useEffect } from 'react';
import { MessageCircle, Mail, MapPin, ArrowRight, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Contact.css';

const Contact = () => {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('is-visible');
      });
    }, { threshold: 0.08 });
    const els = document.querySelectorAll('.animate-on-scroll');
    els.forEach((el) => observer.observe(el));
    return () => els.forEach((el) => observer.unobserve(el));
  }, []);

  return (
    <div className="contact-page">

      {/* ── Hero ── */}
      <section className="contact-hero section-padding container">
        <div className="section-tag animate-on-scroll"><span className="section-tag-dot"></span> GET IN TOUCH</div>
        <h1 className="h1 animate-on-scroll" style={{ marginTop: '16px', transitionDelay: '0.1s' }}>
          Let's <span className="text-accent">Talk.</span>
        </h1>
        <p className="subheading animate-on-scroll" style={{ maxWidth: '560px', marginTop: '16px', transitionDelay: '0.15s' }}>
          Whether you're a creator, brand, student, or just curious — we'd love to hear from you.
        </p>
      </section>

      {/* ── Contact Options ── */}
      <section className="container" style={{ paddingBottom: '0' }}>
        <div className="contact-options-grid animate-on-scroll">
          <a href="https://wa.me/91XXXXXXXXXX" target="_blank" rel="noreferrer" className="contact-option-card whatsapp-card">
            <div className="contact-option-icon" style={{ background: 'rgba(37,211,102,0.12)', borderColor: 'rgba(37,211,102,0.3)', color: '#25D366' }}>
              <MessageCircle size={28} />
            </div>
            <div className="contact-option-body">
              <h3>Chat on WhatsApp</h3>
              <p>Fastest response. Usually within 30 minutes.</p>
            </div>
            <div className="contact-option-arrow" style={{ color: '#25D366' }}>→</div>
          </a>

          <a href="mailto:hello@vividhtalks.in" className="contact-option-card">
            <div className="contact-option-icon">
              <Mail size={28} />
            </div>
            <div className="contact-option-body">
              <h3>Send an Email</h3>
              <p>hello@vividhtalks.in</p>
            </div>
            <div className="contact-option-arrow">→</div>
          </a>

          <a href="https://maps.google.com" target="_blank" rel="noreferrer" className="contact-option-card">
            <div className="contact-option-icon">
              <MapPin size={28} />
            </div>
            <div className="contact-option-body">
              <h3>Visit the Studio</h3>
              <p>Pune, Maharashtra — By appointment only</p>
            </div>
            <div className="contact-option-arrow">→</div>
          </a>
        </div>
      </section>

      {/* ── Contact Form ── */}
      <section className="container section-padding">
        <div className="contact-form-layout animate-on-scroll">
          {/* Left: Info */}
          <div className="contact-info-col">
            <div className="section-tag"><span className="section-tag-dot"></span> WRITE TO US</div>
            <h2 className="h2" style={{ marginTop: '16px' }}>Drop Us <span className="text-accent">a Message</span></h2>
            <p className="contact-info-text">
              We respond to all messages within 24 hours. Whether it's a booking inquiry, brand partnership, or just a hello — we're here.
            </p>
            <div className="contact-info-items">
              <div className="contact-info-item">
                <div className="contact-info-item-icon"><Mail size={18} /></div>
                <div>
                  <div className="contact-info-item-label">Email</div>
                  <div>hello@vividhtalks.in</div>
                </div>
              </div>
              <div className="contact-info-item">
                <div className="contact-info-item-icon"><Phone size={18} /></div>
                <div>
                  <div className="contact-info-item-label">WhatsApp</div>
                  <div>+91 XXXXX XXXXX</div>
                </div>
              </div>
              <div className="contact-info-item">
                <div className="contact-info-item-icon"><MapPin size={18} /></div>
                <div>
                  <div className="contact-info-item-label">Studio</div>
                  <div>Pune, Maharashtra, India</div>
                </div>
              </div>
            </div>
            {/* Social links */}
            <div className="contact-socials">
              <a href="#" className="contact-social">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              <a href="#" className="contact-social">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>
              </a>
              <a href="#" className="contact-social">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.045 4.126H5.078z"/></svg>
              </a>
            </div>
          </div>

          {/* Right: Form */}
          <div className="contact-form-col">
            <form className="contact-form" onSubmit={(e) => { e.preventDefault(); e.target.reset(); alert('Message sent! We\'ll be in touch soon.'); }}>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Full Name *</label>
                  <input type="text" placeholder="Your full name" required className="form-input" />
                </div>
                <div className="form-group">
                  <label className="form-label">Email Address *</label>
                  <input type="email" placeholder="hello@example.com" required className="form-input" />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Phone / WhatsApp</label>
                  <input type="tel" placeholder="+91 XXXXX XXXXX" className="form-input" />
                </div>
                <div className="form-group">
                  <label className="form-label">I want to...</label>
                  <select className="form-input form-select" required>
                    <option value="" disabled>Select an option</option>
                    <option value="book">Book a Session</option>
                    <option value="guest">Be a Guest</option>
                    <option value="brand">Brand Partnership</option>
                    <option value="general">General Inquiry</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Your Message *</label>
                <textarea placeholder="Tell us about your project, idea, or question..." rows="5" required className="form-input"></textarea>
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '8px' }}>
                Send Message <ArrowRight size={18} />
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ── Social Cards ── */}
      <section className="section-padding" style={{ background: 'rgba(0,0,0,0.25)' }}>
        <div className="container">
          <div className="text-center animate-on-scroll" style={{ marginBottom: '48px' }}>
            <div className="section-tag" style={{ justifyContent: 'center' }}><span className="section-tag-dot"></span> FOLLOW THE JOURNEY</div>
            <h2 className="h2" style={{ marginTop: '12px' }}>Find Us <span className="text-accent">Online</span></h2>
          </div>
          <div className="social-cards-grid animate-on-scroll">
            {[
              { svg: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>, name: '@vividhtalks', stat: '50K+ Followers', color: '#E1306C', label: 'Instagram' },
              { svg: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>, name: 'Vividh Talks', stat: '100K+ Subscribers', color: '#FF0000', label: 'YouTube' },
              { svg: <MessageCircle size={28} />, name: 'Creator Community', stat: 'Join Group', color: '#25D366', label: 'WhatsApp' },
            ].map((s, i) => (
              <div className="social-card animate-on-scroll" key={i} style={{ transitionDelay: `${i * 0.1}s` }}>
                <div className="social-card-icon" style={{ color: s.color, borderColor: `${s.color}33`, background: `${s.color}12` }}>
                  {s.svg}
                </div>
                <h3 className="social-card-name">{s.name}</h3>
                <p className="social-card-stat">{s.stat}</p>
                <button className="btn btn-secondary" style={{ width: '100%', justifyContent: 'center', marginTop: '20px', fontSize: '14px' }}>
                  Follow on {s.label} →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ Teaser ── */}
      <section className="section-padding container text-center animate-on-scroll">
        <h2 className="h2" style={{ marginBottom: '16px' }}>Still Have <span className="text-accent">Questions?</span></h2>
        <p className="subheading" style={{ marginBottom: '32px' }}>Check our FAQ section for quick answers to common queries.</p>
        <Link to="/book#faq" className="btn btn-secondary">
          See All FAQs <ArrowRight size={18} />
        </Link>
      </section>

    </div>
  );
};

export default Contact;
