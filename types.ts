export interface PostData {
  date: string;
  html: string;
  outputDir: string;
  path: string;
  slug: string;
  tags: Set<string>;
  thumbnailUrl: string | undefined;
  title: string;
}
