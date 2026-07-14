"use client";

import { useState, useRef } from "react";
import { Check, Copy } from "lucide-react";

interface CodeBlockProps {
  children: React.ReactNode;
}

export function CodeBlock({ children }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const preRef = useRef<HTMLPreElement | null>(null);

  const handleCopy = async () => {
    if (!preRef.current) return;
    
    // Extract the raw text from the children elements
    const codeText = preRef.current.innerText || "";
    
    try {
      await navigator.clipboard.writeText(codeText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code text", err);
    }
  };

  return (
    <div className="relative group/code">
      {/* Copy Button */}
      <button
        onClick={handleCopy}
        className="absolute right-3 top-3 p-1.5 rounded-lg border border-white/5 bg-zinc-900/80 text-zinc-400 hover:text-white hover:border-white/10 opacity-0 group-hover/code:opacity-100 transition-all duration-200 cursor-pointer clickable"
        aria-label="Copy code snippet"
      >
        {copied ? <Check className="h-3.5 w-3.5 text-green-400" /> : <Copy className="h-3.5 w-3.5" />}
      </button>

      <pre ref={preRef} className="overflow-x-auto">
        {children}
      </pre>
    </div>
  );
}
