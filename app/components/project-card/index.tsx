import Image from 'next/image';
import Link from 'next/link';
import styles from './styles.module.css';

interface ProjectCardProps {
  title: string;
  date: string;
  imageUrl: string;
  href: string;
}

export function ProjectCard({ title, date, imageUrl, href }: ProjectCardProps) {
  return (
    <Link href={href} className={styles.container}>
      <div className={styles.imageContainer}>
        <Image
          src={imageUrl}
          alt={title}
          fill
          className={styles.image}
        />
        <div className={styles.overlay}>
          <div className={styles.title}>{title}</div>
          <div className={styles.date}>{date}</div>
        </div>
      </div>
    </Link>
  );
}
