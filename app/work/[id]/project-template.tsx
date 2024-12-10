import Image from "next/image";
import styles from "./project-template.module.css";

interface ProjectTemplateProps {
  project: any; // Replace with proper type from projectData
}

export default function ProjectTemplate({ project }: ProjectTemplateProps) {
  return (
    <article className={styles.project}>
      <header className={styles.header}>
        <h1 className={styles.title}>{project.title}</h1>
        {project.subtitle && (
          <p className={styles.subtitle}>{project.subtitle}</p>
        )}
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
        <div className={styles.details}>
          <h2>Scope</h2>
          <ul className={styles.scopeList}>
            {project.scope?.map((item: string) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        {project.credits && (
          <div className={styles.credits}>
            <h2>Credits</h2>
            <p>{project.credits}</p>
          </div>
        )}
      </div>
    </article>
  );
}
