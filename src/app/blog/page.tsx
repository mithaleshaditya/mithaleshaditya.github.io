import { Metadata } from "next";
import { BlogClient } from "@/components/BlogClient";
import { getAllBlogPosts } from "@/lib/markdown";

export const metadata: Metadata = {
  title: "Technical Journal | Mythalesh Aditya",
  description: "Deep dive articles, software guides, and system designs written by Mythalesh Aditya.",
};

export default function BlogPage() {
  const posts = getAllBlogPosts();

  return (
    <main className="min-h-screen bg-black text-zinc-100 py-32 px-6">
      {/* Dynamic Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[300px] bg-gradient-to-b from-blue-500/5 to-transparent blur-3xl pointer-events-none -z-10" />
      
      <div className="max-w-4xl mx-auto">
        <BlogClient posts={posts} />
      </div>
    </main>
  );
}
