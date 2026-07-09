import React, { useState, useRef, useEffect } from 'react';
import { MoreVertical } from 'lucide-react';
import VideoModal from './VideoModal';
import './ClipCard.css';

const ClipCard = ({ clip, onClick }) => {
  const { id, title, duration, views, timeAgo, image, videoUrl } = clip;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  const videoRef = useRef(null);
  const hoverTimeout = useRef(null);

  const handleMouseEnter = () => {
    hoverTimeout.current = setTimeout(() => {
      setIsHovered(true);
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch(e => console.log('Autoplay prevented', e));
      }
    }, 600); // 600ms delay
  };

  const handleMouseLeave = () => {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  useEffect(() => {
    return () => {
      if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    };
  }, []);

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <div 
        className="yt-card clip-yt-card" 
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="yt-thumbnail-wrapper vertical-wrapper">
          <img 
            src={image} 
            alt={title} 
            className="yt-thumbnail" 
            style={{ opacity: isHovered ? 0 : 1, transition: 'opacity 0.3s ease' }}
          />
          {videoUrl && !videoUrl.includes('youtube.com') && (
          <video
            ref={videoRef}
            src={videoUrl}
            muted
            loop
            playsInline
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: isHovered ? 1 : 0,
              transition: 'opacity 0.3s ease',
              pointerEvents: 'none'
            }}
          />
        )}
        {isHovered && videoUrl && videoUrl.includes('youtube.com') && (
          <iframe
            src={`https://www.youtube.com/embed/${id}?autoplay=1&mute=1&controls=0&modestbranding=1&loop=1&playlist=${id}`}
            title="YouTube preview"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              pointerEvents: 'none'
            }}
          />
        )}
          <div className="yt-duration" style={{ opacity: isHovered ? 0 : 1, transition: 'opacity 0.3s' }}>
            {duration}
          </div>
        </div>
        
        <div className="yt-card-content">
          <div className="yt-card-info">
            <div className="yt-title" title={title}>{title}</div>
            <div className="yt-metadata">
              <div className="yt-views-time">
                {views || '10K views'} • {timeAgo || '2 days ago'}
              </div>
            </div>
          </div>
          <button className="yt-menu-btn" aria-label="More options" onClick={(e) => { e.stopPropagation(); }}>
            <MoreVertical size={20} />
          </button>
        </div>
      </div>
      
      {videoUrl && (
        <VideoModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          videoUrl={videoUrl}
          title={title}
        />
      )}
    </>
  );
};

export default ClipCard;
