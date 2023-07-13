import { PostData } from "../types";
import { Layout } from "./Layout";

interface Props {
  posts: Array<PostData>;
}

export function Index({ posts }: Props) {
  return (
    <Layout title="Let Kids Travel">
      <ul className="post-list">
        {posts.map((post) => (
          <li key={post.path}>
            <a href={post.slug}>
              <div
                className="thumbnail"
                style={{ backgroundImage: `url(${post.heroImageUrl})` }}
              />
              <div className="title">{post.title}</div>
            </a>
          </li>
        ))}
      </ul>
    </Layout>
  );
}
