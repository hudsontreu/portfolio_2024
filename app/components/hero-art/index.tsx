import Image from 'next/image';
import styles from './styles.module.css';

export default function HeroArt() {
  return (
    <div className={styles.container}>
      <Image
        src="/fireBoy.jpg"
        alt="Hero Art"
        fill
        className={styles.image}
        priority
        quality={100}
      />
    </div>
  );
}