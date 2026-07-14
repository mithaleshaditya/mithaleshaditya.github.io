import Link from "next/link";
import { Terminal, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-black flex flex-col items-center justify-center p-6 text-center select-none relative">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-blue-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-md w-full space-y-6 z-10">
        {/* Terminal Glitch Icon */}
        <div className="mx-auto w-16 h-16 rounded-2xl border border-white/5 bg-zinc-950 flex items-center justify-center text-zinc-500 animate-pulse">
          <Terminal className="h-6 w-6" />
        </div>

        {/* Text descriptions */}
        <div className="space-y-2">
          <h1 className="text-6xl font-bold tracking-tight text-white font-mono">
            404
          </h1>
          <h2 className="text-sm font-mono text-blue-500 uppercase tracking-widest">
            Routing Error: Page Not Found
          </h2>
          <p className="text-xs font-light text-zinc-500 max-w-xs mx-auto leading-relaxed pt-2">
            The resource you requested could not be resolved in the directory. It might have been deleted, moved, or never existed.
          </p>
        </div>

        {/* Simulated terminal snippet */}
        <div className="p-4 rounded-xl border border-white/5 bg-zinc-950/80 font-mono text-left text-xs text-zinc-500 space-y-1">
          <p className="text-zinc-600">$ curl -I https://mythalesh.dev/missing-page</p>
          <p className="text-red-400">HTTP/1.1 404 Not Found</p>
          <p>Content-Type: text/html; charset=utf-8</p>
          <p>Cache-Control: no-cache, no-store, must-revalidate</p>
        </div>

        {/* Return Button */}
        <div className="pt-4">
          <Link
            href="/#home"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-black font-semibold text-xs hover:bg-zinc-200 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Return to Workspace</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
