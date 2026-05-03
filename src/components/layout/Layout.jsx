import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import WhatsAppFab from './WhatsAppFab';
import BackToTop from './BackToTop';

const Layout = () => {
  const { pathname } = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="app-layout">
      <div className="global-site-bg" style={{ backgroundImage: 'url(/images/stats_bg.png)' }}></div>
      <div className="global-site-overlay"></div>
      <Navbar />
      <main style={{ minHeight: '100vh', position: 'relative', zIndex: 1 }}>
        <Outlet />
      </main>
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Footer />
      </div>
      <WhatsAppFab />
      <BackToTop />
    </div>
  );
};

export default Layout;
