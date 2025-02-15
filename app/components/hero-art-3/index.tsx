'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import GlslCanvas from 'glslCanvas';
import styles from './styles.module.css';
import { fragmentShader } from './frag';

const projectData = [
  {
    image: "/heroArt_assets/flowers.jpg",
    label: "Generative Flowers",
    url: ""  // Not clickable
  },
  {
    image: "/heroArt_assets/memoryMosaic_3.png",
    label: "Memory Mosaic",
    url: "/work/memory-mosaic"
  },
  {
    image: "/heroArt_assets/emory.png",
    label: "Emory University",
    url: ""
  },
  {
    image: "/heroArt_assets/confusingButWorthit_1.png",
    label: "Confusing But Worth It",
    url: ""
  },
  {
    image: "/heroArt_assets/generativeContemplations_1.png",
    label: "Generative Contemplations",
    url: "/work/generative-contemplations"
  },
  {
    image: "/heroArt_assets/gatherTheForest_1.jpg",
    label: "Gather the Forest",
    url: "/work/gather-the-forest"
  }
];

const TRANSITION_DURATION = 1.5; // seconds for fade transition
const IMAGE_DURATION = 4.0; // seconds to show each image

export default function HeroArt3() {
  const router = useRouter();
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
    sandbox.setUniform("image", projectData[currentImageIndex].image);
    sandbox.setUniform("nextImage", projectData[nextImageIndex].image);
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
          setNextImageIndex((nextImageIndex + 1) % projectData.length);
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
      sandboxRef.current.setUniform("image", projectData[currentImageIndex].image);
      sandboxRef.current.setUniform("nextImage", projectData[nextImageIndex].image);
    }
  }, [currentImageIndex, nextImageIndex]);

  return (
    <div className={styles.container}>
      <div 
        className={styles.textOverlay} 
        onClick={() => {
          const url = projectData[currentImageIndex].url;
          if (!url) return; // Do nothing if no URL
          if (url.startsWith('/')) {
            router.push(url);
          } else {
            window.open(url, '_blank');
          }
        }} 
        style={{ cursor: projectData[currentImageIndex].url ? 'pointer' : 'default' }}
      >
        <span className={styles.imageNumber}>{(currentImageIndex + 1).toString().padStart(2, '0')}</span>
        <span className={styles.separator}>/</span>
        <span className={styles.totalImages}>{projectData.length.toString().padStart(2, '0')}</span>
        <h3 className={styles.imageLabel}>{projectData[currentImageIndex].label}</h3>
      </div>
      <canvas ref={canvasRef} className={styles.canvas} />
      <div ref={cursorRef} className={styles.customCursor} />
    </div>
  );
}