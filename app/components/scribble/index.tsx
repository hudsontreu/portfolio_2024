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
      const length = Math.random() * 50 + 20;
      
      line.style.transform = `rotate(${rotation}deg)`;
      line.style.width = `${length}px`;
      
      scribble.appendChild(line);

      // Remove line after animation
      setTimeout(() => {
        line.remove();
      }, 1000);
    };

    const handleMouseMove = (e: MouseEvent) => {
      // Create scribble lines for the entire document
      createScribbleLine(e.clientX, e.clientY);
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return <div ref={scribbleRef} className={styles.scribbleContainer}></div>;
}
