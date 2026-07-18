import { useEffect, useState, useRef, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Mic, Play, ArrowRight, Headphones, CheckCircle2, Users, Radio, Star, Globe, TrendingUp } from 'lucide-react';
import ClipCard from '../components/ui/ClipCard';
import ShortsReel from '../components/ui/ShortsReel';
import { episodes as dummyEpisodes, clips as dummyClips, videoReviews } from '../data/dummyData';
import { categories } from '../data/categories';
import { useYouTubeData } from '../hooks/useYouTubeData';
import ROICalculator from '../components/ui/ROICalculator';
import HeroVisualizer from '../components/ui/HeroVisualizer';
import LiveConsoleWidget from '../components/ui/LiveConsoleWidget';
import SEO from '../components/SEO';
import OptimizedImage from '../components/ui/OptimizedImage';
import VideoReviewReel from '../components/ui/VideoReviewReel';
import { FadeIn, StaggerContainer, StaggerItem } from '../components/ui/Animated';
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

  const [isVideoReelOpen, setIsVideoReelOpen] = useState(false);
  const [initialReelIndex, setInitialReelIndex] = useState(0);

  const formattedReviews = videoReviews.map((review) => ({
    id: review.id,
    title: review.quote || review.guestName + " Review",
    image: review.poster,
    videoUrl: review.src,
    channelName: review.guestName,
  }));

  const handleReviewClick = (index) => {
    setInitialReelIndex(index);
    setIsVideoReelOpen(true);
  };

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
                  Real Conversations<br />
                  <span className="text-accent">That Matters</span>
                </h1>
              </StaggerItem>
              <StaggerItem>
                <p className="hero-subtext subheading" style={{ maxWidth: '560px', marginTop: '20px', color: 'rgba(255,255,255,0.85)' }}>
                  India's emerging podcast platform exploring politics, business, society, health, youth culture, entrepreneurship, personal growth, modern India and inspiring human stories.
                </p>
              </StaggerItem>
              <StaggerItem>
                <div className="hero-ctas" style={{ marginTop: '36px' }}>
                  <Link to={`/episode/${safeEpisodes[0]?.id}`} className="btn btn-primary"><Play size={18} /> Watch Episodes</Link>
                  <Link to="/partner" className="btn btn-secondary">
                    Partner With Us
                  </Link>
                  <Link to="/episodes" className="btn btn-outline" style={{ marginLeft: '10px' }}>
                    Explore Conversations
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
          <StatItem value={150} suffix="+" label="Hours of Conversations" icon={Radio} />
          <StatItem value={98} suffix="%" label="Listener Satisfaction" icon={Star} />
        </div>
      </section>

      {/* ═══════════════ MARQUEE ═══════════════ */}
      <section className="marquee-section">
        <div className="marquee-container">
          <div className="marquee-content">
            🎙 VIVIDH TALKS <span className="dot">·</span> STORYTELLING FOR THE BOLD <span className="dot">·</span> CREATORS <span className="dot">·</span> FOUNDERS <span className="dot">·</span> BRANDS <span className="dot">·</span> MADE IN INDIA <span className="dot">·</span> RECORD YOUR STORY <span className="dot">·</span>
            🎙 VIVIDH TALKS <span className="dot">·</span> STORYTELLING FOR THE BOLD <span className="dot">·</span> CREATORS <span className="dot">·</span> FOUNDERS <span className="dot">·</span> BRANDS <span className="dot">·</span> MADE IN INDIA <span className="dot">·</span> RECORD YOUR STORY <span className="dot">·</span>
          </div>
        </div>
      </section>

      {/* ═══════════════ FEATURED EPISODE ═══════════════ */}
      <section className="featured-section section-padding">
        <div className="container">
          <div className="section-tag animate-on-scroll" style={{ marginBottom: "8px" }}><span className="section-tag-dot"></span> LATEST DROP</div>
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
                  <OptimizedImage loading="lazy" src={safeEpisodes[0].image} alt="Featured Episode" />
                  <div className="featured-play"><Play size={32} fill="currentColor" /></div>
                  <div className="featured-img-overlay"></div>
                </>
              )}
            </div>
            <div className="featured-content-col">
              <h2 className="h2 featured-title">{safeEpisodes[0].title}</h2>
              <p className="featured-guest subheading">{safeEpisodes[0].guest}</p>
              <p className="featured-duration">{safeEpisodes[0].duration} <span className="dot">·</span> Video + Audio</p>
              <div className="featured-actions">
                <Link to={`/episode/${safeEpisodes[0].id}`} className="btn btn-primary">
                  <Play size={18} fill="currentColor" /> Watch Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ FEATURED GUESTS (NEW) ═══════════════ */}
      <section className="featured-guests-section section-padding">
        <div className="container">
          <div className="section-header-row animate-on-scroll">
            <div>
              <div className="section-tag"><span className="section-tag-dot"></span> WHY VIVIDH TALKS?</div>
              <h2 className="h2" style={{ marginTop: '12px' }}>Voices That <span className="text-accent">Inspire India</span></h2>
              <p className="subheading" style={{ marginTop: '8px', maxWidth: '800px' }}>
                Meaningful conversations with founders, creators, politicians, doctors, educators, artists and change-makers shaping modern India.
                From entrepreneurs to public leaders, we feature guests with stories, experiences and ideas that create impact.
              </p>
            </div>
            <Link to="/episodes" className="btn btn-secondary">Watch Episodes <ArrowRight size={16} /></Link>
          </div>
          <div className="programs-grid mt-8">
            {[
              { name: 'Deepak Thakur', title: 'Playback Singer & Bigg Boss Fame', img: "/guests/Deepak Thakur.webp" },
              { name: 'Sujit Kumar Mishra', title: 'Founder & CEO - Thikedaar.com', img: "/guests/Sujit Kumar Mishra.webp" },
              { name: '"Pd. Shree Abhay Krishan Jee Maharaj"', title: "Political Astrologer", img: "/guests/Pd. Shree Abhay Krishan Jee Maharaj.webp" },
            ].map((guest, idx) => (
              <div className="program-card animate-on-scroll" key={idx} style={{ transitionDelay: `${idx * 0.08}s` }}>
                <div className="program-card-img-wrap" style={{ aspectRatio: '1/0.8' }}>
                  <OptimizedImage loading="lazy" src={guest.img} alt={guest.name} style={{ objectFit: 'cover', objectPosition: 'top center', width: '100%', height: '100%' }} />
                  <div className="program-card-overlay"></div>
                </div>
                <div className="program-card-body text-center">
                  <h4 className="program-card-title">{guest.name}</h4>
                  <p className="program-card-meta text-accent">{guest.title}</p>
                </div>
              </div>
            ))}
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
                  <OptimizedImage loading="lazy" src={ep.image} alt={ep.title} />
                  <div className="program-card-overlay"></div>
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
            <div className="section-tag"><span className="section-tag-dot"></span> EPISODES SECTION</div>
            <h2 className="h2" style={{ marginTop: '12px' }}>Watch Latest <span className="text-accent">Episodes.</span></h2>
            <p className="subheading" style={{ marginTop: '12px' }}>Deep conversations on: Politics, Entrepreneurship, Health, Society, Bihar, Youth Issues, Personal Growth.</p>
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
              <h2 className="h2" style={{ marginTop: '12px' }}>Short Conversations. <span className="text-accent">Big Impact.</span></h2>
              <p className="subheading" style={{ marginTop: '8px' }}>Explore viral podcast clips, emotional moments, trending discussions, and powerful insights from Vividh Talks for today’s fast-moving digital audience.</p>
            </div>
            <Link to="/episodes" className="btn btn-secondary">View All <ArrowRight size={16} /></Link>
          </div>

          <div className="video-testimonial-grid animate-on-scroll mt-8">
            {safeClips.slice(0, 8).map((clip, idx) => (
              <div className="video-testimonial-card" style={{ padding: '0', border: 'none', background: 'transparent', flex: '0 0 auto' }} key={clip.id}>
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

      {/* ═══════════════ WHY VIVIDH TALKS ═══════════════ */}
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
              <OptimizedImage loading="lazy" src="/guests/Shradhha Suman.webp" alt="Shraddha Suman" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', }} />
              <div className="host-preview-badge">Our Host</div>
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
                <a href="https://www.linkedin.com/in/shraddha-suman-7b71b363" target="_blank" rel="noreferrer" className="btn btn-secondary">Connect on LinkedIn</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ PLATFORM PRESENCE ═══════════════ */}
      <section className="platform-presence-section section-padding container">
        <div className="section-header animate-on-scroll">
          <div className="section-tag"><span className="section-tag-dot"></span> DISTRIBUTION</div>
          <h2 className="h2" style={{ marginTop: '12px', color: '#FF4D00', textTransform: 'uppercase', letterSpacing: '2px' }}>PLATFORM PRESENCE</h2>
        </div>

        <div className="platform-card animate-on-scroll glass-card">
          <div className="platform-grid">
            <div className="platform-img-col">
              <div className="platform-img-backdrop"></div>
              <img src="https://images.unsplash.com/photo-1589903308904-1010c2294adc?q=80&w=800&auto=format&fit=crop" alt="Podcaster" className="platform-img" loading="lazy" />
            </div>

            <div className="platform-content-col">
              <h3 className="h3 platform-title">Market Position</h3>

              <ul className="platform-list">
                <li><span className="bullet"></span> YouTube | Instagram | Facebook | Twitter | LinkedIn | Spotify</li>
                <li><span className="bullet"></span> Audio Podcast Platforms</li>
                <li><span className="bullet"></span> Short-form video platforms</li>
              </ul>

              <div className="platform-timeline">
                <div className="platform-line"></div>
                <div className="platform-nodes">
                  <a href="https://www.facebook.com/vividhtalks" target="_blank" rel="noreferrer" className="p-node animate-pulse" style={{ animationDelay: '0s' }}>
                    <svg viewBox="0 0 24 24" width="24" height="24" fill="#1877F2"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                  </a>
                  <a href="https://www.youtube.com/@TalksVividh" target="_blank" rel="noreferrer" className="p-node animate-pulse" style={{ animationDelay: '0.2s' }}>
                    <svg viewBox="0 0 24 24" width="24" height="24" fill="#FF0000"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
                  </a>
                  <a href="https://www.instagram.com/vividhtalks" target="_blank" rel="noreferrer" className="p-node animate-pulse" style={{ animationDelay: '0.4s' }}>
                    <svg viewBox="0 0 24 24" width="24" height="24" fill="#E1306C"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm3.975-10.875a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z" /></svg>
                  </a>
                  <a href="https://open.spotify.com/show/6VuPnQLjpYCCymWC1q3D1Z?si=a3e5efbd65f34d51" target="_blank" rel="noreferrer" className="p-node animate-pulse" style={{ animationDelay: '0.6s' }}>
                    <svg viewBox="0 0 24 24" width="24" height="24" fill="#1DB954"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.54.659.301 1.02zm1.44-3.3c-.301.42-.84.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.84.241 1.2zM20.16 9.6C16.32 7.32 9.48 7.08 5.52 8.28c-.6.18-1.2-.18-1.38-.72-.18-.6.18-1.2.72-1.38 4.56-1.32 12.12-1.08 16.56 1.56.54.36.72 1.08.36 1.62l-.001.001c-.36.54-1.08.72-1.619.239z" /></svg>
                  </a>
                  {/* <a href="#" target="_blank" rel="noreferrer" className="p-node animate-pulse" style={{ animationDelay: '0.8s' }}>
                    <svg viewBox="0 0 24 24" width="24" height="24" fill="#0A66C2"><path d="M22.23 0H1.77C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.77 24h20.46c.978 0 1.77-.773 1.77-1.729V1.729C24 .774 23.208 0 22.23 0zM7.12 20.452H3.558V9.034H7.12v11.418zM5.339 7.477c-1.144 0-2.069-.926-2.069-2.068 0-1.143.925-2.068 2.069-2.068 1.143 0 2.068.925 2.068 2.068 0 1.142-.925 2.068-2.068 2.068zM20.452 20.452h-3.562v-5.572c0-1.328-.025-3.037-1.85-3.037-1.851 0-2.133 1.445-2.133 2.939v5.67h-3.559V9.034h3.416v1.561h.048c.475-.9 1.636-1.85 3.366-1.85 3.6 0 4.27 2.372 4.27 5.455v6.252z"/></svg>
                  </a> */}
                  <a href="https://www.x.com/VividhTalks" target="_blank" rel="noreferrer" className="p-node animate-pulse" style={{ animationDelay: '1.0s' }}>
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="#fff"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                  </a>
                </div>
              </div>

              <p className="platform-tagline text-accent mt-6 font-medium">Ensuring maximum reach and discoverability for every guest.</p>
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
            <div className="creator-cta-bg" style={{ backgroundImage: 'url(/images/stats_bg.webp)' }}></div>
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
            <Fragment key={i}>
              <div className="step-card glass-card">
                <div className="step-number text-accent">{step.n}</div>
                <h3 className="h3">{step.title}</h3>
                <p className="text-secondary">{step.desc}</p>
              </div>
              {i < 2 && <div className="step-connector"></div>}
            </Fragment>
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
          {videoReviews.map((review, idx) => (
            <div
              className="video-testimonial-card glass-card"
              key={review.id}
              style={{ transitionDelay: `${idx * 0.1}s`, cursor: 'pointer' }}
              onClick={() => handleReviewClick(idx)}
            >
              <div className="video-player-placeholder video-testimonial-player" style={{ position: 'relative', width: '100%', aspectRatio: '9/12', backgroundColor: '#000', borderRadius: '12px', overflow: 'hidden' }}>
                <OptimizedImage
                  src={review.poster}
                  alt={review.guestName}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }}
                />
                <div className="play-overlay" style={{
                  position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  <button className="play-btn" style={{
                    background: 'rgba(255, 77, 0, 0.9)', border: 'none', borderRadius: '50%',
                    width: '60px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 4px 15px rgba(255, 77, 0, 0.4)', pointerEvents: 'none'
                  }}>
                    <Play size={28} fill="#fff" color="#fff" style={{ marginLeft: '4px' }} />
                  </button>
                </div>
              </div>
              <div className="video-testimonial-info">
                <h4 className="h4">{review.guestName}</h4>
                <p className="text-secondary text-sm">{review.guestRole}</p>
              </div>
            </div>
          ))}
        </div>

        <VideoReviewReel
          clips={formattedReviews}
          isOpen={isVideoReelOpen}
          onClose={() => setIsVideoReelOpen(false)}
          initialIndex={initialReelIndex}
        />
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
