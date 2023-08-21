import { Layout } from '../components/Layout';
import { MainHeader } from '../components/MainHeader';
import { PostList } from '../components/PostList';
import { PostData } from '../types';

interface Props {
  posts: Array<PostData>;
}

export default function Index({ posts }: Props) {
  return (
    <Layout>
      <MainHeader />

      <PostList posts={posts} />
    </Layout>
  );
}
