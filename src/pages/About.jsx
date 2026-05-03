import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Mic, Globe, Star, ArrowRight, Users, Radio, Headphones, Target, Eye, Shield, CheckCircle2, Zap, TrendingUp, Award } from 'lucide-react';
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
        <div className="about-hero-bg" style={{ backgroundImage: 'url(/creators_with_mic.png)' }}></div>
        <div className="about-hero-overlay"></div>
        <div className="container about-hero-content">
          <div className="section-tag animate-on-scroll"><span className="section-tag-dot"></span> ESTABLISHED 2025</div>
          <h1 className="h1 animate-on-scroll" style={{ marginTop: '16px', transitionDelay: '0.1s' }}>
            Conversations. Stories.<br />
            <span className="text-accent">Thought Leadership.</span>
          </h1>
          <p className="subheading animate-on-scroll" style={{ maxWidth: '700px', marginTop: '24px', color: 'rgba(255,255,255,0.9)', transitionDelay: '0.2s' }}>
            Vividh Talks is a content-driven talk show & media platform focused on meaningful conversations. We help individuals turn their experiences into powerful digital influence.
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
                In a fast-paced world of shallow content, Vividh Talks is created to slow conversations down and focus on depth, authenticity and meaningful insights. 
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
                <img src="/creators_with_mic.png" alt="Creators With The Mic" />
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

      {/* ─── WHY VIVIDH TALKS & VALUE ─── */}
      <section className="section-padding" style={{ background: 'rgba(0,0,0,0.2)' }}>
        <div className="container">
          <div className="grid grid-2">
            <div className="animate-on-scroll">
              <h2 className="h2 mb-8">Why <span className="text-accent">Vividh Talks?</span></h2>
              <div className="about-why-grid">
                {[
                  { title: 'Depth & Visibility', desc: 'Focus on meaningful content that also builds your reach.' },
                  { title: 'Unscripted', desc: 'Honest, raw, and authentic conversations.' },
                  { title: 'Strong Storytelling', desc: 'Narratives that highlight your unique journey.' },
                  { title: 'Personal Brand', desc: 'Digital visibility that establishes authority.' },
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
                <div className="va-item mb-6">
                  <TrendingUp className="text-accent mb-2" />
                  <h4>Practical Learning</h4>
                  <p className="text-secondary">Insights and lessons you can actually use.</p>
                </div>
                <div className="va-item mb-6">
                  <Award className="text-accent mb-2" />
                  <h4>Credible Voices</h4>
                  <p className="text-secondary">Knowledge from experts you can trust.</p>
                </div>
                <div className="va-item">
                  <Zap className="text-accent mb-2" />
                  <h4>Real Motivation</h4>
                  <p className="text-secondary">Inspiration rooted in real-life struggles and success.</p>
                </div>
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
              'Positioning as a credible digital media platform',
              'Larger formats for guest features'
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
