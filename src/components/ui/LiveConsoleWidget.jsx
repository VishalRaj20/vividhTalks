import React, { useState, useEffect } from 'react';
import { Volume2, Shield } from 'lucide-react';

const LiveConsoleWidget = () => {
  // Dynamic timer
  const [time, setTime] = useState('00:42:15');
  useEffect(() => {
    let seconds = 2535; // 42m 15s
    const timer = setInterval(() => {
      seconds++;
      const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
      const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
      const s = (seconds % 60).toString().padStart(2, '0');
      setTime(`${h}:${m}:${s}`);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Interactive Knobs (angle tracking)
  const [knobVal1, setKnobVal1] = useState(45); // angles in degrees
  const [knobVal2, setKnobVal2] = useState(120);
  const [knobVal3, setKnobVal3] = useState(80);

  const handleKnobInteraction = (e, setVal) => {
    const knob = e.currentTarget;
    const rect = knob.getBoundingClientRect();
    const knobCenterX = rect.left + rect.width / 2;
    const knobCenterY = rect.top + rect.height / 2;

    const handleMove = (moveEvent) => {
      const clientX = moveEvent.clientX || (moveEvent.touches && moveEvent.touches[0].clientX);
      const clientY = moveEvent.clientY || (moveEvent.touches && moveEvent.touches[0].clientY);
      if (clientX === undefined || clientY === undefined) return;
      
      const deltaX = clientX - knobCenterX;
      const deltaY = clientY - knobCenterY;
      let angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
      // Normalize angle to 0 - 360
      angle = (angle + 360) % 360;
      setVal(Math.round(angle));
    };

    const handleUp = () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleUp);
      window.removeEventListener('touchmove', handleMove);
      window.removeEventListener('touchend', handleUp);
    };

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseup', handleUp);
    window.addEventListener('touchmove', handleMove, { passive: false });
    window.addEventListener('touchend', handleUp);
  };

  // Creative Audio Waveform
  const [eqLevels, setEqLevels] = useState(Array(40).fill(10));
  useEffect(() => {
    let phase = 0;
    const interval = setInterval(() => {
      phase += 0.25;
      setEqLevels(
        Array.from({ length: 40 }, (_, i) => {
          // Complex organic wave using multiple sine waves
          const wave1 = Math.sin(i * 0.3 + phase);
          const wave2 = Math.sin(i * 0.6 - phase * 1.3);
          const wave3 = Math.cos(i * 0.2 + phase * 0.9);
          
          // Fast changing random noise
          const noise = (Math.random() * 0.5 + 0.75);
          
          let combined = (wave1 + wave2 + wave3) / 3;
          combined = (combined + 1) / 2; // Normalize to roughly 0-1
          
          // Smooth bell curve envelope to taper the edges
          const x = i / 39; 
          const envelope = Math.sin(x * Math.PI); 
          
          // Calculate final height with a base minimum
          let height = (combined * envelope * noise * 85) + 10;
          return Math.max(4, Math.min(96, height));
        })
      );
    }, 60); // Faster update for smooth animation
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="live-console-widget glass-card">
      {/* Widget Header */}
      <div className="console-header">
        <div className="console-status">
          <span className="pulse-red-dot"></span>
          <span className="console-status-text">LIVE STUDIO</span>
        </div>
        <div className="console-ep-num">DECK_A_ONLINE</div>
      </div>

      {/* Creative Audio Waveform Display */}
      <div className="console-eq-display">
        <div className="eq-grid">
          {eqLevels.map((level, i) => {
            // Dynamic color based on position and height
            const hue = 15 + (i / 40) * 50; // Gradient from Orange to Yellow-Green
            const intensity = level / 100;
            return (
              <div 
                className="eq-bar wave-style" 
                key={i}
                style={{ 
                  height: `${level}%`,
                  background: `linear-gradient(to top, hsl(${hue}, 100%, 50%), hsl(${hue + 20}, 100%, 65%))`,
                  boxShadow: `0 0 ${intensity * 12}px hsl(${hue}, 100%, 60%, ${intensity * 0.8})`,
                  opacity: 0.7 + intensity * 0.3,
                  transform: `scaleX(${0.8 + intensity * 0.2})` // Slight bulging effect
                }}
              ></div>
            );
          })}
        </div>
        <div className="eq-grid-lines">
          <div></div><div></div><div></div>
        </div>
      </div>

      {/* Controls Grid */}
      <div className="console-controls">
        {/* Timer Display */}
        <div className="console-monitor">
          <span className="monitor-label">REC TIME ELAPSED</span>
          <span className="monitor-timer">{time}</span>
        </div>

        {/* Knobs Section */}
        <div className="console-knobs">
          <div className="knob-container">
            <span className="knob-label">GAIN</span>
            <div 
              className="knob-ring" 
              onMouseDown={(e) => handleKnobInteraction(e, setKnobVal1)}
              onTouchStart={(e) => handleKnobInteraction(e, setKnobVal1)}
            >
              <div 
                className="knob-pointer" 
                style={{ transform: `rotate(${knobVal1}deg)` }}
              ></div>
            </div>
            <span className="knob-value">{Math.round((knobVal1 / 360) * 100)}%</span>
          </div>

          <div className="knob-container">
            <span className="knob-label">ECHO</span>
            <div 
              className="knob-ring" 
              onMouseDown={(e) => handleKnobInteraction(e, setKnobVal2)}
              onTouchStart={(e) => handleKnobInteraction(e, setKnobVal2)}
            >
              <div 
                className="knob-pointer" 
                style={{ transform: `rotate(${knobVal2}deg)` }}
              ></div>
            </div>
            <span className="knob-value">{Math.round((knobVal2 / 360) * 100)}%</span>
          </div>

          <div className="knob-container">
            <span className="knob-label">OUTPUT</span>
            <div 
              className="knob-ring" 
              onMouseDown={(e) => handleKnobInteraction(e, setKnobVal3)}
              onTouchStart={(e) => handleKnobInteraction(e, setKnobVal3)}
            >
              <div 
                className="knob-pointer" 
                style={{ transform: `rotate(${knobVal3}deg)` }}
              ></div>
            </div>
            <span className="knob-value">{Math.round((knobVal3 / 360) * 100)}%</span>
          </div>
        </div>
      </div>

      {/* Small Console Footer Info */}
      <div className="console-footer">
        <div className="footer-spec"><Volume2 size={12} /> 48kHz / 24-bit</div>
        <div className="footer-spec"><Shield size={12} /> SYSTEM READY</div>
      </div>
    </div>
  );
};

export default LiveConsoleWidget;
