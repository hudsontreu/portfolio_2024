import { projects } from "../projectData";
import { notFound } from "next/navigation";
import Image from "next/image";
import styles from "./page.module.css";
import ProjectTemplate from "./project-template";
import ExperimentTemplate from "./experiment-template";

interface Props {
  params: {
    id: string;
  };
}

export default function ProjectPage({ params }: Props) {
  const project = projects.find((p) => p.id === parseInt(params.id));

  if (!project) {
    notFound();
  }

  return (
    <div className={styles.container}>
      {project.group === "project" ? (
        <ProjectTemplate project={project} />
      ) : (
        <ExperimentTemplate project={project} />
      )}
    </div>
  );
}
