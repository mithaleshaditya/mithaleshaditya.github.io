"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search, Hash, FileText, Sparkles, CornerDownLeft, Laptop } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useKeyPress } from "@/hooks/useKeyPress";
import { projectsData } from "@/config/portfolio";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

interface PaletteItem {
  id: string;
  title: string;
  subtitle: string;
  category: "Navigation" | "Projects" | "Blog Posts";
  action: () => void;
  icon: React.ReactNode;
}

export function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const itemsContainerRef = useRef<HTMLDivElement>(null);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery("");
      setActiveIndex(0);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Define search index items
  const staticItems: PaletteItem[] = [
    // Navigation
    {
      id: "nav-home",
      title: "Go to Home",
      subtitle: "Return to the main page",
      category: "Navigation",
      action: () => { router.push("/#home"); onClose(); },
      icon: <Hash className="h-4 w-4" />
    },
    {
      id: "nav-about",
      title: "Go to About Section",
      subtitle: "Read my storytelling background",
      category: "Navigation",
      action: () => { router.push("/#about"); onClose(); },
      icon: <Hash className="h-4 w-4" />
    },
    {
      id: "nav-projects",
      title: "Go to Projects Section",
      subtitle: "Browse featured engineering projects",
      category: "Navigation",
      action: () => { router.push("/#projects"); onClose(); },
      icon: <Hash className="h-4 w-4" />
    },
    {
      id: "nav-experience",
      title: "Go to Experience Section",
      subtitle: "Work history, freelance, hackathons",
      category: "Navigation",
      action: () => { router.push("/#experience"); onClose(); },
      icon: <Hash className="h-4 w-4" />
    },
    {
      id: "nav-skills",
      title: "Go to Skills Section",
      subtitle: "View the technical toolkit",
      category: "Navigation",
      action: () => { router.push("/#skills"); onClose(); },
      icon: <Hash className="h-4 w-4" />
    },
    {
      id: "nav-blog",
      title: "Go to Blog Home",
      subtitle: "Read technical articles & tutorials",
      category: "Navigation",
      action: () => { router.push("/blog"); onClose(); },
      icon: <FileText className="h-4 w-4" />
    },
    {
      id: "nav-contact",
      title: "Go to Contact Section",
      subtitle: "Get in touch for opportunities",
      category: "Navigation",
      action: () => { router.push("/#contact"); onClose(); },
      icon: <Hash className="h-4 w-4" />
    },
    
    // Dynamic project definitions from config
    ...projectsData.map((project) => ({
      id: `project-${project.slug}`,
      title: `Case Study: ${project.title}`,
      subtitle: project.subtitle,
      category: "Projects" as const,
      action: () => { router.push(`/projects/${project.slug}`); onClose(); },
      icon: <Laptop className="h-4 w-4 text-blue-400" />
    })),

    // Hardcoded Blog index items (can also be loaded dynamically on mount, but static works great for instant loading)
    {
      id: "blog-gps",
      title: "Mitigating GPS Drift in Location-Based Apps",
      subtitle: "Haversine math & location filtering",
      category: "Blog Posts",
      action: () => { router.push("/blog/understanding-gps-drift-and-haversine"); onClose(); },
      icon: <FileText className="h-4 w-4 text-purple-400" />
    },
    {
      id: "blog-parking",
      title: "Building Real-Time IoT Systems: Managing Concurrency",
      subtitle: "FastAPI, WebSockets, & Redis locks",
      category: "Blog Posts",
      action: () => { router.push("/blog/building-real-time-iot-parking"); onClose(); },
      icon: <FileText className="h-4 w-4 text-purple-400" />
    },
    {
      id: "blog-nextjs",
      title: "Next.js 15 Rendering Architectures: Lighthouse 100",
      subtitle: "RSC, splitting, CLS optimizations",
      category: "Blog Posts",
      action: () => { router.push("/blog/nextjs-15-performance-optimizations"); onClose(); },
      icon: <FileText className="h-4 w-4 text-purple-400" />
    }
  ];

  // Filter items based on input query
  const filteredItems = staticItems.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase()) ||
    item.subtitle.toLowerCase().includes(query.toLowerCase()) ||
    item.category.toLowerCase().includes(query.toLowerCase())
  );

  // Keyboard navigation listeners
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((prev) => (prev + 1) % filteredItems.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (filteredItems[activeIndex]) {
          filteredItems[activeIndex].action();
        }
      } else if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filteredItems, activeIndex, onClose]);

  // Adjust scroll when navigating via keyboard
  useEffect(() => {
    const activeItemEl = itemsContainerRef.current?.children[activeIndex] as HTMLElement;
    if (activeItemEl) {
      activeItemEl.scrollIntoView({ block: "nearest" });
    }
  }, [activeIndex]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 backdrop-blur-sm p-4 pt-[15vh]">
        {/* Backdrop overlay */}
        <div className="absolute inset-0" onClick={onClose} />

        {/* Palette Panel */}
        <motion.div
          initial={{ scale: 0.97, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.97, opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="relative w-full max-w-xl rounded-xl border border-white/10 bg-zinc-950 shadow-2xl overflow-hidden flex flex-col"
        >
          {/* Search Input Bar */}
          <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/5 bg-zinc-900/20">
            <Search className="h-4.5 w-4.5 text-zinc-500 shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setActiveIndex(0);
              }}
              placeholder="Search sections, projects, and articles..."
              className="w-full bg-transparent text-sm text-white placeholder-zinc-500 focus:outline-none"
            />
            <span className="text-[10px] font-mono border border-white/10 px-1.5 py-0.5 rounded bg-zinc-900 text-zinc-500">
              ESC
            </span>
          </div>

          {/* List items */}
          <div
            ref={itemsContainerRef}
            className="max-h-[350px] overflow-y-auto p-2 space-y-0.5"
          >
            {filteredItems.map((item, idx) => {
              const isActive = idx === activeIndex;
              return (
                <div
                  key={item.id}
                  onClick={item.action}
                  onMouseEnter={() => setActiveIndex(idx)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-lg cursor-pointer transition-colors duration-150 ${
                    isActive ? "bg-white/5" : "bg-transparent"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`text-zinc-500 ${isActive ? "text-white" : ""}`}>
                      {item.icon}
                    </span>
                    <div>
                      <h5 className={`text-xs font-semibold ${isActive ? "text-white" : "text-zinc-300"}`}>
                        {item.title}
                      </h5>
                      <p className="text-[10px] text-zinc-500 font-light mt-0.5 leading-normal">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[9px] font-mono text-zinc-600 bg-white/2 px-1.5 py-0.5 rounded uppercase">
                      {item.category}
                    </span>
                    {isActive && (
                      <CornerDownLeft className="h-3 w-3 text-zinc-500 font-bold" />
                    )}
                  </div>
                </div>
              );
            })}

            {filteredItems.length === 0 && (
              <div className="py-12 text-center text-xs text-zinc-500 font-mono">
                No matching results found.
              </div>
            )}
          </div>

          {/* Keyboard Help Footer */}
          <div className="flex items-center justify-between px-4 py-2 bg-zinc-950 border-t border-white/5 text-[10px] text-zinc-500 font-mono select-none">
            <div className="flex gap-4">
              <span>↑↓ Navigate</span>
              <span>↵ Enter to select</span>
            </div>
            <span>Mythalesh Aditya</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
