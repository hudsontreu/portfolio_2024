'use client';

import Image from "next/image";
import Link from "next/link";
import { useCallback, useRef } from 'react';
import styles from "./experiment-template.module.css";

interface ExperimentTemplateProps {
  experiment: {
    _id: string;
    _type: 'experiments';
    title: string;
    subtitle: string | null;
    group: string;
    projectPath: string;
    category_1: string;
    tags: string[];
    thumbnail: any;
    url: string;
    scope: string[];
    date: string;
    credits: string | null;
    contributions: string[];
  };
}

export default function ExperimentTemplate({ experiment }: ExperimentTemplateProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleIframeError = useCallback((e: React.SyntheticEvent<HTMLIFrameElement, Event>) => {
    console.error('Iframe loading error:', e);
    console.log('Attempted path:', `/experiments/${experiment.projectPath}/index.html`);
  }, [experiment.projectPath]);

  const handleFullscreen = useCallback(() => {
    if (!iframeRef.current) return;

    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      iframeRef.current.requestFullscreen().catch((err) => {
        console.error('Error attempting to enable fullscreen:', err);
      });
    }
  }, []);

  if (!experiment.projectPath) return null;

  return (
    <article className={styles.experiment}>
      <div className={styles.nav}>
      <Link href="/work" className={`${styles.backLink} flash-on-hover underline-animation`}>← Work</Link>
      </div>
      
      <header className={styles.header}>
        <div className={styles.metadata}>
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>Title</span>
            <span className={styles.metaValue}>{experiment.title}</span>
          </div>
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>Date</span>
            <span className={styles.metaValue}>{experiment.date}</span>
          </div>
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>Category</span>
            <span className={styles.metaValue}>{experiment.category_1}</span>
          </div>
          {/* <div className={styles.metaItem}>
            <span className={styles.metaLabel}>Tags</span>
            <span className={styles.metaValue}>
              {experiment.tags?.map((tag: string) => (
                <span key={tag}>{tag}</span>
              ))}
            </span>
          </div> */}
          <button 
            className={`${styles.fullscreenButton} underline-animation`}
            onClick={handleFullscreen}
          >
            Enter Fullscreen
          </button>
        </div>
      </header>

      {experiment.projectPath && (
        <div className={styles.iframeContainer}>
          <iframe
            ref={iframeRef}
            src={`/experiments/${experiment.projectPath}/index.html`}
            className={styles.experimentFrame}
            onError={handleIframeError}
            title={experiment.title}
            loading="lazy"
            allow="accelerometer; camera; gyroscope; microphone; xr-spatial-tracking"
          />
        </div>
      )}
    </article>
  );
}