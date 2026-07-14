"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Calendar, Clock, ArrowRight, BookOpen, Inbox } from "lucide-react";
import { motion } from "framer-motion";
import { BlogPostMeta } from "@/lib/markdown";
import { formatDate } from "@/lib/utils";

interface BlogClientProps {
  posts: BlogPostMeta[];
}

export function BlogClient({ posts }: BlogClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [email, setEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState<"idle" | "success">("idle");

  const categories = ["All", ...Array.from(new Set(posts.map((p) => p.category)))];

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const featuredPost = posts.find((p) => p.featured) || posts[0];
  const otherPosts = filteredPosts.filter((p) => p.slug !== (featuredPost?.slug || ""));

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) return;
    setNewsletterStatus("success");
    setEmail("");
    setTimeout(() => setNewsletterStatus("idle"), 4000);
  };

  return (
    <div className="space-y-16">
      {/* Blog Hero Heading */}
      <div className="space-y-4 text-center py-8">
        <span className="text-xs font-mono tracking-widest text-blue-500 uppercase">
          Technical Writing
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
          The Logbook
        </h1>
        <p className="text-base text-zinc-400 font-light max-w-md mx-auto leading-relaxed">
          Deep dives, logs, and architectural write-ups on building products, math systems, and developer tools.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between border-b border-white/5 pb-6">
        {/* Categories */}
        <div className="flex flex-wrap gap-2 order-2 md:order-1 w-full md:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg border text-xs font-mono transition-all clickable ${
                selectedCategory === cat
                  ? "bg-white text-black border-white"
                  : "bg-white/2 text-zinc-400 border-white/5 hover:border-white/10 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72 order-1 md:order-2">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search articles..."
            className="w-full pl-9 pr-4 py-2 rounded-lg border border-white/5 bg-zinc-950/60 text-white text-xs placeholder-zinc-500 focus:outline-none focus:border-white/10 transition-colors"
          />
        </div>
      </div>

      {/* Featured Article Block (Only shown when not searching) */}
      {!searchQuery && selectedCategory === "All" && featuredPost && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="group rounded-2xl border border-white/5 bg-zinc-950/20 overflow-hidden hover:border-white/10 transition-all duration-350"
        >
          <Link href={`/blog/${featuredPost.slug}`} className="grid grid-cols-1 lg:grid-cols-12 gap-6 clickable">
            {/* Visual Placeholder for cover */}
            <div className="lg:col-span-6 aspect-video lg:aspect-auto min-h-[250px] relative bg-zinc-900 flex items-center justify-center border-r border-white/5">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-zinc-950 to-purple-900/20" />
              <BookOpen className="h-10 w-10 text-zinc-500 z-10 animate-pulse" />
            </div>
            
            {/* Text details */}
            <div className="lg:col-span-6 p-6 sm:p-8 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex gap-3 text-xs font-mono text-zinc-500">
                  <span className="text-blue-400 uppercase tracking-widest">{featuredPost.category}</span>
                  <span>•</span>
                  <span>{featuredPost.readTime}</span>
                </div>
                
                <h2 className="text-2xl sm:text-3xl font-bold text-white group-hover:text-blue-400 transition-colors">
                  {featuredPost.title}
                </h2>
                
                <p className="text-sm font-light text-zinc-400 leading-relaxed">
                  {featuredPost.description}
                </p>
              </div>

              <div className="flex items-center justify-between pt-6 mt-6 border-t border-white/5">
                <span className="flex items-center gap-1.5 text-xs text-zinc-500">
                  <Calendar className="h-3.5 w-3.5" />
                  {formatDate(featuredPost.date)}
                </span>
                
                <span className="inline-flex items-center gap-1 text-xs text-blue-400 group-hover:underline">
                  <span>Read Article</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </div>
          </Link>
        </motion.div>
      )}

      {/* Grid of Other Articles */}
      <div className="space-y-6">
        <h3 className="text-xs font-mono tracking-widest text-zinc-500 uppercase">
          {searchQuery || selectedCategory !== "All" ? "Search Results" : "Latest Articles"}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {otherPosts.map((post) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="group rounded-xl border border-white/5 bg-zinc-950/20 overflow-hidden hover:border-white/10 transition-all flex flex-col justify-between"
            >
              <Link href={`/blog/${post.slug}`} className="flex flex-col h-full clickable">
                {/* Micro cover placeholder */}
                <div className="aspect-video bg-zinc-900/60 relative border-b border-white/5 flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-tr from-zinc-950 via-zinc-900 to-zinc-950" />
                  <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">
                    {post.category}
                  </span>
                </div>

                <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-500">
                      <span>{formatDate(post.date)}</span>
                      <span>•</span>
                      <span className="flex items-center gap-0.5">
                        <Clock className="h-3 w-3" />
                        {post.readTime}
                      </span>
                    </div>
                    
                    <h4 className="text-base font-bold text-white group-hover:text-blue-400 transition-colors line-clamp-2">
                      {post.title}
                    </h4>
                    
                    <p className="text-xs font-light text-zinc-400 line-clamp-3 leading-relaxed">
                      {post.description}
                    </p>
                  </div>

                  <span className="text-xs text-blue-400 flex items-center gap-1 group-hover:underline pt-2">
                    <span>Read post</span>
                    <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </Link>
            </motion.article>
          ))}

          {filteredPosts.length === 0 && (
            <div className="col-span-full py-16 text-center text-zinc-500 font-mono text-xs">
              No matching articles found.
            </div>
          )}
        </div>
      </div>

      {/* Newsletter Signup Form */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="p-8 rounded-2xl border border-white/5 bg-zinc-950/40 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 blur-xl -z-10" />
        <div className="max-w-xl mx-auto text-center space-y-6">
          <div className="mx-auto w-12 h-12 rounded-xl bg-white/5 border border-white/5 text-zinc-300 flex items-center justify-center">
            <Inbox className="h-5 w-5" />
          </div>
          
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-white">Join the Newsletter</h3>
            <p className="text-xs font-light text-zinc-400 leading-relaxed max-w-sm mx-auto">
              Stay updated when I post new technical documentation, system reviews, and open source release notes.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              disabled={newsletterStatus === "success"}
              className="flex-grow px-4 py-2.5 rounded-xl border border-white/5 bg-black text-white text-xs placeholder-zinc-600 focus:outline-none focus:border-white/10 transition-colors"
            />
            <button
              type="submit"
              disabled={newsletterStatus === "success"}
              className="px-5 py-2.5 rounded-xl bg-white text-black font-semibold text-xs hover:bg-zinc-200 transition-colors disabled:bg-green-600 disabled:text-white clickable"
            >
              {newsletterStatus === "success" ? "Subscribed!" : "Subscribe"}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
