'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { client } from '../../../sanity/lib/client';
import { LIST_QUERIES } from '../../lib/queries';
import styles from './styles.module.css';

type Work = {
  _id: string;
  _type: 'projects' | 'experiments';
  title: string;
  slug: string;
  category_1?: string;
};

type WorksByCategory = {
  [key: string]: Work[];
};

const CATEGORIES = [
  'Software Tools',
  'Installations',
  'Web Experiments',
  'Time-Based Media',
  'SageNet',
  'Other'
];

const getCategoryKey = (categoryDisplay: string): string => {
  return categoryDisplay
    .toLowerCase()
    .replace(/\s+/g, '')
    .replace(/-/g, '');
};

const CATEGORY_MAP: { [key: string]: string } = {
  softwaretools: 'softwareTools',
  installations: 'installations',
  webexperiments: 'webExperiments',
  timebasedmedia: 'timeBasedMedia',
  sagenet: 'sageNet',
  other: 'other'
};

export function WorkContent() {
  const [worksByCategory, setWorksByCategory] = useState<WorksByCategory>({});
  const pathname = usePathname();
  const activeSlug = pathname.split('/').pop();

  useEffect(() => {
    const fetchWorks = async () => {
      const works = await client.fetch<Work[]>(LIST_QUERIES.SIDEBAR_WORKS);
      
      const categorizedWorks = works.reduce((acc: WorksByCategory, work) => {
        // Handle experiments - they all go to Web Experiments
        const category = work._type === 'experiments' 
          ? 'webExperiments' 
          : work.category_1 || 'other';
          
        if (!acc[category]) {
          acc[category] = [];
        }
        acc[category].push(work);
        return acc;
      }, {});

      setWorksByCategory(categorizedWorks);
    };

    fetchWorks();
  }, []);

  return (
    <div className={styles.workContent}>
      {CATEGORIES.map((categoryDisplay, categoryIndex) => {
        const categoryKey = CATEGORY_MAP[getCategoryKey(categoryDisplay)];
        const works = worksByCategory[categoryKey] || [];

        if (works.length === 0) return null;

        return (
          <div 
            key={categoryKey} 
            className={styles.categorySection}
            style={{ '--category-index': categoryIndex } as React.CSSProperties}
          >
            <h3 className={styles.categoryTitle}>{categoryDisplay}</h3>
            <ul className={styles.workList}>
              {works.map((work, itemIndex) => (
                <li 
                  key={work._id}
                  style={{ '--item-index': itemIndex } as React.CSSProperties}
                >
                  <Link 
                    href={`/work/${work.slug}`} 
                    className={`${styles.workLink} ${work.slug === activeSlug ? styles.activeWorkLink : ''}`}
                  >
                    {work.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
