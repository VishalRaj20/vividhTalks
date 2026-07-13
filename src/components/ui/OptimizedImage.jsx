import { useState, useEffect } from 'react';
import './OptimizedImage.css';

const OptimizedImage = ({ 
  src, 
  alt, 
  className = '', 
  style = {}, 
  loading = 'lazy',
  onLoad,
  ...props 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setImageSrc(src);
      setIsLoaded(true);
      if (onLoad) onLoad();
    };
  }, [src, onLoad]);

  return (
    <div className={`optimized-image-wrapper ${className}`} style={{ ...style, position: 'relative', overflow: 'hidden' }}>
      {/* Skeleton / Placeholder */}
      <div 
        className={`optimized-image-skeleton ${isLoaded ? 'hidden' : ''}`}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          animation: 'pulse 1.5s infinite ease-in-out'
        }}
      />
      
      {/* Actual Image */}
      {imageSrc && (
        <img
          src={imageSrc}
          alt={alt}
          loading={loading}
          className={`optimized-image ${isLoaded ? 'loaded' : ''}`}
          style={{
            width: '100%',
            height: '100%',
            objectFit: style.objectFit || 'cover',
            opacity: isLoaded ? 1 : 0,
            transition: 'opacity 0.5s ease-in-out',
            ...style
          }}
          {...props}
        />
      )}
    </div>
  );
};

export default OptimizedImage;
