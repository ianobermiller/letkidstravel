import { PostData } from "../types.js";
import { Layout } from "./Layout.jsx";

interface Props {
  posts: Array<PostData>;
}

export function Index({ posts }: Props) {
  return (
    <Layout title="Let Kids Travel">
      <ul className="post-list">
        {posts.map((post) => (
          <li key={post.path}>
            <a href={post.slug}>{post.title}</a>
          </li>
        ))}
      </ul>
    </Layout>
  );
}
