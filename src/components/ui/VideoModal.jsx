import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import './VideoModal.css';

const VideoModal = ({ isOpen, onClose, videoUrl, title }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      if (videoRef.current && (!videoUrl || !videoUrl.includes('youtube.com'))) {
        videoRef.current.play().catch(e => console.log('Autoplay prevented', e));
      }
    } else {
      document.body.style.overflow = 'unset';
      if (videoRef.current && (!videoUrl || !videoUrl.includes('youtube.com'))) {
        videoRef.current.pause();
      }
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, videoUrl]);

  if (!isOpen) return null;

  return (
    <div className="video-modal-overlay" onClick={onClose}>
      <div className="video-modal-content" onClick={e => e.stopPropagation()}>
        <button className="video-modal-close" onClick={onClose}>
          <X size={24} />
        </button>
        {title && <h3 className="video-modal-title">{title}</h3>}
        {videoUrl && videoUrl.includes('youtube.com') ? (
          <iframe
            src={`https://www.youtube.com/embed/${videoUrl.split('v=')[1]}?autoplay=1&rel=0`}
            className="video-modal-player"
            frameBorder="0"
            allow="autoplay; encrypted-media; fullscreen"
            allowFullScreen
          ></iframe>
        ) : (
          <video 
            ref={videoRef}
            src={videoUrl} 
            className="video-modal-player" 
            controls 
            autoPlay 
            playsInline
          ></video>
        )}
      </div>
    </div>
  );
};

export default VideoModal;
