'use client';

import React, { useEffect, useRef } from 'react';

export default function DynamicBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      glow: boolean;
      pulse: number;
      pulseSpeed: number;
      shape: 'dot' | 'cross' | 'ring';
    }> = [];

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    };

    window.addEventListener('resize', handleResize);

    const mouse = { x: width / 2, y: height / 2, targetX: width / 2, targetY: height / 2 };
    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const initParticles = () => {
      particles = [];
      const count = Math.min(Math.floor((width * height) / 10000), 80);
      const colors = ['blue', 'purple', 'teal'];
      for (let i = 0; i < count; i++) {
        const color = colors[i % colors.length];
        const shapeRand = Math.random();
        const shape = shapeRand < 0.70 ? 'dot' : (shapeRand < 0.85 ? 'cross' : 'ring');

        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          size: Math.random() * 2 + 1,
          color: color,
          glow: Math.random() > 0.8,
          pulse: Math.random() * Math.PI,
          pulseSpeed: 0.01 + Math.random() * 0.02,
          shape: shape
        });
      }
    };

    initParticles();

    const render = () => {
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      ctx.clearRect(0, 0, width, height);

      const parallaxX = (mouse.x - width / 2) * 0.015;
      const parallaxY = (mouse.y - height / 2) * 0.015;

      particles.forEach((p) => {
        p.pulse += p.pulseSpeed;
        const currentSize = p.size + Math.sin(p.pulse) * 0.5;

        // Mouse gravity pull
        const mdx = mouse.x - p.x;
        const mdy = mouse.y - p.y;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mdist < 180) {
          const force = (1 - mdist / 180) * 0.05;
          p.vx += (mdx / mdist) * force;
          p.vy += (mdy / mdist) * force;
        }

        // Limit speed and drag
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        const maxSpeed = 1.0;
        if (speed > maxSpeed) {
          p.vx = (p.vx / speed) * maxSpeed;
          p.vy = (p.vy / speed) * maxSpeed;
        }
        p.vx *= 0.98;
        p.vy *= 0.98;

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        else if (p.x > width) p.x = 0;

        if (p.y < 0) p.y = height;
        else if (p.y > height) p.y = 0;

        const renderX = p.x + parallaxX;
        const renderY = p.y + parallaxY;

        let baseColor = 'rgba(0, 82, 204, 0.1)';
        let glowColor = 'rgba(0, 82, 204, 0.35)';
        let glowOuter = 'rgba(0, 82, 204, 0.04)';

        if (p.color === 'purple') {
          baseColor = 'rgba(124, 58, 237, 0.12)';
          glowColor = 'rgba(124, 58, 237, 0.38)';
          glowOuter = 'rgba(124, 58, 237, 0.04)';
        } else if (p.color === 'teal') {
          baseColor = 'rgba(16, 185, 129, 0.12)';
          glowColor = 'rgba(16, 185, 129, 0.38)';
          glowOuter = 'rgba(16, 185, 129, 0.04)';
        }

        // Draw Shapes
        if (p.shape === 'cross') {
          ctx.strokeStyle = p.glow ? glowColor : baseColor;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(renderX - 2, renderY);
          ctx.lineTo(renderX + 2, renderY);
          ctx.moveTo(renderX, renderY - 2);
          ctx.lineTo(renderX, renderY + 2);
          ctx.stroke();
        } else if (p.shape === 'ring') {
          ctx.strokeStyle = p.glow ? glowColor : baseColor;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.arc(renderX, renderY, currentSize * 0.9, 0, Math.PI * 2);
          ctx.stroke();
        } else {
          ctx.beginPath();
          ctx.arc(renderX, renderY, currentSize, 0, Math.PI * 2);
          ctx.fillStyle = p.glow ? glowColor : baseColor;
          ctx.fill();
        }

        if (p.glow) {
          ctx.beginPath();
          ctx.arc(renderX, renderY, currentSize * 2, 0, Math.PI * 2);
          ctx.fillStyle = glowOuter;
          ctx.fill();
        }
      });

      // Draw Connections
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];

          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            const opacity = (1 - dist / 120) * 0.06;
            let strokeColor = `rgba(0, 82, 204, ${opacity})`;
            if (p1.color === 'purple') {
              strokeColor = `rgba(124, 58, 237, ${opacity})`;
            } else if (p1.color === 'teal') {
              strokeColor = `rgba(16, 185, 129, ${opacity})`;
            }

            ctx.beginPath();
            ctx.moveTo(p1.x + parallaxX, p1.y + parallaxY);
            ctx.lineTo(p2.x + parallaxX, p2.y + parallaxY);
            ctx.strokeStyle = strokeColor;
            ctx.stroke();

            // Tiny data pulse animations on lines
            if ((i + j) % 7 === 0) {
              const progress = (Date.now() / 1500 + i * 0.1) % 1;
              const pulseX = p1.x + dx * progress + parallaxX;
              const pulseY = p1.y + dy * progress + parallaxY;

              let pulseColor = '#0052cc';
              if (p1.color === 'purple') pulseColor = '#7c3aed';
              else if (p1.color === 'teal') pulseColor = '#10b981';

              ctx.beginPath();
              ctx.arc(pulseX, pulseY, 1.2, 0, Math.PI * 2);
              ctx.fillStyle = pulseColor;
              ctx.fill();
            }
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none">
      <canvas ref={canvasRef} className="w-full h-full block" />
      <div
        className="absolute inset-0 opacity-[0.01] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />
    </div>
  );
}
