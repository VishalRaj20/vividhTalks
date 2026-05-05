import React from 'react';
import { Quote, Star } from 'lucide-react';
import './TestimonialCard.css';

const TestimonialCard = ({ testimonial }) => {
  const { quote, name, title, image, rating } = testimonial;

  return (
    <div className="testimonial-card-premium">
      <h4 className="testimonial-author-name">{name}</h4>
      
      <p className="testimonial-text">"{quote}"</p>
      
      <div className="testimonial-footer">
        <div className="testimonial-stars">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={18} fill={i < rating ? "#E51D24" : "transparent"} stroke={i < rating ? "#E51D24" : "#ccc"} />
          ))}
        </div>
      </div>

      <div className="testimonial-bg-quote">
        <Quote size={120} />
      </div>
    </div>
  );
};

export default TestimonialCard;
