import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Mic, Globe, Star, ArrowRight, Users, Radio, Headphones } from 'lucide-react';
import './About.css';

const teamMembers = [
  {
    name: 'Vikram Singh',
    role: 'Founder & Host',
    bio: 'The visionary behind Vividh Communications, bringing raw storytelling to the forefront of Indian media.',
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300',
    social: { linkedin: '#', instagram: '#' }
  },
  {
    name: 'Ananya Rao',
    role: 'Lead Audio Engineer',
    bio: 'Ensuring every whisper and laugh is captured with pristine studio clarity and professional depth.',
    img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300',
    social: { linkedin: '#' }
  },
  {
    name: 'Rahul Verma',
    role: 'Video Producer',
    bio: 'Crafting the visual narrative and directing multi-cam studio setups for maximum impact.',
    img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=300',
    social: { instagram: '#' }
  },
];

const values = [
  { icon: <Mic size={28} />, title: 'Creator-First', desc: 'We exist to amplify your voice, not ours. Every decision we make starts with the creator.' },
  { icon: <Globe size={28} />, title: 'India-Rooted', desc: 'Stories from here, heard everywhere. We celebrate what makes Indian voices unique.' },
  { icon: <Star size={28} />, title: 'No Compromise', desc: 'Studio-grade output, every single time. We never settle for "good enough."' },
];

