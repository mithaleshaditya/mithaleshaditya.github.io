import { NextResponse } from "next/server";
import { getAllBlogPosts, getBlogPostBySlug } from "@/lib/markdown";

export async function GET() {
  const postsMeta = getAllBlogPosts();
  const baseUrl = "https://mythalesh.dev";

  let rssItemsXml = "";

  // Compile XML nodes for each blog post
  for (const postMeta of postsMeta) {
    const postDetail = getBlogPostBySlug(postMeta.slug);
    if (!postDetail) continue;

    // Escaping XML characters
    const escapeXml = (unsafe: string) => {
      return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&apos;");
    };

    rssItemsXml += `
    <item>
      <title>${escapeXml(postMeta.title)}</title>
      <link>${baseUrl}/blog/${postMeta.slug}</link>
      <guid>${baseUrl}/blog/${postMeta.slug}</guid>
      <pubDate>${new Date(postMeta.date).toUTCString()}</pubDate>
      <description>${escapeXml(postMeta.description)}</description>
      <content:encoded><![CDATA[${postDetail.content}]]></content:encoded>
    </item>`;
  }

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" 
  xmlns:content="http://purl.org/rss/1.0/modules/content/"
  xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Mythalesh Aditya's Technical Journal</title>
    <link>${baseUrl}</link>
    <description>Deep dive articles, software guides, and system designs written by Mythalesh Aditya.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml" />
    ${rssItemsXml}
  </channel>
</rss>`;

  return new Response(sitemapXml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=1200, stale-while-revalidate=600",
    },
  });
}
