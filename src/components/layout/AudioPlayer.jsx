import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, X, SkipBack, SkipForward, Music } from 'lucide-react';
import './AudioPlayer.css';

// Pre-defined high-quality royalty-free podcast intro tracks as demos
const DEFAULT_AUDIO_TRACKS = [
  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
];

const getDemoAudio = (id) => {
  if (!id) return DEFAULT_AUDIO_TRACKS[0];
  // Simple deterministic hash to map episode id to a demo track
  const num = parseInt(id.replace(/\D/g, '')) || 0;
  return DEFAULT_AUDIO_TRACKS[num % DEFAULT_AUDIO_TRACKS.length];
};

const formatTime = (secs) => {
  if (isNaN(secs)) return '00:00';
  const minutes = Math.floor(secs / 60);
  const seconds = Math.floor(secs % 60);
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

const AudioPlayer = () => {
  const [track, setTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const audioRef = useRef(null);
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const visualizerBars = useRef([]);

  // Setup event listener for global play actions
  useEffect(() => {
    const handlePlayPodcast = (e) => {
      const { id, title, guest, image, audioUrl } = e.detail;
      const fileUrl = audioUrl || getDemoAudio(id);

      setTrack({
        id,
        title,
        guest: guest ? guest.replace('Featuring ', '') : 'Special Guest',
        image: image || 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=300',
        audioUrl: fileUrl,
      });

      setIsVisible(true);
      setIsPlaying(true);
    };

    window.addEventListener('play-podcast', handlePlayPodcast);
    return () => window.removeEventListener('play-podcast', handlePlayPodcast);
  }, []);

  // Handle source changes and auto-play
  useEffect(() => {
    if (audioRef.current && track) {
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current.play().catch(err => {
          console.log('Autoplay blocked or failed:', err);
          setIsPlaying(false);
        });
      }
    }
  }, [track]);

  // Audio lifecycle / sync state
  const onPlayPause = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const updateTime = () => {
    if (!audioRef.current) return;
    setCurrentTime(audioRef.current.currentTime);
  };

  const onLoadedMetadata = () => {
    if (!audioRef.current) return;
    setDuration(audioRef.current.duration);
  };

  const handleSeekChange = (e) => {
    if (!audioRef.current) return;
    const time = parseFloat(e.target.value);
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  };

  const handleVolumeChange = (e) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (audioRef.current) {
      audioRef.current.volume = val;
    }
    if (val > 0) setIsMuted(false);
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    if (isMuted) {
      audioRef.current.volume = volume;
      setIsMuted(false);
    } else {
      audioRef.current.volume = 0;
      setIsMuted(true);
    }
  };

  const skipForward = () => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = Math.min(audioRef.current.currentTime + 30, duration);
  };

  const skipBackward = () => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = Math.max(audioRef.current.currentTime - 10, 0);
  };

  const handleClose = () => {
    setIsPlaying(false);
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setIsVisible(false);
  };

  // Canvas visualizer drawer (reacts smoothly to playing state)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const barCount = 32;

    // Set high-DPI canvas width/height
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Initialize mock visualizer frequencies if empty
    if (visualizerBars.current.length !== barCount) {
      visualizerBars.current = Array.from({ length: barCount }, () => ({
        current: 5,
        target: 5,
        phase: Math.random() * Math.PI * 2,
        speed: 0.05 + Math.random() * 0.05
      }));
    }

    const render = () => {
      // Re-fill size if layout changes
      if (canvas.width !== canvas.offsetWidth || canvas.height !== canvas.offsetHeight) {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const w = canvas.width;
      const h = canvas.height;
      const spacing = 3;
      const totalSpacing = spacing * (barCount - 1);
      const barWidth = (w - totalSpacing) / barCount;

      const accentColor = getComputedStyle(document.body).getPropertyValue('--accent-primary').trim() || '#FF4D00';
      const secondaryColor = getComputedStyle(document.body).getPropertyValue('--accent-secondary').trim() || '#C8FF00';

      // Setup gradient
      const gradient = ctx.createLinearGradient(0, h, 0, 0);
      gradient.addColorStop(0, accentColor);
      gradient.addColorStop(0.5, secondaryColor);
      gradient.addColorStop(1, '#FFFFFF');

      visualizerBars.current.forEach((bar, index) => {
        if (isPlaying) {
          // Generative procedural frequencies that feel organic
          bar.phase += bar.speed;
          
          // Combine multi-sine waves to simulate complex music waves
          const baseHeight = Math.sin(bar.phase) * (h * 0.35) + (h * 0.45);
          const noise = Math.sin(bar.phase * 2.3) * (h * 0.15);
          const volumeFactor = isMuted ? 0.05 : Math.max(0.2, volume);
          
          // Different bars respond to different simulated spectrums (low bass on left, high treble on right)
          let frequencyMod = 1.0;
          if (index < 8) {
            // Bass: slower, heavier movements
            frequencyMod = 1.0 + Math.sin(Date.now() * 0.003) * 0.2;
          } else if (index > 24) {
            // Treble: fast, spiky jumps
            frequencyMod = 0.6 + Math.random() * 0.5;
          } else {
            // Mids
            frequencyMod = 0.8 + Math.cos(Date.now() * 0.005 + index) * 0.25;
          }

          bar.target = Math.max(3, (baseHeight + noise) * volumeFactor * frequencyMod);
        } else {
          // Flatten to subtle idle ripples when paused
          bar.target = 3 + Math.sin(index * 0.4 + Date.now() * 0.002) * 1.5;
        }

        // Smooth easing interpolation
        bar.current += (bar.target - bar.current) * 0.15;

        const x = index * (barWidth + spacing);
        const y = h - bar.current;
        const radius = barWidth / 2;

        // Draw rounded top bars
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.moveTo(x, h);
        ctx.lineTo(x, y + radius);
        ctx.quadraticCurveTo(x, y, x + radius, y);
        ctx.quadraticCurveTo(x + barWidth, y, x + barWidth, y + radius);
        ctx.lineTo(x + barWidth, h);
        ctx.closePath();
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animationRef.current);
  }, [isPlaying, volume, isMuted]);

  if (!isVisible || !track) return null;

  return (
    <div className="global-audio-player-wrapper slide-up-animation">
      {/* HTML5 Audio Core */}
      <audio
        ref={audioRef}
        src={track.audioUrl}
        onTimeUpdate={updateTime}
        onLoadedMetadata={onLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
      />

      <div className="container player-inner-grid">
        {/* Track Thumbnail Info */}
        <div className="player-track-info">
          <div className="track-thumb-wrap">
            <img src={track.image} alt={track.title} />
            <div className="track-pulse-disc">
              <Music size={12} className={isPlaying ? 'spin' : ''} />
            </div>
          </div>
          <div className="track-texts">
            <h4 className="track-title line-clamp-1">{track.title}</h4>
            <p className="track-guest text-secondary line-clamp-1">{track.guest}</p>
          </div>
        </div>

        {/* Central Audio Controls */}
        <div className="player-central-controls">
          <div className="button-group">
            <button className="control-btn" onClick={skipBackward} title="Skip back 10s">
              <SkipBack size={18} />
            </button>
            <button className="play-pause-btn" onClick={onPlayPause} aria-label={isPlaying ? 'Pause' : 'Play'}>
              {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" />}
            </button>
            <button className="control-btn" onClick={skipForward} title="Skip forward 30s">
              <SkipForward size={18} />
            </button>
          </div>

          <div className="progress-timeline">
            <span className="time-display">{formatTime(currentTime)}</span>
            <input
              type="range"
              min="0"
              max={duration || 0}
              value={currentTime}
              onChange={handleSeekChange}
              className="seek-slider"
            />
            <span className="time-display">{formatTime(duration)}</span>
          </div>
        </div>

        {/* Right Section: Visualizer & Volume */}
        <div className="player-right-controls">
          {/* Canvas Waveform visualizer */}
          <div className="visualizer-container">
            <canvas ref={canvasRef} className="visualizer-canvas" />
          </div>

          {/* Volume Group */}
          <div className="volume-slider-group">
            <button className="control-btn volume-btn" onClick={toggleMute} aria-label="Mute toggle">
              {isMuted || volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="volume-slider"
            />
          </div>

          {/* Close Panel Button */}
          <button className="close-player-btn" onClick={handleClose} aria-label="Close player">
            <X size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
export { DEFAULT_AUDIO_TRACKS };
