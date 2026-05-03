import React from 'react';
import './FeatureCard.css';

const FeatureCard = ({ icon, title, description, highlight = false }) => {
  return (
    <div className={`feature-card glass-card ${highlight ? 'highlight' : ''}`}>
      <div className="feature-icon-wrapper">
        {icon}
      </div>
      <h3 className="feature-title">{title}</h3>
      <p className="feature-description text-secondary">{description}</p>
    </div>
  );
};

export default FeatureCard;
