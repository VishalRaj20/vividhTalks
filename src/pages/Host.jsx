import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Mic, Eye, Briefcase } from 'lucide-react';
import SEO from '../components/SEO';

const hostData = {
  name: 'Shraddha Suman',
  role: 'Founder & Host, Vividh Talks',
  subtitle: 'Entrepreneur • Podcast Host • Storyteller',
  img: '/guests/Shradhha Suman.jpeg',
  social: {
    linkedin: 'https://www.linkedin.com/in/shraddha-suman-7b71b363',
    instagram: 'https://www.instagram.com/shraddd_ha'
  },
  bio: 'Shraddha Suman is an entrepreneur, podcast host and storyteller passionate about creating meaningful conversations that inspire people, challenge perspectives and bring real stories to the forefront.\n\nHer journey began with a simple belief:\nEvery person has a story powerful enough to inspire change.\n\nComing from a business and communication background, Shraddha always believed that conversations have the power to educate, connect and create impact beyond social media trends and surface-level content. This vision eventually led to the creation of Vividh Talks — a modern Indian media and podcast platform focused on authentic voices, diverse perspectives and impactful storytelling.\n\nWhat started as an idea to create meaningful content gradually evolved into a platform featuring entrepreneurs, creators, leaders, doctors, educators, artists and inspiring personalities from across India.\n\nAs a host, Shraddha is known for her calm presence, thoughtful questions and ability to create genuine conversations that go beyond scripted interviews. Through Vividh Talks, her vision is to build a platform that represents ambitious minds, diverse stories and conversations that truly matter in today’s world.',
  points: [
    { label: 'The Visionary', icon: <Eye size={32} className="text-accent" />, text: 'Coming from a business and communication background, Shraddha always believed that conversations have the power to educate, connect and create impact beyond social media trends and surface-level content.' },
    { label: 'The Interviewer', icon: <Mic size={32} className="text-accent" />, text: 'Her hosting style is deep, empathetic and research-driven. She doesn’t just ask questions; she explores the "why" and "how" behind every guest’s journey.' },
    { label: 'The Entrepreneur', icon: <Briefcase size={32} className="text-accent" />, text: 'Beyond the mic, she is actively building Vividh Communications and Vividh Events, scaling businesses that revolve around impactful storytelling and community building.' }
  ],
  quote: '"Every person has a story powerful enough to inspire change."',
  expertise: ['Entrepreneurship', 'Brand Building', 'Storytelling', 'Media'],
  highlights: [
    { title: 'The Launch of Vividh Talks', desc: 'Starting a movement of meaningful conversations.' },
    { title: '100+ Hours of Interviews', desc: 'Deep dives with founders, creators, and politicians.' },
    { title: 'Building a Community', desc: 'Connecting like-minded individuals across India.' }
  ]
};

const Host = () => {
  useEffect(() => {
    window.scrollTo(0, 0);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="host-page">
      <SEO
        title={`${hostData.name} - Our Host`}
        description={hostData.bio.substring(0, 150) + '...'}
      />

      {/* HERO SECTION */}
      <section className="host-hero">
        <div className="host-hero-bg">
          <div className="host-hero-overlay"></div>
        </div>
        <div className="container host-hero-container">
          <div className="host-hero-content animate-on-scroll">
            <div className="section-tag" style={{ marginBottom: '12px' }}><span className="section-tag-dot"></span> MEET THE HOST</div>
            <h1 className="h1" style={{ marginBottom: '12px' }}>{hostData.name}</h1>
            <p className="host-hero-subtitle text-accent" style={{ marginBottom: '28px', letterSpacing: '2px' }}>{hostData.subtitle}</p>
            <p className="host-hero-bio max-w-2xl" style={{ whiteSpace: 'pre-line', marginBottom: '28px' }}>{hostData.bio}</p>
            <div className="host-hero-buttons" style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <a href={hostData.social.linkedin} target="_blank" rel="noreferrer" className="btn btn-primary">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg> Connect on LinkedIn
              </a>
              <a href={hostData.social.instagram} target="_blank" rel="noreferrer" className="btn btn-secondary">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg> Follow on IG
              </a>
            </div>
          </div>
          <div className="host-hero-image-wrapper animate-on-scroll" style={{ transitionDelay: '0.2s' }}>
            <div className="host-hero-image-inner">
              <img loading="lazy" src={hostData.img} alt={hostData.name} />
              <div className="host-hero-image-deco"></div>
            </div>
          </div>
        </div>
      </section>

      {/* THE JOURNEY SECTION */}
      <section className="section-padding host-journey-section">
        <div className="container">
          <div className="text-center animate-on-scroll mb-16">
            <h2 className="h2">The <span className="text-accent">Journey</span></h2>
            <p className="subheading mx-auto mt-4 max-w-2xl">
              From the vision of creating meaningful dialogues to sitting across from India's most inspiring minds.
            </p>
          </div>

          <div className="host-points-grid">
            {hostData.points.map((point, idx) => (
              <div className="host-point-card animate-on-scroll glass-card p-8" key={idx} style={{ transitionDelay: `${idx * 0.15}s` }}>
                <div className="host-point-icon mb-4">
                  {point.icon}
                </div>
                <h3 className="h4 mb-3">{point.label}</h3>
                <p className="text-secondary">{point.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* QUOTE SECTION */}
      <section className="host-quote-section section-padding">
        <div className="container">
          <div className="host-quote-box animate-on-scroll glass-card text-center p-5">
            <div className="quote-icon">"</div>
            <h3 className="h3 mb-6 mx-auto max-w-4xl" style={{ fontWeight: '500', marginLeft: '150px', lineHeight: '1.4' }}>{hostData.quote}</h3>
            <p className="flex justify-center text-accent font-mono text-xl">— {hostData.name}</p>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="section-padding" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div className="container animate-on-scroll" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h2 className="h2 mb-4">Want to be on the show?</h2>
          <p className="subheading mb-8" style={{ maxWidth: '500px', marginBottom: "20px", textAlign: 'center' }}>We are always looking for inspiring stories and unique perspectives.</p>
          <Link to="/nominate-guest" className="btn btn-primary"><Mic size={18} /> Nominate a Guest</Link>
        </div>
      </section>
    </div>
  );
};

export default Host;
