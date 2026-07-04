import React, { useEffect } from 'react';
import { ArrowRight, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import './EnhancedStyles.css';

const topics = [
  'Entrepreneurship',
  'Politics & Society',
  'Health & Wellness',
  'Startups & Business',
  'Personal Growth',
  'Youth Culture',
  'Women Empowerment',
  'Social Issues',
  'Media & Content Creation',
  'Social trends',
  'Creator economy',
  'Digital growth'
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
      <section className="contact-hero section-padding" style={{ position: 'relative', overflow: 'hidden', paddingTop: '160px', paddingBottom: '100px' }}>
        <div className="contact-hero-bg" style={{ backgroundImage: 'url(/generated/podcast_blog_1783165019144.png)', filter: 'brightness(0.5)' }}></div>
        <div className="contact-hero-overlay"></div>
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

      <section className="container section-padding">
        <div className="categories-premium-grid animate-on-scroll">
          {topics.map((topic, idx) => (
            <div className="cat-premium-card tilt-hover-card" key={idx}>
              <div className="cat-premium-icon"><BookOpen size={24} /></div>
              <div className="cat-premium-content">
                <h4 className="cat-premium-label" style={{ fontSize: '18px' }}>{topic}</h4>
              </div>
              <div className="cat-premium-bar"></div>
            </div>
          ))}
        </div>
        
        <div className="text-center animate-on-scroll mt-12" style={{ marginTop: '64px' }}>
            <h3 className="h3 mb-4">Articles Coming Soon...</h3>
            <p className="text-secondary">We are crafting some amazing content for you. Stay tuned!</p>
        </div>
      </section>
    </div>
  );
};

export default Blog;
