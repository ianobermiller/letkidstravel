import type { PostData } from '../types';
import { H2 } from './H2';
import { Layout } from './Layout';
import { PostList } from './PostList';

interface Props {
  post: PostData;
  relatedPosts: PostData[];
}

export function Post({ post, relatedPosts }: Props) {
  return (
    <Layout title={`${post.title} - Let Kids Travel`}>
      <article className='mx-auto my-4 max-w-prose px-3'>
        <H2>{post.title}</H2>

        <p className='mb-4 text-sm'>{post.date}</p>

        <main
          className='prose'
          dangerouslySetInnerHTML={{ __html: post.html }}
        />

        <h2 className='my-4 font-display text-3xl'>Also check out:</h2>

        <PostList posts={relatedPosts} />
      </article>
    </Layout>
  );
}
