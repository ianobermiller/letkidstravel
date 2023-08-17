export interface PostData {
  city: string;
  country: string;
  date: string;
  html: string;
  outputDir: string;
  path: string;
  slug: string;
  state: string;
  tags: Set<string>;
  thumbnailUrl: string | undefined;
  title: string;
}
