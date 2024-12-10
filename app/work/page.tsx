"use client";

import { ProjectGrid } from "../components/project-grid";
import { Tabs } from "../components/tabs";
import styles from "./page.module.css";
import { useState } from "react";

export default function WorkPage() {
  const [activeFilter, setActiveFilter] = useState<"all" | "project" | "experiment">("all");

  const tabs = [
    {
      title: "All",
      value: "all",
      content: (
        <div className={styles.projectsContainer}>
          <ProjectGrid filter={activeFilter} />
        </div>
      ),
    },
    {
      title: "Projects",
      value: "project",
      content: (
        <div className={styles.projectsContainer}>
          <ProjectGrid filter={activeFilter} />
        </div>
      ),
    },
    {
      title: "Experiments",
      value: "experiment",
      content: (
        <div className={styles.projectsContainer}>
          <ProjectGrid filter={activeFilter} />
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
        <Tabs 
          tabs={tabs} 
          className={styles.filterButtons}
          defaultValue="all"
          onValueChange={(value) => setActiveFilter(value as "all" | "project" | "experiment")}
        />
      </div>
    </div>
  );
}