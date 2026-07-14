"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      
      if (totalScroll > 0) {
        const progress = (window.scrollY / totalScroll) * 100;
        setScrollProgress(progress);
      }

      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // SVG calculations for circles
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 p-2 rounded-full border border-white/5 bg-zinc-950/80 backdrop-blur text-zinc-400 hover:text-white transition-colors duration-250 shadow-2xl flex items-center justify-center cursor-pointer clickable"
          aria-label="Scroll back to top"
        >
          {/* Progress circle */}
          <svg className="h-10 w-10 transform -rotate-90">
            <circle
              cx="20"
              cy="20"
              r={radius}
              className="stroke-zinc-800"
              strokeWidth="2"
              fill="transparent"
            />
            <circle
              cx="20"
              cy="20"
              r={radius}
              className="stroke-white transition-all duration-75"
              strokeWidth="2"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
            />
          </svg>
          
          <ArrowUp className="absolute h-4 w-4" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
