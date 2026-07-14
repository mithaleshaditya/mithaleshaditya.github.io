import { MetadataRoute } from "next";
import { getBlogSlugs } from "@/lib/markdown";
import { projectsData } from "@/config/portfolio";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://mythalesh.dev";

  // Static core routes
  const routes = ["", "/blog"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  // Dynamic project subpages
  const projectRoutes = projectsData.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Dynamic blog post subpages
  const blogSlugs = getBlogSlugs();
  const blogRoutes = blogSlugs.map((slug) => {
    const cleanSlug = slug.replace(/\.mdx$|\.md$/, "");
    return {
      url: `${baseUrl}/blog/${cleanSlug}`,
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    };
  });

  return [...routes, ...projectRoutes, ...blogRoutes];
}
