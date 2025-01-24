'use client';

import Image from "next/image";
import Link from "next/link";
import styles from "./project-template.module.css";
import { PortableText, PortableTextBlock } from '@portabletext/react';
import { urlFor } from "../../../lib/sanity";

interface ProjectTemplateProps {
  project: {
    _id: string;
    _type: string;
    title: string;
    subtitle: string;
    slug: string;
    group?: string;
    category_1: string;
    tags: string[];
    thumbnail: {
      asset: {
        _ref: string;
      };
    };
    thumbnailType: string;
    url?: string;
    scope: string[];
    date: string;
    credits: string | null;
    contributions: string[];
    projectPath?: string;
    primaryDescription: string;
    details: PortableTextBlock[];
  };
}

const PortableTextComponents = {
  types: {
    image: ({ value }: any) => {
      return (
        <div className={styles.portableImage}>
          <Image
            src={urlFor(value).url()}
            alt={value.alt || ' '}
            width={800}
            height={500}
            className={styles.image}
          />
        </div>
      );
    },
  },
};

export default function ProjectTemplate({ project }: ProjectTemplateProps) {
  return (
    <article className={styles.project}>
      <div className={styles.nav}>
        <Link href="/work" className={`${styles.backLink} flash-on-hover underline-animation`}>← Work</Link>
      </div>
      

      <div className={styles.content}>
        <div className={styles.projectInfo}>
          <div className={styles.title}>
            <h1>{project.title}</h1>
            {project.subtitle && <h2>{project.subtitle}</h2>}
          </div>

          <div className={styles.heroImage}>
          <Image
            src={urlFor(project.thumbnail).url()}
            alt={project.title}
            fill
            style={{ objectFit: "cover" }}
            priority
          />
        </div>

        {/* Project Description Section */}
        <div className={styles.block_1}>
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
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Tags</span>
              <span className={styles.metaValue}>
                {project.tags?.map((tag: string) => (
                  <span key={tag}>{tag}</span>
                ))}
              </span>
            </div>
          </div>
          <div className={styles.description}>
            <p>{project.primaryDescription}</p>
          </div>
        </div>

          {/* Rich Text Content */}
          <div>
            {project.details && (
              <PortableText 
                value={project.details} 
                components={PortableTextComponents}
              />
            )}
          </div>

        </div>
      </div>  
    </article>
  );
}
