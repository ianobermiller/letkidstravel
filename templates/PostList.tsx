import { PostData } from "../types";

interface Props {
  posts: PostData[];
}

export function PostList({ posts }: Props) {
  return (
    <ul className="flex flex-col gap-5 -mx-4 mt-0 bg-stone-200 p-4">
      {posts.map((post) => (
        <li className="border-4 border-white drop-shadow" key={post.path}>
          <a href={`/${post.slug}/`}>
            <div
              className="bg-cover bg-center h-[30vh] m-1"
              style={{ backgroundImage: `url(${post.thumbnailUrl})` }}
            />
            <div className="text-center p-1 pb-0 bg-white">{post.title}</div>
          </a>
        </li>
      ))}
    </ul>
  );
}
