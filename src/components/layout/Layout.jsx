import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import WhatsAppFab from './WhatsAppFab';
import StudioSettingsWidget from '../ui/StudioSettingsWidget';
import CustomCursor from './CustomCursor';
import EngagementPopup from '../ui/EngagementPopup';

const Layout = () => {
  const { pathname } = useLocation();

  // Scroll to top on route change and track mouse movement for interactive glowing
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="app-layout">
      <div className="global-site-bg" style={{ backgroundImage: 'url(/images/stats_bg.webp)' }}></div>
      <div className="global-site-overlay"></div>
      <Navbar />
      <main style={{ minHeight: '100vh', position: 'relative', zIndex: 1 }}>
        <Outlet />
      </main>
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Footer />
      </div>
      <WhatsAppFab />
      <StudioSettingsWidget />
      <CustomCursor />
      <EngagementPopup />
    </div>
  );
};

export default Layout;
