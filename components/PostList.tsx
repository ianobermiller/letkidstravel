import { PostData } from '../types';

interface Props {
  posts: PostData[];
}

export function PostList({ posts }: Props) {
  return (
    <div className='bg-sky-900 px-3 py-6'>
      <ul className='grid max-w-5xl items-start justify-center gap-4 sm:grid-cols-2 sm:gap-8 md:grid-cols-3 lg:mx-auto'>
        {posts.map(post => (
          <li
            className='inline-block min-w-0 bg-white p-3 drop-shadow sm:rotate-1 sm:odd:-rotate-1 sm:[&:nth-child(4n)]:rotate-2 sm:[&:nth-child(5n)]:-rotate-2'
            key={post.path}>
            <a className='inline-flex flex-col' href={`/${post.slug}/`}>
              <img
                className='object-cover object-center'
                src={post.thumbnailUrl}
              />
              <h3 className='balanced bg-white p-3 pb-0 text-center'>
                {post.title}
              </h3>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
