"use client";

import { motion } from "framer-motion";
import { Award, Target, Trophy } from "lucide-react";
import { achievementsData } from "@/config/portfolio";

export function Achievements() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  } as const;

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  } as const;

  const getBadgeIcon = (prize: string) => {
    if (prize.includes("🥈") || prize.includes("2nd")) {
      return <Trophy className="h-6 w-6 text-zinc-300" />;
    }
    if (prize.includes("🏆") || prize.includes("Top")) {
      return <Target className="h-6 w-6 text-red-400" />;
    }
    return <Award className="h-6 w-6 text-blue-400" />;
  };

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Glow background */}
      <div className="absolute top-1/2 left-10 w-72 h-72 rounded-full bg-purple-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-xs font-mono tracking-widest text-zinc-500 uppercase mb-3">
            05. Recognition
          </h2>
          <h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Achievements
          </h3>
        </motion.div>

        {/* Achievements Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {achievementsData.map((item) => (
            <motion.div
              key={item.title}
              variants={cardVariants}
              whileHover={{
                y: -5,
                borderColor: "rgba(255, 255, 255, 0.12)",
                backgroundColor: "rgba(255, 255, 255, 0.04)",
              }}
              className="p-6 rounded-2xl border border-white/5 bg-zinc-950/30 flex flex-col justify-between transition-all duration-300 relative overflow-hidden group clickable"
            >
              {/* Top Row with icon and prize */}
              <div className="flex justify-between items-start mb-8">
                <div className="p-3 rounded-xl bg-white/5 border border-white/5 text-zinc-300 group-hover:text-white transition-colors">
                  {getBadgeIcon(item.prize)}
                </div>
                <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-full bg-white/5 border border-white/5 text-zinc-400 group-hover:text-white transition-colors">
                  {item.date}
                </span>
              </div>

              {/* Title & Organization */}
              <div>
                <span className="text-[10px] font-mono tracking-wider font-semibold text-blue-400 uppercase">
                  {item.prize}
                </span>
                <h4 className="text-lg font-bold text-white mt-1 mb-2">
                  {item.title}
                </h4>
                <p className="text-xs font-mono text-zinc-500 mb-4">
                  {item.organization}
                </p>
                <p className="text-sm font-light text-zinc-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
