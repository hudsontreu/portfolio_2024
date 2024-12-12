import Image from 'next/image';
import Link from 'next/link';
import styles from './styles.module.css';

interface ProjectCardProps {
  title: string;
  date: string;
  imageUrl: string;
  href: string;
  scope: string[];
}

export function ProjectCard({ title, date, imageUrl, href, scope }: ProjectCardProps) {
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
            <Image
              src={imageUrl}
              alt={title}
              fill
              className={styles.image}
            />
          </div>
        </div>
      </div>
    </Link>
  );
}