import { PostData } from "../types";

interface Props {
  posts: PostData[];
}

export function PostList({ posts }: Props) {
  return (
    <ul className="post-list">
      {posts.map((post) => (
        <li key={post.path}>
          <a href={`/${post.slug}/`}>
            <div
              className="thumbnail"
              style={{ backgroundImage: `url(${post.thumbnailUrl})` }}
            />
            <div className="title">{post.title}</div>
          </a>
        </li>
      ))}
    </ul>
  );
}
