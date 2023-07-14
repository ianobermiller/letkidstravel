import type { PostData } from "../types";
import { Layout } from "./Layout";

interface Props {
  post: PostData;
}

export function Post({ post }: Props) {
  return (
    <Layout title={`${post.title} - Let Kids Travel`}>
      <h1>
        <a href="/">Let Kids Travel</a>
      </h1>
      <h2>{post.title}</h2>
      <p className="date">{post.date}</p>
      <main dangerouslySetInnerHTML={{ __html: post.html }} />
    </Layout>
  );
}
