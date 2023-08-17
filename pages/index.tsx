import { Layout } from "../templates/Layout";
import { PostList } from "../templates/PostList";
import { PostData } from "../types";

interface Props {
  posts: Array<PostData>;
}

export default function Index({ posts }: Props) {
  return (
    <Layout headingColor="light" title="Let Kids Travel">
      <div className="home-header">
        <div className="image" />
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
