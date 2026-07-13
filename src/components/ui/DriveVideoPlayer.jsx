import { useState } from 'react';
import { Play } from 'lucide-react';
import OptimizedImage from './OptimizedImage';
import VideoModal from './VideoModal';

const DriveVideoPlayer = ({ src, poster, className = '', title }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  let embedUrl = src;

  // Format Google Drive links for embedding
  if (src.includes('drive.google.com')) {
    if (src.includes('/view')) {
      embedUrl = src.replace('/view', '/preview').split('?')[0];
    } else if (!src.includes('preview') && src.includes('/d/')) {
      const parts = src.split('/');
      const dIndex = parts.indexOf('d');
      if (dIndex !== -1 && parts.length > dIndex + 1) {
        embedUrl = `https://drive.google.com/file/d/${parts[dIndex + 1]}/preview`;
      }
    }
  }

  return (
    <>
      <div
        className={`video-player-placeholder ${className}`}
        onClick={handleOpenModal}
        style={{
          width: '100%',
          height: '100%',
          aspectRatio: '9/12', // Typical for shorts/reels/reviews
          cursor: 'pointer',
          position: 'relative',
          backgroundColor: '#000'
        }}
      >
        <OptimizedImage
          src={poster}
          alt="Video Thumbnail"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }}
        />
        <div className="play-overlay is-visible" style={{
          position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)',
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <button className="play-btn" style={{
            background: 'rgba(255, 77, 0, 0.9)', border: 'none', borderRadius: '50%',
            width: '60px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', boxShadow: '0 4px 15px rgba(255, 77, 0, 0.4)'
          }}>
            <Play size={28} fill="#fff" color="#fff" style={{ marginLeft: '4px' }} />
          </button>
        </div>
      </div>
      
      <VideoModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        videoUrl={embedUrl}
        title={title || "Video Review"}
      />
    </>
  );
};

export default DriveVideoPlayer;
