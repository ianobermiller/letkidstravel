import type { PostData } from "../types";
import { Layout } from "./Layout";
import { PostList } from "./PostList";

interface Props {
  post: PostData;
  relatedPosts: PostData[];
}

export function Post({ post, relatedPosts }: Props) {
  return (
    <Layout title={`${post.title} - Let Kids Travel`}>
      <article>
        <h2>{post.title}</h2>

        <p className="date">{post.date}</p>

        <main dangerouslySetInnerHTML={{ __html: post.html }} />

        <h2>Also check out:</h2>

        <PostList posts={relatedPosts} />
      </article>
    </Layout>
  );
}
