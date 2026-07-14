import fs from "fs";
import path from "path";
import matter from "gray-matter";

const BLOGS_DIRECTORY = path.join(process.cwd(), "content/blog");

export interface BlogPostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  tags: string[];
  coverImage: string;
  readTime: string;
  featured: boolean;
}

export interface BlogPost extends BlogPostMeta {
  content: string;
}

export function getBlogSlugs(): string[] {
  if (!fs.existsSync(BLOGS_DIRECTORY)) {
    return [];
  }
  return fs.readdirSync(BLOGS_DIRECTORY).filter((file) => file.endsWith(".mdx") || file.endsWith(".md"));
}

export function getBlogPostBySlug(slug: string): BlogPost | null {
  try {
    const realSlug = slug.replace(/\.mdx$|\.md$/, "");
    const mdxPath = path.join(BLOGS_DIRECTORY, `${realSlug}.mdx`);
    const mdPath = path.join(BLOGS_DIRECTORY, `${realSlug}.md`);
    
    let filePath = "";
    if (fs.existsSync(mdxPath)) {
      filePath = mdxPath;
    } else if (fs.existsSync(mdPath)) {
      filePath = mdPath;
    } else {
      return null;
    }

    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      slug: realSlug,
      title: data.title || "",
      description: data.description || "",
      date: data.date || "",
      category: data.category || "General",
      tags: data.tags || [],
      coverImage: data.coverImage || "/images/blog/placeholder.jpg",
      readTime: data.readTime || "5 min read",
      featured: data.featured === true,
      content,
    };
  } catch (error) {
    console.error(`Error reading blog post: ${slug}`, error);
    return null;
  }
}

export function getAllBlogPosts(): BlogPostMeta[] {
  const slugs = getBlogSlugs();
  const posts = slugs
    .map((slug) => {
      const post = getBlogPostBySlug(slug);
      if (!post) return null;
      // return only meta to save bundle size
      const { content, ...meta } = post;
      return meta;
    })
    .filter((post): post is BlogPostMeta => post !== null)
    // sort posts by date descending
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));

  return posts;
}

export function getAdjacentPosts(slug: string): { prev: BlogPostMeta | null; next: BlogPostMeta | null } {
  const posts = getAllBlogPosts();
  const index = posts.findIndex((post) => post.slug === slug);
  if (index === -1) {
    return { prev: null, next: null };
  }
  
  const next = index > 0 ? posts[index - 1] : null;
  const prev = index < posts.length - 1 ? posts[index + 1] : null;
  
  return { prev, next };
}
