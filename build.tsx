import remarkFigureCaption from "@microflash/remark-figure-caption";
import liveServer from "live-server";
import { existsSync, watch } from "node:fs";
import { cp, mkdir, readdir, readFile, rm, writeFile } from "node:fs/promises";
import { join } from "node:path";
import React from "react";
import { renderToString } from "react-dom/server";
import remarkFrontmatter from "remark-frontmatter";
import remarkHtml from "remark-html";
import remarkParse from "remark-parse";
import remarkParseFrontmatter from "remark-parse-frontmatter";
import { unified } from "unified";
import { Index } from "./templates/Index.jsx";
import { Post } from "./templates/Post.jsx";
import { PostData } from "./types.js";

const POSTS_DIR = "./posts";
const BUILD_DIR = "./build";

async function build(isWatch: boolean) {
  await rm(BUILD_DIR, { force: true, recursive: true });

  async function buildAndWatch(path: string, callback: () => Promise<void>) {
    await callback();

    if (isWatch) {
      watch(path, { recursive: true }, callback);
    }
  }

  buildAndWatch("posts", async () => {
    const postEntries = (
      await readdir(POSTS_DIR, { withFileTypes: true })
    ).filter((e) => e.isDirectory);

    const posts = await Promise.all(
      postEntries.map(async (postEntry) => {
        const path = join(POSTS_DIR, postEntry.name);
        const postContent = await readFile(join(path, "index.md"), "utf-8");

        const md = await unified()
          .use(remarkParse)
          .use(remarkFrontmatter, ["yaml"])
          .use(remarkParseFrontmatter)
          .use(remarkFigureCaption)
          .use(remarkHtml)
          .process(postContent);

        const frontmatter = md.data.frontmatter as Record<string, string>;

        const post: PostData = {
          path,
          html: md.toString(),
          title: frontmatter.title,
          date: frontmatter.date,
          slug: postEntry.name,
        };
        return post;
      })
    );

    await Promise.all([
      ...posts.map(async (post) => {
        const outputDir = join(BUILD_DIR, post.slug);
        await mkdir(outputDir, { recursive: true });

        const output = renderPage(<Post post={post} />);

        if (existsSync(join(post.path, "images"))) {
          await cp(join(post.path, "images"), join(outputDir, "images"), {
            recursive: true,
          });
        }
        await writeFile(join(outputDir, "index.html"), output);
      }),
      writeIndex(posts),
    ]);
  });

  await buildAndWatch("public", () =>
    cp("public", BUILD_DIR, { recursive: true })
  );

  isWatch && liveServer.start({ root: BUILD_DIR });
}

async function writeIndex(posts: Array<PostData>) {
  const path = join(BUILD_DIR, "index.html");
  await writeFile(path, renderPage(<Index posts={posts} />));
}

function renderPage(page: React.ReactElement) {
  return `<!DOCTYPE html>
${renderToString(page)}`;
}

await build(process.argv.includes("--watch"));
