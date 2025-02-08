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
    },
    {
      title: "Projects",
      value: "project",
    },
    {
      title: "Experiments",
      value: "experiment",
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <p className={styles.description}>
          Below are selected works including software design, software, development, and various forms of artworks.
          Experiments are web-based and run in real-time in the browser.
        </p>
      </div>
      <div className={styles.content}>
        <Tabs 
          tabs={tabs} 
          className={styles.filterButtons}
          onTabChange={(tab) => setActiveFilter(tab.value as typeof activeFilter)}
        />
        <div className={styles.projectsContainer}>
          <ProjectGrid filter={activeFilter} />
        </div>
      </div>
    </div>
  );
}