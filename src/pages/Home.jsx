import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Mic, Play, ArrowRight, Headphones, CheckCircle2, Users, Radio, Star, Globe, TrendingUp } from 'lucide-react';
import PodcastCard from '../components/ui/PodcastCard';
import TestimonialSlider from '../components/ui/TestimonialSlider';
import ClipCard from '../components/ui/ClipCard';
import ShortsReel from '../components/ui/ShortsReel';
import { episodes as dummyEpisodes, clips as dummyClips } from '../data/dummyData';
import { categories } from '../data/categories';
import { testimonials as actualTestimonials } from '../data/testimonials';
import { useYouTubeData } from '../hooks/useYouTubeData';
import ROICalculator from '../components/ui/ROICalculator';
import HeroVisualizer from '../components/ui/HeroVisualizer';
import LiveConsoleWidget from '../components/ui/LiveConsoleWidget';
import SEO from '../components/SEO';
import { FadeIn, SlideUp, StaggerContainer, StaggerItem } from '../components/ui/Animated';
import './Home.css';

// Animated counter hook
const useCounter = (target, duration = 2000, start = false) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
};

const StatItem = ({ value, suffix, label, icon: Icon }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const count = useCounter(value, 2200, visible);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); observer.disconnect(); }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="stat-item" ref={ref}>
      <div className="stat-icon-wrap"><Icon size={22} /></div>
      <div className="stat-value">{visible ? count : 0}{suffix}</div>
      <div className="stat-label-text">{label}</div>
    </div>
  );
};

const heroImages = [
  {
    url: "/images/hero_studio.png",
    title: "Premium Studio Experience",
    subtitle: "State-of-the-art equipment for your voice."
  },
  {
    url: "/images/hero_2.png",
    title: "Dynamic Storytelling",
    subtitle: "Where every conversation sparks a new idea."
  },
  {
    url: "/images/hero_3.png",
    title: "Global Reach",
    subtitle: "Amplifying your message across all platforms."
  },
];

const whyReasons = [
  { icon: <Mic size={32} />, title: 'Studio-Quality Production', desc: 'Professional-grade audio and video setup so every episode sounds and looks phenomenal.' },
  { icon: <Globe size={32} />, title: 'Global Distribution', desc: 'Published across Spotify, YouTube, Apple Podcasts & more — all from a single recording session.' },
  { icon: <TrendingUp size={32} />, title: 'Built-in Growth', desc: 'From thumbnails to reels, we create everything you need to grow your audience fast.' },
  { icon: <Users size={32} />, title: 'Expert Collaboration', desc: 'Our experienced hosts and editors work alongside you to craft compelling stories.' },
];

