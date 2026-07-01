import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import './VideoModal.css';

// Robust helper to extract YouTube Video ID from any watch/embed/shorts URL
const getYouTubeId = (url) => {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|shorts\/)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

const VideoModal = ({ isOpen, onClose, videoUrl, title }) => {
  const videoRef = useRef(null);
  const ytId = getYouTubeId(videoUrl);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      if (videoRef.current && !ytId) {
        videoRef.current.play().catch(e => console.log('Autoplay prevented', e));
      }
    } else {
      document.body.style.overflow = 'unset';
      if (videoRef.current && !ytId) {
        videoRef.current.pause();
      }
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, ytId]);

  if (!isOpen) return null;

  return (
    <div className="video-modal-overlay" onClick={onClose}>
      <div className="video-modal-content shorts-container" onClick={e => e.stopPropagation()}>
        {ytId ? (
          <div className="shorts-iframe-container">
            <iframe
              src={`https://www.youtube.com/embed/${ytId}?autoplay=1&controls=0&rel=0&modestbranding=1&loop=1&playlist=${ytId}`}
              className="video-modal-player iframe-zoom"
              frameBorder="0"
              allow="autoplay; encrypted-media; fullscreen"
              allowFullScreen
              title={title || "YouTube Video"}
            ></iframe>
          </div>
        ) : (
          <video 
            ref={videoRef}
            src={videoUrl} 
            className="video-modal-player video-direct" 
            controls={false}
            autoPlay 
            loop
            playsInline
          ></video>
        )}

        {/* Top Gradient for Close Button */}
        <div className="shorts-top-gradient"></div>
        <button className="video-modal-close" onClick={onClose} aria-label="Close modal">
          <X size={24} />
        </button>
      </div>
    </div>
  );
};

export default VideoModal;
