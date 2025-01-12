import { groq } from 'next-sanity';
import { client } from '../../sanity/lib/client';

export interface Project {
  _id: string;
  _type: 'projects';
  title: string;
  slug: { current: string };
  subtitle: string | null;
  group: string;
  category_1: string;
  tags: string[];
  thumbnail: any;
  thumbnailType: 'image' | 'video';
  url: string;
  scope: string[];
  date: string;
  credits: string | null;
  contributions: string[];
}

export interface Experiment {
  _id: string;
  _type: 'experiments';
  title: string;
  slug: { current: string };
  subtitle: string | null;
  group: string;
  projectPath: string;
  category_1: string;
  tags: string[];
  thumbnail: any;
  thumbnailType: 'image' | 'video';
  url: string;
  scope: string[];
  date: string;
  credits: string | null;
  contributions: string[];
}

export type WorkItem = Project | Experiment;

const workFields = `
  _id,
  _type,
  title,
  "slug": slug.current,
  subtitle,
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
`;

export async function getWorks(filter: 'all' | 'project' | 'experiment' = 'all') {
  const query = filter === 'all' 
    ? groq`*[_type in ["projects", "experiments"]] | order(date desc) {
        ${workFields}
      }`
    : groq`*[_type == "${filter === 'project' ? 'projects' : 'experiments'}"] | order(date desc) {
        ${workFields}
      }`;

  return client.fetch<WorkItem[]>(query);
}

export async function getWorkBySlug(slug: string) {
  const query = groq`*[_type in ["projects", "experiments"] && slug.current == $slug][0]{
    ${workFields}
  }`;
  
  return client.fetch<WorkItem>(query, { slug });
}