const VintageMicSVG = () => (
  <svg width="70" height="105" viewBox="0 0 80 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: 'drop-shadow(0 4px 15px rgba(0, 0, 0, 0.5)) drop-shadow(0 0 15px rgba(255, 77, 0, 0.4))' }}>
    <defs>
      <linearGradient id="goldGloss" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#F39C12" />
        <stop offset="25%" stopColor="#F1C40F" />
        <stop offset="50%" stopColor="#FFEAA7" />
        <stop offset="75%" stopColor="#F1C40F" />
        <stop offset="100%" stopColor="#D35400" />
      </linearGradient>
      <linearGradient id="darkMetal" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#1E1E24" />
        <stop offset="100%" stopColor="#0B0B0D" />
      </linearGradient>
      <linearGradient id="metalGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#8E8E93" />
        <stop offset="100%" stopColor="#3A3A3C" />
      </linearGradient>
    </defs>

    {/* U-Shaped Bracket Mount */}
    <path d="M 18,50 C 18,85 62,85 62,50" stroke="url(#goldGloss)" strokeWidth="3.5" fill="none" strokeLinecap="round" />
    <path d="M 40,75 L 40,105" stroke="url(#goldGloss)" strokeWidth="4.5" strokeLinecap="round" />
    <rect x="28" y="105" width="24" height="6" rx="3" fill="url(#goldGloss)" />

    {/* Joint knobs */}
    <circle cx="18" cy="50" r="3.5" fill="url(#goldGloss)" />
    <circle cx="62" cy="50" r="3.5" fill="url(#goldGloss)" />

    {/* Microphone Body */}
    <rect x="24" y="38" width="32" height="32" rx="6" fill="url(#goldGloss)" stroke="#962D00" strokeWidth="1" />

    {/* Inner Capsule Glow */}
    <circle cx="40" cy="24" r="8" fill="#FF4D00" opacity="0.95" filter="blur(2px)" />
    <circle cx="40" cy="24" r="4" fill="#FFEAA7" opacity="0.95" />

    {/* Microphone Grille Mesh (tapered top) */}
    <rect x="24" y="12" width="32" height="24" rx="8" fill="url(#darkMetal)" stroke="url(#goldGloss)" strokeWidth="2.2" />

    {/* Grille Ribs (Vertical) */}
    <line x1="30" y1="13" x2="30" y2="35" stroke="url(#goldGloss)" strokeWidth="1" opacity="0.85" />
    <line x1="35" y1="12" x2="35" y2="36" stroke="url(#goldGloss)" strokeWidth="1.2" opacity="0.85" />
    <line x1="40" y1="12" x2="40" y2="36" stroke="url(#goldGloss)" strokeWidth="1.5" opacity="0.9" />
    <line x1="45" y1="12" x2="45" y2="36" stroke="url(#goldGloss)" strokeWidth="1.2" opacity="0.85" />
    <line x1="50" y1="13" x2="50" y2="35" stroke="url(#goldGloss)" strokeWidth="1" opacity="0.85" />

    {/* Grille Ribs (Horizontal Mesh) */}
    <line x1="24" y1="18" x2="56" y2="18" stroke="url(#goldGloss)" strokeWidth="0.8" opacity="0.6" />
    <line x1="24" y1="24" x2="56" y2="24" stroke="url(#goldGloss)" strokeWidth="0.8" opacity="0.6" />
    <line x1="24" y1="30" x2="56" y2="30" stroke="url(#goldGloss)" strokeWidth="0.8" opacity="0.6" />

    {/* Horizontal Center Band */}
    <rect x="22" y="34" width="36" height="4.5" fill="url(#goldGloss)" stroke="#962D00" strokeWidth="0.5" />
  </svg>
);

