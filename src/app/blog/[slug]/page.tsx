import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { ArrowLeft, Calendar, Clock, BookOpen, User } from "lucide-react";
import { getBlogPostBySlug, getAdjacentPosts, getBlogSlugs } from "@/lib/markdown";
import { formatDate } from "@/lib/utils";
import { CodeBlock } from "@/components/CodeBlock";
import { BlogShareAndComments } from "@/components/BlogShareAndComments";
import { ReadingProgressBar } from "@/components/ReadingProgressBar";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getBlogSlugs();
  return slugs.map((slug) => ({
    slug: slug.replace(/\.mdx$|\.md$/, ""),
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return {};

  return {
    title: `${post.title} | Mythalesh Aditya`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      authors: ["Mythalesh Aditya"],
    },
  };
}

// Custom MDX Components mapping
const mdxComponents = {
  // Override code blocks with our Copy-friendly CodeBlock component
  pre: ({ children }: any) => <CodeBlock>{children}</CodeBlock>,
  
  // Custom Callout rendering mapping alerts
  blockquote: ({ children }: any) => {
    // Check if children content contains warning or info headers
    const content = children?.props?.children || "";
    const isWarning = typeof content === "string" && content.includes("[!WARNING]");
    const isImportant = typeof content === "string" && content.includes("[!IMPORTANT]");
    const isTip = typeof content === "string" && content.includes("[!TIP]");
    
    let borderTheme = "border-blue-500 bg-blue-950/10 text-zinc-300";
    if (isWarning) borderTheme = "border-amber-500 bg-amber-950/10 text-zinc-300";
    if (isImportant) borderTheme = "border-red-500 bg-red-950/10 text-zinc-300";
    if (isTip) borderTheme = "border-green-500 bg-green-950/10 text-zinc-300";
    
    // Remove mark tags
    let cleanChildren = children;
    if (typeof content === "string") {
      const cleanText = content
        .replace("[!WARNING]", "")
        .replace("[!IMPORTANT]", "")
        .replace("[!TIP]", "")
        .replace("[!NOTE]", "")
        .trim();
      cleanChildren = <p>{cleanText}</p>;
    }

    return (
      <blockquote className={`my-6 p-4 rounded-r-lg border-l-4 ${borderTheme}`}>
        {cleanChildren}
      </blockquote>
    );
  },
  
  // Custom headers to automatically inject anchor IDs for Table of Contents mapping
  h2: ({ children }: any) => {
    const id = children?.toString().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || "";
    return <h2 id={id} className="text-2xl font-bold tracking-tight text-white mt-10 mb-4">{children}</h2>;
  },
  h3: ({ children }: any) => {
    const id = children?.toString().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || "";
    return <h3 id={id} className="text-xl font-semibold tracking-tight text-white mt-8 mb-3">{children}</h3>;
  }
};

// Extractor function for Table of Contents
function getTableOfContents(content: string) {
  const lines = content.split("\n");
  const headings: Array<{ text: string; id: string; level: number }> = [];
  
  lines.forEach((line) => {
    const match = line.match(/^(##|###)\s+(.*)$/);
    if (match) {
      const level = match[1].length;
      const text = match[2].replace(/\[\!.*?\]/g, "").trim();
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      headings.push({ text, id, level });
    }
  });
  
  return headings;
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const toc = getTableOfContents(post.content);
  const { prev, next } = getAdjacentPosts(slug);

  return (
    <main className="min-h-screen bg-black text-zinc-100 py-32 px-6">
      {/* Dynamic Reading Progress Bar */}
      <ReadingProgressBar />

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 relative">
        {/* Left Column: Post Details */}
        <div className="lg:col-span-8 space-y-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors group"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            <span>Back to Journal</span>
          </Link>

          {/* Meta Header */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-zinc-500">
              <span className="text-blue-500 uppercase tracking-wider">{post.category}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" />
                {formatDate(post.date)}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                {post.readTime}
              </span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
              {post.title}
            </h1>
            
            <p className="text-lg text-zinc-400 font-light leading-relaxed">
              {post.description}
            </p>
          </div>

          {/* Tags list */}
          <div className="flex flex-wrap gap-1.5 pt-2 pb-6 border-b border-white/5">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-mono px-2.5 py-1 rounded bg-zinc-900 border border-white/5 text-zinc-400"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* MDX Body Output */}
          <article className="prose-custom">
            <MDXRemote source={post.content} components={mdxComponents} />
          </article>

          {/* Share and Mock Comments Block */}
          <BlogShareAndComments title={post.title} slug={post.slug} />

          {/* Author Card */}
          <div className="p-6 rounded-xl border border-white/5 bg-zinc-950/40 flex items-start gap-4 mt-12">
            <div className="p-3 rounded-full bg-white/5 border border-white/5 text-zinc-400">
              <User className="h-6 w-6" />
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-white">Written by Mythalesh Aditya</h4>
              <p className="text-xs font-light text-zinc-400 leading-relaxed">
                Full-Stack Systems Engineer & AI Architect. Specializing in math models, database transaction integrity, and rendering smooth web layouts.
              </p>
            </div>
          </div>

          {/* Previous / Next Article Navigation Links */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-10 border-t border-white/5 mt-12">
            {prev ? (
              <Link
                href={`/blog/${prev.slug}`}
                className="p-5 rounded-xl border border-white/5 bg-zinc-950/20 hover:bg-zinc-950/50 hover:border-white/10 transition-all text-left flex flex-col justify-between space-y-2 group clickable"
              >
                <span className="text-[10px] font-mono text-zinc-500 uppercase">Previous Article</span>
                <span className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors line-clamp-1">
                  {prev.title}
                </span>
              </Link>
            ) : (
              <div className="p-5 rounded-xl border border-dashed border-white/5 text-zinc-600 text-xs font-mono flex items-center justify-center">
                Start of Journal
              </div>
            )}

            {next ? (
              <Link
                href={`/blog/${next.slug}`}
                className="p-5 rounded-xl border border-white/5 bg-zinc-950/20 hover:bg-zinc-950/50 hover:border-white/10 transition-all text-right flex flex-col justify-between space-y-2 group clickable"
              >
                <span className="text-[10px] font-mono text-zinc-500 uppercase">Next Article</span>
                <span className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors line-clamp-1">
                  {next.title}
                </span>
              </Link>
            ) : (
              <div className="p-5 rounded-xl border border-dashed border-white/5 text-zinc-600 text-xs font-mono flex items-center justify-center">
                End of Journal
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Sidebar Table of Contents (Sticky on Desktops) */}
        <div className="hidden lg:block lg:col-span-4">
          <div className="sticky top-28 space-y-6 self-start pl-6 border-l border-white/5">
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 uppercase tracking-widest font-bold">
              <BookOpen className="h-4 w-4 text-blue-500" />
              <span>Table of Contents</span>
            </div>
            
            <nav className="space-y-3">
              {toc.map((heading, i) => (
                <a
                  key={i}
                  href={`#${heading.id}`}
                  style={{ paddingLeft: `${(heading.level - 2) * 12}px` }}
                  className="block text-xs font-light text-zinc-400 hover:text-white transition-colors py-0.5 leading-relaxed truncate"
                >
                  {heading.text}
                </a>
              ))}
              
              {toc.length === 0 && (
                <span className="text-xs text-zinc-600 font-mono">
                  No headings found.
                </span>
              )}
            </nav>
          </div>
        </div>
      </div>
    </main>
  );
}
