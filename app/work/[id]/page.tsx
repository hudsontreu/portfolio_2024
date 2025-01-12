import { getWorkBySlug } from "../projectData";
import { notFound } from "next/navigation";
import styles from "./page.module.css";
import ProjectTemplate from "./project-template";
import ExperimentTemplate from "./experiment-template";

interface Props {
  params: {
    id: string;
  };
}

export default async function ProjectPage({ params }: Props) {
  const work = await getWorkBySlug(params.id);

  if (!work) {
    notFound();
  }

  return (
    <div className={styles.container}>
      {work._type === "projects" ? (
        <ProjectTemplate project={work} />
      ) : (
        <ExperimentTemplate project={work} />
      )}
    </div>
  );
}