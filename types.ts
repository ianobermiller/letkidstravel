export interface PostData {
  path: string;
  html: string;
  title: string;
  slug: string;
  date: string;
  tags: Set<string>;
  heroImageUrl: string | undefined;
}
