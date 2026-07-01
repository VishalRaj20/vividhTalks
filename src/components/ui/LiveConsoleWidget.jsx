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

  // Bouncing EQ bars
  const [eqLevels, setEqLevels] = useState([40, 60, 30, 80, 50, 70, 45, 90]);
  useEffect(() => {
    const interval = setInterval(() => {
      setEqLevels(
        Array.from({ length: 8 }, () => Math.floor(Math.random() * 85) + 15)
      );
    }, 120);
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

      {/* EQ Visualizer Display */}
      <div className="console-eq-display">
        <div className="eq-grid">
          {eqLevels.map((level, i) => (
            <div className="eq-column" key={i}>
              <div 
                className="eq-bar" 
                style={{ 
                  height: `${level}%`,
                  background: i % 2 === 0 ? 'var(--accent-primary)' : 'var(--accent-secondary)'
                }}
              ></div>
            </div>
          ))}
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
