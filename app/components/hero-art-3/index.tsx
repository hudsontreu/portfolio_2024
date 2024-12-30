'use client';

import { useEffect, useRef, useState } from 'react';
import GlslCanvas from 'glslCanvas';
import styles from './styles.module.css';
import { fragmentShader } from './frag';

const images = [
  "/shader_assets/trails.jpg",
  "/shader_assets/flowers.jpg",
  "/shader_assets/sym.png"
];

export default function HeroArt3() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sandboxRef = useRef<any>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (!canvasRef.current) return;

    const sandbox = new GlslCanvas(canvasRef.current);
    sandboxRef.current = sandbox;
    sandbox.load(fragmentShader);

    // Initial image setup
    sandbox.setUniform("image", images[currentImageIndex]);

    // Set canvas size with proper scaling
    const calcSize = () => {
      if (!canvasRef.current) return;
      const ww = window.innerWidth;
      const wh = window.innerHeight;
      const dpi = window.devicePixelRatio;

      const s = Math.max(ww + 120, wh);

      canvasRef.current.width = s * dpi;
      canvasRef.current.height = s * dpi;
      canvasRef.current.style.width = s + 'px';
      canvasRef.current.style.height = s + 'px';
    };

    calcSize();
    window.addEventListener('resize', calcSize);

    // Handle mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      if (!canvasRef.current || !sandboxRef.current) return;
      
      const rect = canvasRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      sandboxRef.current.setUniform('u_mouse', [x, rect.height - y]);
    };

    // Handle click events to change image
    const handleClick = () => {
      const nextIndex = (currentImageIndex + 1) % images.length;
      setCurrentImageIndex(nextIndex);
      sandbox.setUniform("image", images[nextIndex]);
    };

    canvasRef.current.addEventListener('mousemove', handleMouseMove);
    canvasRef.current.addEventListener('click', handleClick);

    // Cleanup
    return () => {
      window.removeEventListener('resize', calcSize);
      canvasRef.current?.removeEventListener('mousemove', handleMouseMove);
      canvasRef.current?.removeEventListener('click', handleClick);
    };
  }, [currentImageIndex]);

  return (
    <div className={styles.container}>
      <canvas ref={canvasRef} className={styles.canvas} />
    </div>
  );
}