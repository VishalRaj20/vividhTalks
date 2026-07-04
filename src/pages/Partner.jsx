import React, { useEffect, useRef } from 'react';
import { ArrowRight, CheckCircle2, TrendingUp, Handshake } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import './EnhancedStyles.css'; // New CSS file for the extra features

const Partner = () => {
  const heroRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('is-visible');
      });
    }, { threshold: 0.08 });
    const els = document.querySelectorAll('.animate-on-scroll');
    els.forEach((el) => observer.observe(el));

    // Parallax effect
    const handleScroll = () => {
      if (heroRef.current) {
        const scrolled = window.scrollY;
        heroRef.current.style.transform = `translateY(${scrolled * 0.4}px)`;
      }
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      els.forEach((el) => observer.unobserve(el));
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="contact-page">
      <SEO
        title="Partner With Us"
        description="Grow your brand with Vividh Talks. Partner with a growing Indian podcast platform."
      />
      <section className="contact-hero section-padding" style={{ position: 'relative', overflow: 'hidden', paddingTop: '160px', paddingBottom: '100px' }}>
        {/* Hero Background */}
        <div className="contact-hero-bg" ref={heroRef} style={{ backgroundImage: 'url(/generated/podcast_partner_clean_1783164552184.png)', filter: 'brightness(0.5)' }}></div>
        <div className="contact-hero-overlay"></div>
        
        <div className="container relative text-center">
          <div className="section-tag animate-on-scroll" style={{ justifyContent: 'center' }}><span className="section-tag-dot"></span> PARTNER WITH US</div>
          <h1 className="h1 animate-on-scroll" style={{ marginTop: '24px', transitionDelay: '0.1s' }}>
            Grow Your Brand<br />With <span className="text-accent">Vividh Talks</span>
          </h1>
          <p className="subheading animate-on-scroll" style={{ maxWidth: '600px', margin: '24px auto 0', transitionDelay: '0.15s', color: 'rgba(255,255,255,0.9)' }}>
            Partner with a growing Indian podcast platform to reach an engaged, diverse, and fast-growing audience.
          </p>
          <div className="animate-on-scroll" style={{ marginTop: '36px', transitionDelay: '0.2s' }}>
            <Link to="/contact" className="btn btn-primary interactive-btn"><Handshake size={18} /> Let's Collaborate</Link>
          </div>
        </div>
      </section>

      {/* Infinite Marquee Section */}
      <section className="marquee-banner-section">
        <div className="marquee-banner-container">
          <div className="marquee-banner-content">
            ✦ 100M+ Monthly Impressions ✦ 500K+ Active Community ✦ Pan-India Reach ✦ High-Value Audiences ✦ Premium Production ✦
            ✦ 100M+ Monthly Impressions ✦ 500K+ Active Community ✦ Pan-India Reach ✦ High-Value Audiences ✦ Premium Production ✦
          </div>
        </div>
      </section>

      <section className="container section-padding">
        <div className="grid grid-2">
          <div className="animate-on-scroll">
            <h2 className="h2 mb-8">Partnership <span className="text-accent">Opportunities</span></h2>
            <div className="about-why-grid">
              {[
                { title: 'Podcast Sponsorships', desc: 'Sponsor our episodes for high visibility.' },
                { title: 'Branded Content', desc: 'Custom content integrated seamlessly with our narrative.' },
                { title: 'Social Media Collaborations', desc: 'Engage our audience across Instagram, YouTube and more.' },
                { title: 'Founder Storytelling', desc: 'Highlight your founder’s journey on our platform.' },
              ].map((w, i) => (
                <div className="why-item tilt-hover-card" key={i}>
                  <TrendingUp size={24} className="text-accent" />
                  <div>
                    <h4 className="font-bold" style={{ fontSize: '18px' }}>{w.title}</h4>
                    <p className="text-secondary text-sm" style={{ marginTop: '6px' }}>{w.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="animate-on-scroll" style={{ transitionDelay: '0.2s' }}>
            <h2 className="h2 mb-8">Why <span className="text-accent">Partner With Us?</span></h2>
            <div className="value-audience-box glass-card p-8">
              {[
                'Youth-focused audience',
                'High-engagement video content',
                'Regional + national reach',
                'Authentic storytelling',
                'Strong social media visibility',
                'Multi-platform reach'
              ].map((item, idx) => (
                <div className="va-item mb-4 feature-list-item" key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <CheckCircle2 className="text-accent flex-shrink-0" size={24} />
                  <h4 style={{ margin: 0, fontSize: '18px', fontWeight: '600' }}>{item}</h4>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Partner;
