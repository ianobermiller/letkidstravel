import { PostData } from '../types';

interface Props {
  posts: PostData[];
}

export function PostList({ posts }: Props) {
  return (
    <ul className='-mx-4 mt-0 grid items-start justify-center gap-4 bg-stone-200 p-4 sm:grid-cols-2 md:grid-cols-3'>
      {posts.map(post => (
        <li
          className='inline-block min-w-0 border-8 border-white drop-shadow'
          key={post.path}>
          <a className='inline-flex flex-col' href={`/${post.slug}/`}>
            <img
              className='object-cover object-center'
              src={post.thumbnailUrl}
            />
            <div className='bg-white p-1 pb-0 text-center'>{post.title}</div>
          </a>
        </li>
      ))}
    </ul>
  );
}
