"use client";

import { useEffect, useState } from 'react';
import { ProjectCard } from '../project-card';
import styles from './styles.module.css';
import { WorkItem, getWorks } from '../../work/projectData';

interface ProjectGridProps {
  filter: 'all' | 'project' | 'experiment';
}

export function ProjectGrid({ filter }: ProjectGridProps) {
  const [works, setWorks] = useState<WorkItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchWorks() {
      setLoading(true);
      try {
        const data = await getWorks(filter);
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
