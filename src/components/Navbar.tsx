"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Command, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { personalInfo } from "@/config/portfolio";

interface NavbarProps {
  onSearchClick: () => void;
}

export function Navbar({ onSearchClick }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState("home");

  const navItems = [
    { name: "Home", href: "/#home", id: "home" },
    { name: "About", href: "/#about", id: "about" },
    { name: "Projects", href: "/#projects", id: "projects" },
    { name: "Experience", href: "/#experience", id: "experience" },
    { name: "Skills", href: "/#skills", id: "skills" },
    { name: "Blog", href: "/blog", id: "blog" },
    { name: "Contact", href: "/#contact", id: "contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      
      // Determine active section based on scroll position
      if (pathname === "/") {
        const sections = ["home", "about", "projects", "experience", "skills", "contact"];
        const current = sections.find((section) => {
          const el = document.getElementById(section);
          if (el) {
            const rect = el.getBoundingClientRect();
            // Section is active if it's near the top of the viewport
            return rect.top <= 120 && rect.bottom >= 120;
          }
          return false;
        });
        if (current) {
          setActiveSection(current);
        }
      } else {
        if (pathname.startsWith("/blog")) {
          setActiveSection("blog");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // initial call
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  const handleNavClick = (id: string) => {
    setIsOpen(false);
    setActiveSection(id);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-350 ${
        scrolled
          ? "border-b border-white/5 bg-black/70 backdrop-blur-md py-4"
          : "border-b border-transparent bg-transparent py-6"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/#home" className="group flex items-center gap-2">
          <span className="text-xl font-bold tracking-tight text-white font-mono">
            M<span className="text-white/50 group-hover:text-white transition-colors">A</span>
          </span>
          <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive =
              (item.id === "blog" && pathname.startsWith("/blog")) ||
              (pathname === "/" && activeSection === item.id);
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => handleNavClick(item.id)}
                className={`relative px-4 py-2 text-sm transition-colors rounded-full ${
                  isActive ? "text-white" : "text-zinc-400 hover:text-white"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeNav"
                    className="absolute inset-0 bg-white/5 border border-white/5 rounded-full -z-10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Search & Mobile Action */}
        <div className="flex items-center gap-4">
          {/* Command Palette Trigger Button */}
          <button
            onClick={onSearchClick}
            aria-label="Open search palette"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/5 bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-all text-xs font-mono clickable"
          >
            <Search className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Search</span>
            <span className="border border-white/10 px-1 py-0.5 rounded text-[10px] bg-black/30 text-zinc-500">
              Ctrl K
            </span>
          </button>

          {/* Hamburger Menu */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-colors clickable"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-b border-white/5 bg-black/95 backdrop-blur-lg"
          >
            <nav className="flex flex-col px-6 py-4 gap-2">
              {navItems.map((item) => {
                const isActive =
                  (item.id === "blog" && pathname.startsWith("/blog")) ||
                  (pathname === "/" && activeSection === item.id);
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => handleNavClick(item.id)}
                    className={`px-4 py-3 rounded-lg text-base transition-colors ${
                      isActive
                        ? "bg-white/5 text-white font-medium"
                        : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
