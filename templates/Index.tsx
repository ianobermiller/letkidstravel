import { PostData } from "../types";
import { Layout } from "./Layout";

interface Props {
  posts: Array<PostData>;
}

export function Index({ posts }: Props) {
  return (
    <Layout title="Let Kids Travel">
      <div className="home-header">
        <h1>
          <a href="/">Let Kids Travel</a>
        </h1>
        <div className="blurb">
          👋 Hi, we’re Olivia and Ian. We travel with our four children enjoying
          architecture, nature, baked goods, coffee, chocolate and most
          importantly living for Jesus.
        </div>
      </div>

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
