import type { PostData } from "../types.js";
import { Layout } from "./Layout.jsx";

interface Props {
  post: PostData;
}

export function Post({ post }: Props) {
  return (
    <Layout title={`Let Kids Travel - ${post.title}`}>
      <h2>{post.title}</h2>
      <p className="date">{post.date}</p>
      <main dangerouslySetInnerHTML={{ __html: post.html }} />
    </Layout>
  );
}
