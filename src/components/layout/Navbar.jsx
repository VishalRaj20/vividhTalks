import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Radio } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 60);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setMoreDropdownOpen(false);
  }, [location]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    // Call once on mount in case it was somehow opened on a large screen
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="container navbar-container">
          {/* Logo */}
          <Link to="/" className="logo">
            <img loading="lazy" src="/Vividh Talks DP With Tagline White.webp" alt="Vividh Talks" className="logo-img" />
          </Link>

          {/* Desktop Nav */}
          <nav className="desktop-nav">
            <Link to="/episodes" className={`nav-link ${location.pathname === '/episodes' ? 'active' : ''}`}>Episodes</Link>
            <Link to="/host" className={`nav-link ${location.pathname === '/host' ? 'active' : ''}`}>Our Host</Link>
            <Link to="/featured-guests" className={`nav-link ${location.pathname === '/featured-guests' ? 'active' : ''}`}>Featured Guests</Link>
            <Link to="/book" className={`nav-link ${location.pathname === '/book' ? 'active' : ''}`}>Studio</Link>

            <div
              className="nav-dropdown-wrapper"
              onMouseEnter={() => setMoreDropdownOpen(true)}
              onMouseLeave={() => setMoreDropdownOpen(false)}
            >
              <button className="nav-link dropdown-toggle">
                More <ChevronDown size={13} className={moreDropdownOpen ? 'rotated' : ''} />
              </button>
              <div className={`dropdown-menu ${moreDropdownOpen ? 'show' : ''}`}>
                <Link to="/partner" className="dropdown-item">Partner With Us</Link>
                <Link to="/nominate-guest" className="dropdown-item">Nominate Guest</Link>
                <Link to="/blog" className="dropdown-item">Blog</Link>
              </div>
            </div>
            <Link to="/about" className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}>About</Link>
            <Link to="/contact" className={`nav-link ${location.pathname === '/contact' ? 'active' : ''}`}>Contact</Link>
          </nav>

          {/* Right Side */}
          <div className="nav-right">
            <Link to="/book" className="btn-nav-cta d-none-mobile">Book Studio</Link>
            <button className="hamburger-btn" onClick={() => setMobileMenuOpen(true)} aria-label="Open Menu">
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-header">
          <Link to="/" className="logo">
            <div className="logo-icon-wrap"><Radio size={16} /></div>
            <span className="logo-text">VIVIDH<span className="logo-accent">TALKS</span></span>
          </Link>
          <button className="close-btn" onClick={() => setMobileMenuOpen(false)} aria-label="Close Menu">
            <X size={22} />
          </button>
        </div>
        <nav className="mobile-nav-links">
          <Link to="/episodes" className={`mobile-link ${location.pathname === '/episodes' ? 'active' : ''}`}>Episodes</Link>
          <Link to="/host" className={`mobile-link ${location.pathname === '/host' ? 'active' : ''}`}>Our Host</Link>
          <Link to="/featured-guests" className={`mobile-link ${location.pathname === '/featured-guests' ? 'active' : ''}`}>Featured Guests</Link>
          <Link to="/book" className={`mobile-link ${location.pathname === '/book' ? 'active' : ''}`}>Studio</Link>

          <button className="mobile-link mobile-dropdown-toggle" onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}>
            More <ChevronDown size={18} className={moreDropdownOpen ? 'rotated' : ''} />
          </button>
          {moreDropdownOpen && (
            <div className="mobile-dropdown-content">
              <Link to="/partner" className="mobile-dropdown-item">Partner With Us</Link>
              <Link to="/nominate-guest" className="mobile-dropdown-item">Nominate Guest</Link>
              <Link to="/blog" className="mobile-dropdown-item">Blog</Link>
            </div>
          )}
          <Link to="/about" className={`mobile-link ${location.pathname === '/about' ? 'active' : ''}`}>About</Link>
          <Link to="/contact" className={`mobile-link ${location.pathname === '/contact' ? 'active' : ''}`}>Contact</Link>
        </nav>
        <div className="mobile-menu-footer">
          <Link to="/book" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Book a Studio Session</Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
