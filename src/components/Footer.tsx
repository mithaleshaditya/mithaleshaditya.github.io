import Link from "next/link";
import { personalInfo } from "@/config/portfolio";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 bg-black py-12 px-6 mt-auto">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left Side: Logo and Copyright */}
        <div className="flex flex-col items-center md:items-start gap-2">
          <Link href="/#home" className="group flex items-center gap-1.5">
            <span className="text-base font-bold tracking-tight text-white font-mono">
              M<span className="text-white/40 group-hover:text-white transition-colors">A</span>
            </span>
          </Link>
          <p className="text-[11px] text-zinc-500 font-mono">
            © {currentYear} {personalInfo.name}. All rights reserved.
          </p>
        </div>

        {/* Right Side: Built with note */}
        <div className="text-center md:text-right space-y-1">
          <p className="text-[11px] text-zinc-500 font-mono">
            Engineered with <span className="text-white">Next.js 15</span> & <span className="text-white">Tailwind v4</span>
          </p>
          <p className="text-[10px] text-zinc-600 font-mono">
            Deployable via Vercel Edge Networks.
          </p>
        </div>
      </div>
    </footer>
  );
}
