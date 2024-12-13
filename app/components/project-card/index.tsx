import Image from 'next/image';
import Link from 'next/link';
import styles from './styles.module.css';

interface ProjectCardProps {
  title: string;
  date: string;
  thumbnailType: 'image' | 'video';
  thumbnailUrl: string;
  href: string;
  scope: string[];
}

export function ProjectCard({ title, date, thumbnailType, thumbnailUrl, href, scope }: ProjectCardProps) {
  return (
    <Link href={href} className={styles.container}>
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
            {thumbnailType === 'image' ? (
              <Image
                src={thumbnailUrl}
                alt={title}
                fill
                className={styles.image}
              />
            ) : (
              <video
                src={thumbnailUrl}
                autoPlay
                loop
                muted
                playsInline
                className={styles.image}
              />
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}