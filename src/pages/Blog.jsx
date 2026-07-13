import { useEffect } from 'react';
import { BookOpen } from 'lucide-react';
import SEO from '../components/SEO';
import './EnhancedStyles.css';

const topics = [
  { title: 'Entrepreneurship', image: '/blog-image/entrepreneurship.webp' },
  { title: 'Politics & Society', image: '/blog-image/politics.webp' },
  { title: 'Health & Wellness', image: '/blog-image/health.webp' },
  { title: 'Startups & Business', image: '/blog-image/business.webp' },
  { title: 'Personal Growth', image: '/blog-image/personal_growth.webp' },
  { title: 'Youth Culture', image: '/blog-image/youth.webp' },
  { title: 'Women Empowerment', image: '/blog-image/women.webp' },
  { title: 'Social Issues', image: '/blog-image/social_issues.webp' },
  { title: 'Media & Content', image: '/blog-image/media.webp' },
  { title: 'Social Trends', image: '/blog-image/trends.webp' },
  { title: 'Creator Economy', image: '/blog-image/creator.webp' },
  { title: 'Digital Growth', image: '/blog-image/digital.webp' }
];

const Blog = () => {
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
    <div className="contact-page">
      <SEO 
        title="Stories, Ideas & Perspectives"
        description="Read insights on Entrepreneurship, Politics & Society, Health & Wellness, Startups, and more."
      />
      <section className="contact-hero section-padding" style={{ position: 'relative', overflow: 'hidden', paddingTop: '220px', paddingBottom: '140px' }}>
        <div className="contact-hero-bg" style={{ backgroundImage: 'url(/podcast_episodes_hero.webp)', filter: 'brightness(0.4)', backgroundPosition: 'center', backgroundSize: 'cover' }}></div>
        <div className="contact-hero-overlay" style={{ background: 'linear-gradient(to bottom, rgba(10,10,12,0.2) 0%, rgba(10,10,12,1) 100%)' }}></div>
        <div className="container relative text-center">
          <div className="section-tag animate-on-scroll" style={{ justifyContent: 'center' }}><span className="section-tag-dot"></span> VIVIDH BLOG</div>
          <h1 className="h1 animate-on-scroll" style={{ marginTop: '24px', transitionDelay: '0.1s' }}>
            Stories, Ideas & <span className="text-accent">Perspectives</span>
          </h1>
          <p className="subheading animate-on-scroll" style={{ maxWidth: '600px', margin: '24px auto 0', transitionDelay: '0.15s', color: 'rgba(255,255,255,0.9)' }}>
            Read insights and deep dives on the topics that matter most to modern India.
          </p>
        </div>
      </section>

      <section className="container section-padding" style={{ paddingTop: '80px' }}>
        <div 
          className="categories-premium-grid animate-on-scroll"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '30px',
            width: '100%'
          }}
        >
          {topics.map((topic, idx) => (
            <div 
              className="cat-premium-card tilt-hover-card" 
              key={idx}
              style={{
                display: 'block',
                padding: '0',
                overflow: 'hidden',
                borderRadius: '16px',
                border: '1px solid rgba(255,255,255,0.05)',
                background: 'rgba(26,26,34,0.6)',
                cursor: 'pointer'
              }}
            >
              <div 
                className="cat-image-wrapper"
                style={{
                  height: '180px',
                  width: '100%',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <img loading="lazy" 
                  src={topic.image} 
                  alt={topic.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.5s ease'
                  }}
                />
                <div 
                  className="cat-image-overlay"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to bottom, transparent 0%, rgba(10,10,12,0.8) 100%)'
                  }}
                ></div>
              </div>
              <div 
                className="cat-premium-content"
                style={{
                  padding: '24px',
                  position: 'relative',
                  zIndex: 2,
                  marginTop: '-30px'
                }}
              >
                <div 
                  className="cat-premium-icon"
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '10px',
                    background: 'var(--accent-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '16px',
                    color: 'white',
                    boxShadow: '0 4px 15px rgba(255,77,0,0.3)'
                  }}
                >
                  <BookOpen size={20} />
                </div>
                <h4 className="cat-premium-label" style={{ fontSize: '1.2rem', fontWeight: '600', margin: 0 }}>{topic.title}</h4>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center animate-on-scroll mt-12 glass-card" style={{ marginTop: '80px', padding: '60px 20px', maxWidth: '600px', margin: '80px auto 0', border: '1px solid rgba(255, 77, 0, 0.2)', boxShadow: '0 10px 40px rgba(255, 77, 0, 0.1)' }}>
            <div className="section-tag mb-4" style={{ justifyContent: 'center' }}><span className="section-tag-dot"></span> WORK IN PROGRESS</div>
            <h3 className="h2 mb-4">Articles <span className="text-accent">Coming Soon...</span></h3>
            <p className="text-secondary subheading">We are crafting some amazing content for you. Stay tuned!</p>
        </div>
      </section>
    </div>
  );
};

export default Blog;
