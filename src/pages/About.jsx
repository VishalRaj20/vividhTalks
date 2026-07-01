import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Mic, Globe, Star, ArrowRight, Users, Radio, Headphones, Target, Eye, Shield, CheckCircle2, Zap, TrendingUp, Award } from 'lucide-react';
import SEO from '../components/SEO';
import './About.css';

const hosts = [
  {
    name: 'Shraddha Suman',
    role: 'Main Host & Creator',
    subtitle: 'Entrepreneur, Host & Storyteller',
    bio: 'Shraddha Suman is an entrepreneur, host, and storyteller passionate about creating meaningful conversations.',
    style: 'Known for a calm presence and guiding genuine conversations.',
    points: [
      { label: 'The Visionary', text: 'Entrepreneur, host and storyteller passionate about creating meaningful conversations.' },
      { label: 'The Foundation', text: 'Utilizing her communication background to foster deeply impactful conversations.' },
      { label: 'Hosting Style', text: 'Known for a calm presence and guiding genuine conversations.' },
      { label: 'Her Mission', text: 'Building a platform for diverse stories and ambitious minds.' }
    ],
    expertise: ['Empathetic Hosting', 'Branding & Stories', 'Impact Conversations'],
    img: '/guests/Shradhha Suman.webp',
    social: { linkedin: 'https://linkedin.com', instagram: 'https://instagram.com' },
    quote: "Every person has a story powerful enough to inspire change"
  }
];

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

