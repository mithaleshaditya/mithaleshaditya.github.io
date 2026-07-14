"use client";

import { motion } from "framer-motion";
import { Code, Layout, Server, Database, Wrench } from "lucide-react";
import { skillsData } from "@/config/portfolio";

export function Skills() {
  const categories = [
    { name: "Languages", icon: <Code className="h-4 w-4" /> },
    { name: "Frontend", icon: <Layout className="h-4 w-4" /> },
    { name: "Backend", icon: <Server className="h-4 w-4" /> },
    { name: "Database", icon: <Database className="h-4 w-4" /> },
    { name: "Tools", icon: <Wrench className="h-4 w-4" /> },
  ] as const;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  } as const;

  const cardVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  } as const;

  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/3 left-10 w-96 h-96 rounded-full bg-blue-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-xs font-mono tracking-widest text-zinc-500 uppercase mb-3">
            02. Capabilities
          </h2>
          <h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Core Toolkit
          </h3>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Category tabs/layout */}
          <div className="lg:col-span-12 space-y-12">
            {categories.map((category) => {
              const items = skillsData.filter((s) => s.category === category.name);
              
              return (
                <div key={category.name} className="space-y-5">
                  <div className="flex items-center gap-2.5 pb-2 border-b border-white/5">
                    <span className="text-zinc-500">{category.icon}</span>
                    <h4 className="text-sm font-mono tracking-wider font-semibold text-white uppercase">
                      {category.name}
                    </h4>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-zinc-400 font-mono">
                      {items.length} items
                    </span>
                  </div>

                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3"
                  >
                    {items.map((skill) => (
                      <motion.div
                        key={skill.name}
                        variants={cardVariants}
                        whileHover={{
                          scale: 1.03,
                          borderColor: "rgba(255, 255, 255, 0.15)",
                          backgroundColor: "rgba(255, 255, 255, 0.05)",
                          boxShadow: "0 0 20px rgba(59, 130, 246, 0.05)",
                        }}
                        className="px-4 py-3 rounded-lg border border-white/5 bg-zinc-950/40 text-center flex items-center justify-center transition-all duration-200 clickable"
                      >
                        <span className="text-sm font-light text-zinc-300 font-sans tracking-wide">
                          {skill.name}
                        </span>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
