import React from 'react';
import { MessageCircle } from 'lucide-react';
import './FloatingElements.css';

const WhatsAppFab = () => {
  return (
    <a 
      href="https://wa.me/91XXXXXXXXXX?text=Hi%20Vividh%20Talks!%20I'd%20like%20to%20know%20more%20about..."
      className="whatsapp-fab"
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with us on WhatsApp"
      title="Chat with us on WhatsApp"
    >
      <MessageCircle size={28} />
      <div className="pulse-ring"></div>
    </a>
  );
};

export default WhatsAppFab;