const Home = () => {
  const { episodes, clips, loading } = useYouTubeData();
  const [isShortsModalOpen, setIsShortsModalOpen] = useState(false);
  const [selectedShortIndex, setSelectedShortIndex] = useState(0);
  const [featuredPlaying, setFeaturedPlaying] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('is-visible');
      });
    }, { threshold: 0.08 });
    const els = document.querySelectorAll('.animate-on-scroll');
    els.forEach((el) => observer.observe(el));
    return () => els.forEach((el) => observer.unobserve(el));
  }, [loading]);

  if (loading) {
    return (
      <div className="home-page" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="loader"></div>
      </div>
    );
  }

  const safeEpisodes = episodes.length > 0 ? episodes : dummyEpisodes;
  const safeClips = clips.length > 0 ? clips : dummyClips;

  return (
    <div className="home-page">
      <SEO 
        title="Home"
      />

      {/* ═══════════════ HERO ═══════════════ */}
      <section className="hero-echoes-fullscreen">
        <HeroVisualizer />
        <div className="hero-overlay-dark"></div>
        <div className="container hero-fullscreen-content">
          <div className="hero-split-layout">
            <StaggerContainer className="hero-text-col" staggerDelay={0.15}>
              <StaggerItem className="hero-badge">🎙️ VIVIDH TALKS &amp; STUDIO</StaggerItem>
              <StaggerItem>
                <h1 className="h1">
                  Where Stories<br />
                  <span className="text-accent">Come Alive.</span>
                </h1>
              </StaggerItem>
              <StaggerItem>
                <p className="hero-subtext subheading" style={{ maxWidth: '560px', marginTop: '20px', color: 'rgba(255,255,255,0.85)' }}>
                  India's boldest podcast platform and production suite for creators, founders, and brands that deserve to be heard.
                </p>
              </StaggerItem>
              <StaggerItem>
                <div className="hero-ctas" style={{ marginTop: '36px' }}>
                  <Link to="/book" className="btn btn-primary"><Mic size={18} /> Start Your Podcast</Link>
                  <Link to={`/episode/${safeEpisodes[0].id}`} className="btn btn-secondary">
                    <Play size={18} /> Watch Latest
                  </Link>
                </div>
              </StaggerItem>
            </StaggerContainer>
            <FadeIn delay={0.3} duration={1} className="hero-widget-col">
              {/* Glowing cables / wires (refined paths) */}
              <svg className="hero-cables-svg" viewBox="0 0 500 500" fill="none" style={{ overflow: 'visible' }}>
                <path d="M 15,100 Q 60,110 50,150" stroke="url(#wireGrad)" strokeWidth="2.2" fill="none" className="glowing-cable" />
                <path d="M 15,400 Q 60,390 50,350" stroke="url(#wireGrad)" strokeWidth="2.2" fill="none" className="glowing-cable" />
                <path d="M 480,100 Q 420,110 450,150" stroke="url(#wireGrad)" strokeWidth="1.5" fill="none" className="glowing-cable-thin" />
                <path d="M 480,250 Q 420,250 450,270" stroke="url(#wireGrad)" strokeWidth="1.5" fill="none" className="glowing-cable-thin" />
                <path d="M 480,400 Q 420,390 450,350" stroke="url(#wireGrad)" strokeWidth="1.5" fill="none" className="glowing-cable-thin" />
                <defs>
                  <linearGradient id="wireGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#FFF2B2" />
                    <stop offset="30%" stopColor="#FF8C00" />
                    <stop offset="70%" stopColor="#FF4D00" />
                    <stop offset="100%" stopColor="#AA7C11" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Floating Top-Left Microphone */}
              <div className="floating-element mic-top-left">
                <VintageMicSVG />
              </div>

              {/* Floating Bottom-Left Microphone */}
              <div className="floating-element mic-bottom-left">
                <VintageMicSVG />
              </div>

              {/* Floating Top-Right Soundwave Badge */}
              <div className="floating-element badge-top-right">
                <div className="badge-circle">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#F1C40F" strokeWidth="2.5" strokeLinecap="round" style={{ filter: 'drop-shadow(0 0 4px #FF4D00)' }}>
                    <line x1="5" y1="12" x2="5" y2="12" strokeWidth="3" />
                    <line x1="9" y1="8" x2="9" y2="16" strokeWidth="3" />
                    <line x1="13" y1="4" x2="13" y2="20" strokeWidth="3" />
                    <line x1="17" y1="7" x2="17" y2="17" strokeWidth="3" />
                    <line x1="21" y1="11" x2="21" y2="13" strokeWidth="3" />
                  </svg>
                </div>
              </div>

              {/* Floating Middle-Right Slider Badge */}
              <div className="floating-element badge-mid-right">
                <div className="badge-faders">
                  <div className="fader-track"><div className="fader-thumb" style={{ bottom: '60%' }}></div></div>
                  <div className="fader-track"><div className="fader-thumb" style={{ bottom: '30%' }}></div></div>
                  <div className="fader-track"><div className="fader-thumb" style={{ bottom: '75%' }}></div></div>
                </div>
              </div>

              {/* Floating Bottom-Right Slider Badge */}
              <div className="floating-element badge-bot-right">
                <div className="badge-faders">
                  <div className="fader-track"><div className="fader-thumb" style={{ bottom: '40%' }}></div></div>
                  <div className="fader-track"><div className="fader-thumb" style={{ bottom: '65%' }}></div></div>
                  <div className="fader-track"><div className="fader-thumb" style={{ bottom: '20%' }}></div></div>
                </div>
              </div>

              <LiveConsoleWidget />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══════════════ STATS BAR ═══════════════ */}
      <section className="stats-bar-section">
        <div className="container stats-bar-grid">
          <StatItem value={30} suffix="K+" label="Monthly Listeners" icon={Headphones} />
          <StatItem value={40} suffix="+" label="Guest Speakers" icon={Users} />
          <StatItem value={20} suffix="+" label="Curated Series" icon={Radio} />
          <StatItem value={98} suffix="%" label="Listener Satisfaction" icon={Star} />
        </div>
      </section>

      {/* ═══════════════ MARQUEE ═══════════════ */}
      <section className="marquee-section">
        <div className="marquee-container">
          <div className="marquee-content">
            🎙 VIVIDH TALKS <span className="dot">·</span> STORYTELLING FOR THE BOLD <span className="dot">·</span> CREATORS <span className="dot">·</span> FOUNDERS <span className="dot">·</span> BRANDS <span className="dot">·</span> VIVIDH COMMUNICATIONS <span className="dot">·</span> MADE IN INDIA <span className="dot">·</span> RECORD YOUR STORY <span className="dot">·</span> VIVIDH EVENTS <span className="dot">·</span>
            🎙 VIVIDH TALKS <span className="dot">·</span> STORYTELLING FOR THE BOLD <span className="dot">·</span> CREATORS <span className="dot">·</span> FOUNDERS <span className="dot">·</span> BRANDS <span className="dot">·</span> VIVIDH COMMUNICATIONS <span className="dot">·</span> MADE IN INDIA <span className="dot">·</span> RECORD YOUR STORY <span className="dot">·</span> VIVIDH EVENTS <span className="dot">·</span>
          </div>
        </div>
      </section>

      {/* ═══════════════ FEATURED EPISODE ═══════════════ */}
      <section className="featured-section section-padding">
        <div className="container">
          <div className="section-tag animate-on-scroll"><span className="section-tag-dot"></span> LATEST DROP</div>
          <div className="featured-card animate-on-scroll" style={{ transitionDelay: '0.1s' }}>
            <div className="featured-image-col" onClick={() => setFeaturedPlaying(true)} style={{ cursor: 'pointer' }}>
              {featuredPlaying ? (
                <iframe
                  width="100%" height="100%"
                  src={`https://www.youtube.com/embed/${safeEpisodes[0].id}?autoplay=1&modestbranding=1&playsinline=1`}
                  frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen
                  style={{ objectFit: 'contain', minHeight: '200px', backgroundColor: '#000' }}
                />
              ) : (
                <>
                  <img src={safeEpisodes[0].image} alt="Featured Episode" />
                  <div className="featured-play"><Play size={32} fill="currentColor" /></div>
                  <div className="featured-img-overlay"></div>
                </>
              )}
            </div>
            <div className="featured-content-col">
              <span className="mono-label text-accent">EP. {safeEpisodes[0].number}</span>
              <h2 className="h2 featured-title">{safeEpisodes[0].title}</h2>
              <p className="featured-guest subheading">{safeEpisodes[0].guest}</p>
              <p className="featured-duration">{safeEpisodes[0].duration} <span className="dot">·</span> Video + Audio</p>
              <div className="featured-tags">
                {safeEpisodes[0].tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
              </div>
              <div className="featured-actions">
                <Link to={`/episode/${safeEpisodes[0].id}`} className="btn btn-primary">
                  <Play size={18} fill="currentColor" /> Watch Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ FEATURED PROGRAMS GRID ═══════════════ */}
      <section className="programs-section section-padding">
        <div className="container">
          <div className="section-header-row animate-on-scroll">
            <div>
              <div className="section-tag"><span className="section-tag-dot"></span> OUR PROGRAMMES</div>
              <h2 className="h2" style={{ marginTop: '12px' }}>Featured <span className="text-accent">Episodes</span></h2>
            </div>
            <Link to="/episodes" className="btn btn-secondary">View All <ArrowRight size={16} /></Link>
          </div>

          <div className="programs-grid">
            {safeEpisodes.slice(0, 6).map((ep, idx) => (
              <Link to={`/episode/${ep.id}`} className="program-card animate-on-scroll" key={ep.id} style={{ transitionDelay: `${idx * 0.08}s` }}>
                <div className="program-card-img-wrap">
                  <img src={ep.image} alt={ep.title} />
                  <div className="program-card-overlay"></div>
                  <span className="program-ep-badge">EP. {ep.number}</span>
                  <div className="program-play-btn"><Play size={20} fill="currentColor" /></div>
                </div>
                <div className="program-card-body">
                  <h4 className="program-card-title">{ep.title}</h4>
                  <p className="program-card-meta">{ep.duration} · {ep.views}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ CATEGORIES ═══════════════ */}
      <section className="categories-section section-padding">
        <div className="container">
          <div className="section-header animate-on-scroll">
            <div className="section-tag"><span className="section-tag-dot"></span> EXPLORE BY TOPIC</div>
            <h2 className="h2" style={{ marginTop: '12px' }}>Find Your <span className="text-accent">Frequency.</span></h2>
            <p className="subheading" style={{ marginTop: '12px' }}>Every niche. Every voice. One platform.</p>
          </div>
          <div className="categories-premium-grid animate-on-scroll">
            {categories.map((cat, idx) => (
              <Link
                to={`/episodes?category=${encodeURIComponent(cat.label)}`}
                className="cat-premium-card"
                key={idx}
              >
                <div className="cat-premium-icon">{cat.icon}</div>
                <div className="cat-premium-content">
                  <h4 className="cat-premium-label">{cat.label}</h4>
                  <span className="cat-premium-tag">{cat.count}</span>
                </div>
                <div className="cat-premium-arrow">→</div>
                <div className="cat-premium-bar"></div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ SHORTS / CLIPS ═══════════════ */}
      <section className="shorts-section section-padding">
        <div className="container">
          <div className="section-header-row animate-on-scroll">
            <div>
              <div className="section-tag"><span className="section-tag-dot"></span> SHORTS &amp; CLIPS</div>
              <h2 className="h2" style={{ marginTop: '12px' }}>60 Seconds. <span className="text-accent">Full Impact.</span></h2>
              <p className="subheading" style={{ marginTop: '8px' }}>The sharpest moments from every episode.</p>
            </div>
            <Link to="/episodes" className="btn btn-secondary">View All <ArrowRight size={16} /></Link>
          </div>

          <div className="video-testimonial-grid animate-on-scroll mt-8">
            {safeClips.slice(0, 8).map((clip, idx) => (
              <div className="video-testimonial-card" style={{ padding: '0', border: 'none', background: 'transparent' }} key={clip.id}>
                <ClipCard 
                  clip={clip} 
                  onClick={() => {
                    setSelectedShortIndex(idx);
                    setIsShortsModalOpen(true);
                  }} 
                />
              </div>
            ))}
          </div>

          <ShortsReel 
            clips={safeClips.slice(0, 8)} 
            isOpen={isShortsModalOpen}
            onClose={() => setIsShortsModalOpen(false)}
            initialIndex={selectedShortIndex}
          />
        </div>

      </section>
      <section className="why-section section-padding">
        <div className="container">
          <div className="why-header animate-on-scroll">
            <div className="section-tag"><span className="section-tag-dot"></span> WHY VIVIDH TALKS</div>
            <h2 className="h2" style={{ marginTop: '12px' }}>Why Should You <span className="text-accent">Listen?</span></h2>
          </div>
          <div className="why-grid">
            {whyReasons.map((r, i) => (
              <div className="why-card animate-on-scroll" key={i} style={{ transitionDelay: `${i * 0.1}s` }}>
                <div className="why-icon">{r.icon}</div>
                <h4 className="why-title">{r.title}</h4>
                <p className="why-desc">{r.desc}</p>
                <div className="why-card-bar"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ MEET THE HOST PREVIEW ═══════════════ */}
      <section className="host-preview-section section-padding container">
        <div className="host-preview-card-wrapper animate-on-scroll">
          <div className="host-preview-grid">
            <div className="host-preview-img-wrap">
              <img src="/guests/Shradhha Suman.jpeg" alt="Shraddha Suman" />
              <div className="host-preview-badge">Main Host</div>
            </div>
            <div className="host-preview-content">
              <div className="section-tag"><span className="section-tag-dot"></span> MEET THE HOST</div>
              <h2 className="h2" style={{ marginTop: '12px' }}>Shraddha <span className="text-accent">Suman</span></h2>
              <p className="subheading" style={{ marginTop: '4px' }}>Entrepreneur, Host & Storyteller</p>

              <p className="host-preview-bio mt-6" style={{ color: 'rgba(255,255,255,0.8)', fontSize: '15px', lineHeight: '1.7', fontStyle: 'italic' }}>
                "Every person has a story powerful enough to inspire change"
              </p>

              <div className="host-preview-features mt-6">
                <div className="host-pref-item">
                  <span className="pref-bullet">✨</span>
                  <div>
                    <strong>The Visionary</strong>
                    <p className="text-secondary text-sm">Entrepreneur, host and storyteller passionate about creating meaningful conversations.</p>
                  </div>
                </div>
                <div className="host-pref-item">
                  <span className="pref-bullet">🎨</span>
                  <div>
                    <strong>The Foundation</strong>
                    <p className="text-secondary text-sm">Utilizing her communication background to foster deeply impactful conversations.</p>
                  </div>
                </div>
                <div className="host-pref-item">
                  <span className="pref-bullet">💬</span>
                  <div>
                    <strong>Hosting Style</strong>
                    <p className="text-secondary text-sm">Known for a calm presence and guiding genuine conversations.</p>
                  </div>
                </div>
                <div className="host-pref-item">
                  <span className="pref-bullet">🎯</span>
                  <div>
                    <strong>Her Mission</strong>
                    <p className="text-secondary text-sm">Building a platform for diverse stories and ambitious minds.</p>
                  </div>
                </div>
              </div>

              <div className="host-preview-actions mt-8">
                <Link to="/about#hosts" className="btn btn-primary">Know More About Host</Link>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="btn btn-secondary">Connect on LinkedIn</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ ROI CALCULATOR SECTION ═══════════════ */}
      <section className="roi-calculator-section section-padding container">
        <div className="text-center animate-on-scroll">
          <div className="section-tag" style={{ justifyContent: 'center' }}><span className="section-tag-dot"></span> ROI ESTIMATOR</div>
          <h2 className="h2" style={{ marginTop: '12px' }}>Calculate Your <span className="text-accent">Podcast Impact.</span></h2>
          <p className="subheading" style={{ maxWidth: '600px', margin: '12px auto 0' }}>
            Discover how podcasting generates brand equity, social footprint, and sponsorship revenue.
          </p>
        </div>
        <div className="animate-on-scroll" style={{ marginTop: '48px' }}>
          <ROICalculator />
        </div>
      </section>

      {/* ═══════════════ CREATOR CTA (STUDIO) ═══════════════ */}

      <section className="creator-cta-section section-padding">
        <div className="container">
          <div className="creator-cta-card animate-on-scroll">
            <div className="creator-cta-bg" style={{ backgroundImage: 'url(/images/stats_bg.png)' }}></div>
            <div className="creator-cta-overlay"></div>
            <div className="creator-cta-content">
              <div className="section-tag" style={{ justifyContent: 'center' }}><span className="section-tag-dot"></span> STUDIO SESSIONS</div>
              <h2 className="h2" style={{ marginTop: '16px', textAlign: 'center' }}>
                You Have a Story.<br /><span className="text-accent">We Have the Studio.</span>
              </h2>
              <p className="subheading" style={{ textAlign: 'center', maxWidth: '560px', margin: '20px auto 0', color: 'rgba(255,255,255,0.8)' }}>
                Book a professional recording session with full video, audio, and post-production support.
              </p>
              <div className="creator-cta-bullets">
                {['Professional recording setup', 'Full video + audio production', 'Distribution on all platforms', 'Sessions start at ₹4,999'].map((item, i) => (
                  <div className="bullet-item" key={i}><CheckCircle2 size={18} className="text-accent" /><span>{item}</span></div>
                ))}
              </div>
              <Link to="/book" className="btn btn-primary" style={{ marginTop: '32px' }}>
                Book Your Session <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ HOW IT WORKS ═══════════════ */}
      <section className="how-it-works-section section-padding container">
        <div className="text-center animate-on-scroll">
          <div className="section-tag" style={{ justifyContent: 'center' }}><span className="section-tag-dot"></span> THE PROCESS</div>
          <h2 className="h2" style={{ marginTop: '12px' }}>It's Simpler <span className="text-accent">Than You Think.</span></h2>
        </div>
        <div className="steps-container animate-on-scroll" style={{ marginTop: '56px' }}>
          {[
            { n: '01', title: 'Book Your Session', desc: 'Fill out our quick form. Tell us your story idea, guests, and format.' },
            { n: '02', title: 'Record With Us', desc: 'Walk into our studio or go remote. Our team handles sound, lighting & direction.' },
            { n: '03', title: 'Publish & Grow', desc: 'We edit, brand, and distribute your episode across all major platforms.' },
          ].map((step, i) => (
            <React.Fragment key={i}>
              <div className="step-card glass-card">
                <div className="step-number text-accent">{step.n}</div>
                <h3 className="h3">{step.title}</h3>
                <p className="text-secondary">{step.desc}</p>
              </div>
              {i < 2 && <div className="step-connector"></div>}
            </React.Fragment>
          ))}
        </div>
        <div className="steps-cta text-center animate-on-scroll" style={{ marginTop: '48px' }}>
          <Link to="/contact" className="btn btn-secondary">Book a Free Discovery Call <ArrowRight size={18} /></Link>
        </div>
      </section>

      {/* ═══════════════ VIDEO TESTIMONIALS ═══════════════ */}
      <section className="video-testimonials-section section-padding container">
        <div className="text-center animate-on-scroll">
          <div className="section-tag" style={{ justifyContent: 'center' }}><span className="section-tag-dot"></span> CREATOR STORIES</div>
          <h2 className="h2" style={{ marginTop: '12px' }}>Voices of <span className="text-accent">Success.</span></h2>
          <p className="subheading" style={{ marginTop: '12px' }}>Hear directly from the creators who trust Vividh Talks.</p>
        </div>

        <div className="video-testimonial-grid animate-on-scroll" style={{ marginTop: '48px' }}>
          <div className="video-testimonial-card glass-card">
            {/* Note for User: To use local videos from private_assets, you would typically place them in the public folder (e.g. public/private_assets/) 
                or import them directly. For now, here is a placeholder you can replace with your own dummy video. */}
            <video
              src="https://www.w3schools.com/html/mov_bbb.mp4"
              controls
              className="video-testimonial-player"
              poster="/images/hero_2.png"
            ></video>
            <div className="video-testimonial-info">
              <h4 className="h4">Akshat Soni</h4>
              <p className="text-secondary text-sm">Finance Creator & Entrepreneur</p>
            </div>
          </div>
          <div className="video-testimonial-card glass-card">
            <video
              src="https://www.w3schools.com/html/mov_bbb.mp4"
              controls
              className="video-testimonial-player"
              poster="/images/hero_3.png"
            ></video>
            <div className="video-testimonial-info">
              <h4 className="h4">Shraddha Suman</h4>
              <p className="text-secondary text-sm">Main Host</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ TESTIMONIALS ═══════════════ */}
      <section className="testimonials-section section-padding container">
        <div className="text-center animate-on-scroll">
          <div className="section-tag" style={{ justifyContent: 'center' }}><span className="section-tag-dot"></span> LISTENER LOVE</div>
          <h2 className="h2" style={{ marginTop: '12px' }}>Real Stories. <span className="text-accent">Real Impact.</span></h2>
        </div>

        <div className="testimonials-wrapper animate-on-scroll" style={{ marginTop: '48px' }}>
          <TestimonialSlider testimonials={actualTestimonials} />
        </div>
      </section>

      {/* ═══════════════ GALLERY ═══════════════ */}
      <section className="gallery-section section-padding">
        <div className="container">
          <div className="section-header-row animate-on-scroll">
            <div>
              <div className="section-tag"><span className="section-tag-dot"></span> BEHIND THE SCENES</div>
              <h2 className="h2" style={{ marginTop: '12px' }}>Our Moments <span className="text-accent">&amp; Memories</span></h2>
            </div>
            <Link to="/about" className="btn btn-secondary">View All <ArrowRight size={16} /></Link>
          </div>
          <div className="gallery-grid animate-on-scroll">
            {[
              'https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?auto=format&fit=crop&q=80&w=600&h=400',
              'https://images.unsplash.com/photo-1478737270197-2468169bd768?auto=format&fit=crop&q=80&w=600&h=700',
              'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=600&h=400',
              'https://images.unsplash.com/photo-1581368135153-a506cf13b1e1?auto=format&fit=crop&q=80&w=600&h=500',
              'https://images.unsplash.com/photo-1535223289827-42f1e9919769?auto=format&fit=crop&q=80&w=600&h=400',
              'https://images.unsplash.com/photo-1512758017271-d7b84c2113f1?auto=format&fit=crop&q=80&w=600&h=300',
              'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=600&h=500',
              'https://images.unsplash.com/photo-1559523161-0fc0d8b38a7a?auto=format&fit=crop&q=80&w=600&h=400',
            ].map((img, i) => (
              <div className="gallery-item" key={i} style={{ transitionDelay: `${i * 0.06}s` }}>
                <img src={img} alt={`Studio Moment ${i + 1}`} />
                <div className="gallery-overlay">
                  <div className="gallery-plus">+</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ BRAND ECOSYSTEM ═══════════════ */}
      <section className="ecosystem-section section-padding container">
        <div className="section-header animate-on-scroll">
          <div className="section-tag"><span className="section-tag-dot"></span> THE VIVIDH UNIVERSE</div>
          <h2 className="h2" style={{ marginTop: '12px' }}>Part of Something <span className="text-accent">Bigger.</span></h2>
        </div>
        <div className="ecosystem-grid animate-on-scroll">
          <div className="ecosystem-card glass-card">
            <h3>Vividh Communications</h3>
            <p className="text-secondary">Branding, Marketing & Podcast Services</p>
            <a href="https://www.vividhcommunications.com/" className="text-accent mt-4 inline-block">Visit →</a>
          </div>
          <div className="ecosystem-card glass-card highlight">
            <h3>Vividh Talks</h3>
            <p className="text-secondary">Podcast Platform & Creator Ecosystem</p>
            <span className="mono-label text-accent mt-4 inline-block">You Are Here</span>
          </div>
          <div className="ecosystem-card glass-card">
            <h3>Vividh Events</h3>
            <p className="text-secondary">Event Management & Experiences</p>
            <a href="https://www.vividhevents.com/" className="text-accent mt-4 inline-block">Visit →</a>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
