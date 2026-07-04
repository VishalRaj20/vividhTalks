import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Play, Pause, ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';
import { episodes } from '../data/dummyData';

const FeaturedGuests = () => {
  const [playingId, setPlayingId] = useState(null);
  const videoRefs = useRef({});

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handlePlayPause = (id) => {
    if (playingId === id) {
      videoRefs.current[id].pause();
      setPlayingId(null);
    } else {
      if (playingId && videoRefs.current[playingId]) {
        videoRefs.current[playingId].pause();
      }
      videoRefs.current[id].play();
      setPlayingId(id);
    }
  };

  return (
    <div className="featured-guests-page">
      <SEO 
        title="Featured Guests - Vividh Talks"
        description="Discover the inspiring stories and valuable insights from our featured guests on Vividh Talks."
      />

      {/* HEADER SECTION */}
      <section className="section-padding" style={{ paddingBottom: '40px', paddingTop: '120px' }}>
        <div className="container text-center animate-on-scroll">
          <div className="section-tag mx-auto mb-4"><span className="section-tag-dot"></span> OUR GUESTS</div>
          <h1 className="h1 mb-4">Featured <span className="text-accent">Guests</span></h1>
          <p className="subheading mx-auto max-w-2xl">
            Meet the visionaries, creators, and leaders who have shared their raw, unfiltered stories on our platform. Watch their most impactful moments.
          </p>
        </div>
      </section>

      {/* GUESTS LIST */}
      <section className="section-padding" style={{ paddingTop: '0' }}>
        <div className="container">
          <div className="guests-list-container">
            {episodes.map((episode, idx) => {
              const guestNameMatch = episode.guest.match(/Featuring (.*?), (.*)/);
              const guestName = guestNameMatch ? guestNameMatch[1] : 'Guest';
              const guestRole = guestNameMatch ? guestNameMatch[2] : 'Expert';

              return (
                <div className={`guest-row glass-card animate-on-scroll ${idx % 2 !== 0 ? 'guest-row-reverse' : ''}`} key={episode.id}>
                  
                  {/* VIDEO REVIEW SECTION */}
                  <div className="guest-video-col">
                    <div className="guest-video-wrapper">
                      <video 
                        ref={el => videoRefs.current[episode.id] = el}
                        src={episode.videoUrl} 
                        poster={episode.guestImage}
                        className="guest-review-video"
                        playsInline
                        loop
                        muted
                      ></video>
                      <button className="video-play-overlay-btn" onClick={() => handlePlayPause(episode.id)}>
                        {playingId === episode.id ? <Pause size={32} /> : <Play size={32} />}
                      </button>
                    </div>
                  </div>

                  {/* GUEST INFO SECTION */}
                  <div className="guest-info-col">
                    <div className="guest-header">
                      <img loading="lazy" src={episode.guestImage} alt={guestName} className="guest-avatar-small" />
                      <div>
                        <h2 className="h2" style={{ fontSize: '2rem', marginBottom: '4px' }}>{guestName}</h2>
                        <span className="text-accent font-mono">{guestRole}</span>
                      </div>
                    </div>
                    
                    <p className="guest-detailed-bio mt-6 text-secondary" style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
                      {episode.guestBio}
                    </p>

                    <div className="guest-episode-ref mt-6">
                      <p className="font-bold mb-2">Appeared in:</p>
                      <Link to={`/episode/${episode.id}`} className="episode-link-card">
                        <img loading="lazy" src={episode.image} alt={episode.title} />
                        <div>
                          <span className="text-accent text-xs block mb-1">EP. {episode.number}</span>
                          <span className="font-medium text-sm block" style={{ lineHeight: '1.3' }}>{episode.title}</span>
                        </div>
                      </Link>
                    </div>

                    <div className="guest-social-links mt-6 flex gap-4">
                      {episode.guestLinkedin && (
                         <a href={episode.guestLinkedin} target="_blank" rel="noreferrer" className="btn btn-secondary" style={{ padding: '8px 16px', fontSize: '14px' }}>
                           <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg> LinkedIn
                         </a>
                      )}
                      {episode.guestInstagram && (
                         <a href={episode.guestInstagram} target="_blank" rel="noreferrer" className="btn btn-secondary" style={{ padding: '8px 16px', fontSize: '14px' }}>
                           <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg> Instagram
                         </a>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      
      {/* CTA SECTION */}
      <section className="section-padding text-center" style={{ background: 'rgba(0,0,0,0.3)' }}>
        <div className="container animate-on-scroll">
          <h2 className="h2 mb-6">Know someone inspiring?</h2>
          <p className="subheading mb-8">We are always looking for unique stories and voices.</p>
          <div className="flex justify-center">
            <Link to="/nominate-guest" className="btn btn-primary">Nominate a Guest <ArrowRight size={18} /></Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FeaturedGuests;
