import { Star, Quote } from 'lucide-react';
import './TestimonialCard.css';

const TestimonialCard = ({ testimonial }) => {
  const { name, role, content, rating, image } = testimonial;

  return (
    <div className="testimonial-card-premium">
      <h4 className="testimonial-author-name">{name}</h4>
      
      <p className="testimonial-text">"{content}"</p>
      
      <div className="testimonial-footer">
        <div className="testimonial-stars">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={16} fill={i < rating ? "#E51D24" : "transparent"} stroke={i < rating ? "#E51D24" : "#ccc"} />
          ))}
        </div>
        <span className="testimonial-date">{date}</span>
      </div>

      <div className="testimonial-bg-quote">
        <Quote size={120} />
      </div>
    </div>
  );
};

export default TestimonialCard;
