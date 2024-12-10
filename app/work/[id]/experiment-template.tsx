import Image from "next/image";
import styles from "./experiment-template.module.css";

interface ExperimentTemplateProps {
  project: any; // Replace with proper type from projectData
}

export default function ExperimentTemplate({ project }: ExperimentTemplateProps) {
  return (
    <article className={styles.experiment}>
      <header className={styles.header}>
        <h1 className={styles.title}>{project.title}</h1>
        <div className={styles.meta}>
          <span className={styles.date}>{project.date}</span>
          <div className={styles.tags}>
            {project.tags?.map((tag: string) => (
              <span key={tag} className={styles.tag}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </header>

      {project.thumbnail && (
        <div className={styles.thumbnail}>
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
      )}

      <div className={styles.content}>
        <div className={styles.tools}>
          <h2>Tools & Technologies</h2>
          <ul className={styles.toolsList}>
            {project.scope?.map((item: string) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        {project.url && (
          <div className={styles.demo}>
            <h2>Live Demo</h2>
            <a href={project.url} target="_blank" rel="noopener noreferrer">
              View Project
            </a>
          </div>
        )}
      </div>
    </article>
  );
}
