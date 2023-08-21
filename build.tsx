import { Post } from './components/Post';
import { PostData } from './types.js';
import remarkFigureCaption from '@microflash/remark-figure-caption';
import { existsSync, watch } from 'node:fs';
import { cp, mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import rehypeImgSize from 'rehype-img-size';
import stringify from 'rehype-stringify';
import remarkFrontmatter from 'remark-frontmatter';
import remarkParse from 'remark-parse';
import remarkParseFrontmatter from 'remark-parse-frontmatter';
import { Root } from 'remark-parse/lib';
import remark2rehype from 'remark-rehype';
import sharp from 'sharp';
import { unified } from 'unified';
import { EXIT, visit } from 'unist-util-visit';

const PAGES_DIR = './pages';
const POSTS_DIR = './posts';
const PUBLIC_DIR = './public';
const BUILD_DIR = './build';

const THUMBNAIL_SIZE = 600;

async function build(isWatch: boolean, clean: boolean) {
  if (clean) await rm(BUILD_DIR, { force: true, recursive: true });

  async function buildAndWatch(path: string, callback: () => Promise<void>) {
    console.log(`${isWatch ? 'Watching' : 'Building'} ${path}...`);

    await callback();

    if (isWatch) {
      watch(path, { recursive: true }, () => {
        console.log(`Rebuilding ${path}...`);
        callback();
      });
    }
  }

  await buildAndWatch(POSTS_DIR, async () => {
    const postEntries = (
      await readdir(POSTS_DIR, { withFileTypes: true })
    ).filter(e => e.isDirectory() && !e.name.startsWith('.'));

    const posts = await Promise.all(
      postEntries.map(async postEntry => {
        const slug = postEntry.name;
        const path = join(POSTS_DIR, slug);

        const postContent = await readFile(join(path, 'index.md'), 'utf-8');

        let thumbnailUrl;
        const md = await unified()
          .use(remarkParse)
          .use(remarkFrontmatter, ['yaml'])
          .use(remarkParseFrontmatter)
          .use(remarkFigureCaption)
          .use(() => (tree: Root) => {
            visit(tree, 'image', node => {
              thumbnailUrl = node.url;
              return EXIT;
            });
          })
          .use(remark2rehype)
          .use(rehypeImgSize, { dir: path })
          .use(stringify)
          .process(postContent);

        const frontmatter = md.data.frontmatter as Record<string, unknown>;

        const outputDir = join(BUILD_DIR, slug);
        const post: PostData = {
          city: String(frontmatter.city || ''),
          country: String(frontmatter.country || ''),
          date: String(frontmatter.date),
          html: md.toString(),
          outputDir,
          path,
          slug,
          state: String(frontmatter.state || ''),
          tags: new Set(
            Array.isArray(frontmatter.tags) ? frontmatter.tags.map(String) : [],
          ),
          thumbnailUrl: frontmatter.thumbnail
            ? String(frontmatter.thumbnail)
            : thumbnailUrl,
          title: frontmatter.title
            ? String(frontmatter.title)
            : `${frontmatter.city}, ${
                frontmatter.country || frontmatter.state
              }`,
        };

        await mkdir(join(post.outputDir, 'images'), { recursive: true });

        if (post.thumbnailUrl) {
          const inputPath = join(post.path, post.thumbnailUrl);
          if (existsSync(inputPath)) {
            const thumbnailUrl = post.thumbnailUrl.replace(
              /\.([^.]+)$/,
              '_t.webp',
            );
            const outputPath = join(outputDir, thumbnailUrl);
            if (!existsSync(outputPath)) {
              await sharp(inputPath)
                .resize({
                  fit: 'cover',
                  height: THUMBNAIL_SIZE * 2,
                  width: THUMBNAIL_SIZE * 2,
                })
                .webp()
                .toFile(outputPath);
            }
            post.thumbnailUrl = '/' + join(post.slug, thumbnailUrl);
          } else {
            post.thumbnailUrl = undefined;
          }
        }

        return post;
      }),
    );

    posts.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );

    await Promise.all(
      posts.map(async post => {
        const output = renderPage(
          <Post post={post} relatedPosts={getRelatedPosts(posts, post)} />,
        );

        const inputImages = join(post.path, 'images');
        const outputImages = join(post.outputDir, 'images');
        if (existsSync(inputImages)) {
          // Only copy each image if it doesn't exist
          const images = await readdir(inputImages);
          for (const image of images) {
            const outputPath = join(outputImages, image);
            if (existsSync(outputPath)) continue;
            await cp(join(inputImages, image), outputPath);
          }
        }

        await writeFile(join(post.outputDir, 'index.html'), output);
      }),
    );

    // Pages
    const pageFiles = await readdir(PAGES_DIR);
    await Promise.all(
      pageFiles
        .filter(file => file.endsWith('.tsx'))
        .map(async file => {
          // delete require.cache[require.resolve(`${PAGES_DIR}/${file}`)];
          const Component = (await import(`${PAGES_DIR}/${file}`)).default;
          const path = join(
            BUILD_DIR,
            file === 'index.tsx'
              ? 'index.html'
              : file.toLowerCase().replace(/\.tsx$/, '/index.html'),
          );

          await mkdir(dirname(path), { recursive: true });
          await writeFile(path, renderPage(<Component posts={posts} />));
        }),
    );
  });

  await buildAndWatch(PUBLIC_DIR, async () => {
    const publicFiles = await readdir(PUBLIC_DIR);
    publicFiles
      .filter(p => p !== 'index.css')
      .forEach(async p => {
        cp(join(PUBLIC_DIR, p), join(BUILD_DIR, p), { recursive: true });
      });
  });
}

function renderPage(page: React.ReactElement) {
  return `<!DOCTYPE html>
${renderToString(page)}`;
}

const countByTag = new Map<string, number>();

function getRelatedPosts(posts: PostData[], post: PostData): PostData[] {
  if (!countByTag.size) {
    posts.forEach(p =>
      p.tags.forEach(t => countByTag.set(t, (countByTag.get(t) ?? 0) + 1)),
    );
  }

  const targetTags = post.tags;
  return posts
    .filter(p => p !== post)
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

build(process.argv.includes('--watch'), process.argv.includes('--clean'));
