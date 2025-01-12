import { client } from '../../../sanity/lib/client';
import { groq } from 'next-sanity';
import { notFound } from "next/navigation";
import styles from "./page.module.css";
import ProjectTemplate from "./project-template";
import ExperimentTemplate from "./experiment-template";

interface Props {
  params: {
    id: string;
  };
}

export default async function ProjectPage({ params }: Props) {
  const query = groq`*[_type in ["projects", "experiments"] && slug.current == $slug][0]{
    _id,
    _type,
    title,
    subtitle,
    "slug": slug.current,
    group,
    category_1,
    tags,
    thumbnail,
    thumbnailType,
    url,
    scope,
    date,
    credits,
    contributions,
    projectPath
  }`;

  const work = await client.fetch(query, { slug: params.id });

  if (!work) {
    notFound();
  }

  return (
    <div className={styles.container}>
      {work._type === "projects" ? (
        <ProjectTemplate project={work} />
      ) : (
        <ExperimentTemplate project={work} />
      )}
    </div>
  );
}