import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LayoutWrapper } from "@/components/LayoutWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mythalesh Aditya | Full Stack Developer & AI Engineer",
  description: "Award-winning portfolio of Mythalesh Aditya. I engineer high-performance web applications and intelligent systems, focusing on storytelling, clean code, and premium user experiences.",
  keywords: ["Mythalesh Aditya", "Full Stack Developer", "AI Engineer", "React Native", "Next.js", "TypeScript", "FastAPI", "Portfolio"],
  authors: [{ name: "Mythalesh Aditya" }],
  openGraph: {
    title: "Mythalesh Aditya | Full Stack Developer & AI Engineer",
    description: "Award-winning portfolio of Mythalesh Aditya. I engineer high-performance web applications and intelligent systems.",
    url: "https://mythalesh.dev",
    siteName: "Mythalesh Aditya Portfolio",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Mythalesh Aditya",
    "url": "https://mythalesh.dev",
    "sameAs": [
      "https://github.com/mythless",
      "https://linkedin.com/in/mythalesh-aditya",
      "https://twitter.com/mythalesh",
      "https://instagram.com/mythalesh"
    ],
    "jobTitle": "Full Stack Developer & AI Engineer",
    "description": "I engineer high-performance web applications and intelligent systems, focusing on storytelling, clean code, and premium user experiences.",
    "knowsAbout": ["TypeScript", "Next.js", "React Native", "FastAPI", "PostgreSQL", "Machine Learning", "Geo-fencing"]
  };

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
      style={{ colorScheme: "dark" }}
    >
      <body className="min-h-full bg-black text-zinc-100 selection:bg-white/10 selection:text-white">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}

