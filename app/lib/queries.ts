// List Queries - Used for displaying multiple items
export const LIST_QUERIES = {
  ALL: `*[_type in ["projects", "experiments"]] | order(date desc) {
    _id,
    _type,
    title,
    "slug": slug.current,
    date,
    thumbnail,
    thumbnailType,
    scope,
    details
  }`,
  
  PROJECTS: `*[_type == "projects"] | order(date desc) {
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
  }`,
  
  EXPERIMENTS: `*[_type == "experiments"] | order(date desc) {
    _id,
    _type,
    title,
    "slug": slug.current,
    date,
    thumbnail,
    thumbnailType,
    scope
  }`
}

// Detail Queries - Used for single item pages
export const DETAIL_QUERIES = {
  CONTENT: `*[_type in ["projects", "experiments"] && slug.current == $slug][0]{
    _id,
    _type,
    title,
    subtitle,
    "slug": slug.current,
    group,
    tags,
    thumbnail,
    thumbnailType,
    url,
    scope,
    date,
    credits,
    contributions,
    projectPath,
    primaryDescription,
    details,
    description
  }`
}
