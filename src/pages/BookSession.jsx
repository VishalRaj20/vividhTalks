import { useState, useEffect, useRef } from 'react';
import { Mic2, Video, Scissors, Paintbrush, Radio, TrendingUp, ChevronDown } from 'lucide-react';
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

  const [serviceType, setServiceType] = useState('studio'); // 'studio' or 'review'

  // Custom Quote States for Studio Recording Sessions
  const [format, setFormat] = useState('audio'); // 'audio' or 'video'
  const [durationOpt, setDurationOpt] = useState('60'); // '60', '90', '120'
  const [editingOpt, setEditingOpt] = useState('edited'); // 'raw' or 'edited'
  const [shortsOpt, setShortsOpt] = useState('none'); // 'none', '3', '5'
  const [brandingOpt, setBrandingOpt] = useState(false); // true/false
  const [customPackageSummary, setCustomPackageSummary] = useState('');
  const [customPackagePrice, setCustomPackagePrice] = useState(4999);

  // Custom Quote States for Already Recorded Podcast Video Review
  const [reviewDuration, setReviewDuration] = useState('60'); // '60', '90', '120'
  const [reviewSpeed, setReviewSpeed] = useState('standard'); // 'standard', 'express'
  const [reviewSEO, setReviewSEO] = useState(false);
  const [reviewCompetitor, setReviewCompetitor] = useState(false);
  const [customReviewSummary, setCustomReviewSummary] = useState('');
  const [customReviewPrice, setCustomReviewPrice] = useState(2999);

  // Re-calculate review pricing whenever choices change
  useEffect(() => {
    let price = 2999; // Base Review Cost (up to 60 min review + strategy call)

    if (reviewDuration === '90') price += 1000;
    else if (reviewDuration === '120') price += 2000;

    if (reviewSpeed === 'express') price += 1500;

    if (reviewSEO) price += 500;

    if (reviewCompetitor) price += 1000;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCustomReviewPrice(price);

    const label = `Review Audit: ${reviewDuration} mins, ${reviewSpeed === 'express' ? 'Express (48h)' : 'Standard'}, ${reviewSEO ? 'SEO Ready' : 'No SEO'}${reviewCompetitor ? ', Competitor Analysis' : ''}`;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCustomReviewSummary(label);
  }, [reviewDuration, reviewSpeed, reviewSEO, reviewCompetitor]);


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

    if (serviceType === 'studio' && !selectedTimeSlot) {
      alert('Please select a time slot for your studio session.');
      return;
    }

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || "918252754340";
    const formspreeId = import.meta.env.VITE_FORMSPREE_ID;

    // 1. Prepare WhatsApp Message
    const selectedPkg = serviceType === 'studio' ? customPackageSummary : customReviewSummary;
    const selectedPrice = serviceType === 'studio' ? customPackagePrice : customReviewPrice;
    const packageInfo = selectedPkg ? `%0A*Selected Package:* ${selectedPkg} (Price: ₹${selectedPrice})` : '';

    // Custom inputs formatting
    const serviceLabel = serviceType === 'studio' ? 'Studio Session Booking' : 'Recorded Podcast Video Review Booking';
    const detailField = serviceType === 'studio'
      ? `*Topic:* ${data.topic}`
      : `*Podcast Link:* ${data.podcastLink}%0A*Aspects to Review:* ${data.reviewAspects}`;

    const message = `*New Podcast Booking Request (${serviceLabel})*%0A%0A` +
      `*Name:* ${data.name}%0A` +
      `*Email:* ${data.email}%0A` +
      `*Phone:* ${data.phone}%0A` +
      `*Type:* ${data.userType}%0A` +
      `*Preferred Date:* ${data.date}%0A` +
      `*Preferred Time:* ${selectedTimeSlot || 'Not Selected'}%0A` +
      `${detailField}` +
      `${packageInfo}%0A%0A` +
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
  // Re-calculate pricing whenever choices change
  useEffect(() => {
    let price = 2999; // Base Session Cost (Studio + Mics + Sound engineer)

    if (format === 'video') price += 2500; // Multi-Cam 4K video setup

    if (durationOpt === '60') price += 500;
    else if (durationOpt === '90') price += 1500;
    else if (durationOpt === '120') price += 2500;

    if (editingOpt === 'edited') price += 1500; // Professional cut/edit

    if (shortsOpt === '3') price += 1500;
    else if (shortsOpt === '5') price += 2500;

    if (brandingOpt) price += 500; // Thumbnail design

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCustomPackagePrice(price);

    // Format options description
    const label = `${format === 'video' ? 'Video' : 'Audio'}, ${durationOpt} mins, ${editingOpt === 'edited' ? 'Edited' : 'Raw'}, ${shortsOpt !== 'none' ? shortsOpt + ' Reels' : 'No Reels'}${brandingOpt ? ', Thumbnail' : ''}`;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCustomPackageSummary(label);
  }, [format, durationOpt, editingOpt, shortsOpt, brandingOpt]);

  const handleSelectPlan = (planName) => {
    if (planName === 'starter') {
      setServiceType('studio');
      setFormat('audio');
      setDurationOpt('60');
      setEditingOpt('edited');
      setShortsOpt('none');
      setBrandingOpt(false);
    } else if (planName === 'creator') {
      setServiceType('studio');
      setFormat('video');
      setDurationOpt('90');
      setEditingOpt('edited');
      setShortsOpt('3');
      setBrandingOpt(true);
    } else if (planName === 'brand') {
      setServiceType('studio');
      setCustomPackageSummary('Brand Custom Series Plan');
      setCustomPackagePrice(0); // Custom pricing required
    } else if (planName === 'review-starter') {
      setServiceType('review');
      setReviewDuration('60');
      setReviewSpeed('standard');
      setReviewSEO(true);
      setReviewCompetitor(false);
    } else if (planName === 'review-premium') {
      setServiceType('review');
      setReviewDuration('90');
      setReviewSpeed('express');
      setReviewSEO(true);
      setReviewCompetitor(true);
    } else if (planName === 'review-brand') {
      setServiceType('review');
      setCustomReviewSummary('Recorded Channel Strategy & Audit');
      setCustomReviewPrice(0);
    }

    // Smooth scroll down to the configurator/form
    const targetElement = document.querySelector('.custom-planner-section') || document.querySelector('.booking-layout');
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
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
        <h2 className="h2 text-center mb-12 animate-on-scroll">Everything You Get With Every Session</h2>
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

        <div className="studio-gallery-grid animate-on-scroll">
          <div className="gallery-item">
            <img loading="lazy" src="/studio/photo_2026-07-01_20-55-53.webp" alt="Studio Setup 1" />
          </div>
          <div className="gallery-item">
            <img loading="lazy" src="/studio/photo_2026-07-01_20-58-10.webp" alt="Studio Setup 2" />
          </div>
          <div className="gallery-item">
            <img loading="lazy" src="/studio/photo_2026-07-01_20-58-15.webp" alt="Studio Setup 3" />
          </div>
          <div className="gallery-item">
            <img loading="lazy" src="/studio/photo_2026-07-01_20-58-18.webp" alt="Studio Setup 4" />
          </div>
          <div className="gallery-item">
            <img loading="lazy" src="/studio/photo_2026-07-01_20-58-23.webp" alt="Studio Setup 5" />
          </div>
          <div className="gallery-item">
            <img loading="lazy" src="/studio/photo_2026-07-01_20-58-26.webp" alt="Studio Setup 6" />
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="pricing-section section-padding" id="pricing">
        <div className="container">
          <div className="text-center mb-30 animate-on-scroll">
            <h2 className="h2" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800 }}>Simple, Transparent Pricing.</h2>
          </div>

          {/* Service Selection Tabs */}
          <div className="service-tabs-container animate-on-scroll">
            <button
              type="button"
              className={`service-tab-btn ${serviceType === 'studio' ? 'active' : ''}`}
              onClick={() => setServiceType('studio')}
            >
              🎙 Studio Recording
            </button>
            <button
              type="button"
              className={`service-tab-btn ${serviceType === 'review' ? 'active' : ''}`}
              onClick={() => setServiceType('review')}
            >
              🎥 Video Review & Audit
            </button>
          </div>

          <div
            ref={pricingGridRef}
            onScroll={handlePricingScroll}
            className="pricing-grid animate-on-scroll"
          >
            {serviceType === 'studio' ? (
              <>
                {/* Starter Plan */}
                <div className={`pricing-card ${activePricingIdx === 0 ? 'active' : ''}`}>
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
                  <button className="pricing-btn secondary" onClick={() => handleSelectPlan('starter')}>Book Starter</button>
                </div>

                {/* Creator Plan */}
                <div className={`pricing-card highlight ${activePricingIdx === 1 ? 'active' : ''}`}>
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
                  <button className="pricing-btn primary" onClick={() => handleSelectPlan('creator')}>Book Creator</button>
                </div>

                {/* Brand Plan */}
                <div className={`pricing-card ${activePricingIdx === 2 ? 'active' : ''}`}>
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
                  <button className="pricing-btn secondary" onClick={() => handleSelectPlan('brand')}>Get Quote</button>
                </div>
              </>
            ) : (
              <>
                {/* Review Starter Plan */}
                <div className={`pricing-card ${activePricingIdx === 0 ? 'active' : ''}`}>
                  <h3 className="pricing-plan-title">Video Review</h3>
                  <p className="pricing-ideal-for">Ideal for: Solo creators, audio channels</p>
                  <div className="price-wrap">
                    <span className="currency">₹</span>
                    <span className="price">2,999</span>
                    <span className="period">/episode</span>
                  </div>
                  <ul className="pricing-features-list">
                    <li>1 episode reviewed (up to 60 mins)</li>
                    <li>Sound & visual quality report</li>
                    <li>Pacing & content critique</li>
                    <li>30-min strategy Zoom call</li>
                  </ul>
                  <button className="pricing-btn secondary" onClick={() => handleSelectPlan('review-starter')}>Book Review</button>
                </div>

                {/* Review Premium Plan */}
                <div className={`pricing-card highlight ${activePricingIdx === 1 ? 'active' : ''}`}>
                  <div className="recommended-badge">POPULAR</div>
                  <h3 className="pricing-plan-title text-accent">Channel Audit</h3>
                  <p className="pricing-ideal-for">Ideal for: High-growth shows</p>
                  <div className="price-wrap">
                    <span className="currency">₹</span>
                    <span className="price">5,999</span>
                    <span className="period">/audit</span>
                  </div>
                  <ul className="pricing-features-list">
                    <li>3 episodes reviewed (180m total)</li>
                    <li>Branding & thumbnail audit</li>
                    <li>SEO & titles optimization plan</li>
                    <li>60-min consulting call</li>
                  </ul>
                  <button className="pricing-btn primary" onClick={() => handleSelectPlan('review-premium')}>Book Audit</button>
                </div>

                {/* Review Enterprise Plan */}
                <div className={`pricing-card ${activePricingIdx === 2 ? 'active' : ''}`}>
                  <h3 className="pricing-plan-title">Enterprise Review</h3>
                  <p className="pricing-ideal-for">Ideal for: Podcasting networks, agencies</p>
                  <div className="price-wrap">
                    <span className="price">Custom</span>
                  </div>
                  <ul className="pricing-features-list">
                    <li>Monthly reviews & audits (4 eps)</li>
                    <li>Editing & scripting checklists</li>
                    <li>Comprehensive audience reports</li>
                    <li>Priority WhatsApp channel support</li>
                  </ul>
                  <button className="pricing-btn secondary" onClick={() => handleSelectPlan('review-brand')}>Get Quote</button>
                </div>
              </>
            )}
          </div>

          {/* Dots Indicator for Mobile Slider */}
          <div className="pricing-dots-container">
            {[0, 1, 2].map((idx) => (
              <button
                key={idx}
                className={`pricing-dot ${activePricingIdx === idx ? 'active' : ''}`}
                onClick={() => {
                  const grid = pricingGridRef.current;
                  if (!grid) return;
                  const cards = grid.querySelectorAll('.pricing-card');
                  if (cards[idx]) {
                    cards[idx].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                    setActivePricingIdx(idx);
                  }
                }}
                aria-label={`Go to plan ${idx + 1}`}
              />
            ))}
          </div>

          <div className="flex justify-center items-center text-center mt-8 animate-on-scroll">
            <p className="pricing-footer-text">
              💬 Not sure which plan fits? <a href={`https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER || '918252754340'}`} target="_blank" rel="noreferrer" className="text-accent">WhatsApp us →</a>
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Studio Planner & Quote Builder */}
      <section className="custom-planner-section container">
        <div className="text-center mb-12 animate-on-scroll">
          <div className="section-tag" style={{ justifyContent: 'center' }}><span className="section-tag-dot"></span> STUDIO PLANNER</div>
          <h2 className="h2" style={{ marginTop: '12px' }}>Or Build Your <span className="text-accent">Custom Session.</span></h2>
          <p className="subheading mx-auto mt-4" style={{ maxWidth: '600px' }}>
            Choose exact production options, visual edits, and distribution details. Your price calculates in real-time.
          </p>
        </div>

        <div className="planner-dashboard animate-on-scroll">
          {serviceType === 'studio' ? (
            /* Original Planner Controls */
            <div className="planner-options-panel">
              {/* 1. Format */}
              <div className="option-category">
                <span className="option-category-title">1. Production Format</span>
                <div className="options-flex">
                  <button
                    type="button"
                    className={`opt-choice-btn ${format === 'audio' ? 'active' : ''}`}
                    onClick={() => setFormat('audio')}
                  >
                    <span className="choice-icon">🎙</span>
                    <div className="choice-texts">
                      <span className="choice-title">Audio Only</span>
                      <span className="choice-extra">Base Session Setup</span>
                    </div>
                  </button>
                  <button
                    type="button"
                    className={`opt-choice-btn ${format === 'video' ? 'active' : ''}`}
                    onClick={() => setFormat('video')}
                  >
                    <span className="choice-icon">🎥</span>
                    <div className="choice-texts">
                      <span className="choice-title">Video + Audio</span>
                      <span className="choice-extra">+ ₹2,500 (4K Multi-Cam)</span>
                    </div>
                  </button>
                </div>
              </div>

              {/* 2. Duration */}
              <div className="option-category">
                <span className="option-category-title">2. Studio Duration</span>
                <div className="options-flex duration-options">
                  {[
                    { value: '60', title: '60 Mins', cost: '₹500' },
                    { value: '90', title: '90 Mins', cost: '₹1,500' },
                    { value: '120', title: '120 Mins', cost: '₹2,500' },
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      className={`opt-choice-btn size-sm ${durationOpt === opt.value ? 'active' : ''}`}
                      onClick={() => setDurationOpt(opt.value)}
                    >
                      <span className="choice-title">{opt.title}</span>
                      <span className="choice-extra">+{opt.cost}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. Post Production */}
              <div className="option-category">
                <span className="option-category-title">3. Editing Services</span>
                <div className="options-flex">
                  <button
                    type="button"
                    className={`opt-choice-btn ${editingOpt === 'raw' ? 'active' : ''}`}
                    onClick={() => setEditingOpt('raw')}
                  >
                    <span className="choice-icon">📼</span>
                    <div className="choice-texts">
                      <span className="choice-title">Raw Recordings</span>
                      <span className="choice-extra">No Post-production</span>
                    </div>
                  </button>
                  <button
                    type="button"
                    className={`opt-choice-btn ${editingOpt === 'edited' ? 'active' : ''}`}
                    onClick={() => setEditingOpt('edited')}
                  >
                    <span className="choice-icon">✂</span>
                    <div className="choice-texts">
                      <span className="choice-title">Fully Edited Episode</span>
                      <span className="choice-extra">+ ₹1,500 (Color grade + sound edit)</span>
                    </div>
                  </button>
                </div>
              </div>

              {/* 4. Shorts/Reels */}
              <div className="option-category">
                <span className="option-category-title">4. Shorts & Reels Package</span>
                <div className="options-flex duration-options">
                  {[
                    { value: 'none', title: 'No Shorts', cost: '₹0' },
                    { value: '3', title: '3 Clips', cost: '₹1,500' },
                    { value: '5', title: '5 Clips', cost: '₹2,500' },
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      className={`opt-choice-btn size-sm ${shortsOpt === opt.value ? 'active' : ''}`}
                      onClick={() => setShortsOpt(opt.value)}
                    >
                      <span className="choice-title">{opt.title}</span>
                      <span className="choice-extra">+{opt.cost}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 5. Artwork / Graphics */}
              <div className="option-category">
                <span className="option-category-title">5. Visual Add-ons</span>
                <button
                  type="button"
                  className={`opt-choice-btn full-w ${brandingOpt ? 'active' : ''}`}
                  onClick={() => setBrandingOpt(!brandingOpt)}
                >
                  <span className="choice-icon">🎨</span>
                  <div className="choice-texts">
                    <span className="choice-title">Branded Cover Art & YouTube Thumbnail</span>
                    <span className="choice-extra">{brandingOpt ? 'Added to Package' : '+ ₹500'}</span>
                  </div>
                </button>
              </div>
            </div>
          ) : (
            /* Review Planner Controls */
            <div className="planner-options-panel">
              {/* 1. Review Duration */}
              <div className="option-category">
                <span className="option-category-title">1. Episode Length</span>
                <div className="options-flex duration-options">
                  {[
                    { value: '60', title: 'Up to 60 Mins', cost: 'Base' },
                    { value: '90', title: 'Up to 90 Mins', cost: '+ ₹1,000' },
                    { value: '120', title: 'Up to 120 Mins', cost: '+ ₹2,000' },
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      className={`opt-choice-btn size-sm ${reviewDuration === opt.value ? 'active' : ''}`}
                      onClick={() => setReviewDuration(opt.value)}
                    >
                      <span className="choice-title">{opt.title}</span>
                      <span className="choice-extra">{opt.cost}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Turnaround Speed */}
              <div className="option-category">
                <span className="option-category-title">2. Turnaround Speed</span>
                <div className="options-flex">
                  <button
                    type="button"
                    className={`opt-choice-btn ${reviewSpeed === 'standard' ? 'active' : ''}`}
                    onClick={() => setReviewSpeed('standard')}
                  >
                    <span className="choice-icon">📅</span>
                    <div className="choice-texts">
                      <span className="choice-title">Standard Delivery</span>
                      <span className="choice-extra">5 - 7 Business Days</span>
                    </div>
                  </button>
                  <button
                    type="button"
                    className={`opt-choice-btn ${reviewSpeed === 'express' ? 'active' : ''}`}
                    onClick={() => setReviewSpeed('express')}
                  >
                    <span className="choice-icon">⚡</span>
                    <div className="choice-texts">
                      <span className="choice-title">Express Turnaround</span>
                      <span className="choice-extra">48 Hours (+ ₹1,500)</span>
                    </div>
                  </button>
                </div>
              </div>

              {/* 3. SEO Add-on */}
              <div className="option-category">
                <span className="option-category-title">3. Optimization & SEO Add-on</span>
                <button
                  type="button"
                  className={`opt-choice-btn full-w ${reviewSEO ? 'active' : ''}`}
                  onClick={() => setReviewSEO(!reviewSEO)}
                >
                  <span className="choice-icon">📈</span>
                  <div className="choice-texts">
                    <span className="choice-title">Title, Tags & Description SEO Blueprint</span>
                    <span className="choice-extra">{reviewSEO ? 'Added to Package' : '+ ₹500'}</span>
                  </div>
                </button>
              </div>

              {/* 4. Competitor Audit */}
              <div className="option-category">
                <span className="option-category-title">4. Competitor Channel Analysis</span>
                <button
                  type="button"
                  className={`opt-choice-btn full-w ${reviewCompetitor ? 'active' : ''}`}
                  onClick={() => setReviewCompetitor(!reviewCompetitor)}
                >
                  <span className="choice-icon">🎯</span>
                  <div className="choice-texts">
                    <span className="choice-title">Competitor Comparison & Strategy Audit</span>
                    <span className="choice-extra">{reviewCompetitor ? 'Added to Package' : '+ ₹1,000'}</span>
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* Receipt Panel */}
          <div className="planner-receipt-panel glass-card">
            {serviceType === 'studio' ? (
              <>
                <h4 className="receipt-title">Session Cost Breakdown</h4>

                <div className="receipt-list font-mono text-sm">
                  <div className="receipt-item">
                    <span>Base Studio Session</span>
                    <span>₹2,999</span>
                  </div>
                  <div className="receipt-item">
                    <span>Format: {format === 'video' ? 'Video (Multi-Cam)' : 'Audio Only'}</span>
                    <span>{format === 'video' ? '₹2,500' : '₹0'}</span>
                  </div>
                  <div className="receipt-item">
                    <span>Time: {durationOpt} mins</span>
                    <span>{durationOpt === '60' ? '₹500' : durationOpt === '90' ? '₹1,500' : '₹2,500'}</span>
                  </div>
                  <div className="receipt-item">
                    <span>Editing: {editingOpt === 'edited' ? 'Full Edit' : 'Raw Files'}</span>
                    <span>{editingOpt === 'edited' ? '₹1,500' : '₹0'}</span>
                  </div>
                  <div className="receipt-item">
                    <span>Shorts: {shortsOpt !== 'none' ? `${shortsOpt} Clips` : 'None'}</span>
                    <span>{shortsOpt === '3' ? '₹1,500' : shortsOpt === '5' ? '₹2,500' : '₹0'}</span>
                  </div>
                  <div className="receipt-item">
                    <span>Cover Art & Thumbnails</span>
                    <span>{brandingOpt ? '₹500' : '₹0'}</span>
                  </div>
                  <div className="receipt-divider"></div>
                  <div className="receipt-total text-accent">
                    <span>ESTIMATED TOTAL</span>
                    <span className="total-num">₹{customPackagePrice}</span>
                  </div>
                </div>
              </>
            ) : (
              <>
                <h4 className="receipt-title">Review Cost Breakdown</h4>

                <div className="receipt-list font-mono text-sm">
                  <div className="receipt-item">
                    <span>Base Video Review</span>
                    <span>₹2,999</span>
                  </div>
                  <div className="receipt-item">
                    <span>Video Duration: {reviewDuration} mins</span>
                    <span>{reviewDuration === '60' ? '₹0' : reviewDuration === '90' ? '₹1,000' : '₹2,000'}</span>
                  </div>
                  <div className="receipt-item">
                    <span>Turnaround: {reviewSpeed === 'express' ? 'Express (48h)' : 'Standard'}</span>
                    <span>{reviewSpeed === 'express' ? '₹1,500' : '₹0'}</span>
                  </div>
                  <div className="receipt-item">
                    <span>SEO & Metadata Blueprint</span>
                    <span>{reviewSEO ? '₹500' : '₹0'}</span>
                  </div>
                  <div className="receipt-item">
                    <span>Competitor Comparison</span>
                    <span>{reviewCompetitor ? '₹1,000' : '₹0'}</span>
                  </div>
                  <div className="receipt-divider"></div>
                  <div className="receipt-total text-accent">
                    <span>ESTIMATED TOTAL</span>
                    <span className="total-num">₹{customReviewPrice}</span>
                  </div>
                </div>
              </>
            )}

            <button
              type="button"
              className="btn btn-primary w-full mt-6"
              onClick={() => {
                const formElement = document.querySelector('.booking-layout');
                if (formElement) formElement.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Apply Package & Book Now
            </button>
            <p className="receipt-note text-center mt-3 text-secondary text-xs">
              Prices are exclusive of taxes. Custom channel-wide audit series available.
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
              {serviceType === 'studio' ? (
                customPackageSummary && (
                  <div className="form-group">
                    <label className="text-secondary text-xs font-mono uppercase block mb-1">Selected Studio Package</label>
                    <div className="applied-package-box font-subheading">
                      <span className="applied-package-text font-bold text-accent">
                        {format === 'video' ? '📹 Video' : '🎙 Audio'} · {durationOpt}m · {editingOpt === 'edited' ? 'Edited' : 'Raw'} · {shortsOpt !== 'none' ? `${shortsOpt} Reels` : '0 Reels'} (₹{customPackagePrice})
                      </span>
                      <button type="button" className="clear-package-btn" onClick={() => {
                        setFormat('audio');
                        setDurationOpt('60');
                        setEditingOpt('edited');
                        setShortsOpt('none');
                        setBrandingOpt(false);
                      }}>Reset</button>
                    </div>
                  </div>
                )
              ) : (
                customReviewSummary && (
                  <div className="form-group">
                    <label className="text-secondary text-xs font-mono uppercase block mb-1">Selected Review Package</label>
                    <div className="applied-package-box font-subheading">
                      <span className="applied-package-text font-bold text-accent">
                        🎥 Review · {reviewDuration}m · {reviewSpeed === 'express' ? 'Express' : 'Standard'}{reviewSEO ? ' · SEO' : ''}{reviewCompetitor ? ' · Audit' : ''} (₹{customReviewPrice})
                      </span>
                      <button type="button" className="clear-package-btn" onClick={() => {
                        setReviewDuration('60');
                        setReviewSpeed('standard');
                        setReviewSEO(false);
                        setReviewCompetitor(false);
                      }}>Reset</button>
                    </div>
                  </div>
                )
              )}
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
              {serviceType === 'studio' ? (
                <div className="form-group">
                  <textarea name="topic" placeholder="Episode Idea / Topic..." rows="4" required className="form-input"></textarea>
                </div>
              ) : (
                <>
                  <div className="form-group">
                    <input type="url" name="podcastLink" placeholder="Already Recorded Podcast Video Link (YouTube, Drive, Dropbox) *" required className="form-input" />
                  </div>
                  <div className="form-group">
                    <textarea name="reviewAspects" placeholder="Which specific aspects do you want us to review? (e.g. video quality, voice modulation, pacing, graphics) *" rows="4" required className="form-input"></textarea>
                  </div>
                </>
              )}
              <div className="form-group">
                <input
                  type="date"
                  name="date"
                  className="form-input text-secondary"
                  required
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              {serviceType === 'studio' && (
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
              )}

              <button type="submit" className="btn btn-primary w-full mt-2">
                {serviceType === 'studio' ? 'Book My Recording Session →' : 'Book My Video Review →'}
              </button>

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
                  <p className="text-secondary">Edited, branded, and published within 3–5 business days.</p>
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
