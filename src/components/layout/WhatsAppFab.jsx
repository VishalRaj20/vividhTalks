import React from 'react';
import { MessageCircle } from 'lucide-react';
import './FloatingElements.css';

const WhatsAppFab = () => {
  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || "9031843501";
  const defaultMessage = encodeURIComponent("Hi Vividh Talks! I'm interested in recording a podcast episode. Can you help me with more details?");

  return (
    <a
      href={`https://wa.me/${whatsappNumber}?text=${defaultMessage}`}
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
