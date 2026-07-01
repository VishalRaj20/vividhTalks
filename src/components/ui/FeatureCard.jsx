import React from 'react';
import './FeatureCard.css';

const FeatureCard = ({ icon, title, description, image, highlight = false }) => {
  return (
    <div className={`feature-card glass-card ${highlight ? 'highlight' : ''}`}>
      {image && (
        <div className="feature-image-wrapper">
          <img src={image} alt={title} className="feature-card-img" />
          <div className="feature-image-overlay"></div>
        </div>
      )}
      <div className="feature-card-content">
        <div className="feature-icon-wrapper">
          {icon}
        </div>
        <h3 className="feature-title">{title}</h3>
        <p className="feature-description text-secondary">{description}</p>
      </div>
    </div>
  );
};

export default FeatureCard;
