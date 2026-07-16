import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Play, VolumeX, Volume2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './ShortsReel.css';

const ReviewVideo = ({ clip, isActive }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);

  const isYoutube = clip.videoUrl?.includes('youtube.com') || clip.videoUrl?.includes('youtu.be');
  const isDrive = clip.videoUrl?.includes('drive.google.com');

  let ytId = null;
  let embedUrl = clip.videoUrl;

  if (isYoutube) {
    if (clip.id && !String(clip.id).includes('clip-')) {
      ytId = clip.id;
    } else {
      const match = clip.videoUrl.match(/[?&]v=([^&]+)/);
      ytId = match ? match[1] : clip.id;
    }
  } else if (isDrive) {
    let driveId = null;
    if (embedUrl.includes('/d/')) {
      driveId = embedUrl.split('/d/')[1].split('/')[0];
    } else if (embedUrl.includes('id=')) {
      driveId = embedUrl.split('id=')[1].split('&')[0];
    }
    if (driveId) {
      embedUrl = `https://drive.google.com/file/d/${driveId}/preview`;
    }
  }

  const isNative = !isYoutube && !isDrive;

  useEffect(() => {
    if (isNative) {
      if (isActive) {
        const playPromise = videoRef.current?.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => setIsPlaying(true))
            .catch((error) => {
              console.log("Auto-play prevented", error);
              setIsPlaying(false);
            });
        }
      } else {
        videoRef.current?.pause();
        setIsPlaying(false);
        if (videoRef.current) videoRef.current.currentTime = 0; 
      }
    }
  }, [isActive, isYoutube]);

  const togglePlay = (e) => {
    e.stopPropagation();
    if (!isNative) return; // Cannot easily toggle native play/pause for iframe without YT API
    if (isPlaying) {
      videoRef.current?.pause();
      setIsPlaying(false);
    } else {
      videoRef.current?.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    if (!isNative) return;
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    if (videoRef.current) {
      videoRef.current.muted = newMuted;
    }
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const current = videoRef.current.currentTime;
    const duration = videoRef.current.duration;
    if (duration > 0) {
      setProgress((current / duration) * 100);
    }
  };

  return (
    <div className="short-video-container" onClick={togglePlay}>
      {!isNative ? (
        isActive ? (
          <iframe
            src={isDrive ? embedUrl : `https://www.youtube.com/embed/${ytId}?autoplay=1&mute=0&controls=1&modestbranding=1&loop=1&playlist=${ytId}&playsinline=1`}
            className="short-video-player"
            frameBorder="0"
            allow="autoplay; encrypted-media; fullscreen"
            allowFullScreen
            style={isDrive ? { backgroundColor: '#000', width: '100%', height: '100%', border: 'none' } : {}}
          />
        ) : (
          <img loading="lazy" src={clip.image} alt={clip.title} className="short-video-player" style={{ objectFit: 'cover' }} />
        )
      ) : (
        <video
          ref={videoRef}
          src={clip.videoUrl || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4'}
          className="short-video-player"
          loop
          muted={isMuted}
          playsInline
          onTimeUpdate={handleTimeUpdate}
          poster={clip.image}
        />
      )}
      
      {/* UI Overlay - Only show for native videos, YouTube handles its own UI */}
      {isNative && (
        <div className="short-overlay">
          <div className="short-top-controls">
            <button className="short-control-btn" onClick={toggleMute} aria-label={isMuted ? "Unmute" : "Mute"}>
              {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>
          </div>

          {!isPlaying && (
            <div className="short-center-play">
              <Play size={40} fill="currentColor" style={{ marginLeft: '4px' }} />
            </div>
          )}

          <div className="short-bottom-info">
            <h3 className="short-title">{clip.title}</h3>
            <div className="short-channel">
              <div className="short-channel-avatar">
                <img loading="lazy" src="/logo.svg" alt={clip.channelName || "Vividh Talks"} onError={(e) => { e.target.style.display = 'none'; }} />
              </div>
              <span className="short-channel-name">{clip.channelName || "Vividh Talks"}</span>
            </div>
          </div>

          <div className="short-progress-container">
            <div className="short-progress-bar" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
      )}
    </div>
  );
};

const VideoReviewReel = ({ clips, isOpen, onClose, initialIndex = 0 }) => {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(initialIndex);

  useEffect(() => {
    if (!isOpen) return;

    // Optional: Scroll to initial index immediately when modal opens
    if (containerRef.current && initialIndex > 0) {
      const elements = containerRef.current.querySelectorAll('.short-video-wrapper');
      if (elements[initialIndex]) {
        elements[initialIndex].scrollIntoView({ behavior: 'instant', block: 'start' });
      }
    }

    const observerOptions = {
      root: containerRef.current,
      rootMargin: '0px',
      threshold: 0.6,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = Number(entry.target.getAttribute('data-index'));
          setActiveIndex(index);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const elements = document.querySelectorAll('.short-video-wrapper');
    
    elements.forEach((el) => observer.observe(el));

    // Prevent body scrolling while modal is open
    document.body.style.overflow = 'hidden';

    return () => {
      elements.forEach((el) => observer.unobserve(el));
      observer.disconnect();
      document.body.style.overflow = '';
    };
  }, [clips, isOpen, initialIndex]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!clips || clips.length === 0) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          key="shorts-modal"
          className="shorts-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          onClick={onClose}
        >
          <button className="shorts-modal-close" onClick={onClose} aria-label="Close Shorts">
            <X size={28} />
          </button>
          
          <div className="shorts-reel-viewport" ref={containerRef} onClick={onClose}>
            {clips.map((clip, idx) => (
              <div 
                className="short-video-wrapper" 
                key={clip.id || idx} 
                data-index={idx}
              >
                <ReviewVideo 
                  clip={clip} 
                  isActive={activeIndex === idx} 
                />
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default VideoReviewReel;
