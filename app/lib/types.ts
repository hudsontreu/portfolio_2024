import { SanityImageSource } from "../../sanity/lib/client";

export interface Work {
  _id: string;
  _type: string;
  title: string;
  slug: string;
  date: string;
  headerImage: SanityImageSource;
  headerVideo?: {
    _ref: string;
    url: string;
  };
  thumbnailType: string;
  methods: string[];
}
