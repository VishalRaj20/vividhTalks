import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Radio } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
  }, [location]);

  return (
    <>
      <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="container navbar-container">
          {/* Logo */}
          <Link to="/" className="logo">
            <img src="/Vividh Talks DP With Tagline White.png" alt="Vividh Talks" className="logo-img" />
          </Link>

          {/* Desktop Nav */}
          <nav className="desktop-nav">
            <Link to="/episodes" className={`nav-link ${location.pathname === '/episodes' ? 'active' : ''}`}>Episodes</Link>
            <Link to="/book" className={`nav-link ${location.pathname === '/book' ? 'active' : ''}`}>Studio</Link>
            <div
              className="nav-dropdown-wrapper"
              onMouseEnter={() => setServicesDropdownOpen(true)}
              onMouseLeave={() => setServicesDropdownOpen(false)}
            >
              <button className="nav-link dropdown-toggle">
                Services <ChevronDown size={13} className={servicesDropdownOpen ? 'rotated' : ''} />
              </button>
              <div className={`dropdown-menu ${servicesDropdownOpen ? 'show' : ''}`}>
                <Link to="/services/talks" className="dropdown-item">Talks</Link>
                <a href="https://vividhevents.com/" className="dropdown-item" target="_blank" rel="noopener noreferrer">Events</a>
                <a href="https://www.vividhcommunications.com/" className="dropdown-item" target="_blank" rel="noopener noreferrer">Communications</a>
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
          <Link to="/episodes" className="mobile-link">Episodes</Link>
          <Link to="/book" className="mobile-link">Studio</Link>
          <button className="mobile-link mobile-dropdown-toggle" onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}>
            Services <ChevronDown size={18} className={servicesDropdownOpen ? 'rotated' : ''} />
          </button>
          {servicesDropdownOpen && (
            <div className="mobile-dropdown-content">
              <Link to="/services/talks" className="mobile-dropdown-item">Talks</Link>
              <a href="https://vividhevents.com/" className="mobile-dropdown-item" target="_blank" rel="noopener noreferrer">Events</a>
              <a href="https://www.vividhcommunications.com/" className="mobile-dropdown-item" target="_blank" rel="noopener noreferrer">Communications</a>
            </div>
          )}
          <Link to="/about" className="mobile-link">About</Link>
          <Link to="/contact" className="mobile-link">Contact</Link>
        </nav>
        <div className="mobile-menu-footer">
          <Link to="/book" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Book a Studio Session</Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
