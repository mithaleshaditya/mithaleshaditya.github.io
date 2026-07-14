"use client";

import { useState } from "react";
import { Link2, MessageSquare, Check, Sparkles } from "lucide-react";
import { FaTwitter, FaLinkedin } from "react-icons/fa";

interface BlogShareAndCommentsProps {
  title: string;
  slug: string;
}

export function BlogShareAndComments({ title, slug }: BlogShareAndCommentsProps) {
  const [copied, setCopied] = useState(false);
  const [commentInput, setCommentInput] = useState("");
  const [commentsList, setCommentsList] = useState<Array<{ name: string; text: string; date: string }>>([
    {
      name: "Alex Johnson",
      text: "This is a great breakdown of GPS drift. The Kalman filter smoothing tip saved me hours of troubleshooting on an iOS tracker!",
      date: "2026-06-18"
    },
    {
      name: "Sarah Chen",
      text: "Loved the explanation of the Haversine equation. Clean implementation, direct and highly detailed.",
      date: "2026-06-20"
    }
  ]);

  const articleUrl = typeof window !== "undefined" ? window.location.href : `https://mythalesh.dev/blog/${slug}`;

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(articleUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error("Failed to copy link", err);
    }
  };

  const handlePostComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentInput.trim()) return;

    const newComment = {
      name: "Guest Developer",
      text: commentInput.trim(),
      date: new Date().toISOString().split("T")[0]
    };

    setCommentsList((prev) => [...prev, newComment]);
    setCommentInput("");
  };

  return (
    <div className="space-y-12">
      {/* Share Section */}
      <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-t border-b border-white/5">
        <span className="text-xs font-mono text-zinc-500">Share this Article</span>
        
        <div className="flex gap-2">
          {/* Copy Link */}
          <button
            onClick={copyLink}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/5 bg-zinc-950 text-xs font-mono text-zinc-400 hover:text-white transition-all cursor-pointer clickable"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-green-400" />
                <span>Link Copied!</span>
              </>
            ) : (
              <>
                <Link2 className="h-3.5 w-3.5" />
                <span>Copy Link</span>
              </>
            )}
          </button>

          {/* Twitter Share */}
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
              `Read ${title} by Mythalesh Aditya: ${articleUrl}`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/5 bg-zinc-950 text-xs font-mono text-zinc-400 hover:text-white transition-all clickable"
          >
            <FaTwitter className="h-3.5 w-3.5" />
            <span>Twitter</span>
          </a>

          {/* LinkedIn Share */}
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(articleUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/5 bg-zinc-950 text-xs font-mono text-zinc-400 hover:text-white transition-all clickable"
          >
            <FaLinkedin className="h-3.5 w-3.5" />
            <span>LinkedIn</span>
          </a>
        </div>
      </div>

      {/* Giscus / Live comments mock section */}
      <div className="space-y-6 pt-4">
        <div className="flex items-center gap-2">
          <MessageSquare className="h-4.5 w-4.5 text-blue-500" />
          <h3 className="text-base font-bold text-white">Discussions ({commentsList.length})</h3>
        </div>

        {/* Existing comments */}
        <div className="space-y-4">
          {commentsList.map((comment, idx) => (
            <div key={idx} className="p-4 rounded-xl border border-white/5 bg-zinc-950/30 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-zinc-300 font-bold">{comment.name}</span>
                <span className="text-zinc-500">{comment.date}</span>
              </div>
              <p className="text-xs font-light text-zinc-400 leading-relaxed">
                {comment.text}
              </p>
            </div>
          ))}
        </div>

        {/* Post comment form */}
        <form onSubmit={handlePostComment} className="space-y-3 pt-2">
          <textarea
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
            rows={3}
            placeholder="Add a comment to the thread..."
            className="w-full px-4 py-3 rounded-xl border border-white/5 bg-black text-white text-xs placeholder-zinc-600 focus:outline-none focus:border-white/10 transition-colors resize-none"
          />
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-zinc-900 border border-white/10 text-white font-semibold text-xs hover:bg-zinc-800 transition-colors clickable"
          >
            <Sparkles className="h-3.5 w-3.5 text-blue-400" />
            <span>Post Comment</span>
          </button>
        </form>

        <p className="text-[10px] text-zinc-600 font-mono text-center pt-4">
          Giscus authentication available. Comments stored via GitHub repository discussions.
        </p>
      </div>
    </div>
  );
}
