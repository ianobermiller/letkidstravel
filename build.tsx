import { Index } from "./templates/Index";
import { Post } from "./templates/Post";
import { PostData } from "./types.js";
import remarkFigureCaption from "@microflash/remark-figure-caption";
import liveServer from "live-server";
import { existsSync, watch } from "node:fs";
import { cp, mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { join } from "node:path";
import React from "react";
import { renderToString } from "react-dom/server";
import remarkFrontmatter from "remark-frontmatter";
import remarkHtml from "remark-html";
import remarkParse from "remark-parse";
import remarkParseFrontmatter from "remark-parse-frontmatter";
import { Root } from "remark-parse/lib";
import sharp from "sharp";
import { unified } from "unified";
import { EXIT, visit } from "unist-util-visit";

const POSTS_DIR = "./posts";
const BUILD_DIR = "./build";

const THUMBNAIL_SIZE = 210;

async function build(isWatch: boolean, clean: boolean) {
  if (clean) await rm(BUILD_DIR, { force: true, recursive: true });

  async function buildAndWatch(path: string, callback: () => Promise<void>) {
    await callback();

    if (isWatch) {
      watch(path, { recursive: true }, callback);
    }
  }

  buildAndWatch("posts", async () => {
    const postEntries = (
      await readdir(POSTS_DIR, { withFileTypes: true })
    ).filter((e) => e.isDirectory() && !e.name.startsWith("."));

    const posts = await Promise.all(
      postEntries.map(async (postEntry) => {
        const slug = postEntry.name;
        const path = join(POSTS_DIR, slug);
        const postContent = await readFile(join(path, "index.md"), "utf-8");

        let thumbnailUrl;
        const md = await unified()
          .use(remarkParse)
          .use(remarkFrontmatter, ["yaml"])
          .use(remarkParseFrontmatter)
          .use(remarkFigureCaption)
          .use(remarkHtml)
          .use(() => (tree: Root) => {
            visit(tree, "image", (node) => {
              thumbnailUrl = node.url;
              return EXIT;
            });
          })
          .process(postContent);

        const frontmatter = md.data.frontmatter as Record<string, unknown>;

        const outputDir = join(BUILD_DIR, slug);
        const post: PostData = {
          date: String(frontmatter.date),
          html: md.toString(),
          outputDir,
          path,
          slug,
          tags: new Set(
            Array.isArray(frontmatter.tags) ? frontmatter.tags.map(String) : []
          ),
          thumbnailUrl,
          title: String(frontmatter.title),
        };

        await mkdir(join(post.outputDir, "images"), { recursive: true });

        if (post.thumbnailUrl) {
          const inputPath = join(post.path, post.thumbnailUrl);
          if (existsSync(inputPath)) {
            const thumbnailUrl = post.thumbnailUrl.replace(
              /\.([^.]+)$/,
              "_t.webp"
            );
            await sharp(inputPath)
              .resize({
                fit: "cover",
                height: THUMBNAIL_SIZE * 2,
                width: THUMBNAIL_SIZE * 2,
              })
              .webp()
              .toFile(join(outputDir, thumbnailUrl));
            post.thumbnailUrl = "/" + join(post.slug, thumbnailUrl);
          } else {
            post.thumbnailUrl = undefined;
          }
        }

        return post;
      })
    );

    await Promise.all(
      posts.map(async (post) => {
        const output = renderPage(
          <Post post={post} relatedPosts={getRelatedPosts(posts, post)} />
        );

        if (existsSync(join(post.path, "images"))) {
          await cp(join(post.path, "images"), join(post.outputDir, "images"), {
            recursive: true,
          });
        }

        await writeFile(join(post.outputDir, "index.html"), output);
      })
    );

    await writeIndex(posts);
  });

  await buildAndWatch("public", () =>
    cp("public", BUILD_DIR, { recursive: true })
  );

  isWatch && liveServer.start({ open: false, port: 3000, root: BUILD_DIR });
}

async function writeIndex(posts: Array<PostData>) {
  const path = join(BUILD_DIR, "index.html");
  await writeFile(path, renderPage(<Index posts={posts} />));
}

function renderPage(page: React.ReactElement) {
  return `<!DOCTYPE html>
${renderToString(page)}`;
}

const countByTag = new Map<string, number>();

function getRelatedPosts(posts: PostData[], post: PostData): PostData[] {
  if (!countByTag.size) {
    posts.forEach((p) =>
      p.tags.forEach((t) => countByTag.set(t, (countByTag.get(t) ?? 0) + 1))
    );
  }

  const targetTags = post.tags;
  return posts
    .filter((p) => p !== post)
    .sort((a, b) => {
      return scorePost(b, targetTags) - scorePost(a, targetTags);
    })
    .slice(0, 3);
}

function scorePost(post: PostData, targetTags: Set<string>): number {
  let total = 0;
  for (const tag of targetTags) {
    if (post.tags.has(tag)) {
      const count = countByTag.get(tag) ?? 0;
      total += Math.pow(1, -count);
    }
  }
  return total;
}

build(process.argv.includes("--watch"), process.argv.includes("--clean"));
