import Link from "next/link";
import { defineQuery } from "next-sanity";
import { sanityFetch } from "../../sanity/lib/live";
import styles from "./page.module.css";

const EXPERIMENTS_QUERY = defineQuery(`*[
  _type == "experiments"
  && defined(slug.current)
]{
  _id,
  title,
  "slug": slug.current,
  date,
  thumbnail,
  thumbnailType,
  scope
}|order(date desc)`);

export default async function WebExperimentsPage() {
  const { data: experiments } = await sanityFetch({ query: EXPERIMENTS_QUERY });
  console.log('Experiments:', experiments);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Web Experiments</h1>
      </div>
      <div className={styles.content}>
        <div className={styles.projectsContainer}>
          {experiments?.length > 0 ? (
            <ul>
              {experiments.map((experiment) => (
                <li key={experiment._id}>
                  <Link href={`/work/${experiment.slug}`}>
                    <h2>{experiment.title}</h2>
                    {experiment.date && (
                      <p>
                        {new Date(experiment.date).toLocaleDateString()}
                      </p>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p>No experiments found</p>
          )}
        </div>
      </div>
    </div>
  );
}