const featuredGuests = [
  {
    name: 'Deepak Thakur',
    role: 'Playback Singer & Bigg Boss Fame',
    img: '/guests/Deepak Thakur.webp'
  },
  {
    name: 'Shubham Raj',
    role: 'Director - Garda Media',
    img: '/guests/Shubham Raj.webp'
  },
  {
    name: 'Sujit Kumar Mishra',
    role: 'Founder & CEO - Thikedaar.com',
    img: '/guests/Sujit Kumar Mishra.webp'
  },
  {
    name: 'Preeti Singh',
    role: 'Associate Professor - RSMT College',
    img: '/guests/Preeti Singh.webp'
  },
  {
    name: 'Abhishek Tiwary',
    role: 'Political Analyst & Election Psychologist',
    img: '/guests/Abhishek Tiwary.webp'
  },
  {
    name: 'Aditya Raj',
    role: 'National President - Yuva Wahini Bharat',
    img: '/guests/Aditya Raj.webp'
  },
  {
    name: 'Dr. Kishlay',
    role: 'Metabolic Doctor',
    img: '/guests/Dr. Kishlay.webp'
  },
  {
    name: 'Dr. Shubhash Krishna',
    role: 'Programminng Director & DGM - Radio City',
    img: '/guests/Dr. Shubhash Krishna.webp'
  },
  {
    name: 'Sneham Choudhary',
    role: 'Internationally Certified Image Consultant & Fashion Stylist',
    img: '/guests/Sneham Choudhary.webp'
  },
  {
    name: 'Satyam Parkhi',
    role: 'Founder - Chicka Litti & Parkhi Production',
    img: '/guests/Satyam Parkhi.webp'
  },
  {
    name: 'Vikash Aryan',
    role: 'Actor & Founder - Actor Chaiwala',
    img: '/guests/Vikash Aryan.webp'
  },
  {
    name: 'Pd. Shree Abhay Krishan Jee Maharaj',
    role: 'Political Astrologer',
    img: '/guests/Pd. Shree Abhay Krishan Jee Maharaj.webp'
  }
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
      <SEO 
        title="About Us"
        description="Vividh Talks is a content-driven talk show & media platform focused on meaningful conversations. Learn about our hosts and our mission."
      />
      {/* ─── HERO ─── */}
      <section className="about-hero-section">
        <div className="about-hero-bg" style={{ backgroundImage: 'url(/creators_with_mic.png)' }}></div>
        <div className="about-hero-overlay"></div>
        <div className="container about-hero-content">
          <div className="section-tag animate-on-scroll" style={{ justifyContent: 'center' }}><span className="section-tag-dot"></span> ESTABLISHED 2025</div>
          <h1 className="h1 animate-on-scroll" style={{ marginTop: '16px', transitionDelay: '0.1s' }}>
            Conversations. Stories.<br />
            <span className="text-accent">Thought Leadership.</span>
          </h1>
          <p className="subheading animate-on-scroll" style={{ maxWidth: '700px', marginTop: '24px', color: 'rgba(255,255,255,0.9)', transitionDelay: '0.2s' }}>
            Vividh Talks is a content-driven talk show & media platform focused on meaningful conversations. We help individuals turn their experiences and expertise into powerful digital content that builds influence. The platform brings real stories, expert insights and diverse perspectives to audiences through honest dialogue and impactful storytelling.
          </p>
          <div className="animate-on-scroll" style={{ marginTop: '36px', transitionDelay: '0.3s' }}>
            <Link to="/book" className="btn btn-primary"><Mic size={18} /> Start Your Story</Link>
          </div>
        </div>
      </section>

      {/* ─── MISSION & VISION ─── */}
      <section className="section-padding">
        <div className="container">
          <div className="mission-vision-grid">
            <div className="mv-card animate-on-scroll">
              <div className="mv-icon"><Target size={32} /></div>
              <h2 className="h2 mb-4">Our <span className="text-accent">Mission</span></h2>
              <p className="body-text">
                Create meaningful conversations delivering real insights, practical learning, and authentic perspectives, while helping guests build a strong personal brand through impactful content.
              </p>
            </div>
            <div className="mv-card animate-on-scroll" style={{ transitionDelay: '0.2s' }}>
              <div className="mv-icon"><Eye size={32} /></div>
              <h2 className="h2 mb-4">Our <span className="text-accent">Vision</span></h2>
              <p className="body-text">
                Become India’s go-to platform for credible conversations where audiences learn deeply and individuals share their stories while growing their digital presence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CORE VALUES ─── */}
      <section className="section-padding" style={{ background: 'rgba(255,77,0,0.03)' }}>
        <div className="container">
          <div className="text-center animate-on-scroll mb-12">
            <div className="section-tag" style={{ justifyContent: 'center' }}><span className="section-tag-dot"></span> CORE VALUES</div>
            <h2 className="h2 mt-4">What We <span className="text-accent">Stand For</span></h2>
          </div>
          <div className="values-grid">
            {[
              { icon: <Star />, title: 'Authentic Storytelling', desc: 'Real experiences over scripted narratives.' },
              { icon: <Award />, title: 'Knowledge Sharing', desc: 'Practical learning and credible insights.' },
              { icon: <Mic />, title: 'Meaningful Conversations', desc: 'Focus on depth and authenticity.' },
              { icon: <Globe />, title: 'Inclusivity of Voices', desc: 'Representing diverse perspectives across India.' },
              { icon: <Shield />, title: 'Consistency & Credibility', desc: 'Building trust through lasting value.' },
            ].map((v, i) => (
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

      {/* ─── PHILOSOPHY ─── */}
      <section className="section-padding">
        <div className="container">
          <div className="story-layout">
            <div className="story-text animate-on-scroll">
              <div className="section-tag"><span className="section-tag-dot"></span> THE PHILOSOPHY</div>
              <h2 className="h2 mt-4 mb-6">The Idea Behind<br /><span className="text-accent">Vividh Talks</span></h2>
              <p className="body-text mb-6">
                In a fast-paced world of shallow content, Vividh Talks is created to slow conversations down and focus on depth, authenticity and meaningful insights. We highlight real experiences over scripted narratives and provide individuals a powerful, structured platform to share their journeys with clarity, impact and lasting value.
              </p>
              <div className="feature-list">
                <div className="feature-item"><CheckCircle2 size={18} className="text-accent" /> <span>Pan India Reach</span></div>
                <div className="feature-item"><CheckCircle2 size={18} className="text-accent" /> <span>Digital Influence Building</span></div>
                <div className="feature-item"><CheckCircle2 size={18} className="text-accent" /> <span>Impactful Storytelling</span></div>
              </div>
            </div>
            <div className="story-image animate-on-scroll">
              <div className="glass-card p-8">
                <h3 className="h3 mb-6">Who We <span className="text-accent">Feature</span></h3>
                <ul className="custom-list">
                  <li><CheckCircle2 size={16} className="text-accent" /> Founders & Entrepreneurs</li>
                  <li><CheckCircle2 size={16} className="text-accent" /> Industry Experts & Professionals</li>
                  <li><CheckCircle2 size={16} className="text-accent" /> Educators, Creators & Influencers</li>
                  <li><CheckCircle2 size={16} className="text-accent" /> Artists & Cultural Voices</li>
                  <li><CheckCircle2 size={16} className="text-accent" /> People with impactful life journeys</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CREATORS (PEOPLE WITH THE MIC) ─── */}
      <section className="section-padding" style={{ background: 'rgba(255,77,0,0.02)' }}>
        <div className="container">
          <div className="creators-layout">
            <div className="creators-image animate-on-scroll">
              <div className="creators-img-wrap">
                <img src="/guests/creators_with_mic.webp" alt="Creators With The Mic" />
                <div className="creators-img-glow"></div>
              </div>
            </div>
            <div className="creators-text animate-on-scroll" style={{ transitionDelay: '0.2s' }}>
              <div className="section-tag"><span className="section-tag-dot"></span> THE VOICES</div>
              <h2 className="h2" style={{ marginTop: '16px' }}>The People <span className="text-accent">With the Mic</span></h2>
              <p className="body-text mt-6" style={{ color: 'rgba(255,255,255,0.8)', lineHeight: '1.8' }}>
                From visionary startup founders to inspiring campus leaders, our mic has been a home for those who dare to speak their truth. We've hosted over 300+ guests who are shaping the future of India, one conversation at a time.
              </p>
              <div className="creators-stats mt-8">
                <div className="c-stat">
                  <span className="c-stat-num">300+</span>
                  <span className="c-stat-label">Voices Heard</span>
                </div>
                <div className="c-stat">
                  <span className="c-stat-num">12+</span>
                  <span className="c-stat-label">Cities Reached</span>
                </div>
                <div className="c-stat">
                  <span className="c-stat-num">Infinite</span>
                  <span className="c-stat-label">Impact</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── MEET THE HOSTS ─── */}
      <section id="hosts" className="hosts-section section-padding">
        <div className="container">
          <div className="text-center animate-on-scroll mb-12">
            <div className="section-tag" style={{ justifyContent: 'center' }}><span className="section-tag-dot"></span> THE VOICES BEHIND THE SHOW</div>
            <h2 className="h2 mt-4">Meet Our <span className="text-accent">Hosts</span></h2>
            <p className="subheading mx-auto mt-4 text-2xl">
              The dynamic interviewers who drive our conversations, challenge perspectives, and bring stories to life.
            </p>
          </div>

          <div className="hosts-layout-grid">
            {hosts.map((host, i) => (
              <div className="host-profile-card animate-on-scroll" key={i} style={{ transitionDelay: `${i * 0.15}s` }}>
                <div className="host-image-container">
                  <img src={host.img} alt={host.name} />
                  <div className="host-image-overlay"></div>
                  <div className="host-social-links">
                    <a href={host.social.linkedin} target="_blank" rel="noreferrer" className="host-social-link-btn">LinkedIn</a>
                    <a href={host.social.instagram} target="_blank" rel="noreferrer" className="host-social-link-btn">Instagram</a>
                  </div>
                </div>
                <div className="host-info-container">
                  <span className="host-badge-role">{host.role}</span>
                  <h3 className="host-card-name">{host.name}</h3>
                  <p className="host-card-subtitle">{host.subtitle}</p>

                  {host.points ? (
                    <ul className="host-points-list" style={{ listStyle: 'none', padding: 0, margin: '20px 0' }}>
                      {host.points.map((pt, idx) => (
                        <li key={idx} style={{ marginBottom: '12px', display: 'flex', alignItems: 'flex-start', gap: '8px', textAlign: 'left' }}>
                          <span style={{ color: 'var(--accent-primary)', fontSize: '18px', lineHeight: '1' }}>•</span>
                          <span className="body-text" style={{ fontSize: '16px', lineHeight: '1.6', color: 'rgba(255,255,255,0.85)' }}>
                            <strong>{pt.label}:</strong> {pt.text}
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <>
                      <p className="host-card-bio">{host.bio}</p>
                      <div className="host-meta-item">
                        <span className="host-meta-label">Hosting Style: </span>
                        <span className="host-meta-value">{host.style}</span>
                      </div>
                    </>
                  )}

                  <div className="host-expertise-tags">
                    {host.expertise.map((exp, idx) => (
                      <span key={idx} className="expertise-tag">{exp}</span>
                    ))}
                  </div>

                  <div className="host-quote-block">
                    <p className="host-quote-text">"{host.quote}"</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TEAM (PEOPLE BEHIND THE MIC) ─── */}
      <section className="section-padding">
        <div className="container">
          <div className="text-center animate-on-scroll mb-12">
            <div className="section-tag" style={{ justifyContent: 'center' }}><span className="section-tag-dot"></span> THE TEAM</div>
            <h2 className="h2 mt-4">The People <span className="text-accent">Behind the Mic</span></h2>
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
        </div>
      </section>

      {/* ─── FEATURED GUESTS ─── */}
      <section className="featured-guests-section section-padding">
        <div className="container">
          <div className="text-center animate-on-scroll mb-12">
            <h2 className="featured-guests-title">
              FEATURED <span className="text-stroke-orange">GUESTS</span>
            </h2>
            <div className="featured-guests-separator">
              <span className="dot"></span>
              <span className="line"></span>
              <span className="circle"></span>
              <span className="line"></span>
              <span className="dot"></span>
            </div>
            <p className="featured-guests-subtitle">
              Conversations with change-makers shaping modern India
            </p>
          </div>
          <div className="featured-guests-grid">
            {featuredGuests.map((guest, i) => (
              <div className="featured-guest-card animate-on-scroll" key={i} style={{ transitionDelay: `${(i % 6) * 0.08}s` }}>
                <div className="featured-guest-img-wrap">
                  <img src={guest.img} alt={guest.name} />
                </div>
                <div className="featured-guest-info">
                  <h4 className="featured-guest-name">{guest.name}</h4>
                  <p className="featured-guest-role">{guest.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WHY VIVIDH TALKS & VALUE ─── */}
      <section className="section-padding" style={{ background: 'rgba(0,0,0,0.2)' }}>
        <div className="container">
          <div className="grid grid-2">
            <div className="animate-on-scroll">
              <h2 className="h2 mb-8">Why <span className="text-accent">Vividh Talks?</span></h2>
              <div className="about-why-grid">
                {[
                  { title: 'Focus on depth, along with visibility', desc: 'Focus on meaningful content that also builds your reach.' },
                  { title: 'Honest, unscripted conversations', desc: 'Honest, raw, and authentic conversations.' },
                  { title: 'Strong Storytelling That Highlights You', desc: 'Narratives that highlight your unique journey.' },
                  { title: 'Personal Brand Visibility', desc: 'Digital visibility that establishes authority.' },
                  { title: 'Content that educates, inspires & engages', desc: 'Content created to deliver lasting value.' },
                ].map((w, i) => (
                  <div className="why-item" key={i}>
                    <Zap size={20} className="text-accent" />
                    <div>
                      <h4 className="font-bold">{w.title}</h4>
                      <p className="text-secondary text-sm">{w.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="animate-on-scroll" style={{ transitionDelay: '0.2s' }}>
              <h2 className="h2 mb-8">Value for <span className="text-accent">Audience</span></h2>
              <div className="value-audience-box glass-card p-8">
                {[
                  { icon: <TrendingUp className="text-accent mb-2" />, title: 'Practical learnings & insights', desc: 'Insights and lessons you can actually use.' },
                  { icon: <CheckCircle2 className="text-accent mb-2" />, title: 'Real-life experiences & lessons', desc: 'Narratives based on true personal journeys.' },
                  { icon: <Award className="text-accent mb-2" />, title: 'Industry knowledge from credible voices', desc: 'Knowledge from experts you can trust.' },
                  { icon: <Zap className="text-accent mb-2" />, title: 'Motivation rooted in reality', desc: 'Inspiration grounded in real-life struggles and success.' },
                ].map((item, idx) => (
                  <div className="va-item mb-6" key={idx} style={{ marginBottom: idx === 3 ? '0' : '24px' }}>
                    {item.icon}
                    <h4>{item.title}</h4>
                    <p className="text-secondary">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FUTURE VISION ─── */}
      <section className="section-padding">
        <div className="container">
          <div className="text-center animate-on-scroll mb-12">
            <div className="section-tag" style={{ justifyContent: 'center' }}><span className="section-tag-dot"></span> LOOKING AHEAD</div>
            <h2 className="h2 mt-4">Our <span className="text-accent">Future Vision</span></h2>
          </div>
          <div className="future-grid">
            {[
              'Expanding into panel discussions & live talk formats',
              'Thematic series on business, culture & society',
              'Collaborations with national-level voices',
              'Positioning Vividh Talks as a credible digital media platform',
              'Creating more opportunities for guests to be featured in larger conversations and formats.'
            ].map((v, i) => (
              <div className="future-card animate-on-scroll" key={i} style={{ transitionDelay: `${i * 0.1}s` }}>
                <div className="future-dot"></div>
                <p>{v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="about-cta-section section-padding">
        <div className="container text-center animate-on-scroll">
          <h2 className="h2 mb-4">Let’s talk about <span className="text-accent">stories that matter.</span></h2>
          <p className="subheading mb-8">Join the movement of meaningful conversations.</p>
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
