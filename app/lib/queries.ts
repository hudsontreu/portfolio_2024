// List Queries - Used for displaying multiple items
export const LIST_QUERIES = {
  ALL: `*[_type in ["projects", "experiments"]] | order(date desc) {
    _id,
    _type,
    title,
    "slug": slug.current,
    date,
    headerImage,
    "headerVideo": headerVideo.asset->{
      _ref,
      url
    },
    thumbnailType,
    methods,
    details
  }`,
  
  PROJECTS: `*[_type == "projects"] | order(date desc) {
    _id,
    _type,
    title,
    "slug": slug.current,
    date,
    headerImage,
    "headerVideo": headerVideo.asset->{
      _ref,
      url
    },
    thumbnailType,
    methods,
    primaryDescription,
    details
  }`,
  
  EXPERIMENTS: `*[_type == "experiments"] | order(date desc) {
    _id,
    _type,
    title,
    "slug": slug.current,
    date,
    headerImage,
    "headerVideo": headerVideo.asset->{
      _ref,
      url
    },
    thumbnailType,
    methods
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
    headerImage,
    "headerVideo": headerVideo.asset->{
      _ref,
      url
    },
    thumbnailType,
    url,
    methods,
    date,
    credits,
    contributions,
    projectPath,
    primaryDescription,
    details,
    description
  }`
}
