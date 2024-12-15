'use client';

import { useEffect, useRef } from 'react';
import styles from './styles.module.css';

export default function Scribble() {
  const scribbleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scribble = scribbleRef.current;
    if (!scribble) return;

    const createScribbleLine = (x: number, y: number) => {
      const line = document.createElement('div');
      line.classList.add(styles.scribbleLine);
      
      line.style.left = `${x}px`;
      line.style.top = `${y}px`;
      
      // Random rotation and length
      const rotation = Math.random() * 360;
      const length = Math.random() * 15 + 5; // 5-20px length
      
      line.style.transform = `rotate(${rotation}deg)`;
      line.style.width = `${length}px`;
      
      scribble.appendChild(line);

      // Remove line after animation completes
      setTimeout(() => {
        line.remove();
      }, 800);
    };

    const handleMouseMove = (e: MouseEvent) => {
      // Create 2 lines per movement for a fuller effect
      createScribbleLine(e.clientX, e.clientY);
      createScribbleLine(e.clientX + (Math.random() - 0.5) * 10, e.clientY + (Math.random() - 0.5) * 10);
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return <div ref={scribbleRef} className={styles.scribbleContainer}></div>;
}
