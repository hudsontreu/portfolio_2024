import Image from "next/image";
import HeroArt from "./components/hero-art";
import HeroArt2 from './components/hero-art-2';
import HeroArt3 from './components/hero-art-3';
import HeroArtp5 from "./components/hero-art-3_p5";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.colorBlocks}>
          <div className={styles.dt_divs}></div>
          <div className={styles.dt_divs}></div>
          <div className={styles.dt_divs}></div>
        </div>
        <h1 className={styles.title}>
          <span className={styles.design}>Design</span>
          <span className={styles.technologist}>Technologist</span>
        </h1>
        <div className={styles.description_block}>
          <p className={styles.description}>
            Exploring the potential of generative AI to transform.<br />
            Experimenting with innovative interaction paradigms in software design.<br />
            Experimenting with innovative interaction paradigms in software design.
          </p>
        </div>
      </div>
      <div className={styles.heroContainer}>
        <HeroArt3 />
      </div>
    </div>
  );
}
