"use client";

import { motion } from "framer-motion";
import { BookOpen, Code2, BrainCircuit, HeartHandshake } from "lucide-react";
import { aboutData } from "@/config/portfolio";

export function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  } as const;

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  } as const;

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-1/4 right-0 w-80 h-80 rounded-full bg-purple-500/5 blur-[120px] pointer-events-none" />
      
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-xs font-mono tracking-widest text-zinc-500 uppercase mb-3">
            01. Background
          </h2>
          <h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            My Story
          </h3>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Story Column */}
          <div className="lg:col-span-7 space-y-8">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="space-y-6 text-zinc-400 font-light leading-relaxed text-base"
            >
              {aboutData.story.split("\n\n").map((para, idx) => (
                <motion.p key={idx} variants={itemVariants}>
                  {para}
                </motion.p>
              ))}
            </motion.div>

            {/* Quick Cards Grid */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4"
            >
              <motion.div
                variants={itemVariants}
                className="p-5 rounded-xl border border-white/5 bg-white/2 flex items-start gap-4 hover:border-white/10 transition-colors group"
              >
                <div className="p-2.5 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 group-hover:bg-blue-500/20 transition-colors">
                  <BrainCircuit className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white font-mono mb-1">AI Specialization</h4>
                  <p className="text-xs text-zinc-400 font-light">Deep diving into neural systems and algorithms.</p>
                </div>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="p-5 rounded-xl border border-white/5 bg-white/2 flex items-start gap-4 hover:border-white/10 transition-colors group"
              >
                <div className="p-2.5 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-400 group-hover:bg-purple-500/20 transition-colors">
                  <Code2 className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white font-mono mb-1">Full-Stack Core</h4>
                  <p className="text-xs text-zinc-400 font-light">Building robust Next.js and Node.js solutions.</p>
                </div>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="p-5 rounded-xl border border-white/5 bg-white/2 flex items-start gap-4 hover:border-white/10 transition-colors group"
              >
                <div className="p-2.5 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 group-hover:bg-green-500/20 transition-colors">
                  <HeartHandshake className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white font-mono mb-1">Problem Solver</h4>
                  <p className="text-xs text-zinc-400 font-light">Tackling mathematical models and database locks.</p>
                </div>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="p-5 rounded-xl border border-white/5 bg-white/2 flex items-start gap-4 hover:border-white/10 transition-colors group"
              >
                <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 group-hover:bg-amber-500/20 transition-colors">
                  <BookOpen className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white font-mono mb-1">Constant Learner</h4>
                  <p className="text-xs text-zinc-400 font-light">Adapting to modern tech patterns and APIs.</p>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Timeline & Avatar Column */}
          <div className="lg:col-span-5 space-y-12">
            {/* Visual Avatar Placeholder */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative w-full max-w-[280px] aspect-square mx-auto rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-zinc-900 to-black p-1 group clickable"
            >
              {/* Outer Orbiting ring glow */}
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 via-transparent to-purple-500/20 opacity-40 group-hover:scale-105 transition-transform duration-500" />
              
              <div className="w-full h-full rounded-[20px] bg-black flex flex-col items-center justify-center relative overflow-hidden">
                {/* SVG Abstract Portrait Representation */}
                <svg viewBox="0 0 100 100" fill="none" className="w-2/3 h-2/3 text-zinc-700">
                  {/* Outer circle orbits */}
                  <circle cx="50" cy="50" r="40" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                  <circle cx="50" cy="50" r="30" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" strokeDasharray="3 3" />
                  
                  {/* Floating abstract code nodes (AI) */}
                  <g className="animate-pulse">
                    <line x1="50" y1="35" x2="35" y2="60" stroke="rgba(59, 130, 246, 0.3)" strokeWidth="0.5" />
                    <line x1="50" y1="35" x2="65" y2="60" stroke="rgba(139, 92, 246, 0.3)" strokeWidth="0.5" />
                    <line x1="35" y1="60" x2="65" y2="60" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="0.5" />
                    
                    <circle cx="50" cy="35" r="4" fill="#3b82f6" />
                    <circle cx="35" cy="60" r="3.5" fill="#8b5cf6" />
                    <circle cx="65" cy="60" r="3" fill="#10b981" />
                  </g>
                  
                  {/* Center Node representing intelligence */}
                  <circle cx="50" cy="52" r="8" fill="url(#coreGlow)" className="animate-pulse" style={{ animationDuration: '3s' }} />
                  
                  <defs>
                    <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#ffffff" />
                      <stop offset="60%" stopColor="#3b82f6" />
                      <stop offset="100%" stopColor="#000000" stopOpacity="0" />
                    </radialGradient>
                  </defs>
                </svg>

                {/* Subtitle */}
                <div className="absolute bottom-6 text-center font-mono text-[10px] tracking-widest text-zinc-500 uppercase">
                  aditya.dev / init()
                </div>
              </div>
            </motion.div>

            {/* Timeline */}
            <div className="relative border-l border-white/5 pl-6 ml-4 space-y-8">
              {aboutData.timeline.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="relative"
                >
                  {/* Year marker */}
                  <span className="absolute -left-[31px] top-1 h-3 w-3 rounded-full border-2 border-zinc-800 bg-black group-hover:border-white transition-colors" />
                  
                  <div className="font-mono text-xs text-blue-500 font-semibold mb-1">
                    {item.year}
                  </div>
                  <h4 className="text-base font-bold text-white mb-2">
                    {item.title}
                  </h4>
                  <p className="text-xs text-zinc-400 font-light leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
