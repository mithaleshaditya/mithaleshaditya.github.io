"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, FileText, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { personalInfo } from "@/config/portfolio";

export function Hero() {
  const [titleIdx, setTitleIdx] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const typingSpeed = 100;
  const deletingSpeed = 50;
  const pauseDuration = 2000;

  useEffect(() => {
    const titles = personalInfo.titles;
    let timer: NodeJS.Timeout;

    const handleType = () => {
      const fullText = titles[titleIdx];
      
      if (!isDeleting) {
        // Typing
        setCurrentText(fullText.substring(0, currentText.length + 1));
        
        if (currentText === fullText) {
          // Pause at full text
          timer = setTimeout(() => setIsDeleting(true), pauseDuration);
          return;
        }
        
        timer = setTimeout(handleType, typingSpeed);
      } else {
        // Deleting
        setCurrentText(fullText.substring(0, currentText.length - 1));
        
        if (currentText === "") {
          setIsDeleting(false);
          setTitleIdx((prev) => (prev + 1) % titles.length);
          return;
        }
        
        timer = setTimeout(handleType, deletingSpeed);
      }
    };

    timer = setTimeout(handleType, isDeleting ? deletingSpeed : typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, titleIdx]);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-12 overflow-hidden"
    >
      {/* Background Radial Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-blue-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-purple-500/5 blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 w-full grid grid-cols-1 md:grid-cols-12 gap-12 items-center z-10">
        {/* Left Text Column */}
        <div className="md:col-span-7 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/5 bg-white/5 text-xs font-mono text-zinc-400 mb-6 w-fit"
          >
            <span className="h-2 w-2 rounded-full bg-green-500 animate-ping" />
            <span>Available for new opportunities</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-4"
          >
            {personalInfo.name}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="h-12 sm:h-16 flex items-center mb-6"
          >
            <p className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-zinc-400">
              I am a{" "}
              <span className="text-white border-r-2 border-white/80 animate-pulse pr-1">
                {currentText}
              </span>
            </p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-lg text-zinc-400 max-w-lg mb-10 leading-relaxed font-light"
          >
            {personalInfo.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap gap-4"
          >
            <Link
              href="#projects"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white text-black hover:bg-zinc-200 font-medium transition-all text-sm shadow-lg shadow-white/5 clickable"
            >
              <span>View Projects</span>
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white font-medium transition-all text-sm clickable"
            >
              <Mail className="h-4 w-4" />
              <span>Contact Me</span>
            </Link>

            <a
              href={personalInfo.resumeUrl}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-white/5 hover:border-white/10 text-zinc-400 hover:text-white transition-all text-sm clickable"
            >
              <FileText className="h-4 w-4" />
              <span>Resume</span>
            </a>
          </motion.div>
        </div>

        {/* Right Illustration Column */}
        <div className="md:col-span-5 hidden md:flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative w-full aspect-square max-w-[420px]"
          >
            {/* Ambient Backlight */}
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-purple-500/10 rounded-full blur-3xl -z-10" />
            
            {/* SVG Wireframe Illustration */}
            <svg
              viewBox="0 0 500 500"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full text-zinc-700 select-none drop-shadow-[0_0_30px_rgba(59,130,246,0.1)]"
            >
              {/* Grid Background */}
              <path d="M50 100 H450 M50 200 H450 M50 300 H450 M50 400 H450 M100 50 V450 M200 50 V450 M300 50 V450 M400 50 V450" stroke="rgba(255,255,255,0.015)" strokeWidth="1" />
              
              {/* Neural Net Nodes in Background */}
              <g opacity="0.4">
                <line x1="380" y1="120" x2="420" y2="180" stroke="rgba(59, 130, 246, 0.2)" strokeWidth="1" />
                <line x1="420" y1="180" x2="350" y2="240" stroke="rgba(59, 130, 246, 0.2)" strokeWidth="1" />
                <line x1="350" y1="240" x2="380" y2="120" stroke="rgba(139, 92, 246, 0.2)" strokeWidth="1" />
                
                <circle cx="380" cy="120" r="4" fill="#3b82f6" className="animate-pulse" />
                <circle cx="420" cy="180" r="3" fill="#8b5cf6" />
                <circle cx="350" cy="240" r="5" fill="#3b82f6" />
              </g>

              {/* Dev Desk Stand */}
              <rect x="180" y="380" width="140" height="20" rx="4" fill="rgba(255, 255, 255, 0.05)" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="1.5" />
              <path d="M220 350 L200 380 H300 L280 350 Z" fill="rgba(255, 255, 255, 0.02)" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="1.5" />

              {/* Monitor Wireframe */}
              <rect x="80" y="100" width="340" height="250" rx="16" fill="rgba(10, 10, 12, 0.8)" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="2" />
              {/* Monitor Inner Screen Glass */}
              <rect x="92" y="112" width="316" height="210" rx="8" fill="rgba(15, 23, 42, 0.3)" stroke="rgba(255, 255, 255, 0.04)" strokeWidth="1" />
              {/* Screen Base Glow */}
              <rect x="92" y="112" width="316" height="210" rx="8" fill="url(#screenGlow)" opacity="0.15" />

              {/* Floating Code Windows */}
              <g transform="translate(110, 130)" className="animate-float" style={{ animationDuration: '8s' }}>
                <rect width="180" height="110" rx="8" fill="rgba(9, 9, 11, 0.9)" stroke="rgba(59, 130, 246, 0.3)" strokeWidth="1" />
                {/* Window Controls */}
                <circle cx="12" cy="12" r="3" fill="#ef4444" />
                <circle cx="22" cy="12" r="3" fill="#f59e0b" />
                <circle cx="32" cy="12" r="3" fill="#10b981" />
                {/* Code lines */}
                <rect x="12" y="28" width="50" height="4" rx="2" fill="rgba(255, 255, 255, 0.4)" />
                <rect x="12" y="40" width="120" height="4" rx="2" fill="#3b82f6" opacity="0.8" />
                <rect x="24" y="52" width="80" height="4" rx="2" fill="rgba(255, 255, 255, 0.2)" />
                <rect x="24" y="64" width="100" height="4" rx="2" fill="#8b5cf6" opacity="0.8" />
                <rect x="36" y="76" width="60" height="4" rx="2" fill="rgba(255, 255, 255, 0.3)" />
                <rect x="12" y="88" width="40" height="4" rx="2" fill="#10b981" opacity="0.8" />
              </g>

              <g transform="translate(240, 200)" className="animate-float" style={{ animationDuration: '6s', animationDelay: '-2s' }}>
                <rect width="140" height="90" rx="8" fill="rgba(9, 9, 11, 0.95)" stroke="rgba(139, 92, 246, 0.3)" strokeWidth="1" />
                {/* Window Controls */}
                <circle cx="12" cy="12" r="2.5" fill="#ef4444" />
                <circle cx="20" cy="12" r="2.5" fill="#f59e0b" />
                <circle cx="28" cy="12" r="2.5" fill="#10b981" />
                {/* Visual Graph Wireframe */}
                <path d="M15 70 L40 50 L65 65 L95 40 L125 55" stroke="url(#graphGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="95" cy="40" r="3.5" fill="#8b5cf6" />
                <line x1="95" y1="40" x2="95" y2="75" stroke="rgba(255,255,255,0.1)" strokeDasharray="2 2" />
                <path d="M15 75 H125" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1" />
              </g>

              {/* Core Definitions */}
              <defs>
                <linearGradient id="screenGlow" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
                <linearGradient id="graphGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
