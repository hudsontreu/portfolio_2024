import Image from 'next/image';
import Link from 'next/link';
import styles from './styles.module.css';
import { urlForImage } from '../../../sanity/lib/client';
import { Work } from '../../lib/types';

interface ProjectCardProps {
  work: Work;
}

export function ProjectCard({ work }: ProjectCardProps) {
  const imageUrl = work.thumbnail ? urlForImage(work.thumbnail).url() : '';
  const scope = Array.isArray(work.scope) ? work.scope : [work.scope];
  
  return (
    <Link href={`/work/${work.slug}`} className={styles.container}>
      <div className={styles.corners}>
        <div className={styles.corner} />
        <div className={styles.corner} />
        <div className={styles.corner} />
        <div className={styles.corner} />
      </div>
      
      <div className={styles.content}>
        <div className={styles.topSection}>
          <span className={styles.date}>{work.date}</span>
          <h2 className={styles.title}>{work.title}</h2>
        </div>
        <div className={styles.bottomSection}>
          <div className={styles.scope}>
            {scope.join(' / ')}
          </div>
          <div className={styles.imageWrapper}>
            {work.thumbnail ? (
              work.thumbnailType === 'image' ? (
                <Image
                  src={imageUrl}
                  alt={work.title}
                  fill
                  className={styles.image}
                />
              ) : (
                <video
                  src={imageUrl}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className={styles.video}
                />
              )
            ) : null}
          </div>
        </div>
      </div>
    </Link>
  );
}