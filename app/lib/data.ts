import { client, SanityImageSource } from "../../sanity/lib/client";

// Add all sanity queries here and import the results to my components

const ALL_WORKS_QUERY = `*[_type in ["projects", "experiments"]] | order(date desc) {
    _id,
    _type,
    title,
    "slug": slug.current,
    date,
    thumbnail,
    thumbnailType,
    scope,
    details
  }`;
  
const PROJECTS_QUERY = `*[_type == "projects"] | order(date desc) {
    _id,
    _type,
    title,
    "slug": slug.current,
    date,
    thumbnail,
    thumbnailType,
    scope,
    primaryDescription,
    details
  }`;
  
const EXPERIMENTS_QUERY = `*[_type == "experiments"] | order(date desc) {
    _id,
    _type,
    title,
    "slug": slug.current,
    date,
    thumbnail,
    thumbnailType,
    scope
  }`;

interface Work {
  _id: string;
  _type: string;
  title: string;
  slug: string;
  date: string;
  thumbnail: SanityImageSource;
  thumbnailType: string;
  scope: string[];
}

export async function getAllWorks(): Promise<Work[]> {
  try {
    console.log('Fetching all works...');
    const works = await client.fetch(ALL_WORKS_QUERY);
    console.log('Fetched works:', works);
    return works;
  } catch (error) {
    console.error('Error fetching all works:', error);
    throw error;
  }
}

export async function getProjects(): Promise<Work[]> {
  try {
    console.log('Fetching projects...');
    const projects = await client.fetch(PROJECTS_QUERY);
    console.log('Fetched projects:', projects);
    return projects;
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw error;
  }
}

export async function getExperiments(): Promise<Work[]> {
  try {
    console.log('Fetching experiments...');
    const experiments = await client.fetch(EXPERIMENTS_QUERY);
    console.log('Fetched experiments:', experiments);
    return experiments;
  } catch (error) {
    console.error('Error fetching experiments:', error);
    throw error;
  }
}