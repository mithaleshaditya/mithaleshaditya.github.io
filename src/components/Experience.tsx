"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Briefcase, Trophy, Code, GraduationCap } from "lucide-react";
import { experienceData } from "@/config/portfolio";
import type { Experience as ExperienceType } from "@/config/portfolio";

export function Experience() {
  const [filter, setFilter] = useState<string>("All");

  const categories = ["All", "Work", "Freelance", "Hackathon", "Open Source", "College Project"];

  const filteredData = filter === "All"
    ? experienceData
    : experienceData.filter((item) => item.type === filter);

  const getIcon = (type: ExperienceType["type"]) => {
    switch (type) {
      case "Work":
      case "Freelance":
        return <Briefcase className="h-4.5 w-4.5 text-zinc-400" />;
      case "Hackathon":
        return <Trophy className="h-4.5 w-4.5 text-yellow-500" />;
      case "Open Source":
        return <Code className="h-4.5 w-4.5 text-green-400" />;
      case "College Project":
        return <GraduationCap className="h-4.5 w-4.5 text-blue-400" />;
    }
  };

  return (
    <section id="experience" className="py-24 relative overflow-hidden">
      {/* Glow background */}
      <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-blue-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <h2 className="text-xs font-mono tracking-widest text-zinc-500 uppercase mb-3">
              04. Journey
            </h2>
            <h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Experience
            </h3>
          </div>

          {/* Filtering buttons */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-3 py-1.5 rounded-lg border text-xs font-mono transition-all clickable ${
                  filter === cat
                    ? "bg-white text-black border-white"
                    : "bg-white/2 text-zinc-400 border-white/5 hover:border-white/10 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Timeline Grid */}
        <div className="relative border-l border-white/5 pl-8 ml-4 max-w-4xl space-y-12">
          {filteredData.map((item, idx) => (
            <motion.div
              key={item.role + item.company}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="relative group"
            >
              {/* Connected node */}
              <span className="absolute -left-[43px] top-1.5 h-6 w-6 rounded-full border border-white/10 bg-zinc-950 flex items-center justify-center group-hover:border-blue-500/50 transition-colors">
                {getIcon(item.type)}
              </span>

              {/* Header Info */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                <div>
                  <h4 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                    {item.role}
                  </h4>
                  <p className="text-sm font-mono text-zinc-400 mt-1">
                    {item.company} <span className="text-zinc-600">•</span> {item.location}
                  </p>
                </div>
                <span className="text-xs font-mono bg-white/5 border border-white/5 px-3 py-1 rounded-full text-zinc-400 shrink-0 w-fit h-fit">
                  {item.period}
                </span>
              </div>

              {/* Bullet details */}
              <ul className="space-y-2 mb-6">
                {item.description.map((bullet, i) => (
                  <li key={i} className="text-sm font-light text-zinc-400 leading-relaxed list-disc list-inside">
                    {bullet}
                  </li>
                ))}
              </ul>

              {/* Skill tags in Experience */}
              <div className="flex flex-wrap gap-1.5">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-mono px-2 py-0.5 rounded border border-white/5 bg-zinc-900/60 text-zinc-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}

          {filteredData.length === 0 && (
            <div className="text-zinc-500 py-12 font-mono text-sm">
              No entries found in this category.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
