import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Play, Share2, Heart, ChevronDown, ChevronUp } from 'lucide-react';
import PodcastCard from '../components/ui/PodcastCard';
import ClipCard from '../components/ui/ClipCard';
import { episodes as dummyEpisodes, clips as dummyClips } from '../data/dummyData';
import { useYouTubeData } from '../hooks/useYouTubeData';
import './EpisodeDetail.css';

const EpisodeDetail = () => {
  const { slug } = useParams();
  const [timestampsOpen, setTimestampsOpen] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const [startTime, setStartTime] = useState(0);
  const [isDescExpanded, setIsDescExpanded] = useState(false);
  const [playerKey, setPlayerKey] = useState(0);
  
  const { episodes: apiEpisodes, clips: apiClips, loading } = useYouTubeData();
  const episodes = apiEpisodes.length > 0 ? apiEpisodes : dummyEpisodes;
  const clips = apiClips.length > 0 || apiEpisodes.length > 0 ? apiClips : dummyClips;

  useEffect(() => {
    window.scrollTo(0,0);
    setStartTime(0);
    setIsPlaying(false);
    setIsDescExpanded(false);
  }, [slug]);

  if (loading) {
    return <div className="episode-page" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div className="loader"></div></div>;
  }

  const episode = episodes.find(ep => ep.id === slug) || episodes[0];

  const parseTimestamps = (desc) => {
    if (!desc) return null;
    const regex = /(\d{1,2}:\d{2}(?::\d{2})?)\s*[-:]?\s*(.*)/g;
    const matches = [...desc.matchAll(regex)];
    if (matches.length > 0) {
      return matches.map(match => ({
        time: match[1],
        label: match[2].trim()
      })).slice(0, 10); // Limit to 10 for UI
    }
    return null;
  };

  const videoTimestamps = parseTimestamps(episode.description) || [
    { time: "00:00", label: "Intro & Welcome" },
    { time: "05:00", label: "The Conversation Starts" },
    { time: "15:00", label: "Deep Dive into Topic" },
    { time: "30:00", label: "Final Thoughts" }
  ];

  const handleTimestampClick = (timeString) => {
    const parts = timeString.split(':');
    let seconds = 0;
    if (parts.length === 3) {
      seconds = parseInt(parts[0]) * 3600 + parseInt(parts[1]) * 60 + parseInt(parts[2]);
    } else {
      seconds = parseInt(parts[0]) * 60 + parseInt(parts[1]);
    }
    setStartTime(seconds);
    setPlayerKey(prev => prev + 1);
    setIsPlaying(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleShare = () => {
    const shareData = {
      title: episode.title,
      text: `Check out this episode of Vividh Talks: ${episode.title}`,
      url: window.location.href,
    };

    if (navigator.share) {
      navigator.share(shareData).catch((err) => console.log('Error sharing', err));
    } else {
      navigator.clipboard.writeText(window.location.href)
        .then(() => alert('Link copied to clipboard!'))
        .catch((err) => console.error('Could not copy text: ', err));
    }
  };

  return (
    <div className="episode-page">
      {/* Video Player Header */}
      <section className="player-section">
        <div className="container">
          <div className="video-player-wrapper">
            {!isPlaying ? (
              <div className="video-player-placeholder cursor-pointer" onClick={() => setIsPlaying(true)}>
                 <img src={episode.image} alt={episode.title} />
                 <div className="play-overlay is-visible">
                   <button className="play-btn large"><Play size={32} fill="currentColor" /></button>
                 </div>
                 <div className="player-controls">
                   <div className="progress-bar"><div className="progress"></div></div>
                   <div className="control-buttons">
                     <Play size={20} fill="currentColor" />
                     <span className="time">00:00 / {episode.duration}</span>
                   </div>
                 </div>
              </div>
            ) : episode.videoUrl && episode.videoUrl.includes('youtube.com') ? (
              <iframe 
                key={playerKey}
                src={`https://www.youtube.com/embed/${episode.id}?autoplay=1&start=${startTime}&modestbranding=1&rel=0`} 
                className="w-full h-full" 
                frameBorder="0" 
                allow="autoplay; encrypted-media; fullscreen" 
                allowFullScreen
                style={{ aspectRatio: '16/9', width: '100%', objectFit: 'cover', background: '#000' }}
              ></iframe>
            ) : (
              <video 
                src={episode.videoUrl || "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"} 
                className="w-full h-full" 
                controls 
                autoPlay 
                style={{ aspectRatio: '16/9', width: '100%', objectFit: 'cover', background: '#000' }}
              ></video>
            )}
          </div>

          <div className="episode-header-meta" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span className="mono-label text-accent">EP. {episode.number}</span>
            <h1 className="h1 mt-2 mb-4">{episode.title}</h1>
            
            <div className="episode-info-row text-secondary mb-4" style={{ justifyContent: 'center' }}>
              <span>{episode.timeAgo || 'Recently Released'}</span>
              <span className="dot">·</span>
              <span>{episode.duration}</span>
              <span className="dot">·</span>
              <div className="tags inline-flex gap-2" style={{ justifyContent: 'center' }}>
                {episode.tags.map(tag => <span key={tag}>{tag}</span>)}
              </div>
            </div>

            <div className="episode-actions-row" style={{ justifyContent: 'center' }}>
              <button className="btn btn-primary" onClick={() => setIsPlaying(true)}>
                <Play size={18} fill="currentColor" /> Play Video
              </button>
              <button className="btn btn-secondary" onClick={handleShare}>
                <Share2 size={18} /> Share
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Split */}
      <section className="container section-padding">
        <div className="episode-layout">
          {/* Left Column: Details */}
          <div className="episode-main-col">
            <div className="about-episode mb-12">
              <h3 className="h3 mb-4">About This Episode</h3>
              <div className={`body-text mb-6 ${!isDescExpanded ? 'line-clamp-6' : ''}`} style={{ whiteSpace: 'pre-line' }}>
                {episode.description || "No description available for this episode."}
              </div>
              {episode.description && episode.description.length > 300 && (
                <button 
                  className="text-accent font-bold cursor-pointer bg-transparent border-none p-0 mb-8"
                  onClick={() => setIsDescExpanded(!isDescExpanded)}
                >
                  {isDescExpanded ? "Show Less ↑" : "Read Full Description ↓"}
                </button>
              )}

              {/* Timestamps */}
              <div className="timestamps-box glass-card">
                <div 
                  className="timestamps-header" 
                  onClick={() => setTimestampsOpen(!timestampsOpen)}
                >
                  <h4 className="font-subheading font-bold">Key Timestamps</h4>
                  {timestampsOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>
                
                {timestampsOpen && (
                  <div className="timestamps-list">
                    {videoTimestamps.map((item, idx) => (
                      <div 
                        key={idx} 
                        className="timestamp-item cursor-pointer hover-text-primary"
                        onClick={() => handleTimestampClick(item.time)}
                      >
                        <span className="text-accent mono-label">{item.time}</span> {item.label || "Jump to segment"}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Profile */}
          <div className="episode-sidebar-col">
            <div className="profile-card glass-card mb-6">
              <h4 className="font-mono text-accent mb-4">GUEST</h4>
              <div className="profile-flex">
                <img src="https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&q=80&w=150" alt="Guest" className="profile-img" />
                <div>
                  <h3 className="h3">{episode.guest.replace('Featuring ', '').split(',')[0]}</h3>
                  <p className="text-secondary">{episode.guest.split(',')[1]?.trim() || 'Creator'}</p>
                </div>
              </div>
              <p className="body-text mt-4 mb-4 text-sm">A visionary leader and storyteller known for pushing boundaries and redefining the creative landscape in India.</p>
              <div className="flex gap-4">
                <a href="#" className="text-secondary hover-text-primary">LinkedIn</a>
                <a href="#" className="text-secondary hover-text-primary">Instagram</a>
              </div>
            </div>

            <div className="profile-card glass-card">
              <h4 className="font-mono text-accent mb-4">HOST</h4>
              <div className="profile-flex items-center">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150" alt="Host" className="profile-img small" />
                <div>
                  <h4 className="font-subheading font-bold">Vikram Singh</h4>
                  <p className="text-secondary text-sm">Host, Vividh Talks</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Short Clips */}
      <section className="section-padding bg-secondary">
        <div className="container mb-6">
          <h2 className="h2">Best Moments from This Episode</h2>
        </div>
        <div className="clips-scroll-container">
          <div className="clips-row">
            {clips.slice(0, 3).map(clip => (
              <ClipCard key={clip.id} clip={clip} />
            ))}
          </div>
        </div>
      </section>

      {/* Related Episodes */}
      <section className="section-padding container">
        <h2 className="h2 mb-6">You Might Also Like</h2>
        <div className="episode-grid">
          {episodes.filter(ep => ep.id !== episode.id).slice(0, 3).map((ep) => (
            <PodcastCard key={ep.id} episode={ep} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="cta-strip text-center section-padding border-t">
        <h2 className="h2 mb-4">Loved This Episode? Start Your Own.</h2>
        <Link to="/book" className="btn btn-primary mt-4">🎙 Book a Recording Session →</Link>
      </section>
    </div>
  );
};

export default EpisodeDetail;
