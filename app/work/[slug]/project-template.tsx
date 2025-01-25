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
    methods: string[];
    date: string;
    credits: string | null;
    contributions: string[];
    projectPath?: string;
    primaryDescription: string;
    details: PortableTextBlock[];
  };
}

const PortableTextComponents = {
  block: {
    h1: ({children}: any) => <h1 className={styles.portableH1}>{children}</h1>,
    h2: ({children}: any) => <h2 className={styles.portableH2}>{children}</h2>,
    h3: ({children}: any) => <h3 className={styles.portableH3}>{children}</h3>,
    h4: ({children}: any) => <h4 className={styles.portableH4}>{children}</h4>,
    normal: ({children}: any) => <p className={styles.portableText}>{children}</p>,
    blockquote: ({children}: any) => <blockquote className={styles.portableQuote}>{children}</blockquote>,
  },
  list: {
    bullet: ({children}: any) => <ul className={styles.portableList}>{children}</ul>,
  },
  marks: {
    link: ({value, children}: any) => {
      return (
        <a href={value?.href} className={styles.portableLink} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      );
    }
  },
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
    gallery: ({ value }: any) => {
      if (!value?.images || value.images.length === 0) return null;

      const imageCount = value.images.length;
      const galleryClassName = styles[`gallery${imageCount}`];

      return (
        <div className={styles.galleryWrapper}>
          <div className={galleryClassName}>
            {value.images.map((image: any, index: number) => (
              <div key={index} className={styles.galleryItem}>
                <Image
                  src={urlFor(image).url()}
                  alt={image.alt || ` `}
                  width={800}
                  height={500}
                  className={styles.galleryImage}
                />
              </div>
            ))}
          </div>
          {value.caption && (
            <p className={styles.galleryCaption}>{value.caption}</p>
          )}
        </div>
      );
    },
    video: ({ value }: any) => {
      // For URL-based videos (YouTube, etc.)
      if (value.url) {
        // Check if it's a YouTube URL
        const isYouTube = value.url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
        
        if (isYouTube) {
          const videoId = isYouTube[1];
          // YouTube parameters based on options
          const youtubeParams = new URLSearchParams({
            autoplay: value.autoplay ? '1' : '0',
            mute: value.muted ? '1' : '0',
            loop: value.loop ? '1' : '0',
            controls: value.hideControls ? '0' : '1',
            ...(value.loop ? { playlist: videoId } : {}) // Required for looping
          }).toString();

          return (
            <div className={styles.videoWrapper}>
              <iframe
                width="100%"
                height="500"
                src={`https://www.youtube.com/embed/${videoId}?${youtubeParams}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
              {value.caption && (
                <p className={styles.videoCaption}>{value.caption}</p>
              )}
            </div>
          );
        }
      }

      // For uploaded video files
      if (value.file?.asset?._ref) {
        const videoUrl = `https://cdn.sanity.io/files/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}/${value.file.asset._ref
          .replace('file-', '')
          .replace('-quicktime', '.mov')
          .replace('-mp4', '.mp4')
          .replace('-webm', '.webm')}`;

        return (
          <div className={styles.videoWrapper}>
            <video
              className={styles.video}
              width="100%"
              height="auto"
              playsInline
              {...(value.autoplay && { autoPlay: true })}
              {...(value.loop && { loop: true })}
              {...(!value.hideControls && { controls: true })}
              {...(value.muted && { muted: true })}
              {...(value.autoplay && { muted: true })} // Force muted if autoplay is enabled
            >
              <source src={videoUrl} type="video/quicktime" />
              <source src={videoUrl} type="video/mp4" />
              <source src={videoUrl} type="video/webm" />
              Your browser does not support the video tag.
            </video>
            {value.caption && (
              <p className={styles.videoCaption}>{value.caption}</p>
            )}
          </div>
        );
      }

      return null;
    }
  },
};

export default function ProjectTemplate({ project }: ProjectTemplateProps) {
  return (
    <article className={styles.project}>
      <div className={styles.nav}>
        <Link href="/work" className={`${styles.backLink} underline-animation`}>← Work</Link>
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

          <div className={styles.projectData}>

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

            {project.credits && (
            <div className={styles.metadata}>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Primary Contributions</span>
                <span className={styles.metaValue}>
                  {project.contributions?.map((tag: string) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </span>
              </div>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Credits</span>
                <span className={styles.metaValue}>
                  {project.credits?.map((tag: string) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </span>
              </div>
            </div>
            )}

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
