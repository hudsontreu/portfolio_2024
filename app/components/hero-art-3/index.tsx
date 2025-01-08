'use client';

import { useEffect, useRef, useState } from 'react';
import GlslCanvas from 'glslCanvas';
import styles from './styles.module.css';
import { fragmentShader } from './frag';

const images = [
  "/shader_assets/flowers.jpg",
  "/shader_assets/mem.png",
  "/shader_assets/emory.png",
  "/shader_assets/conf.png",
  "/shader_assets/u.png"
];

const imageLabels = [
  "Generative Art",
  "Memory Palace",
  "Emory University",
  "Conference",
  "Universes"
];

const TRANSITION_DURATION = 1.5; // seconds for fade transition
const IMAGE_DURATION = 4.0; // seconds to show each image

export default function HeroArt3() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sandboxRef = useRef<any>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [nextImageIndex, setNextImageIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (!canvasRef.current) return;

    const sandbox = new GlslCanvas(canvasRef.current);
    sandboxRef.current = sandbox;
    sandbox.load(fragmentShader);

    // Set initial images
    sandbox.setUniform("image", images[currentImageIndex]);
    sandbox.setUniform("nextImage", images[nextImageIndex]);
    sandbox.setUniform("blend", 0.0);

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

    canvasRef.current.addEventListener('mousemove', handleMouseMove);

    // Setup image transition timer
    const transitionImages = () => {
      if (isTransitioning) return;
      setIsTransitioning(true);

      // Animate blend value
      let startTime = performance.now();
      const animate = () => {
        const now = performance.now();
        const elapsed = (now - startTime) / 1000; // Convert to seconds
        const progress = Math.min(elapsed / TRANSITION_DURATION, 1);

        if (sandboxRef.current) {
          sandboxRef.current.setUniform("blend", progress);
        }

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          // Transition complete, update indices
          setCurrentImageIndex(nextImageIndex);
          setNextImageIndex((nextImageIndex + 1) % images.length);
          setIsTransitioning(false);
        }
      };

      animate();
    };

    const intervalId = setInterval(() => {
      transitionImages();
    }, (IMAGE_DURATION + TRANSITION_DURATION) * 1000);

    // Cleanup
    return () => {
      clearInterval(intervalId);
      window.removeEventListener('resize', calcSize);
      canvasRef.current?.removeEventListener('mousemove', handleMouseMove);
    };
  }, [currentImageIndex, nextImageIndex, isTransitioning]);

  // Update next image when indices change
  useEffect(() => {
    if (sandboxRef.current) {
      sandboxRef.current.setUniform("image", images[currentImageIndex]);
      sandboxRef.current.setUniform("nextImage", images[nextImageIndex]);
    }
  }, [currentImageIndex, nextImageIndex]);

  return (
    <div className={styles.container}>
      <div className={styles.textOverlay}>
        <span className={styles.imageNumber}>{(currentImageIndex + 1).toString().padStart(2, '0')}</span>
        <span className={styles.separator}>/</span>
        <span className={styles.totalImages}>{images.length.toString().padStart(2, '0')}</span>
        <h3 className={styles.imageLabel}>{imageLabels[currentImageIndex]}</h3>
      </div>
      <canvas ref={canvasRef} className={styles.canvas} />
      <div ref={cursorRef} className={styles.customCursor} />
    </div>
  );
}