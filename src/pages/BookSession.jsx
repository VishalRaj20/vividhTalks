import { useState, useEffect, useRef } from 'react';
import { Mic2, Video, Scissors, Paintbrush, Radio, TrendingUp, ChevronDown, Camera, Lightbulb, Coffee, ListChecks, Clapperboard, Users, User, ArrowRight, CheckCircle2 } from 'lucide-react';
import FeatureCard from '../components/ui/FeatureCard';
import SEO from '../components/SEO';
import { testimonials } from '../data/testimonials';
import './BookSession.css';

const BookSession = () => {
  const [activeFaq, setActiveFaq] = useState(0);
  const [formStatus, setFormStatus] = useState('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');

  const pricingGridRef = useRef(null);
  const [activePricingIdx, setActivePricingIdx] = useState(1);

  const handlePricingScroll = () => {
    const grid = pricingGridRef.current;
    if (!grid) return;
    const cards = grid.querySelectorAll('.pricing-card');
    const gridCenter = grid.getBoundingClientRect().left + grid.offsetWidth / 2;

    let closestIndex = 1;
    let minDistance = Infinity;

    cards.forEach((card, idx) => {
      const cardRect = card.getBoundingClientRect();
      const cardCenter = cardRect.left + cardRect.width / 2;
      const distance = Math.abs(cardCenter - gridCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = idx;
      }
    });

    setActivePricingIdx(closestIndex);
  };

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

    if (!selectedTimeSlot) {
      alert('Please select a time slot for your studio session.');
      return;
    }

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    const whatsappNumber = "9031806915";
    const formspreeId = import.meta.env.VITE_FORMSPREE_ID;

    // 1. Prepare WhatsApp Message
    const message = `*New Studio Session Booking Request*%0A%0A` +
      `*Name:* ${data.name}%0A` +
      `*Email:* ${data.email}%0A` +
      `*Phone:* ${data.phone}%0A` +
      `*Type:* ${data.userType}%0A%0A` +
      `*Podcast Setup:* ${data.setupType}%0A` +
      `*Format:* ${data.format}%0A` +
      `*Editing:* ${data.editing}%0A` +
      `*Duration:* ${data.duration}%0A%0A` +
      `*Topic:* ${data.topic}%0A` +
      `*Preferred Date:* ${data.date}%0A` +
      `*Preferred Time:* ${selectedTimeSlot || 'Not Selected'}%0A%0A` +
      `_Sent from Vividh Talks Website_`;

    const whatsappUrl = `https://wa.me/91${whatsappNumber}?text=${message}`;

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
    setSelectedTimeSlot('');
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
    {
      icon: <Mic2 size={24} />,
      title: "Professional Recording",
      desc: "Studio-grade microphones, acoustics, and monitoring.",
      image: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?q=80&w=600&auto=format&fit=crop"
    },
    {
      icon: <Video size={24} />,
      title: "Full Video Production",
      desc: "Multi-camera setup, lighting, and live direction.",
      image: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=600&auto=format&fit=crop"
    },
    {
      icon: <Scissors size={24} />,
      title: "Editing & Post",
      desc: "Cut, color-graded, branded episodes ready to publish.",
      image: "https://images.unsplash.com/photo-1622737133809-d95047b9e673?q=80&w=600&auto=format&fit=crop"
    },
    {
      icon: <Paintbrush size={24} />,
      title: "Custom Artwork",
      desc: "Branded thumbnail and cover art designed for you.",
      image: "https://images.unsplash.com/photo-1541462608143-67571c6738dd?q=80&w=600&auto=format&fit=crop"
    },
    {
      icon: <Radio size={24} />,
      title: "Multi-Platform",
      desc: "Uploaded to Spotify, Apple, YouTube, and more.",
      image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?q=80&w=600&auto=format&fit=crop"
    },
    {
      icon: <TrendingUp size={24} />,
      title: "Growth Pack",
      desc: "Short clips, audiograms, and social snippets included.",
      image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=600&auto=format&fit=crop"
    }
  ];

  return (
    <div className="book-page">
      <SEO
        title="Book A Session"
        description="Book your podcast session with Vividh Talks. Premium studio, expert production, and hassle-free recording."
      />
      {/* Hero */}
      <section className="book-hero section-padding animate-on-scroll">
        <div className="book-hero-bg" style={{ backgroundImage: 'url(/podcast_studio_premium.webp)' }}></div>
        <div className="book-hero-overlay"></div>
        <div className="container relative text-center">
          <h1 className="h1 animate-on-scroll">
            Your Podcast.<br /><span className="text-accent">Our Studio.</span>
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
        <h2 className="h2 text-center mb-12 animate-on-scroll" style={{ marginBottom: '1.5rem' }}>Everything You Get With Every Session</h2>
        <div className="features-grid animate-on-scroll">
          {features.map((f, idx) => (
            <FeatureCard key={idx} icon={f.icon} title={f.title} description={f.desc} image={f.image} />
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

        <div className="studio-gallery-grid animate-on-scroll" style={{ marginTop: "1rem" }}>
          <div className="gallery-item">
            <img loading="lazy" src="/studio/1.webp" alt="Studio Setup 1" />
          </div>
          <div className="gallery-item">
            <img loading="lazy" src="/studio/2.webp" alt="Studio Setup 2" />
          </div>
          <div className="gallery-item">
            <img loading="lazy" src="/studio/3.webp" alt="Studio Setup 3" />
          </div>
          <div className="gallery-item">
            <img loading="lazy" src="/studio/4.webp" alt="Studio Setup 4" />
          </div>
          <div className="gallery-item">
            <img loading="lazy" src="/studio/5.webp" alt="Studio Setup 5" />
          </div>
          <div className="gallery-item">
            <img loading="lazy" src="/studio/6.webp" alt="Studio Setup 6" />
          </div>
        </div>
      </section>

      {/* ═══════════════ ELITE PODCAST PRODUCTION SUITE ═══════════════ */}
      <section className="elite-production-section section-padding">
        <div className="container">
          <div className="text-center mb-12 animate-on-scroll">
            <div className="section-tag" style={{ justifyContent: 'center' }}><span className="section-tag-dot"></span> STUDIO</div>
            <h2 className="h2" style={{ marginTop: '12px' }}>Elite Podcast <span className="text-accent">Production Suite</span></h2>
            <p className="subheading mx-auto mt-4" style={{ maxWidth: '800px' }}>
              A Professional Podcast Studio Built for Meaningful Conversations. From planning your episode to delivering a polished podcast, our team handles every stage of the production process. Whether you're launching your first podcast or growing an established show, Vividh Talks Studio provides a seamless, broadcast-quality recording experience.
            </p>
          </div>

          {/* Podcast Setups */}
          <div className="elite-setup-grid animate-on-scroll mb-16" style={{ marginBottom: '1.5rem', marginTop: "1rem" }}>
            <div className="elite-setup-card glass-card">
              <div className="setup-icon mb-4" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <User size={32} className="text-accent" /> <span className="text-secondary" style={{ fontSize: '20px' }}>+</span> <User size={26} className="text-accent" />
              </div>
              <h3 className="h3">2-Person Podcast Setup</h3>
              <p className="text-accent font-semibold mb-3 mt-1">1 Host + 1 Guest</p>
              <p className="text-secondary">Perfect for one-on-one conversations, founder interviews, expert discussions and storytelling podcasts.</p>
            </div>
            <div className="elite-setup-card glass-card">
              <div className="setup-icon mb-4" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <User size={32} className="text-accent" /> <span className="text-secondary" style={{ fontSize: '20px' }}>+</span> <Users size={26} className="text-accent" />
              </div>
              <h3 className="h3">3-Person Podcast Setup</h3>
              <p className="text-accent font-semibold mb-3 mt-1">1 Host + 2 Guests</p>
              <p className="text-secondary">Designed for panel discussions, startup conversations and expert roundtables.</p>
            </div>
          </div>

          {/* Recording Setup Tech Specs */}
          <div className="text-center mb-10 animate-on-scroll" style={{ marginBottom: '1.5rem', marginTop: "1rem" }}>
            <h3 className="h3">Podcast Recording Setup</h3>
            <p className="text-secondary">Built for Professional Podcast Production</p>
          </div>
          <div className="tech-specs-grid animate-on-scroll mb-16" style={{ marginBottom: '1.5rem', marginTop: "1rem" }}>
            <div className="tech-spec-card glass-card">
              <div className="tech-icon-circle"><Camera size={24} /></div>
              <h4 className="h4 mt-4 mb-4">Video Production</h4>
              <ul className="tech-list">
                <li><CheckCircle2 size={16} className="text-accent" /> Multi-camera recording</li>
                <li><CheckCircle2 size={16} className="text-accent" /> Wide & close-up camera angles</li>
                <li><CheckCircle2 size={16} className="text-accent" /> Live monitoring during recording</li>
              </ul>
            </div>
            <div className="tech-spec-card glass-card highlight">
              <div className="tech-icon-circle"><Mic2 size={24} /></div>
              <h4 className="h4 mt-4 mb-4">Professional Audio</h4>
              <ul className="tech-list">
                <li><CheckCircle2 size={16} className="text-accent" /> Broadcast-quality podcast mics</li>
                <li><CheckCircle2 size={16} className="text-accent" /> Professional audio mixer</li>
                <li><CheckCircle2 size={16} className="text-accent" /> Live audio monitoring</li>
                <li><CheckCircle2 size={16} className="text-accent" /> Individual audio channels</li>
                <li><CheckCircle2 size={16} className="text-accent" /> Backup audio recording</li>
              </ul>
            </div>
            <div className="tech-spec-card glass-card">
              <div className="tech-icon-circle"><Lightbulb size={24} /></div>
              <h4 className="h4 mt-4 mb-4">Studio Lighting</h4>
              <ul className="tech-list">
                <li><CheckCircle2 size={16} className="text-accent" /> Cinematic key lighting</li>
                <li><CheckCircle2 size={16} className="text-accent" /> Balanced fill lighting</li>
                <li><CheckCircle2 size={16} className="text-accent" /> Accent & background lighting</li>
                <li><CheckCircle2 size={16} className="text-accent" /> Adjustments based on your setup</li>
              </ul>
            </div>
          </div>

          {/* Green Room */}
          <div className="green-room-split animate-on-scroll mb-16 glass-card p-0" style={{ overflow: 'hidden', marginBottom: '1.5rem', marginTop: "1rem" }}>
            <div className="green-room-content">
              <div className="section-tag" style={{ width: 'fit-content' }}><Coffee size={16} style={{ marginRight: '8px' }} /> GREEN ROOM</div>
              <h3 className="h3 mt-4">Prepare Before You Go Live</h3>
              <p className="text-secondary mt-2 mb-6">A comfortable space where hosts and guests can relax, prepare and get ready before recording.</p>

              <h4 className="h4 mb-4">Amenities</h4>
              <div className="amenities-grid">
                <div className="amenity-item"><CheckCircle2 size={16} className="text-accent" /> Private Green Room Access</div>
                <div className="amenity-item"><CheckCircle2 size={16} className="text-accent" /> Professional Vanity & Grooming Station</div>
                <div className="amenity-item"><CheckCircle2 size={16} className="text-accent" /> Makeup & Hair Artist (On Request)</div>
                <div className="amenity-item"><CheckCircle2 size={16} className="text-accent" /> Quiet Space for Briefing & Preparation</div>
              </div>
            </div>
            <div className="green-room-image" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1550262174-83907c030d97?q=80&w=800&auto=format&fit=crop)', backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '350px' }}>
            </div>
          </div>

          {/* End-to-End Process */}
          <div className="text-center mb-10 animate-on-scroll" style={{ marginBottom: '1.5rem', marginTop: "1rem" }}>
            <h3 className="h3">From Idea to Published Podcast</h3>
            <p className="text-secondary">End-to-End Podcast Production</p>
          </div>
          <div className="process-timeline-grid animate-on-scroll mb-16">
            <div className="process-step-card glass-card relative">
              <div className="process-icon"><ListChecks size={28} className="text-accent" /></div>
              <h4 className="h4 mt-4">1. Pre-Production</h4>
              <p className="text-secondary text-sm mb-4 mt-2">Every great podcast starts with thoughtful planning.</p>
              <ul className="process-list text-sm">
                <li>Podcast concept consultation</li>
                <li>Episode planning</li>
                <li>Guest coordination</li>
                <li>Recording schedule</li>
                <li>Production briefing</li>
              </ul>
            </div>
            <div className="process-step-card glass-card relative">
              <div className="process-icon"><Video size={28} className="text-accent" /></div>
              <h4 className="h4 mt-4">2. Production</h4>
              <p className="text-secondary text-sm mb-4 mt-2">Professional recording with an experienced team.</p>
              <ul className="process-list text-sm">
                <li>Multi-camera podcast recording</li>
                <li>Professional lighting</li>
                <li>Broadcast-quality audio</li>
                <li>Live monitoring</li>
                <li>Technical support throughout</li>
              </ul>
            </div>
            <div className="process-step-card glass-card relative">
              <div className="process-icon"><Clapperboard size={28} className="text-accent" /></div>
              <h4 className="h4 mt-4">3. Post-Production</h4>
              <p className="text-secondary text-sm mb-4 mt-2">Refined for a professional viewing and listening experience.</p>
              <ul className="process-list text-sm">
                <li>Multi-camera editing</li>
                <li>Audio cleanup & mastering</li>
                <li>Color correction</li>
                <li>Intro & outro integration</li>
                <li>Lower thirds & branding</li>
                <li>Subtitle generation</li>
                <li>Export in YouTube & social formats</li>
              </ul>
            </div>
          </div>

        </div>
      </section>


      {/* Booking Form & Timeline */}
      <section className="container section-padding booking-section">
        <div className="booking-layout">
          <div className="form-col animate-on-scroll">
            <h2 className="h2 mb-2" style={{ marginBottom: '1rem' }}>Book Your Session</h2>
            <p className="text-secondary mb-6" style={{ marginBottom: '0.5rem' }}>Fill this out and we'll get back to you within 24 hours.</p>

            <form className="booking-form" onSubmit={handleFormSubmit}>
              <div className="form-group">
                <input type="text" name="name" placeholder="Full Name *" required className="form-input" />
              </div>
              <div className="form-grid">
                <div className="form-group">
                  <input type="email" name="email" placeholder="Email Address *" required className="form-input" />
                </div>
                <div className="form-group">
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone (WhatsApp) *"
                    required
                    className="form-input"
                    maxLength="10"
                    pattern="[0-9]{10}"
                    onInput={(e) => e.target.value = e.target.value.replace(/[^0-9]/g, '').slice(0, 10)}
                  />
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

              {/* Podcast Setup Details */}
              <div className="form-group">
                <select className="form-select" name="setupType" required defaultValue="">
                  <option value="" disabled>Select Podcast Setup *</option>
                  <option value="2-Person (1 Host + 1 Guest)">2-Person Setup (1 Host + 1 Guest)</option>
                  <option value="3-Person (1 Host + 2 Guests)">3-Person Setup (1 Host + 2 Guests)</option>
                </select>
              </div>
              <div className="form-grid">
                <div className="form-group">
                  <select className="form-select" name="format" required defaultValue="">
                    <option value="" disabled>Production Format *</option>
                    <option value="Video + Audio (Multi-Cam)">Video + Audio</option>
                    <option value="Audio Only">Audio Only</option>
                  </select>
                </div>
                <div className="form-group">
                  <select className="form-select" name="editing" required defaultValue="">
                    <option value="" disabled>Editing Services *</option>
                    <option value="Full Editing & Post-Production">Full Editing</option>
                    <option value="Raw Files Only">Raw Files</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <select className="form-select" name="duration" required defaultValue="">
                  <option value="" disabled>Expected Duration *</option>
                  <option value="60 Mins">60 Mins</option>
                  <option value="90 Mins">90 Mins</option>
                  <option value="120 Mins">120 Mins</option>
                </select>
              </div>

              <div className="form-group">
                <textarea name="topic" placeholder="Episode Idea / Topic..." rows="4" required className="form-input"></textarea>
              </div>

              <div className="form-group">
                <input
                  type="date"
                  name="date"
                  className="form-input text-secondary"
                  required
                  min={new Date().toISOString().split('T')[0]}
                  max={`${new Date().getFullYear() + 2}-12-31`}
                  onClick={(e) => {
                    try {
                      e.target.showPicker();
                    } catch (err) {
                      // Ignore on older browsers
                    }
                  }}
                />
              </div>

              <div className="form-group">
                <label className="text-secondary text-xs font-mono uppercase block mb-2">Select Time Slot *</label>
                <select
                  className="form-select"
                  name="timeSlot"
                  required
                  value={selectedTimeSlot}
                  onChange={(e) => setSelectedTimeSlot(e.target.value)}
                >
                  <option value="" disabled>Select a time</option>
                  {['10:00 AM', '01:00 PM', '04:00 PM', '07:00 PM'].map(slot => (
                    <option key={slot} value={slot}>{slot}</option>
                  ))}
                </select>
              </div>

              <button type="submit" className="btn btn-primary w-full mt-2">
                Book My Recording Session →
              </button>

              {formStatus === 'success' && (
                <div className="success-message mt-4">
                  ✅ Success! We have received your request and will contact you shortly.
                </div>
              )}
            </form>
            <p className="mt-4 text-center text-secondary text-sm" style={{ marginTop: '0.5rem' }}>🔒 Your details are safe with us.</p>
          </div>

          <div className="timeline-col animate-on-scroll">
            <h3 className="h3 mb-6" style={{ marginBottom: '1rem' }}>What Happens Next</h3>
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
                  <p className="text-secondary">Edited, branded, and published within 3–5 business days.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Record + CTA (Moved above FAQ) */}
      <section className="section-padding container">
        <div className="why-record-cta animate-on-scroll text-center">
          <div className="why-record-content glass-card" style={{ padding: 'clamp(2rem, 5vw, 4rem)', background: 'linear-gradient(145deg, rgba(30,30,36,0.95), rgba(15,15,15,0.98))', border: '1px solid rgba(255, 77, 0, 0.25)', borderRadius: '24px' }}>
            <h3 className="h2 mb-8" style={{ marginBottom: '1rem' }}>Why Record at <span className="text-accent">Vividh Talks?</span></h3>
            <div className="why-bullets" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '16px', marginBottom: '40px' }}>
              <span className="badge-outline" style={{ padding: '10px 20px', borderRadius: '30px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', gap: '8px' }}><CheckCircle2 size={16} className="text-accent" /> Purpose-built podcast studio</span>
              <span className="badge-outline" style={{ padding: '10px 20px', borderRadius: '30px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', gap: '8px' }}><CheckCircle2 size={16} className="text-accent" /> Experienced production team</span>
              <span className="badge-outline" style={{ padding: '10px 20px', borderRadius: '30px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', gap: '8px' }}><CheckCircle2 size={16} className="text-accent" /> Premium audio & video quality</span>
              <span className="badge-outline" style={{ padding: '10px 20px', borderRadius: '30px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', gap: '8px' }}><CheckCircle2 size={16} className="text-accent" /> Flexible recording setups</span>
              <span className="badge-outline" style={{ padding: '10px 20px', borderRadius: '30px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', gap: '8px' }}><CheckCircle2 size={16} className="text-accent" /> Comfortable experience</span>
              <span className="badge-outline" style={{ padding: '10px 20px', borderRadius: '30px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', gap: '8px' }}><CheckCircle2 size={16} className="text-accent" /> End-to-end production</span>
            </div>
            <div className="cta-divider" style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(255, 77, 0, 0.4), transparent)', marginBottom: '32px' }}></div>
            <h4 className="h3 mb-6" style={{ marginBottom: '1rem' }}>Your Story Deserves Professional Production</h4>
            <button className="btn btn-primary" style={{ padding: '16px 32px', fontSize: '18px' }} onClick={() => {
              const targetElement = document.querySelector('.booking-section');
              if (targetElement) targetElement.scrollIntoView({ behavior: 'smooth' });
            }}>
              Book Your Podcast Session Today <ArrowRight size={20} style={{ marginLeft: '8px' }} />
            </button>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq-section section-padding container" id="faq">
        <h2 className="h2 text-center mb-12 animate-on-scroll" style={{ marginBottom: '1rem' }}>Got Questions? We've Got Answers.</h2>
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
      {/* <section className="section-padding container" style={{ paddingTop: '100px' }}>
        <div className="text-center animate-on-scroll" style={{ marginBottom: '48px' }}>
          <div className="section-tag" style={{ justifyContent: 'center' }}><span className="section-tag-dot"></span> WHAT GUESTS SAY</div>
          <h2 className="h2" style={{ marginTop: '12px' }}>Real Stories. <span className="text-accent">Real Impact.</span></h2>
        </div>
        <div className="animate-on-scroll">
          <TestimonialSlider testimonials={testimonials} />
        </div>
      </section> */}
    </div>
  );
};

export default BookSession;
