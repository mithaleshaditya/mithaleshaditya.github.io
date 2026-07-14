"use client";

import { useEffect, useState } from "react";

export function ReadingProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const calculateProgress = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setProgress((window.scrollY / totalScroll) * 100);
      }
    };

    window.addEventListener("scroll", calculateProgress);
    calculateProgress(); // initial call
    return () => window.removeEventListener("scroll", calculateProgress);
  }, []);

  return (
    <div className="fixed top-[73px] left-0 right-0 h-[1.5px] bg-transparent z-40 pointer-events-none">
      <div
        className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-75 origin-left"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
