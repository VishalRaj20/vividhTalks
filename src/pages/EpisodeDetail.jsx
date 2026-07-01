import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Play, Share2, Heart } from 'lucide-react';
import PodcastCard from '../components/ui/PodcastCard';
import ClipCard from '../components/ui/ClipCard';
import { episodes as dummyEpisodes, clips as dummyClips } from '../data/dummyData';
import { useYouTubeData } from '../hooks/useYouTubeData';
import SEO from '../components/SEO';
import './EpisodeDetail.css';

const getGuestDetails = (episode) => {
  const rawGuest = episode.guest || 'Special Guest';
  
  // Clean guest name (e.g. "Ft. Akshat Soni VT32" -> "Akshat Soni")
  let guestName = rawGuest;
  guestName = guestName.replace(/^(?:ft\.?|featuring)\s+/i, '');
  guestName = guestName.replace(/\s+VT\d+$/i, '');
  guestName = guestName.replace(/\s+Ep\s*\d+$/i, '');
  guestName = guestName.trim();
  
  // Try to find role and description from the video description
  let guestRole = 'Special Guest';
  let guestBio = '';
  
  const desc = episode.description || '';
  const descLower = desc.toLowerCase();
  
  // Heuristics to find guest role from description
  // e.g. "conversation with Akshat Soni, Founder of Jewel jewellers, we discuss"
  const guestIndex = descLower.indexOf(guestName.toLowerCase());
  if (guestIndex !== -1 && desc) {
    const afterText = desc.substring(guestIndex + guestName.length).trim();
    if (afterText.startsWith(',')) {
      const parts = afterText.substring(1).split(/,|\n/);
      if (parts.length > 0) {
        const potentialRole = parts[0].trim();
        // Validate if it looks like a role title
        if (potentialRole.length > 3 && potentialRole.length < 80 && !potentialRole.toLowerCase().includes('we') && !potentialRole.toLowerCase().includes('discuss')) {
          guestRole = potentialRole;
        }
      }
    }
  }
  
  if (guestRole === 'Special Guest') {
    // Alternate check: scan description for terms like "Founder of X", "CEO of X", "Co-Founder of X"
    const match = desc.match(/(?:founder|ceo|co-founder|director|creator|artist|expert|coach)\s+of\s+([A-Za-z0-9\s]+)/i);
    if (match) {
      guestRole = match[0].trim();
    } else {
      guestRole = 'Podcast Guest';
    }
  }

  // Construct a professional bio based on the extracted role or description
  if (desc) {
    guestBio = `${guestName} joins host Shraddha Suman in this episode. As the ${guestRole.toLowerCase()}, they share key industry insights, backend challenges, and actionable growth strategies.`;
  } else {
    guestBio = `${guestName} is a prominent voice in their field, sharing insights and experience on this episode of Vividh Talks.`;
  }
  
  // Pronoun and avatar detection based on description content
  let isFemale = false;
  if (descLower.includes(' she ') || descLower.includes(' her ') || descLower.includes(' herself ')) {
    isFemale = true;
  } else if (descLower.includes(' he ') || descLower.includes(' his ') || descLower.includes(' himself ')) {
    isFemale = false;
  } else {
    // Fallback ending letter heuristic
    const nameLower = guestName.toLowerCase();
    if (nameLower.endsWith('a') || nameLower.endsWith('i') || nameLower.endsWith('e') || nameLower.endsWith('u') || nameLower.includes('sneham') || nameLower.includes('neha') || nameLower.includes('shraddha') || nameLower.includes('ananya')) {
      isFemale = true;
    }
  }

  const guestImagesMale = [
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150',
    'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=150'
  ];

  const guestImagesFemale = [
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
    'https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=150'
  ];

  // Pick an avatar consistently based on name string hash
  let hash = 0;
  for (let i = 0; i < guestName.length; i++) {
    hash = guestName.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  const avatars = isFemale ? guestImagesFemale : guestImagesMale;
  const guestImage = episode.image || avatars[Math.abs(hash) % avatars.length];

  return {
    name: guestName,
    role: guestRole,
    image: guestImage,
    bio: guestBio,
    linkedin: '#',
    instagram: '#',
    hostName: 'Shraddha Suman',
    hostImage: '/guests/Shradhha Suman.jpeg',
    hostTitle: 'Host, Vividh Talks'
  };
};

const EpisodeDetail = () => {
  const { slug } = useParams();
  const [isPlaying, setIsPlaying] = useState(false);
  
  const [startTime, setStartTime] = useState(0);
  const [playerKey, setPlayerKey] = useState(0);
  
  const { episodes: apiEpisodes, clips: apiClips, loading } = useYouTubeData();
  const episodes = apiEpisodes.length > 0 ? apiEpisodes : dummyEpisodes;
  const clips = apiClips.length > 0 || apiEpisodes.length > 0 ? apiClips : dummyClips;

  const cleanDescription = (desc) => {
    if (!desc) return '';
    const lines = desc.split('\n');
    const cleanLines = [];
    
    for (const line of lines) {
      const trimmedLine = line.trim();
      const lowerLine = trimmedLine.toLowerCase();
      
      // Stop rendering when promo sections, links, hashtags, tags lists, or contact info begin
      if (
        lowerLine.includes('follow us') ||
        lowerLine.includes('subscribe') ||
        lowerLine.includes('connect on') ||
        lowerLine.includes('social media') ||
        lowerLine.includes('instagram:') ||
        lowerLine.includes('linkedin:') ||
        lowerLine.includes('spotify:') ||
        lowerLine.includes('apple podcast') ||
        lowerLine.includes('website:') ||
        lowerLine.includes('http://') ||
        lowerLine.includes('https://') ||
        lowerLine.includes('our gear') ||
        lowerLine.includes('copyright') ||
        lowerLine.includes('timestamps') ||
        lowerLine.includes('time stamps') ||
        lowerLine.includes('chapters') ||
        lowerLine.includes('whatsapp') ||
        lowerLine.includes('email') ||
        lowerLine.includes('queries') ||
        lowerLine.includes('suggestions') ||
        lowerLine.includes('call:-') ||
        trimmedLine.startsWith('#') ||
        lowerLine.includes('#') ||
        (trimmedLine.split(',').length > 3 && !trimmedLine.includes('.')) ||
        /^\d{1,2}:\d{2}/.test(trimmedLine) ||
        /^\(\d{1,2}:\d{2}\)/.test(trimmedLine) ||
        /^\[\d{1,2}:\d{2}\]/.test(trimmedLine)
      ) {
        break;
      }
      cleanLines.push(line);
    }
    
    return cleanLines.join('\n').trim();
  };

  const getRelatedClips = (currentEpisode, allClips) => {
    if (!currentEpisode || !allClips) return [];
    
    let matched = [];
    
    // 1. Try matching by guest name
    if (currentEpisode.guest && currentEpisode.guest !== 'Special Guest') {
      const guestName = currentEpisode.guest.toLowerCase().replace(/featuring|ft\.?/g, '').trim();
      matched = allClips.filter(clip => {
        return (clip.guest && clip.guest.toLowerCase().includes(guestName)) || 
               clip.title.toLowerCase().includes(guestName) ||
               (clip.description && clip.description.toLowerCase().includes(guestName));
      });
    }

    // 2. Fallback to title keywords if no guest match
    if (matched.length === 0 && currentEpisode.title) {
       const mainTitlePart = currentEpisode.title.split('|')[0].trim().toLowerCase();
       // Grab a couple significant words
       const titleWords = mainTitlePart.split(/[\s,—\-\|]+/).filter(w => w.length > 3).slice(0, 3);
       if (titleWords.length > 0) {
         matched = allClips.filter(clip => {
           const clipText = `${clip.title} ${clip.description || ''}`.toLowerCase();
           // Require at least one significant word to match
           return titleWords.some(word => clipText.includes(word));
         });
       }
    }
    
    return matched;
  };

  useEffect(() => {
    window.scrollTo(0,0);
    setStartTime(0);
    setIsPlaying(false);
  }, [slug]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, { threshold: 0.1 });

    const hiddenElements = document.querySelectorAll('.animate-on-scroll, .animate-stagger-1, .animate-stagger-2, .animate-stagger-3');
    hiddenElements.forEach((el) => observer.observe(el));

    return () => hiddenElements.forEach((el) => observer.unobserve(el));
  }, [slug, loading]);

  if (loading) {
    return <div className="episode-page" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div className="loader"></div></div>;
  }

  const episode = episodes.find(ep => ep.id === slug) || episodes[0];

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
      <SEO 
        title={episode.title}
        description={episode.description || "Watch this episode of Vividh Talks"}
        image={episode.image}
      />
      {/* Video Player Header */}
      <section className="player-section">
        <div className="container">
          <div className="video-player-wrapper animate-on-scroll">
            {!isPlaying ? (
              <div className="video-player-placeholder cursor-pointer" onClick={() => setIsPlaying(true)}>
                 <img src={episode.image} alt={episode.title} />
                 <div className="play-overlay is-visible">
                   <button className="play-btn large">
                     <svg height="100%" version="1.1" viewBox="0 0 68 48" width="100%"><path d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z" fill="#ff0000"></path><path d="M 45,24 27,14 27,34" fill="#fff"></path></svg>
                   </button>
                 </div>
                 <div className="yt-duration-pill">{episode.duration}</div>
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

          <div className="episode-header-meta animate-stagger-1" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
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
              <button className="btn btn-primary btn-glow" onClick={() => setIsPlaying(true)}>
                <Play size={18} fill="currentColor" /> Play Video
              </button>
              <button className="btn btn-secondary btn-magnetic" onClick={handleShare}>
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
          <div className="episode-main-col animate-stagger-2">
            <div className="about-episode mb-12">
              <h3 className="h3 mb-4">About This Episode</h3>
              <div className="body-text mb-6" style={{ whiteSpace: 'pre-line' }}>
                {cleanDescription(episode.description) || "No description available for this episode."}
              </div>
            </div>
          </div>

          {/* Right Column: Profile */}
          <div className="episode-sidebar-col animate-stagger-3">
            {(() => {
              const guestDetails = getGuestDetails(episode);
              return (
                <>
                  <div className="profile-card glass-card mb-6 profile-glow">
                    <h4 className="font-mono text-accent mb-4">GUEST</h4>
                    <div className="profile-flex">
                      <img src={guestDetails.image} alt={guestDetails.name} className="profile-img" />
                      <div>
                        <h3 className="h3">{guestDetails.name}</h3>
                        <p className="text-secondary">{guestDetails.role}</p>
                      </div>
                    </div>
                    <p className="body-text mt-4 mb-4 text-sm">{guestDetails.bio}</p>
                    <div className="flex gap-4">
                      {guestDetails.linkedin && guestDetails.linkedin !== '#' && (
                        <a href={guestDetails.linkedin} target="_blank" rel="noreferrer" className="text-secondary hover-text-primary">LinkedIn</a>
                      )}
                      {guestDetails.instagram && guestDetails.instagram !== '#' && (
                        <a href={guestDetails.instagram} target="_blank" rel="noreferrer" className="text-secondary hover-text-primary">Instagram</a>
                      )}
                    </div>
                  </div>

                  <div className="profile-card glass-card profile-glow">
                    <h4 className="font-mono text-accent mb-4">HOST</h4>
                    <div className="profile-flex items-center mb-4">
                      <img src={guestDetails.hostImage} alt={guestDetails.hostName} className="profile-img small" />
                      <div>
                        <h4 className="font-subheading font-bold">{guestDetails.hostName}</h4>
                        <p className="text-secondary text-sm">{guestDetails.hostTitle}</p>
                      </div>
                    </div>
                    <p className="body-text text-sm style-italic mb-3" style={{ fontStyle: 'italic', color: 'rgba(255,255,255,0.7)', fontSize: '13px', lineHeight: '1.4' }}>
                      "Every person has a story powerful enough to inspire change"
                    </p>
                    <ul style={{ listStyle: 'none', padding: 0, margin: '12px 0 0', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <li style={{ fontSize: '12px', color: 'rgba(255,255,255,0.8)', textAlign: 'left' }}>• <strong>The Visionary:</strong> Entrepreneur, host & storyteller.</li>
                      <li style={{ fontSize: '12px', color: 'rgba(255,255,255,0.8)', textAlign: 'left' }}>• <strong>Hosting Style:</strong> Guiding genuine, calm conversations.</li>
                    </ul>
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      </section>

      {/* Short Clips */}
      <section className="section-padding bg-secondary animate-on-scroll">
        {getRelatedClips(episode, clips).length > 0 && (
          <>
            <div className="container mb-6">
              <h2 className="h2">Best Moments from This Episode</h2>
            </div>
            <div className="clips-scroll-container">
              <div className="clips-row">
                {getRelatedClips(episode, clips).map(clip => (
                  <ClipCard key={clip.id} clip={clip} />
                ))}
              </div>
            </div>
          </>
        )}

        {/* Other general Shorts from the channel, shown just below the best moments */}
        <div className="container mt-12 mb-6 animate-on-scroll">
          <h3 className="h3">More Quick Shorts</h3>
        </div>
        <div className="clips-scroll-container animate-on-scroll">
          <div className="clips-row">
            {clips.filter(c => !getRelatedClips(episode, clips).some(r => r.id === c.id)).slice(0, 5).map(clip => (
              <ClipCard key={clip.id} clip={clip} />
            ))}
          </div>
        </div>
      </section>

      {/* Related Episodes */}
      <section className="section-padding container animate-on-scroll">
        <h2 className="h2 mb-6">You Might Also Like</h2>
        <div className="episode-grid">
          {episodes.filter(ep => ep.id !== episode.id).slice(0, 3).map((ep) => (
            <PodcastCard key={ep.id} episode={ep} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="cta-strip text-center section-padding border-t animate-on-scroll">
        <h2 className="h2 mb-4">Loved This Episode? Start Your Own.</h2>
        <Link to="/book" className="btn btn-primary mt-4 btn-glow">🎙 Book a Recording Session →</Link>
      </section>
    </div>
  );
};

export default EpisodeDetail;
