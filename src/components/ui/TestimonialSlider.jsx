import React, { useState, useEffect } from 'react';
import TestimonialCard from './TestimonialCard';

const TestimonialSlider = ({ testimonials }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setItemsPerPage(1);
      else if (window.innerWidth < 1024) setItemsPerPage(2);
      else setItemsPerPage(3);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const numDots = Math.ceil(testimonials.length / itemsPerPage);

  return (
    <div className="testimonials-slider-container">
      <div 
        className="testimonials-slider-track" 
        style={{ transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)` }}
      >
        {testimonials.map((test) => (
          <div className="testimonial-slide" key={test.id} style={{ flex: `0 0 ${100 / itemsPerPage}%` }}>
            <TestimonialCard testimonial={test} />
          </div>
        ))}
      </div>
      
      {numDots > 1 && (
        <div className="testimonial-dots">
          {[...Array(numDots)].map((_, idx) => (
            <button 
              key={idx} 
              className={`testimonial-dot ${currentIndex === idx ? 'active' : ''}`}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to page ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TestimonialSlider;
