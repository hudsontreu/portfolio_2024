import Image from 'next/image';
import Link from 'next/link';
import styles from './styles.module.css';
import { urlForImage } from '../../../sanity/lib/client';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

interface ProjectCardProps {
  title: string;
  date: string;
  thumbnailType: 'image' | 'video';
  thumbnail: SanityImageSource;
  slug: string;
  scope: string[];
}

export function ProjectCard({ title, date, thumbnailType, thumbnail, slug, scope }: ProjectCardProps) {
  const imageUrl = thumbnail ? urlForImage(thumbnail).url() : '';
  
  return (
    <Link href={`/work/${slug}`} className={styles.container}>
      <div className={styles.corners}>
        <div className={styles.corner} />
        <div className={styles.corner} />
        <div className={styles.corner} />
        <div className={styles.corner} />
      </div>
      
      <div className={styles.content}>
        <div className={styles.topSection}>
          <span className={styles.date}>{date}</span>
          <h2 className={styles.title}>{title}</h2>
        </div>
        <div className={styles.bottomSection}>
          <div className={styles.scope}>
            {scope.join(' / ')}
          </div>
          <div className={styles.imageWrapper}>
            {thumbnail ? (
              thumbnailType === 'image' ? (
                <Image
                  src={imageUrl}
                  alt={title}
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
                  className={styles.image}
                />
              )
            ) : null}
          </div>
        </div>
      </div>
    </Link>
  );
}