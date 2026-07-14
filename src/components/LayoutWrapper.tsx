"use client";

import { useState } from "react";
import { Background } from "@/components/Background";
import { CustomCursor } from "@/components/CustomCursor";
import { LoadingScreen } from "@/components/LoadingScreen";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CommandPalette } from "@/components/CommandPalette";
import { BackToTop } from "@/components/BackToTop";
import { useKeyPress } from "@/hooks/useKeyPress";

interface LayoutWrapperProps {
  children: React.ReactNode;
}

export function LayoutWrapper({ children }: LayoutWrapperProps) {
  const [searchOpen, setSearchOpen] = useState(false);

  // Bind global keyboard shortcut Ctrl+K / Cmd+K to launch the search palette
  useKeyPress("k", () => setSearchOpen(true), "ctrl");
  useKeyPress("k", () => setSearchOpen(true), "meta");

  return (
    <div className="min-h-screen flex flex-col relative select-none">
      {/* Noise overlay for organic texture */}
      <div className="noise-bg" />

      {/* Persistent Canvas Background */}
      <Background />

      {/* Entry Brand Loading Overlay */}
      <LoadingScreen />

      {/* Lag-free trail cursor glow */}
      <CustomCursor />

      {/* Frosted header */}
      <Navbar onSearchClick={() => setSearchOpen(true)} />

      {/* Dynamic route contents */}
      <div className="flex-grow">{children}</div>

      {/* Keyboard navigable Command Palette overlay */}
      <CommandPalette isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* Scroll depth back-to-top button */}
      <BackToTop />

      {/* Minimal responsive footer */}
      <Footer />
    </div>
  );
}
