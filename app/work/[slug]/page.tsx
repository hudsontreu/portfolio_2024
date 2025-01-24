import { sanityFetch } from '../../../sanity/lib/live';
import { defineQuery } from 'next-sanity';
import { notFound } from "next/navigation";
import ProjectTemplate from "./project-template";
import ExperimentTemplate from "./experiment-template";
import { DETAIL_QUERIES } from '../../lib/queries';
import styles from './page.module.css';

interface Props {
  params: {
    slug: string;
  };
}

const CONTENT_QUERY = defineQuery(DETAIL_QUERIES.CONTENT);

export default async function ProjectPage({ params }: Props) {
  console.log('Fetching content for slug:', params.slug);
  
  const { data: content } = await sanityFetch({
    query: CONTENT_QUERY,
    params: { slug: params.slug }
  });

  console.log('Fetched content:', content);

  if (!content) {
    console.log('No content found for slug:', params.slug);
    notFound();
  }

  return (
    <div className={styles.container}>
      {content._type === 'projects' ? (
        <ProjectTemplate project={content} />
      ) : (
        <ExperimentTemplate experiment={content} />
      )}
    </div>
  );
}