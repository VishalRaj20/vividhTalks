import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Mic, Play, ArrowRight, CheckCircle2, Headphones, Users, Radio, Star, Globe, TrendingUp } from 'lucide-react';
import PodcastCard from '../components/ui/PodcastCard';
import TestimonialCard from '../components/ui/TestimonialCard';
import { testimonials, categories, episodes as dummyEpisodes, clips as dummyClips } from '../data/dummyData';
import { useYouTubeData } from '../hooks/useYouTubeData';
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
  "/images/hero_studio.png",
  "/images/hero_2.png",
  "/images/hero_3.png",
];

const whyReasons = [
  { icon: <Mic size={32} />, title: 'Studio-Quality Production', desc: 'Professional-grade audio and video setup so every episode sounds and looks phenomenal.' },
  { icon: <Globe size={32} />, title: 'Global Distribution', desc: 'Published across Spotify, YouTube, Apple Podcasts & more — all from a single recording session.' },
  { icon: <TrendingUp size={32} />, title: 'Built-in Growth', desc: 'From thumbnails to reels, we create everything you need to grow your audience fast.' },
  { icon: <Users size={32} />, title: 'Expert Collaboration', desc: 'Our experienced hosts and editors work alongside you to craft compelling stories.' },
];

const Home = () => {
  const { episodes, clips, loading } = useYouTubeData();
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

      {/* ═══════════════ HERO ═══════════════ */}
      <section className="hero-echoes-fullscreen">
        <div className="hero-bg-carousel">
          {heroImages.map((img, i) => (
            <div key={i} className={`hero-bg-slide slide-${i + 1}`} style={{ backgroundImage: `url(${img})` }}></div>
          ))}
          <div className="hero-overlay-dark"></div>
        </div>
        <div className="container hero-fullscreen-content">
          <span className="hero-live-badge animate-on-scroll"><span className="live-dot"></span> LIVE ON AIR</span>
          <h1 className="h1 animate-on-scroll" style={{ transitionDelay: '0.1s' }}>
            Where Stories<br />
            <span className="text-accent">Come Alive.</span>
          </h1>
          <p className="hero-subtext subheading animate-on-scroll" style={{ transitionDelay: '0.15s', maxWidth: '560px', marginTop: '20px', color: 'rgba(255,255,255,0.85)' }}>
            India's boldest podcast platform for creators, founders, and voices that deserve to be heard.
          </p>
          <div className="hero-ctas animate-on-scroll" style={{ transitionDelay: '0.2s', marginTop: '36px' }}>
            <Link to="/book" className="btn btn-primary"><Mic size={18} /> Start Your Podcast</Link>
            <Link to={`/episode/${safeEpisodes[0].id}`} className="btn btn-secondary" style={{ marginLeft: '14px' }}>
              <Play size={18} /> Watch Latest
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════ STATS BAR ═══════════════ */}
      <section className="stats-bar-section">
        <div className="container stats-bar-grid">
          <StatItem value={120} suffix="K+" label="Monthly Listeners" icon={Headphones} />
          <StatItem value={300} suffix="+" label="Guest Speakers" icon={Users} />
          <StatItem value={40} suffix="+" label="Curated Series" icon={Radio} />
          <StatItem value={98} suffix="%" label="Listener Satisfaction" icon={Star} />
        </div>
      </section>

      {/* ═══════════════ MARQUEE ═══════════════ */}
      <section className="marquee-section">
        <div className="marquee-container">
          <div className="marquee-content">
            🎙 VIVIDH TALKS <span className="dot">·</span> STORYTELLING FOR THE BOLD <span className="dot">·</span> CREATORS <span className="dot">·</span> FOUNDERS <span className="dot">·</span> BRANDS <span className="dot">·</span> VIVIDH COMMUNICATIONS <span className="dot">·</span> MADE IN INDIA <span className="dot">·</span> RECORD YOUR STORY <span className="dot">·</span>
            🎙 VIVIDH TALKS <span className="dot">·</span> STORYTELLING FOR THE BOLD <span className="dot">·</span> CREATORS <span className="dot">·</span> FOUNDERS <span className="dot">·</span> BRANDS <span className="dot">·</span> VIVIDH COMMUNICATIONS <span className="dot">·</span> MADE IN INDIA <span className="dot">·</span> RECORD YOUR STORY <span className="dot">·</span>
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
                  style={{ objectFit: 'cover', minHeight: '200px' }}
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
        </div>
        <div className="shorts-scroll-outer">
          <div className="shorts-scroll-track animate-on-scroll">
            {safeClips.map((clip, idx) => (
              <div className="short-card" key={clip.id} style={{ transitionDelay: `${idx * 0.07}s` }}>
                <div className="short-card-thumb">
                  <img src={clip.image} alt={clip.title} />
                  <div className="short-card-overlay"></div>
                  <span className="short-duration">{clip.duration}</span>
                  <div className="short-play-btn">
                    <Play size={22} fill="currentColor" />
                  </div>
                  <div className="short-views">{clip.views}</div>
                </div>
                <div className="short-card-body">
                  <p className="short-card-title">{clip.title}</p>
                  <span className="short-card-meta">{clip.timeAgo}</span>
                </div>
              </div>
            ))}
          </div>
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

      {/* ═══════════════ TESTIMONIALS ═══════════════ */}
      <section className="testimonials-section section-padding container">
        <div className="text-center animate-on-scroll">
          <div className="section-tag" style={{ justifyContent: 'center' }}><span className="section-tag-dot"></span> LISTENER LOVE</div>
          <h2 className="h2" style={{ marginTop: '12px' }}>Real Stories. <span className="text-accent">Real Impact.</span></h2>
        </div>
        <div className="testimonials-grid" style={{ marginTop: '48px' }}>
          {testimonials.map((test, idx) => (
            <div className="animate-on-scroll" style={{ transitionDelay: `${idx * 0.1}s` }} key={test.id}>
              <TestimonialCard testimonial={test} />
            </div>
          ))}
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

      {/* ═══════════════ NEWSLETTER ═══════════════ */}
      <section className="newsletter-section section-padding">
        <div className="container">
          <div className="newsletter-card animate-on-scroll">
            <div className="newsletter-icon">📬</div>
            <h2 className="h2" style={{ textAlign: 'center' }}>Stay In The Loop</h2>
            <p className="subheading" style={{ textAlign: 'center', marginTop: '12px' }}>
              Get fresh episode drops, behind-the-scenes content, and studio updates.
            </p>
            <form className="newsletter-form-row" onSubmit={e => e.preventDefault()}>
              <input type="email" placeholder="Enter your email address" className="newsletter-input-main" />
              <button type="submit" className="btn btn-primary">Subscribe <ArrowRight size={16} /></button>
            </form>
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