const About = () => {
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
    <div className="about-page">

      {/* ─── HERO ─── */}
      <section className="about-hero-section">
        <div className="about-hero-bg" style={{ backgroundImage: 'url(/images/stats_bg.png)' }}></div>
        <div className="about-hero-overlay"></div>
        <div className="container about-hero-content">
          <div className="section-tag animate-on-scroll"><span className="section-tag-dot"></span> OUR STORY</div>
          <h1 className="h1 animate-on-scroll" style={{ marginTop: '16px', transitionDelay: '0.1s' }}>
            We're Not Just a<br />Podcast Studio.<br />
            <span className="text-accent">We're a Movement.</span>
          </h1>
          <p className="subheading animate-on-scroll" style={{ maxWidth: '650px', marginTop: '24px', color: 'rgba(255,255,255,0.8)', transitionDelay: '0.2s' }}>
            Vividh Talks was born from one belief: every person has a story worth sharing. We built the platform, the studio, and the community to make that happen.
          </p>
          <div className="animate-on-scroll" style={{ marginTop: '36px', transitionDelay: '0.3s' }}>
            <Link to="/book" className="btn btn-primary"><Mic size={18} /> Start Your Story</Link>
          </div>
        </div>
      </section>

      {/* ─── STATS BAR ─── */}
      <section className="about-stats-bar">
        <div className="container about-stats-grid">
          {[
            { icon: <Headphones size={20} />, val: '120K+', label: 'Monthly Listeners' },
            { icon: <Users size={20} />, val: '300+', label: 'Guest Speakers' },
            { icon: <Radio size={20} />, val: '40+', label: 'Curated Series' },
            { icon: <Star size={20} />, val: '98%', label: 'Satisfaction Rate' },
          ].map((s, i) => (
            <div className="about-stat-item animate-on-scroll" key={i} style={{ transitionDelay: `${i * 0.1}s` }}>
              <div className="about-stat-icon">{s.icon}</div>
              <div className="about-stat-val">{s.val}</div>
              <div className="about-stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── THE STORY ─── */}
      <section className="section-padding container">
        <div className="story-layout">
          <div className="story-text animate-on-scroll">
            <div className="section-tag"><span className="section-tag-dot"></span> WHY WE BUILT THIS</div>
            <h2 className="h2" style={{ marginTop: '16px', marginBottom: '24px' }}>The Origin<br /><span className="text-accent">of Vividh Talks</span></h2>
            <p className="body-text" style={{ color: 'rgba(255,255,255,0.75)', lineHeight: '1.8', marginBottom: '16px' }}>
              In 2023, we noticed something broken about how stories were told in India. The voices that mattered most — young founders, campus innovators, local changemakers — had no platform that truly represented them.
            </p>
            <p className="body-text" style={{ color: 'var(--accent-primary)', fontWeight: '700', fontSize: '22px', marginBottom: '16px' }}>
              So we built one.
            </p>
            <p className="body-text" style={{ color: 'rgba(255,255,255,0.75)', lineHeight: '1.8', marginBottom: '16px' }}>
              Vividh Talks is the content arm of Vividh Communications, built to give India's boldest voices a professional home. We don't just record — we craft, distribute, and amplify stories that move people.
            </p>
            <p className="body-text" style={{ color: 'rgba(255,255,255,0.75)', lineHeight: '1.8' }}>
              From students with a wild idea to brands with a message, we've helped creators at every stage. And we're just getting started.
            </p>
            <Link to="/book" className="btn btn-primary" style={{ marginTop: '32px' }}>
              Be Part of the Story <ArrowRight size={18} />
            </Link>
          </div>
          <div className="story-image animate-on-scroll" style={{ transitionDelay: '0.15s' }}>
            <div className="story-img-stack">
              <img src="https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?auto=format&fit=crop&q=80&w=800" alt="Studio Behind The Scenes" />
              <div className="story-img-badge">
                <span className="story-img-badge-num">3+</span>
                <span>Years<br />of Stories</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── VALUES ─── */}
      <section className="section-padding" style={{ background: 'rgba(0,0,0,0.25)' }}>
        <div className="container">
          <div className="text-center animate-on-scroll" style={{ marginBottom: '48px' }}>
            <div className="section-tag" style={{ justifyContent: 'center' }}><span className="section-tag-dot"></span> WHAT WE STAND FOR</div>
            <h2 className="h2" style={{ marginTop: '12px' }}>Our <span className="text-accent">Core Values</span></h2>
          </div>
          <div className="values-grid">
            {values.map((v, i) => (
              <div className="value-card animate-on-scroll" key={i} style={{ transitionDelay: `${i * 0.1}s` }}>
                <div className="value-icon">{v.icon}</div>
                <h3 className="value-title">{v.title}</h3>
                <p className="value-desc">{v.desc}</p>
                <div className="value-bar"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TEAM ─── */}
      <section className="section-padding container">
        <div className="text-center animate-on-scroll" style={{ marginBottom: '48px' }}>
          <div className="section-tag" style={{ justifyContent: 'center' }}><span className="section-tag-dot"></span> THE TEAM</div>
          <h2 className="h2" style={{ marginTop: '12px' }}>The People <span className="text-accent">Behind the Mic</span></h2>
        </div>
        <div className="team-grid">
          {teamMembers.map((m, i) => (
            <div className="team-card animate-on-scroll" key={i} style={{ transitionDelay: `${i * 0.1}s` }}>
              <div className="team-img-wrap">
                <img src={m.img} alt={m.name} />
                <div className="team-img-overlay"></div>
              </div>
              <div className="team-card-body">
                <h3 className="team-name">{m.name}</h3>
                <span className="team-role">{m.role}</span>
                <p className="team-bio">{m.bio}</p>
                <div className="team-socials">
                  {m.social.linkedin && <a href={m.social.linkedin} className="team-social-link">LinkedIn</a>}
                  {m.social.instagram && <a href={m.social.instagram} className="team-social-link">Instagram</a>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── ECOSYSTEM ─── */}
      <section className="section-padding" style={{ background: 'rgba(0,0,0,0.25)' }}>
        <div className="container">
          <div className="text-center animate-on-scroll" style={{ marginBottom: '48px' }}>
            <div className="section-tag" style={{ justifyContent: 'center' }}><span className="section-tag-dot"></span> THE VIVIDH UNIVERSE</div>
            <h2 className="h2" style={{ marginTop: '12px' }}>Part of Something <span className="text-accent">Bigger.</span></h2>
            <p className="subheading" style={{ maxWidth: '560px', margin: '12px auto 0' }}>A full-stack creative ecosystem built for brands, creators, and communities.</p>
          </div>
          <div className="ecosystem-grid animate-on-scroll">
            <div className="ecosystem-card glass-card">
              <h3>Vividh Communications</h3>
              <p className="text-secondary">Branding, Marketing &amp; Podcast Services</p>
              <a href="https://www.vividhcommunications.com/" className="text-accent mt-4 inline-block">Visit →</a>
            </div>
            <div className="ecosystem-card glass-card highlight">
              <h3>Vividh Talks</h3>
              <p className="text-secondary">Podcast Platform &amp; Creator Ecosystem</p>
              <span className="mono-label text-accent mt-4 inline-block">You Are Here</span>
            </div>
            <div className="ecosystem-card glass-card">
              <h3>Vividh Events</h3>
              <p className="text-secondary">Event Management &amp; Experiences</p>
              <a href="https://www.vividhevents.com/" className="text-accent mt-4 inline-block">Visit →</a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="about-cta-section section-padding">
        <div className="container text-center animate-on-scroll">
          <h2 className="h2" style={{ marginBottom: '16px' }}>Ready to Be Part of <span className="text-accent">the Story?</span></h2>
          <p className="subheading" style={{ marginBottom: '36px' }}>Your voice deserves a platform. We've built it for you.</p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link to="/book" className="btn btn-primary"><Mic size={18} /> Book a Session</Link>
            <Link to="/contact" className="btn btn-secondary">Get In Touch <ArrowRight size={18} /></Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;
