import React from "react";
import { Layout } from "./Layout.jsx";
import { PostData } from "../types.js";

interface Props {
  posts: Array<PostData>;
}

export function Index({ posts }: Props) {
  return (
    <Layout title="Let Kids Travel">
      <main>
        <ul>
          {posts.map((post) => (
            <li key={post.path}>
              <a href={post.slug}>{post.title}</a>
            </li>
          ))}
        </ul>
      </main>
    </Layout>
  );
}
