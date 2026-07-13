import { useRef, useEffect } from 'react';

const HeroVisualizer = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.targetX = e.clientX - rect.left;
      mouseRef.current.targetY = e.clientY - rect.top;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    const container = canvas.parentElement;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('mouseleave', handleMouseLeave);
    }

    let phase = 0;
    
    // Wave configuration
    const waves = [
      {
        amplitude: 38,
        frequency: 0.0025,
        speed: 0.014,
        color: 'rgba(255, 77, 0, 0.26)', // Brand Orange
        lineWidth: 2,
      },
      {
        amplitude: 28,
        frequency: 0.004,
        speed: 0.018,
        color: 'rgba(255, 150, 0, 0.22)', // Golden Amber
        lineWidth: 1.5,
      },
      {
        amplitude: 22,
        frequency: 0.006,
        speed: 0.012,
        color: 'rgba(212, 175, 55, 0.24)', strokeWidth: 1.5, // Gold Metallic
        lineWidth: 1,
      },
      {
        amplitude: 48,
        frequency: 0.0018,
        speed: 0.009,
        color: 'rgba(255, 60, 0, 0.15)', // Deep Fire Orange
        lineWidth: 1.2,
      },
      {
        amplitude: 16,
        frequency: 0.009,
        speed: 0.022,
        color: 'rgba(255, 240, 180, 0.08)', // Glowing Warm White
        lineWidth: 0.8,
      },
      {
        amplitude: 32,
        frequency: 0.005,
        speed: 0.007,
        color: 'rgba(255, 90, 0, 0.12)', // Subtle fill wave
        lineWidth: 0.5,
      }
    ];

    const draw = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse transition
      const mouse = mouseRef.current;
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      phase += 0.02;

      waves.forEach((wave) => {
        const points = [];
        for (let x = 0; x < width; x += 4) {
          // Calculate distance from mouse to create local ripples
          let ampFactor = 1;
          if (mouse.active) {
            const dx = x - mouse.x;
            const dist = Math.abs(dx);
            if (dist < 300) {
              // Smooth bell-curve perturbation
              const influence = (1 - dist / 300) * 1.5;
              ampFactor += influence * (1.0 + Math.sin(phase * 1.5 + x * 0.01));
            }
          }

          // Apply double-peak horizontal envelope matching the mockup soundwave
          const pct = x / width;
          const envelope = Math.sin(pct * Math.PI) * (0.35 + 0.65 * Math.pow(Math.sin(pct * Math.PI * 2), 2));

          // Generate waveform
          const y =
            height / 2 +
            Math.sin(x * wave.frequency + phase * wave.speed * 12) *
              wave.amplitude *
              ampFactor *
              envelope *
              Math.sin(phase * 0.05 + wave.frequency * 8);

          points.push({ x, y });
        }

        // 1. Draw glowing backdrop line (thick, low opacity)
        ctx.beginPath();
        // Extract rgba numbers and construct a low opacity glow color
        const baseColor = wave.color.substring(0, wave.color.lastIndexOf(','));
        ctx.strokeStyle = `${baseColor}, 0.08)`;
        ctx.lineWidth = wave.lineWidth * 5;
        points.forEach((pt, idx) => {
          if (idx === 0) ctx.moveTo(pt.x, pt.y);
          else ctx.lineTo(pt.x, pt.y);
        });
        ctx.stroke();

        // 2. Draw sharp foreground line (thin)
        ctx.beginPath();
        ctx.strokeStyle = wave.color;
        ctx.lineWidth = wave.lineWidth;
        points.forEach((pt, idx) => {
          if (idx === 0) ctx.moveTo(pt.x, pt.y);
          else ctx.lineTo(pt.x, pt.y);
        });
        ctx.stroke();
      });

      // Draw active frequency dot tracking cursor
      if (mouse.active && mouse.x > 0 && mouse.x < width) {
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#FF4D00';
        ctx.shadowBlur = 12;
        ctx.shadowColor = '#FF4D00';
        ctx.fill();
        ctx.shadowBlur = 0; // reset
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseleave', handleMouseLeave);
      }
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="hero-visualizer-canvas"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1,
      }}
    />
  );
};

export default HeroVisualizer;
