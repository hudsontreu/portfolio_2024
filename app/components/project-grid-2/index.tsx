"use client";

import { useEffect, useState } from 'react';
import { ProjectCard } from '../project-card';
import styles from './styles.module.css';
import { groq } from 'next-sanity'
import { client } from '../../../sanity/lib/client'
import { getAllWorks, getProjects, getExperiments } from '../../lib/data';


const query = `*[_type in ["projects", "experiments"]] | order(date desc) {
    _id,
    _type,
    title,
    "slug": slug.current,
    date,
    thumbnail,
    thumbnailType,
    scope
  }`;

export async function getStaticProps() {
    const allWorks = await client.fetch(query)
  
    return {
      props: { allWorks },
    }
  }

  export default function ProjectGrid2({ allWorks }) {
    return (
      <div>
        <ul>
          {allWorks.map((work) => (
            <li key={work._id}>
              <h2>{work.title}</h2>
              <p>{work.date}</p>
            </li>
          ))}
        </ul>
      </div>
    )
  }









// export function ProjectGrid2({ filter }: ProjectGridProps) {
//   const [works, setWorks] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchWorks = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         let data;
//         switch (filter) {
//           case 'project':
//             data = await getProjects();
//             break;
//           case 'experiment':
//             data = await getExperiments();
//             break;
//           default:
//             data = await getAllWorks();
//         }
//         console.log(`Fetched ${filter} data:`, data);
//         setWorks(data);
//       } catch (error) {
//         console.error('Error fetching works:', error);
//         setError('Failed to load projects');
//         setWorks([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchWorks();
//   }, [filter]);

//   if (loading) {
//     return <div className={styles.loading}>Loading...</div>;
//   }

//   if (error) {
//     return <div className={styles.error}>{error}</div>;
//   }

//   if (!works || works.length === 0) {
//     return <div className={styles.noResults}>No projects found</div>;
//   }

//   return (
//     <div className={styles.grid}>
//       {works.map((work) => (
//         <ProjectCard
//           key={work._id}
//           title={work.title}
//           date={work.date}
//           thumbnailType={work.thumbnailType || 'image'}
//           thumbnailUrl={work.thumbnail}
//           href={`/work/${work.slug}`}
//           scope={Array.isArray(work.scope) ? work.scope : [work.scope]}
//         />
//       ))}
//     </div>
//   );
// }