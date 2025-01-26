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
  category?: string | null;
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

// Map display names to Sanity values
const CATEGORY_MAP: { [key: string]: string } = {
  'Software Tools': 'softwareTools',
  'Installations': 'installations',
  'Web Experiments': 'webExperiments',
  'Time-Based Media': 'timeBasedMedia',
  'SageNet': 'sageNet',
  'Other': 'other'
};

// Map Sanity values to display names
const REVERSE_CATEGORY_MAP: { [key: string]: string } = {
  softwareTools: 'Software Tools',
  installations: 'Installations',
  webExperiments: 'Web Experiments',
  timeBasedMedia: 'Time-Based Media',
  sageNet: 'SageNet',
  other: 'Other'
};

export function WorkContent() {
  const [worksByCategory, setWorksByCategory] = useState<WorksByCategory>({});
  const pathname = usePathname();
  const activeSlug = pathname.split('/').pop();

  useEffect(() => {
    const fetchWorks = async () => {
      const works = await client.fetch<Work[]>(LIST_QUERIES.SIDEBAR_WORKS);
      console.log('Raw fetched works:', works.map(w => ({
        title: w.title,
        type: w._type,
        rawCategory: w.category,
        slug: w.slug
      })));
      
      const categorizedWorks = works.reduce((acc: WorksByCategory, work) => {
        let category: string;
        
        if (work._type === 'experiments') {
          category = 'webExperiments';
        } else if (!work.category) {
          category = 'other';
        } else {
          // The category from Sanity should already match our keys
          category = work.category;
        }
          
        console.log(`Work "${work.title}":`, {
          type: work._type,
          rawCategory: work.category,
          mappedCategory: category,
          displayName: REVERSE_CATEGORY_MAP[category] || 'Unknown'
        });
        
        if (!acc[category]) {
          acc[category] = [];
        }
        acc[category].push(work);
        return acc;
      }, {});

      console.log('Works by category:', Object.entries(categorizedWorks).map(([cat, works]) => ({
        category: cat,
        displayName: REVERSE_CATEGORY_MAP[cat],
        count: works.length,
        titles: works.map(w => w.title)
      })));
      
      setWorksByCategory(categorizedWorks);
    };

    fetchWorks();
  }, []);

  return (
    <div className={styles.workContent}>
      {CATEGORIES.map((categoryDisplay, categoryIndex) => {
        const categoryKey = CATEGORY_MAP[categoryDisplay];
        const works = worksByCategory[categoryKey] || [];

        console.log(`Checking category "${categoryDisplay}" (key: ${categoryKey}):`, {
          works: works.map(w => ({
            title: w.title,
            rawCategory: w.category
          }))
        });

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
