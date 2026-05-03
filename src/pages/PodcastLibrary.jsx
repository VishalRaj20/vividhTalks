import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Search, Grid, List, Play } from 'lucide-react';
import PodcastCard from '../components/ui/PodcastCard';
import ClipCard from '../components/ui/ClipCard';
import { useYouTubeData } from '../hooks/useYouTubeData';
import { episodes as dummyEpisodes, clips as dummyClips } from '../data/dummyData';
import './PodcastLibrary.css';

const PodcastLibrary = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialCategory = queryParams.get('category');

  const [activeFilter, setActiveFilter] = useState(initialCategory || 'All');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  
  const { episodes: apiEpisodes, clips: apiClips, loading } = useYouTubeData();
  const episodes = apiEpisodes.length > 0 ? apiEpisodes : dummyEpisodes;
  const clips = apiClips.length > 0 ? apiClips : dummyClips;

  const filters = ['All', 'Startup', 'Student Life', 'Culture', 'Tech', 'Personal Branding', 'Local Voices', 'Social Impact', 'Marketing'];

  useEffect(() => {
    const category = new URLSearchParams(location.search).get('category');
    if (category && filters.includes(category)) {
      setActiveFilter(category);
    } else if (!category) {
      setActiveFilter('All');
    }
  }, [location.search]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, { threshold: 0.1 });

    const hiddenElements = document.querySelectorAll('.animate-on-scroll');
    hiddenElements.forEach((el) => observer.observe(el));

    return () => hiddenElements.forEach((el) => observer.unobserve(el));
  }, [loading, activeFilter, searchQuery, viewMode]);

  const filteredEpisodes = episodes.filter(ep => {
    const matchesFilter = activeFilter === 'All' || ep.category === activeFilter;
    const matchesSearch = 
      ep.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      ep.guest.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (ep.tags && ep.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())));
    return matchesFilter && matchesSearch;
  });

  if (loading) {
    return <div className="page-wrapper" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div className="loader"></div></div>;
  }

  return (
    <div className="library-page">
      {/* Page Hero */}
      <section className="library-hero-section animate-on-scroll">
        <div className="library-hero-bg" style={{ backgroundImage: 'url(/podcast_episodes_hero.png)' }}></div>
        <div className="library-hero-overlay"></div>
        <div className="container">
          <div className="section-tag"><span className="section-tag-dot"></span> EPISODE LIBRARY</div>
          <h1 className="h1" style={{ marginTop: '16px' }}>All Episodes.<br/><span className="text-accent">All Stories.</span></h1>
          <p className="subheading" style={{ maxWidth: '600px', marginTop: '16px' }}>
            Browse, discover, and binge every conversation we've ever had.
          </p>
          <div className="stats-row mono-label" style={{ marginTop: '24px', color: 'var(--text-secondary)' }}>
            <span>50+ Episodes</span><span className="dot">·</span>
            <span>30+ Guests</span><span className="dot">·</span>
            <span>8 Categories</span><span className="dot">·</span>
            <span style={{ color: 'var(--accent-primary)' }}>Growing Every Week</span>
          </div>
        </div>
      </section>

      {/* Search & Filter Bar */}
      <section className="filter-bar-container">
        <div className="container filter-bar">
          <div className="search-input-wrapper">
            <Search size={20} className="search-icon" />
            <input 
              type="text" 
              placeholder="Search episodes, guests, topics..." 
              className="search-input" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="filter-pills-scroll">
            {filters.map(f => (
              <button 
                key={f} 
                className={`filter-pill ${activeFilter === f ? 'active' : ''}`}
                onClick={() => setActiveFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="view-toggles d-none-mobile">
            <button 
              className={`icon-btn-small ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
              aria-label="Grid view"
            >
              <Grid size={20} />
            </button>
            <button 
              className={`icon-btn-small ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
              aria-label="List view"
            >
              <List size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* Pinned Episodes (Only show when All is selected) */}
      {activeFilter === 'All' && (
        <section className="pinned-section container section-padding">
          <div className="pinned-grid animate-on-scroll">
            {episodes.slice(0, 2).map((ep, idx) => (
              <div className="pinned-card glass-card" key={ep.id}>
                <div className="pinned-badge">FEATURED</div>
                <div className="pinned-img">
                  <img src={ep.image} alt={ep.title} />
                  <div className="play-overlay"><div className="play-btn"><Play fill="currentColor" /></div></div>
                </div>
                <div className="pinned-content">
                  <span className="mono-label text-accent">EP. {ep.number}</span>
                  <h3 className="h3 mt-2 mb-2">{ep.title}</h3>
                  <p className="text-secondary mb-4">{ep.guest}</p>
                  <Link to={`/episode/${ep.id}`} className="btn btn-outline">Watch Now</Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Episode Grid */}
      <section className="container section-padding">
        {filteredEpisodes.length > 0 ? (
          <>
            <div className={`episode-${viewMode}`}>
              {filteredEpisodes.map((ep, idx) => (
                <div className="animate-on-scroll" style={{ transitionDelay: `${(idx % 3) * 0.1}s` }} key={ep.id}>
                  <PodcastCard episode={ep} />
                </div>
              ))}
            </div>
            
            <div className="text-center mt-12 animate-on-scroll">
              <button className="btn btn-secondary">Load More Episodes ↓</button>
            </div>
          </>
        ) : (
          <div className="empty-state text-center py-12 animate-on-scroll">
            <h3 className="h3 mb-4">No episodes found for this filter.</h3>
            <p className="subheading">Try another category! 🎙</p>
            <button className="btn btn-outline mt-6" onClick={() => setActiveFilter('All')}>Clear Filters</button>
          </div>
        )}
      </section>

      {/* Short Clips */}
      <section className="clips-section section-padding">
        <div className="container animate-on-scroll">
          <div className="section-header">
            <h2 className="h2">Binge the Best Moments</h2>
          </div>
        </div>
        <div className="clips-full-bleed-wrapper">
          <div className="clips-scroll-container">
            <div className="clips-row animate-on-scroll">
              {clips.map(clip => (
                <ClipCard key={clip.id} clip={clip} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Strip */}
      <section className="cta-strip">
        <div className="container animate-on-scroll text-center">
          <h2 className="h2 mb-4">Your Story Belongs Here.</h2>
          <p className="subheading mb-6">Apply to be a guest or book your own episode.</p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link to="/contact" className="btn btn-outline">Apply as a Guest →</Link>
            <Link to="/book" className="btn btn-primary">Book a Full Session →</Link>
          </div>
        </div>
        <div className="hero-glow"></div>
      </section>
    </div>
  );
};

export default PodcastLibrary;
