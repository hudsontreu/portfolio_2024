'use client';

import { useEffect, useRef } from 'react';
import GlslCanvas from 'glslCanvas';
import styles from './styles.module.css';
import { fragmentShader } from './frag';

export default function HeroArt() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const sandbox = new GlslCanvas(canvasRef.current);
    sandbox.load(fragmentShader);
    sandbox.setUniform("displacement", "/displacement1.jpg");

    // Set canvas size
    const resize = () => {
      if (!canvasRef.current) return;
      canvasRef.current.width = window.innerWidth;
      canvasRef.current.height = window.innerHeight;
    };

    resize();
    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div className={styles.container}>
      <canvas ref={canvasRef} className={styles.canvas} />
    </div>
  );
}