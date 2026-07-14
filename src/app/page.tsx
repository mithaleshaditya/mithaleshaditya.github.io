import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Projects } from "@/components/Projects";
import { Experience } from "@/components/Experience";
import { Skills } from "@/components/Skills";
import { Achievements } from "@/components/Achievements";
import { Contact } from "@/components/Contact";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* 01. Landing Hero (Large Name, Typist, SVG Desk) */}
      <Hero />

      {/* 02. About Me (Storytelling Narrative, Vertical Timeline) */}
      <About />

      {/* 03. Selected Work (Case Studies grid, Modal Details) */}
      <Projects />

      {/* 04. Experience (Hackathon, Freelance, OS Timeline) */}
      <Experience />

      {/* 05. Core Toolkit (Categorised skills dashboard) */}
      <Skills />

      {/* 06. Achievements (Placements and competitive highlights) */}
      <Achievements />

      {/* 07. Contact Form (Local validations, Send animations, Confetti) */}
      <Contact />
    </div>
  );
}
