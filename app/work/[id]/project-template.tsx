'use client';

import Image from "next/image";
import Link from "next/link";
import styles from "./project-template.module.css";

interface ProjectTemplateProps {
  project: {
    id: number;
    title: string;
    subtitle: string | null;
    group: string;
    category_1: string;
    tags: string[];
    thumbnail: string;
    url: string;
    scope: string[];
    date: string;
    credits: string | null;
    contributions: string[];
  };
}

export default function ProjectTemplate({ project }: ProjectTemplateProps) {
  return (
    <article className={styles.project}>
      <div className={styles.nav}>
        <Link href="/work" className={`${styles.backLink} flash-on-hover underline-animation`}>← Work</Link>
      </div>
      
      <header className={styles.header}>
        <div className={styles.metadata}>
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>Title</span>
            <span className={styles.metaValue}>{project.title}</span>
          </div>
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>Date</span>
            <span className={styles.metaValue}>{project.date}</span>
          </div>
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>Category</span>
            <span className={styles.metaValue}>{project.category_1}</span>
          </div>
          {/* <div className={styles.metaItem}>
            <span className={styles.metaLabel}>Tags</span>
            <span className={styles.metaValue}>
              {project.tags?.map((tag: string) => (
                <span key={tag}>{tag}</span>
              ))}
            </span>
          </div> */}
        </div>
      </header>

      <div className={styles.content}>
    

        <div className={styles.projectInfo}>
          <div className={styles.title}>
            <h1>{project.title}</h1>
            {project.subtitle && <h2>{project.subtitle}</h2>}
          </div>

          <div className={styles.heroImage}>
          <Image
            src={project.thumbnailUrl}
            alt={project.title}
            fill
            style={{ objectFit: "cover" }}
            priority
          />
        </div>

          <div className={styles.description}>
            <p>Lorem ipsum dolor sit amet consectetur. In facilisi pharetra proin aliquet dui. Lectus ut elit lectus placerat leo sed nam gravida purus. Nisl euismod congue suspendisse cursus morbi. Id eget nibh sagittis pulvinar pretium tellus aliquam.</p>
            <p>Lorem ipsum dolor sit amet consectetur. In facilisi pharetra proin aliquet dui. Lectus ut elit lectus placerat leo sed nam gravida purus. Nisl euismod congue suspendisse cursus morbi. Id eget nibh sagittis pulvinar pretium tellus aliquam.</p>
          </div>

          <div className={styles.gallery}>
            <div className={styles.galleryImage}>
              <Image
                src="/displacement1.jpg"
                alt="Project image 1"
                width={600}
                height={400}
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className={styles.galleryImage}>
              <Image
                src="/reflection.png"
                alt="Project image 2"
                width={600}
                height={400}
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className={styles.galleryImage}>
              <Image
                src="/displacement1.jpg"
                alt="Project image 3"
                width={600}
                height={400}
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className={styles.galleryImage}>
              <Image
                src="/reflection.png"
                alt="Project image 4"
                width={600}
                height={400}
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
