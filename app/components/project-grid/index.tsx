"use client";

import { useEffect, useState } from 'react';
import { ProjectCard } from '../project-card';
import styles from './styles.module.css';
import { client } from '../../../sanity/lib/client';
import { groq } from 'next-sanity';

// Define queries for different filters
const ALL_WORKS_QUERY = groq`*[_type in ["projects", "experiments"]] | order(date desc) {
  _id,
  _type,
  title,
  "slug": slug.current,
  date,
  thumbnail,
  thumbnailType,
  scope
}`;

const PROJECTS_QUERY = groq`*[_type == "projects"] | order(date desc) {
  _id,
  _type,
  title,
  "slug": slug.current,
  date,
  thumbnail,
  thumbnailType,
  scope
}`;

const EXPERIMENTS_QUERY = groq`*[_type == "experiments"] | order(date desc) {
  _id,
  _type,
  title,
  "slug": slug.current,
  date,
  thumbnail,
  thumbnailType,
  scope
}`;

interface ProjectGridProps {
  filter: 'all' | 'project' | 'experiment';
}

export function ProjectGrid({ filter }: ProjectGridProps) {
  const [works, setWorks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchWorks() {
      setLoading(true);
      
      // Choose query based on filter
      const query = filter === 'all' 
        ? ALL_WORKS_QUERY 
        : filter === 'project' 
          ? PROJECTS_QUERY 
          : EXPERIMENTS_QUERY;

      try {
        const data = await client.fetch(query);
        console.log('Fetched works:', data);
        setWorks(data);
      } catch (error) {
        console.error('Error fetching works:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchWorks();
  }, [filter]);

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.grid}>
      {works.map((work) => (
        <ProjectCard
          key={work._id}
          title={work.title}
          date={work.date}
          thumbnailType={work.thumbnailType}
          thumbnailUrl={work.thumbnail}
          href={`/work/${work.slug}`}
          scope={work.scope}
        />
      ))}
    </div>
  );
}
