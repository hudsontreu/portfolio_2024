'use client';

import { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import p5 from 'p5';
import styles from './styles.module.css';

// Dynamically import p5 with no SSR
// const p5 = dynamic(() => import('p5'), { ssr: false });

export default function HeroArtp5() {
  const sketchRef = useRef(null);

  useEffect(() => {
    if (!sketchRef.current) return;
    console.log('Initializing p5 sketch');

    // Create the p5 sketch
    const sketch = (p) => {
      let particles = [];
      const numParticles = 50;

      p.setup = () => {
        console.log('Setting up canvas');
        const canvas = p.createCanvas(window.innerWidth, window.innerHeight);
        canvas.parent(sketchRef.current);
        p.background(255); // White background
        
        // Initialize particles
        for (let i = 0; i < numParticles; i++) {
          particles.push({
            x: p.random(p.width),
            y: p.random(p.height),
            size: p.random(2, 6),
            speedX: p.random(-1, 1),
            speedY: p.random(-1, 1)
          });
        }
      };

      p.draw = () => {
        p.background(255); // Keep white background
        
        // Update and draw particles
        particles.forEach(particle => {
          // Move
          particle.x += particle.speedX;
          particle.y += particle.speedY;
          
          // Wrap around edges
          if (particle.x < 0) particle.x = p.width;
          if (particle.x > p.width) particle.x = 0;
          if (particle.y < 0) particle.y = p.height;
          if (particle.y > p.height) particle.y = 0;
          
          // Draw
          p.noStroke();
          p.fill(252, 96, 151, 100); // Pink color with transparency
          p.circle(particle.x, particle.y, particle.size);
        });
      };

      // Handle window resize
      p.windowResized = () => {
        console.log('Resizing canvas');
        p.resizeCanvas(window.innerWidth, window.innerHeight);
      };
    };

    // Create new p5 instance
    const p5Instance = new p5(sketch);

    // Cleanup
    return () => {
      console.log('Cleaning up p5 instance');
      p5Instance.remove();
    };
  }, []);

  return (
    <div 
      ref={sketchRef} 
      style={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        zIndex: -1,
        pointerEvents: 'none',
        background: '#fff' // Add background color to container
      }} 
      className={styles.sketchContainer}
    />
  );
}