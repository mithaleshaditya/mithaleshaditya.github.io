"use client";

import { useState } from "react";
import Link from "next/link";
import { ExternalLink, X, CheckCircle2, Cpu, ArrowUpRight } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { projectsData, Project } from "@/config/portfolio";

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  const openModal = (project: Project) => {
    setSelectedProject(project);
    setActiveImageIdx(0);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setSelectedProject(null);
    document.body.style.overflow = "unset";
  };

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-blue-500/5 blur-[120px] pointer-events-none" />

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
              03. Selected Work
            </h2>
            <h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Case Studies
            </h3>
          </div>
          <span className="text-sm font-mono text-zinc-400">
            Click any card to read full documentation & architecture.
          </span>
        </motion.div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projectsData.map((project, idx) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              onClick={() => openModal(project)}
              className="group cursor-pointer rounded-2xl border border-white/5 bg-zinc-950/40 hover:bg-zinc-900/40 p-6 flex flex-col justify-between transition-all duration-300 relative overflow-hidden hover:border-white/10 clickable"
            >
              {/* Top Row with Featured Badge */}
              <div className="flex justify-between items-start mb-6">
                <span className="text-xs font-mono text-zinc-500">
                  {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}. CASE
                </span>
                {project.featured && (
                  <span className="text-[10px] font-mono tracking-wider font-semibold px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/20 text-blue-400 uppercase">
                    Featured Project
                  </span>
                )}
              </div>

              {/* Title & Description */}
              <div className="mb-8">
                <h4 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors flex items-center gap-2">
                  <span>{project.title}</span>
                  <ArrowUpRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </h4>
                <p className="text-sm font-light text-zinc-400 mt-3 leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Bottom Tags and CTA Links */}
              <div>
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.tags.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] font-mono px-2 py-0.5 rounded border border-white/5 bg-white/2 text-zinc-400"
                    >
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 4 && (
                    <span className="text-[11px] font-mono px-2 py-0.5 text-zinc-500">
                      +{project.tags.length - 4} more
                    </span>
                  )}
                </div>

                <div className="flex gap-4 items-center justify-between pt-4 border-t border-white/5">
                  <span className="text-xs font-mono text-blue-400 group-hover:underline">
                    Read documentation →
                  </span>
                  
                  {/* Action links */}
                  <div className="flex gap-2.5" onClick={(e) => e.stopPropagation()}>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg border border-white/5 hover:border-white/15 hover:bg-white/5 text-zinc-400 hover:text-white transition-all clickable"
                      aria-label="GitHub Repository"
                    >
                      <FaGithub className="h-4 w-4" />
                    </a>
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg border border-white/5 hover:border-white/15 hover:bg-white/5 text-zinc-400 hover:text-white transition-all clickable"
                      aria-label="Live Demo"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Case Study Full Modal Overlay */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 sm:p-6 overflow-y-auto"
          >
            {/* Modal Box */}
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative w-full max-w-5xl rounded-2xl border border-white/10 bg-zinc-950 p-6 sm:p-8 md:p-10 shadow-2xl max-h-[90vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-lg border border-white/5 hover:border-white/15 hover:bg-white/5 text-zinc-400 hover:text-white transition-colors clickable"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 pt-4">
                {/* Left Column: Heading and Media */}
                <div className="lg:col-span-6 space-y-6">
                  <div>
                    <span className="text-[10px] font-mono tracking-widest text-blue-400 uppercase">
                      Case Study
                    </span>
                    <h3 className="text-3xl font-extrabold tracking-tight text-white mt-1">
                      {selectedProject.title}
                    </h3>
                    <p className="text-sm font-mono text-zinc-400 mt-2">
                      {selectedProject.subtitle}
                    </p>
                  </div>

                  {/* SVG Gradient Banner (Since actual screenshots may be empty, we draw a premium placeholder gradient) */}
                  <div className="relative aspect-video rounded-xl overflow-hidden border border-white/5 bg-zinc-900 flex items-center justify-center">
                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/30 via-zinc-950 to-purple-900/30" />
                    <div className="z-10 text-center px-6">
                      <Cpu className="h-10 w-10 text-zinc-500 mx-auto mb-3 animate-pulse" />
                      <div className="font-mono text-xs text-zinc-500 uppercase tracking-widest">
                        {selectedProject.slug.replace("-", " ")}
                      </div>
                    </div>
                  </div>

                  {/* Tech stack badges */}
                  <div className="space-y-2">
                    <h5 className="text-xs font-mono text-zinc-500 uppercase tracking-wider">
                      Built With
                    </h5>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedProject.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs font-mono px-2.5 py-1 rounded bg-white/5 text-zinc-300 border border-white/5"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* CTAs */}
                  <div className="flex flex-wrap gap-3 pt-2">
                    <a
                      href={selectedProject.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-black hover:bg-zinc-200 font-medium transition-colors text-xs clickable"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      <span>Live Demo</span>
                    </a>
                    <a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white font-medium transition-colors text-xs clickable"
                    >
                      <FaGithub className="h-3.5 w-3.5" />
                      <span>GitHub</span>
                    </a>
                    
                    <Link
                      href={`/projects/${selectedProject.slug}`}
                      onClick={closeModal}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/5 hover:border-white/10 text-zinc-400 hover:text-white transition-colors text-xs clickable"
                    >
                      <span>View Dedicated Page →</span>
                    </Link>
                  </div>
                </div>

                {/* Right Column: Documentation Details */}
                <div className="lg:col-span-6 space-y-8">
                  {/* Executive Summary */}
                  <div>
                    <h4 className="text-sm font-mono tracking-wider font-semibold text-white uppercase border-b border-white/5 pb-2 mb-3">
                      Overview
                    </h4>
                    <p className="text-sm font-light text-zinc-400 leading-relaxed">
                      {selectedProject.longDescription}
                    </p>
                  </div>

                  {/* Architecture Breakdown */}
                  <div>
                    <h4 className="text-sm font-mono tracking-wider font-semibold text-white uppercase border-b border-white/5 pb-2 mb-3">
                      Architecture
                    </h4>
                    <ul className="text-xs font-mono space-y-2 text-zinc-400">
                      <li>
                        <strong className="text-white">Frontend:</strong> {selectedProject.architecture.frontend}
                      </li>
                      <li>
                        <strong className="text-white">Backend:</strong> {selectedProject.architecture.backend}
                      </li>
                      <li>
                        <strong className="text-white">Database:</strong> {selectedProject.architecture.database}
                      </li>
                      {selectedProject.architecture.other.length > 0 && (
                        <li>
                          <strong className="text-white">Infrastructure:</strong>{" "}
                          {selectedProject.architecture.other.join(", ")}
                        </li>
                      )}
                    </ul>
                  </div>

                  {/* Key Features */}
                  <div>
                    <h4 className="text-sm font-mono tracking-wider font-semibold text-white uppercase border-b border-white/5 pb-2 mb-3">
                      Key Features
                    </h4>
                    <ul className="space-y-2">
                      {selectedProject.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-sm font-light text-zinc-400">
                          <CheckCircle2 className="h-4.5 w-4.5 text-blue-500 shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Challenge & Learnings */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl border border-red-500/10 bg-red-950/5">
                      <h5 className="text-xs font-mono tracking-wider font-semibold text-red-400 uppercase mb-2">
                        The Challenge
                      </h5>
                      <p className="text-xs font-light text-zinc-400 leading-relaxed">
                        {selectedProject.challenges}
                      </p>
                    </div>

                    <div className="p-4 rounded-xl border border-green-500/10 bg-green-950/5">
                      <h5 className="text-xs font-mono tracking-wider font-semibold text-green-400 uppercase mb-2">
                        The Learning
                      </h5>
                      <p className="text-xs font-light text-zinc-400 leading-relaxed">
                        {selectedProject.learnings}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
