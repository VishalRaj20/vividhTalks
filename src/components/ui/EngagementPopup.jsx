import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, MessageSquare, Calendar, ArrowRight } from 'lucide-react';
import './EngagementPopup.css';

const EngagementPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [activeTab, setActiveTab] = useState('chat'); // 'chat' or 'book'
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const navigate = useNavigate();

  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || "9031843501";

  useEffect(() => {
    // Check if user has already dismissed the popup in this session
    const hasSeenPopup = sessionStorage.getItem('hasSeenEngagementPopup');

    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 10000); // 30 seconds

      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsVisible(false);
      setIsClosing(false); // Reset isClosing so it unmounts completely
      sessionStorage.setItem('hasSeenEngagementPopup', 'true');
    }, 500); // Wait for exit animation
  };

  const handleBookClick = () => {
    handleClose();
    setTimeout(() => {
      navigate('/book');
    }, 300);
  };

  const handleWhatsAppSend = () => {
    let text = formData.message || "Hi Vividh Talks! I'm interested in knowing more.";
    if (formData.name) {
      text += `\n\n- From ${formData.name}`;
    }
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
    handleClose();
  };

  if (!isVisible && !isClosing) return null;

  return (
    <div className={`engagement-popup-overlay ${isClosing ? 'closing' : ''}`}>
      <div className={`engagement-popup-content ${isClosing ? 'closing' : ''}`}>
        <button className="popup-close-btn" onClick={handleClose}>
          <X />
        </button>

        <div className="popup-header">
          <div className="popup-avatar-wrapper">
            <img src="/Vividh Talks DP With Tagline White.webp" alt="Vividh Talks" className="popup-avatar" />
            <div className="status-indicator"></div>
          </div>
          <div className="popup-title">
            <h3>Let's Collaborate!</h3>
            <p>I'm currently online and available.</p>
          </div>
        </div>

        <div className="popup-tabs">
          <button
            className={`popup-tab ${activeTab === 'chat' ? 'active' : ''}`}
            onClick={() => setActiveTab('chat')}
          >
            <MessageSquare /> Quick Chat
          </button>
          <button
            className={`popup-tab ${activeTab === 'book' ? 'active' : ''}`}
            onClick={() => setActiveTab('book')}
          >
            <Calendar /> Book Session
          </button>
        </div>

        <div className="popup-body">
          {activeTab === 'chat' ? (
            <div className="popup-chat-form">
              <p className="popup-desc">Have a quick question or want to discuss a potential partnership? Drop a message below!</p>
              <div className="input-group">
                <input 
                  type="text" 
                  placeholder="Your Name" 
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="input-group">
                <input 
                  type="email" 
                  placeholder="Your Email (Optional)" 
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div className="input-group">
                <textarea 
                  placeholder="How can we help you?" 
                  rows="3"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                ></textarea>
              </div>
              <button className="popup-submit-btn" onClick={handleWhatsAppSend}>
                Send on WhatsApp <ArrowRight />
              </button>
            </div>
          ) : (
            <div className="popup-book-section">
              <div className="book-illustration">
                <Calendar className="calendar-icon" />
              </div>
              <p className="popup-desc">Ready for a deep dive? Schedule a 1-on-1 strategic session to discuss your ideas, podcast, or business growth.</p>
              <button className="popup-submit-btn book-btn" onClick={handleBookClick}>
                View Calendar <ArrowRight />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EngagementPopup;
