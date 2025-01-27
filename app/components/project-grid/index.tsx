"use client";

import { useEffect, useState } from 'react';
import { ProjectCard } from '../project-card';
import styles from './styles.module.css';
import { client } from '../../../sanity/lib/client';
import { LIST_QUERIES } from '../../lib/queries';
import { Work } from '../../lib/types';

interface ProjectGridProps {
  filter: 'all' | 'project' | 'experiment';
}

export function ProjectGrid({ filter }: ProjectGridProps) {
  const [works, setWorks] = useState<Work[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWorks = async () => {
      setLoading(true);
      setError(null);
      try {
        let query;
        switch (filter) {
          case 'project':
            query = LIST_QUERIES.PROJECTS;
            break;
          case 'experiment':
            query = LIST_QUERIES.EXPERIMENTS;
            break;
          default:
            query = LIST_QUERIES.ALL;
        }
        const data = await client.fetch(query);
        console.log(`Fetched ${filter} data:`, data);
        setWorks(data);
      } catch (error) {
        console.error('Error fetching works:', error);
        setError('Failed to load projects');
        setWorks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchWorks();
  }, [filter]);

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  if (!works || works.length === 0) {
    return <div className={styles.noResults}>No projects found</div>;
  }

  return (
    <div className={styles.grid}>
      {works.map((work, index) => (
        <div key={work._id} className={styles.gridItem}>
          <ProjectCard work={work} />
        </div>
      ))}
    </div>
  );
}
