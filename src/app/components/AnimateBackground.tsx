"use client"; 
import React, { useRef, useEffect } from 'react';

interface ParticleProps {
  pos: { x: number; y: number };
  vel: { x: number; y: number };
  update: () => void;
  draw: () => void;
}

export default function AnimatedBackground()  {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const particles: ParticleProps[] = [];
    const numParticles = 100;
    const maxDist = 100;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    class Particle {
      pos: { x: number; y: number };
      vel: { x: number; y: number };

      constructor(x: number, y: number) {
        this.pos = { x: x, y: y };
        this.vel = { x: Math.random() * 2 - 1, y: Math.random() * 2 - 1 };
      }

      update() {
        this.pos.x += this.vel.x;
        this.pos.y += this.vel.y;
        if (this.pos.x < 0 || this.pos.x > canvas.width) this.vel.x *= -1;
        if (this.pos.y < 0 || this.pos.y > canvas.height) this.vel.y *= -1;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, 2, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fillStyle = '#ffffff';
        ctx.fill();
      }
    }

    const createParticles = () => {
      for (let i = 0; i < numParticles; i++) {
        particles.push(new Particle(Math.random() * canvas.width, Math.random() * canvas.height));
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((particle, index) => {
        particle.update();
        particle.draw();

        for (let j = index + 1; j < particles.length; j++) {
          const other = particles[j];
          const dist = Math.hypot(particle.pos.x - other.pos.x, particle.pos.y - other.pos.y);
          if (dist < maxDist) {
            ctx.beginPath();
            ctx.moveTo(particle.pos.x, particle.pos.y);
            ctx.lineTo(other.pos.x, other.pos.y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${1 - dist / maxDist})`;
            ctx.stroke();
          }
        }
      });
      requestAnimationFrame(draw);
    };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles.length = 0;
      createParticles();
    };

    window.addEventListener('resize', resizeCanvas);
    createParticles();
    draw();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }} />;
};