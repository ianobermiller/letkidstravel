import { PostData } from "../types";
import { Layout } from "./Layout";
import { PostList } from "./PostList";

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
          <span className="wave">👋</span>Hi, we’re Olivia and Ian. We travel
          with our four children enjoying architecture, nature, baked goods,
          coffee, chocolate and most importantly living for Jesus.
        </div>
      </div>

      <PostList posts={posts} />
    </Layout>
  );
}
