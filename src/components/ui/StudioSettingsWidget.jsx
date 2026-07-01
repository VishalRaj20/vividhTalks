import React, { useState, useEffect, useRef } from 'react';
import { Sliders, Volume2, Sparkles, X, Check, Music } from 'lucide-react';
import './StudioSettingsWidget.css';

const themes = [
  { id: 'lava', name: 'Lava Orange', primary: '#FF4D00', text: '🧡' },
  { id: 'acid', name: 'Acid Neon', primary: '#C8FF00', text: '💚' },
  { id: 'cyber', name: 'Cyber Purple', primary: '#A020F0', text: '💜' },
  { id: 'gold', name: 'Gold Studio', primary: '#FFD700', text: '💛' },
];

const playSynthesizedSound = (type) => {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return;
  const ctx = new AudioContext();
  const now = ctx.currentTime;

  if (type === 'airhorn') {
    // Airhorn: combination of bright sawtooth waves with a slight pitch vibrato
    const oscs = [];
    const frequencies = [220, 221.5, 330, 440];
    
    // Create gain to control overall volume and envelope
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.08, now);
    masterGain.gain.setValueAtTime(0.08, now + 0.1);
    masterGain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);
    masterGain.connect(ctx.destination);

    frequencies.forEach((freq) => {
      const osc = ctx.createOscillator();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, now);
      osc.connect(masterGain);
      osc.start(now);
      osc.stop(now + 0.8);
      oscs.push(osc);
    });
  } else if (type === 'scratch') {
    // Record scratch: Filtered noise with speed modulation
    const duration = 0.35;
    const bufferSize = ctx.sampleRate * duration;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.Q.setValueAtTime(6, now);
    filter.frequency.setValueAtTime(1200, now);
    filter.frequency.exponentialRampToValueAtTime(150, now + duration);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    noise.start(now);
    noise.stop(now + duration);
  } else if (type === 'applause') {
    // Applause simulation: Low-pass noise with random burst claps
    const duration = 1.8;
    const bufferSize = ctx.sampleRate * duration;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.Q.setValueAtTime(1.2, now);
    filter.frequency.setValueAtTime(900, now);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.04, now);
    
    // Simulate individual claps blending together
    for (let t = 0; t < duration - 0.2; t += 0.06) {
      gain.gain.setValueAtTime(0.05 + Math.random() * 0.08, now + t);
    }
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    noise.start(now);
    noise.stop(now + duration);
  } else if (type === 'chime') {
    // Chime Rise: ascending arpeggio of sine waves
    const freqs = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99]; // C major
    freqs.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.06);
      
      gain.gain.setValueAtTime(0.12, now + idx * 0.06);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.06 + 0.4);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start(now + idx * 0.06);
      osc.stop(now + idx * 0.06 + 0.4);
    });
  } else if (type === 'laser') {
    // Laser blast
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(950, now);
    osc.frequency.exponentialRampToValueAtTime(40, now + 0.28);
    
    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start(now);
    osc.stop(now + 0.28);
  } else if (type === 'beep') {
    // Retro beep
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(587.33, now); // D5
    
    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start(now);
    osc.stop(now + 0.15);
  }
};

const StudioSettingsWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTheme, setActiveTheme] = useState('lava');
  const widgetRef = useRef(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem('vividh-talks-theme') || 'lava';
    setActiveTheme(savedTheme);
    applyTheme(savedTheme);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (widgetRef.current && !widgetRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isOpen]);

  const applyTheme = (themeId) => {
    // Remove all previous theme classes
    themes.forEach((t) => {
      document.body.classList.remove(`theme-${t.id}`);
    });
    // Add current theme class
    document.body.classList.add(`theme-${themeId}`);
  };

  const handleThemeChange = (themeId) => {
    setActiveTheme(themeId);
    applyTheme(themeId);
    localStorage.setItem('vividh-talks-theme', themeId);
    // Play a little feedback beep
    playSynthesizedSound('beep');
  };

  return (
    <>
      <div 
        className={`studio-settings-backdrop ${isOpen ? 'active' : ''}`} 
        onClick={() => setIsOpen(false)}
      ></div>
      <div className={`studio-settings-widget-container ${isOpen ? 'active' : ''}`} ref={widgetRef}>
        {/* Floating Toggle Button */}
      <button 
        className="studio-settings-fab" 
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Customize Studio Experience"
        title="Customize Studio & Soundboard"
      >
        {isOpen ? <X size={24} /> : <Sliders size={24} />}
        <span className="pulse-circle"></span>
      </button>

      {/* Slide-out Customization Panel */}
      <div className="studio-settings-panel glass-card">
        <div className="panel-header">
          <h3>
            <Sparkles size={18} className="text-accent" /> Customizer Hub
          </h3>
          <p className="text-secondary text-sm">Personalize your studio experience</p>
        </div>

        <div className="panel-section">
          <h4 className="section-title">Visual Accents</h4>
          <div className="themes-grid">
            {themes.map((t) => (
              <button
                key={t.id}
                className={`theme-select-btn ${activeTheme === t.id ? 'active' : ''}`}
                onClick={() => handleThemeChange(t.id)}
                style={{ '--theme-color': t.primary }}
              >
                <span className="theme-emoji">{t.text}</span>
                <span className="theme-btn-name">{t.name}</span>
                {activeTheme === t.id && (
                  <span className="active-check">
                    <Check size={12} />
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="panel-section">
          <h4 className="section-title">
            <Volume2 size={16} className="text-accent" /> Podcast Soundboard
          </h4>
          <p className="section-desc">Trigger instant sound effects (Pure Web Audio synth)</p>
          
          <div className="soundboard-grid">
            {[
              { id: 'airhorn', name: '📢 Airhorn' },
              { id: 'scratch', name: '🎚 Scratch' },
              { id: 'applause', name: '👏 Applause' },
              { id: 'chime', name: '✨ Chime' },
              { id: 'laser', name: '⚡ Laser' },
              { id: 'beep', name: '🕹 Beep' },
            ].map((sound) => (
              <button
                key={sound.id}
                className="soundboard-btn"
                onClick={() => playSynthesizedSound(sound.id)}
              >
                <Music size={12} className="sound-icon" />
                <span>{sound.name}</span>
              </button>
            ))}
          </div>
        </div>
        
        <div className="panel-footer">
          <p>🔧 Crafted dynamically using Web Audio API</p>
        </div>
      </div>
    </div>
  </>
  );
};

export default StudioSettingsWidget;
