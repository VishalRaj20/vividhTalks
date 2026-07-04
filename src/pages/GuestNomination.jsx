import React, { useEffect } from 'react';
import { ArrowRight, UserPlus } from 'lucide-react';
import SEO from '../components/SEO';
import './EnhancedStyles.css';

const GuestNomination = () => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const nominatorName = formData.get('nominatorName');
    const guestName = formData.get('guestName');
    const guestLink = formData.get('guestLink');
    const reason = formData.get('reason');

    const waNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '9031806915';
    const text = `*New Guest Nomination* 🎙️\n\n*Nominator:* ${nominatorName}\n*Guest Name:* ${guestName}\n*Guest Link:* ${guestLink || 'N/A'}\n*Why feature them?*\n${reason}`;
    const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(text)}`;
    
    window.open(waUrl, '_blank');
    e.target.reset();
  };

  return (
    <div className="contact-page">
      <SEO 
        title="Suggest A Guest"
        description="Know someone with an inspiring story? Suggest guests for upcoming Vividh Talks conversations."
      />
      <section className="contact-hero section-padding" style={{ paddingBottom: '0', paddingTop: '160px', position: 'relative', overflow: 'hidden' }}>
        <div className="contact-hero-bg" style={{ backgroundImage: 'url(/generated/podcast_partner_clean_1783164552184.png)', filter: 'brightness(0.5)' }}></div>
        <div className="contact-hero-overlay"></div>
        <div className="container relative text-center">
          <div className="section-tag animate-on-scroll" style={{ justifyContent: 'center' }}><span className="section-tag-dot"></span> GUEST NOMINATION</div>
          <h1 className="h1 animate-on-scroll" style={{ marginTop: '24px', transitionDelay: '0.1s' }}>
            Suggest A <span className="text-accent">Guest</span>
          </h1>
          <p className="subheading animate-on-scroll" style={{ maxWidth: '600px', margin: '24px auto 0', transitionDelay: '0.15s', color: 'rgba(255,255,255,0.9)' }}>
            Know someone with an inspiring story, powerful experience, or unique perspective?<br/>
            Suggest guests for upcoming Vividh Talks conversations.
          </p>
        </div>
      </section>

      <section className="container section-padding">
        <div className="contact-form-layout animate-on-scroll glassmorphism-form" style={{ maxWidth: '800px', margin: '0 auto', display: 'block' }}>
          <div className="contact-form-col" style={{ width: '100%' }}>
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group floating-label-group">
                  <input type="text" name="nominatorName" placeholder="Your name" required className="form-input interactive-input" />
                  <label className="form-label">Your Name</label>
                </div>
                <div className="form-group floating-label-group">
                  <input type="email" name="nominatorEmail" placeholder="hello@example.com" required className="form-input interactive-input" />
                  <label className="form-label">Your Email</label>
                </div>
              </div>
              <div className="form-group floating-label-group">
                <input type="text" name="guestName" placeholder="Name of the person you are suggesting" required className="form-input interactive-input" />
                <label className="form-label">Guest's Name *</label>
              </div>
              <div className="form-group floating-label-group">
                <input type="url" name="guestLink" placeholder="https://" className="form-input interactive-input" />
                <label className="form-label">Guest's Social Media / LinkedIn / Website</label>
              </div>
              <div className="form-group floating-label-group">
                <textarea name="reason" placeholder="Briefly describe their inspiring story or unique perspective..." rows="5" required className="form-input interactive-input"></textarea>
                <label className="form-label">Why should we feature them? *</label>
              </div>
              <button type="submit" className="btn btn-primary interactive-btn" style={{ width: '100%', justifyContent: 'center', marginTop: '8px' }}>
                <UserPlus size={18} /> Submit Nomination
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GuestNomination;
