import { SanityImageSource } from "../../sanity/lib/client";

export interface Work {
  _id: string;
  _type: string;
  title: string;
  slug: string;
  date: string;
  thumbnail: SanityImageSource;
  thumbnailType: string;
  scope: string[];
}
