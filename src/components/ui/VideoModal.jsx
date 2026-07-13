import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import './VideoModal.css';

// Robust helper to extract YouTube Video ID from any watch/embed/shorts URL
const getYouTubeId = (url) => {
  if (!url) return null;
  const regex = /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/i;
  const match = url.match(regex);
  return (match && match[1]) ? match[1] : null;
};

const VideoModal = ({ isOpen, onClose, videoUrl, title }) => {
  const videoRef = useRef(null);
  const ytId = getYouTubeId(videoUrl);

  const isDriveLink = videoUrl && videoUrl.includes('drive.google.com');

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      if (videoRef.current && !ytId && !isDriveLink) {
        videoRef.current.play().catch(e => console.log('Autoplay prevented', e));
      }
    } else {
      document.body.style.overflow = 'unset';
      if (videoRef.current && !ytId && !isDriveLink) {
        videoRef.current.pause();
      }
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, ytId, isDriveLink]);

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
        ) : isDriveLink ? (
          <div className="shorts-iframe-container" style={{ display: 'flex', height: '100%', width: '100%' }}>
            <iframe
              src={videoUrl}
              className="video-modal-player"
              frameBorder="0"
              allow="autoplay; encrypted-media; fullscreen"
              allowFullScreen
              title={title || "Google Drive Video"}
              style={{ width: '100%', height: '100%', objectFit: 'contain', backgroundColor: '#000' }}
            ></iframe>
          </div>
        ) : (
          <video 
            ref={videoRef}
            src={videoUrl} 
            className="video-modal-player video-direct" 
            controls={true}
            autoPlay 
            loop
            playsInline
            style={{ width: '100%', height: '100%', objectFit: 'contain', backgroundColor: '#000' }}
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
