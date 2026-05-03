import React from 'react';
import { Quote, Star } from 'lucide-react';
import './TestimonialCard.css';

const TestimonialCard = ({ testimonial }) => {
  const { quote, name, title, image, rating } = testimonial;

  return (
    <div className="testimonial-card glass-card">
      <div className="quote-icon-wrapper">
        <Quote size={32} className="quote-icon" />
      </div>
      
      <p className="testimonial-quote">"{quote}"</p>
      
      <div className="testimonial-rating">
        {[...Array(rating)].map((_, i) => (
          <Star key={i} size={16} fill="var(--accent-secondary)" className="text-accent-secondary" />
        ))}
      </div>
      
      <div className="testimonial-author">
        <img src={image} alt={name} className="author-image" loading="lazy" />
        <div className="author-info">
          <h4 className="author-name">{name}</h4>
          <p className="author-title text-secondary">{title}</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
