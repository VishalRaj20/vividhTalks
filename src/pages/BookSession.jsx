import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Mic2, Video, Scissors, Paintbrush, Radio, TrendingUp, ChevronDown } from 'lucide-react';
import FeatureCard from '../components/ui/FeatureCard';
import TestimonialCard from '../components/ui/TestimonialCard';
import TestimonialSlider from '../components/ui/TestimonialSlider';
import { testimonials } from '../data/testimonials';
import './BookSession.css';

const BookSession = () => {
  const [activeFaq, setActiveFaq] = useState(0);
  const [formStatus, setFormStatus] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, { threshold: 0.1 });

    const hiddenElements = document.querySelectorAll('.animate-on-scroll');
    hiddenElements.forEach((el) => observer.observe(el));

    return () => hiddenElements.forEach((el) => observer.unobserve(el));
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || "918252754340";
    const formspreeId = import.meta.env.VITE_FORMSPREE_ID;

    // 1. Prepare WhatsApp Message
    const message = `*New Podcast Booking Request*%0A%0A` +
      `*Name:* ${data.name}%0A` +
      `*Email:* ${data.email}%0A` +
      `*Phone:* ${data.phone}%0A` +
      `*Type:* ${data.userType}%0A` +
      `*Date:* ${data.date}%0A` +
      `*Topic:* ${data.topic}%0A%0A` +
      `_Sent from Vividh Talks Website_`;

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

    // 2. Optional: Send to Formspree (Email)
    if (formspreeId) {
      try {
        const response = await fetch(`https://formspree.io/f/${formspreeId}`, {
          method: 'POST',
          body: formData,
          headers: { 'Accept': 'application/json' }
        });
        if (response.ok) {
          console.log("Email sent successfully to Formspree");
        }
      } catch (err) {
        console.error("Email sending failed", err);
      }
    }

    // 3. Success Feedback & Open WhatsApp
    setFormStatus('success');
    window.open(whatsappUrl, '_blank');
    e.target.reset();
    setTimeout(() => setFormStatus(''), 8000);
  };

  const faqs = [
    { q: "Do I need any prior podcasting experience?", a: "Not at all! Our team guides you through the entire process, from scripting to mic technique. You just bring your story." },
    { q: "Can I record remotely (online)?", a: "Yes, we offer professional remote recording setups with studio-grade software to ensure high-quality audio and video even from your home." },
    { q: "What languages can I record in?", a: "We support recording and editing in English, Hindi, and several regional Indian languages. Just let us know your preference!" },
    { q: "How long does the editing process take?", a: "Typically, a fully edited video and audio episode is delivered within 5–7 business days after recording." },
    { q: "Can I bring a guest or co-host?", a: "Absolutely. Our studio accommodates up to 4 people comfortably with multi-cam setups." },
    { q: "Do I own the rights to my episode?", a: "100%. You own all the rights to your content. We are simply your production and distribution partner." }
  ];

  const features = [
    { icon: <Mic2 size={24} />, title: "Professional Recording", desc: "Studio-grade microphones, acoustics, and monitoring." },
    { icon: <Video size={24} />, title: "Full Video Production", desc: "Multi-camera setup, lighting, and live direction." },
    { icon: <Scissors size={24} />, title: "Editing & Post", desc: "Cut, color-graded, branded episodes ready to publish." },
    { icon: <Paintbrush size={24} />, title: "Custom Artwork", desc: "Branded thumbnail and cover art designed for you." },
    { icon: <Radio size={24} />, title: "Multi-Platform", desc: "Uploaded to Spotify, Apple, YouTube, and more." },
    { icon: <TrendingUp size={24} />, title: "Growth Pack", desc: "Short clips, audiograms, and social snippets included." }
  ];

  return (
    <div className="book-page">
      {/* Hero */}
      <section className="book-hero section-padding animate-on-scroll">
        <div className="book-hero-bg" style={{ backgroundImage: 'url(/podcast_studio_premium.png)' }}></div>
        <div className="book-hero-overlay"></div>
        <div className="container relative text-center">
          <h1 className="h1 animate-on-scroll">
            Your Podcast.<br />Your Rules.<br /><span className="text-accent">Our Studio.</span>
          </h1>
          <p className="subheading mx-auto mt-4 animate-on-scroll" style={{ maxWidth: '600px', color: 'rgba(255,255,255,0.9)' }}>
            From idea to published episode — we handle everything. All you need to bring is your story.
          </p>
          <div className="scroll-indicator animate-on-scroll mt-12">
            <ChevronDown size={32} className="text-accent bounce" />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container section-padding">
        <h2 className="h2 text-center mb-12 animate-on-scroll">Everything You Get With Every Session</h2>
        <div className="features-grid animate-on-scroll">
          {features.map((f, idx) => (
            <FeatureCard key={idx} icon={f.icon} title={f.title} description={f.desc} />
          ))}
        </div>
      </section>

      {/* Studio Showcase Gallery */}
      <section className="section-padding container">
        <div className="text-center mb-12 animate-on-scroll">
          <div className="section-tag" style={{ justifyContent: 'center' }}><span className="section-tag-dot"></span> OUR ENVIRONMENT</div>
          <h2 className="h2" style={{ marginTop: '12px' }}>A Space Designed for <span className="text-accent">Creators.</span></h2>
          <p className="subheading mx-auto mt-4" style={{ maxWidth: '600px' }}>
            Walk into a studio that inspires brilliance. High-end gear, perfect acoustics, and a vibe that brings out your best.
          </p>
        </div>

        <div className="studio-gallery-grid animate-on-scroll">
          <div className="gallery-item h-large">
            <img src="https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Studio Setup 1" />
          </div>
          <div className="gallery-item">
            <img src="https://images.unsplash.com/photo-1668536618600-754ef972b9b3?q=80&w=1331&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Studio Setup 2" />
          </div>
          <div className="gallery-item">
            <img src="https://images.unsplash.com/photo-1593697909777-138e8c90ac91?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Studio Setup 3" />
          </div>
          <div className="gallery-item">
            <img src="https://plus.unsplash.com/premium_photo-1679079455767-1bbb40492d6a?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Studio Setup 4" />
          </div>
          <div className="gallery-item h-large">
            <img src="https://plus.unsplash.com/premium_photo-1683140721527-262985d7c8ef?q=80&w=677&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Studio Setup 5" />
          </div>
          <div className="gallery-item">
            <img src="https://images.unsplash.com/photo-1559523161-0fc0d8b38a7a?auto=format&fit=crop&q=80&w=800" alt="Studio Setup 5" />
          </div>
          <div className="gallery-item">
            <img src="https://images.unsplash.com/photo-1615458317538-72c46d9359d8?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Studio Setup 6" />
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="pricing-section section-padding" id="pricing">
        <div className="container">
          <div className="text-center mb-30 animate-on-scroll">
            <h2 className="h2" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800 }}>Simple, Transparent Pricing.</h2>
          </div>

          <div className="pricing-grid animate-on-scroll">
            {/* Starter Plan */}
            <div className="pricing-card">
              <h3 className="pricing-plan-title">Starter</h3>
              <p className="pricing-ideal-for">Ideal for: First-time creators, students</p>
              <div className="price-wrap">
                <span className="currency">₹</span>
                <span className="price">4,999</span>
                <span className="period">/session</span>
              </div>
              <ul className="pricing-features-list">
                <li>1 recording session (60 min)</li>
                <li>Audio only</li>
                <li>1 platform distribution</li>
                <li>Basic editing</li>
              </ul>
              <button className="pricing-btn secondary">Get Started</button>
            </div>

            {/* Creator Plan */}
            <div className="pricing-card highlight">
              <div className="recommended-badge">RECOMMENDED</div>
              <h3 className="pricing-plan-title text-accent">Creator</h3>
              <p className="pricing-ideal-for">Ideal for: Entrepreneurs, influencers</p>
              <div className="price-wrap">
                <span className="currency">₹</span>
                <span className="price">9,999</span>
                <span className="period">/session</span>
              </div>
              <ul className="pricing-features-list">
                <li>1 recording session (90 min)</li>
                <li>Video + Audio</li>
                <li>All platforms distribution</li>
                <li>Full editing + thumbnail</li>
                <li>3 short clips</li>
              </ul>
              <button className="pricing-btn primary">Book This Plan</button>
            </div>

            {/* Brand Plan */}
            <div className="pricing-card">
              <h3 className="pricing-plan-title">Brand</h3>
              <p className="pricing-ideal-for">Ideal for: Companies, agencies</p>
              <div className="price-wrap">
                <span className="price">Custom</span>
              </div>
              <ul className="pricing-features-list">
                <li>Monthly series (4 episodes)</li>
                <li>Full video production</li>
                <li>Brand integration</li>
                <li>Priority support + strategy call</li>
              </ul>
              <Link to="/contact" className="pricing-btn secondary" style={{ textDecoration: 'none', textAlign: 'center' }}>Contact for Pricing</Link>
            </div>
          </div>

          <div className="flex justify-center items-center text-center mt-29 animate-on-scroll">
            <p className="pricing-footer-text">
              💬 Not sure which plan fits? <a href={`https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER || '918252754340'}`} target="_blank" rel="noreferrer" className="text-accent">WhatsApp us →</a>
            </p>
          </div>
        </div>
      </section>

      {/* Booking Form & Timeline */}
      <section className="container section-padding">
        <div className="booking-layout">
          <div className="form-col animate-on-scroll">
            <h2 className="h2 mb-2">Book Your Session</h2>
            <p className="text-secondary mb-6">Fill this out and we'll get back to you within 24 hours.</p>

            <form className="booking-form" onSubmit={handleFormSubmit}>
              <div className="form-group">
                <input type="text" name="name" placeholder="Full Name *" required className="form-input" />
              </div>
              <div className="form-grid">
                <div className="form-group">
                  <input type="email" name="email" placeholder="Email Address *" required className="form-input" />
                </div>
                <div className="form-group">
                  <input type="tel" name="phone" placeholder="Phone (WhatsApp) *" required className="form-input" />
                </div>
              </div>
              <div className="form-group">
                <select className="form-select" name="userType" required defaultValue="">
                  <option value="" disabled>I am a...</option>
                  <option value="student">Student</option>
                  <option value="entrepreneur">Entrepreneur</option>
                  <option value="influencer">Influencer</option>
                  <option value="brand">Brand</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="form-group">
                <textarea name="topic" placeholder="Episode Idea / Topic..." rows="4" required className="form-input"></textarea>
              </div>
              <div className="form-group">
                <input type="date" name="date" className="form-input text-secondary" required />
              </div>

              <button type="submit" className="btn btn-primary w-full mt-2">Book My Session →</button>

              {formStatus === 'success' && (
                <div className="success-message mt-4">
                  ✅ Success! We have received your request and will contact you shortly.
                </div>
              )}
            </form>
            <p className="mt-4 text-center text-secondary text-sm">🔒 Your details are safe with us.</p>
          </div>

          <div className="timeline-col animate-on-scroll">
            <h3 className="h3 mb-6">What Happens Next</h3>
            <div className="timeline">
              <div className="timeline-item">
                <div className="dot"></div>
                <div className="content">
                  <h4>Booking Confirmed</h4>
                  <p className="text-secondary">You receive a confirmation email within 2 hours.</p>
                </div>
              </div>
              <div className="timeline-item">
                <div className="dot"></div>
                <div className="content">
                  <h4>Discovery Call</h4>
                  <p className="text-secondary">We hop on a quick 15-min call to understand your vision.</p>
                </div>
              </div>
              <div className="timeline-item">
                <div className="dot"></div>
                <div className="content">
                  <h4>Pre-Production</h4>
                  <p className="text-secondary">We send you a prep guide, questions, and schedule.</p>
                </div>
              </div>
              <div className="timeline-item">
                <div className="dot"></div>
                <div className="content">
                  <h4>Recording Day</h4>
                  <p className="text-secondary">Come to the studio or join remotely. We take care of the rest.</p>
                </div>
              </div>
              <div className="timeline-item last">
                <div className="dot"></div>
                <div className="content">
                  <h4>Episode Goes Live</h4>
                  <p className="text-secondary">Edited, branded, and published within 5–7 business days.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq-section section-padding container" id="faq">
        <h2 className="h2 text-center mb-12 animate-on-scroll">Got Questions? We've Got Answers.</h2>
        <div className="faq-container animate-on-scroll">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className={`faq-item ${activeFaq === idx ? 'active' : ''}`}
              onClick={() => setActiveFaq(activeFaq === idx ? -1 : idx)}
            >
              <div className="faq-q">
                <h4 className="font-subheading font-bold">{faq.q}</h4>
                <ChevronDown className="faq-icon" size={20} />
              </div>
              <div className="faq-a">
                <p>{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding container" style={{ paddingTop: '100px' }}>
        <div className="text-center animate-on-scroll" style={{ marginBottom: '48px' }}>
          <div className="section-tag" style={{ justifyContent: 'center' }}><span className="section-tag-dot"></span> WHAT GUESTS SAY</div>
          <h2 className="h2" style={{ marginTop: '12px' }}>Real Stories. <span className="text-accent">Real Impact.</span></h2>
        </div>
        <div className="animate-on-scroll">
          <TestimonialSlider testimonials={testimonials} />
        </div>
      </section>
    </div>
  );
};

export default BookSession;
