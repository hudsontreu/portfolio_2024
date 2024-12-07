import Image from "next/image";
import HeroArt from "./components/hero-art";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Design<br />Technologist</h1>
        <p className={styles.description}>
          Exploring the potential of generative AI to transform perceptual experiences in digital media.
        </p>
      </div>
      <div className={styles.heroContainer}>
        <HeroArt />
      </div>
    </div>
  );
}
