import { ProjectGrid } from "../components/project-grid";
import { Tabs } from "../components/tabs";
import styles from "./page.module.css";

export default function WorkPage() {
  const tabs = [
    {
      title: "All",
      value: "all",
      content: (
        <div className={styles.projectsContainer}>
          <ProjectGrid />
        </div>
      ),
    },
    {
      title: "Projects",
      value: "projects",
      content: (
        <div className={styles.projectsContainer}>
          <ProjectGrid />
        </div>
      ),
    },
    {
      title: "Experiments",
      value: "experiments",
      content: (
        <div className={styles.projectsContainer}>
          <ProjectGrid />
        </div>
      ),
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <p className={styles.description}>
          Exploring the potential of generative AI to transform perceptual experiences in digital media.
        </p>
      </div>
      <div className={styles.content}>
        <Tabs tabs={tabs} className={styles.filterButtons} />
      </div>
    </div>
  );
}