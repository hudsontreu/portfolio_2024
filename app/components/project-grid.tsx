"use client";

import { projects } from "../work/projectData";
import Link from "next/link";
import Image from "next/image";
import styles from "./project-grid.module.css";

interface ProjectGridProps {
  filter: "all" | "project" | "experiment";
}

export function ProjectGrid({ filter = "all" }: ProjectGridProps) {
  const filteredProjects = projects.filter((project) => {
    if (filter === "all") return true;
    return project.group === filter;
  });

  return (
    <div className={styles.grid}>
      {filteredProjects.map((project) => (
        <Link
          href={`/work/${project.id}`}
          key={project.id}
          className={styles.projectCard}
        >
          <div className={styles.imageContainer}>
            {project.thumbnail && (
              <Image
                src={project.thumbnail}
                alt={project.title}
                fill
                style={{ objectFit: "cover" }}
              />
            )}
          </div>
          <div className={styles.projectInfo}>
            <h3 className={styles.title}>{project.title}</h3>
            <p className={styles.date}>{project.date}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
