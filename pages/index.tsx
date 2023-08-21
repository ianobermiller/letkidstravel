import { Layout } from '../templates/Layout';
import { PostList } from '../templates/PostList';
import { PostData } from '../types';

interface Props {
  posts: Array<PostData>;
}

export default function Index({ posts }: Props) {
  return (
    <Layout headingColor='light' title='Let Kids Travel'>
      <div className='relative  mb-4 gap-2'>
        <img
          className='my-2 h-[75vh] w-full rounded-2xl object-cover sm:h-[50vh]'
          src='/images/hero.webp'
        />
        <div className='absolute bottom-0 m-2 rounded-xl bg-white/80 p-2 text-center'>
          <span className='mr-1 inline-block'>👋</span>Hi, we’re Olivia and Ian.
          We travel with our four children enjoying architecture, nature, baked
          goods, coffee, chocolate and most importantly living for Jesus.
        </div>
      </div>

      <PostList posts={posts} />
    </Layout>
  );
}
