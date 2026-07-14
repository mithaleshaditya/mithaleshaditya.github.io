import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, CheckCircle, ShieldAlert, Sparkles, Server, Layout, Database } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { projectsData } from "@/config/portfolio";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projectsData.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projectsData.find((p) => p.slug === slug);
  if (!project) return {};

  return {
    title: `${project.title} | Mythalesh Aditya`,
    description: project.description,
    openGraph: {
      title: `${project.title} | Case Study`,
      description: project.description,
      type: "article",
    },
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = projectsData.find((p) => p.slug === slug);
  
  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-black text-zinc-100 py-32 px-6">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[400px] bg-gradient-to-b from-blue-500/5 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto space-y-12">
        {/* Back Link */}
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors group"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
          <span>Back to Home</span>
        </Link>

        {/* Hero Section */}
        <div className="space-y-4">
          <span className="text-xs font-mono tracking-widest text-blue-500 uppercase">
            Case Study & Documentation
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
            {project.title}
          </h1>
          <p className="text-xl text-zinc-400 font-light max-w-2xl leading-relaxed">
            {project.subtitle}
          </p>
        </div>

        {/* Top Links and Badges */}
        <div className="flex flex-wrap gap-4 pt-2 pb-6 border-b border-white/5 justify-between items-center">
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-mono px-3 py-1 rounded bg-zinc-900 border border-white/5 text-zinc-300"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex gap-3">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white transition-all text-sm font-medium"
            >
              <FaGithub className="h-4 w-4" />
              <span>Repository</span>
            </a>
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-black hover:bg-zinc-200 transition-all text-sm font-medium"
            >
              <ExternalLink className="h-4 w-4" />
              <span>Live Site</span>
            </a>
          </div>
        </div>

        {/* Technical Architecture Graphic Panel */}
        <div className="p-6 sm:p-8 rounded-2xl border border-white/5 bg-zinc-950/50 space-y-6">
          <h3 className="text-lg font-bold text-white flex items-center gap-2.5">
            <Sparkles className="h-5 w-5 text-blue-400" />
            <span>System Architecture Overview</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-mono text-zinc-400 font-bold uppercase">
                <Layout className="h-4 w-4 text-zinc-500" />
                <span>Client Engine</span>
              </div>
              <p className="text-xs font-light text-zinc-400 leading-relaxed">
                {project.architecture.frontend}
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-mono text-zinc-400 font-bold uppercase">
                <Server className="h-4 w-4 text-zinc-500" />
                <span>Backend Node</span>
              </div>
              <p className="text-xs font-light text-zinc-400 leading-relaxed">
                {project.architecture.backend}
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-mono text-zinc-400 font-bold uppercase">
                <Database className="h-4 w-4 text-zinc-500" />
                <span>Database Core</span>
              </div>
              <p className="text-xs font-light text-zinc-400 leading-relaxed">
                {project.architecture.database}
              </p>
            </div>
          </div>

          {project.architecture.other.length > 0 && (
            <div className="pt-4 border-t border-white/5 text-xs text-zinc-500">
              <strong className="text-zinc-400">Additional Protocols:</strong> {project.architecture.other.join(", ")}
            </div>
          )}
        </div>

        {/* Extended Description */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Project Narrative</h2>
          <p className="text-base text-zinc-300 font-light leading-relaxed">
            {project.longDescription}
          </p>
        </div>

        {/* Features Checklist */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Technical Implementations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {project.features.map((feature, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl border border-white/5 bg-zinc-950/30 flex items-start gap-3"
              >
                <CheckCircle className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
                <span className="text-sm font-light text-zinc-400 leading-relaxed">
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Challenge and Learnings Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          <div className="p-6 rounded-2xl border border-red-500/10 bg-red-950/5 space-y-3">
            <h3 className="text-sm font-mono font-bold tracking-wider text-red-400 uppercase flex items-center gap-2">
              <ShieldAlert className="h-4 w-4" />
              <span>Core Bottleneck</span>
            </h3>
            <p className="text-sm font-light text-zinc-400 leading-relaxed">
              {project.challenges}
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-green-500/10 bg-green-950/5 space-y-3">
            <h3 className="text-sm font-mono font-bold tracking-wider text-green-400 uppercase flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              <span>Engineering Resolution</span>
            </h3>
            <p className="text-sm font-light text-zinc-400 leading-relaxed">
              {project.learnings}
            </p>
          </div>
        </div>

        {/* Bottom CTA Panel */}
        <div className="pt-12 border-t border-white/5 text-center">
          <Link
            href="/#projects"
            className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-white text-black font-semibold hover:bg-zinc-200 transition-colors text-sm"
          >
            Return to Work Showcase
          </Link>
        </div>
      </div>
    </main>
  );
}
