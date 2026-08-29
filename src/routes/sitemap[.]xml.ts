import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

const BASE_URL = "https://you-ai-sa.lovable.app";

interface SitemapEntry {
  path: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

const entries: SitemapEntry[] = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/solutions/automation", changefreq: "monthly", priority: "0.9" },
  { path: "/solutions/chatbots", changefreq: "monthly", priority: "0.9" },
  { path: "/solutions/dashboards", changefreq: "monthly", priority: "0.9" },
  { path: "/solutions/vibe-coding", changefreq: "monthly", priority: "0.9" },
  { path: "/solutions/enterprise-transformation", changefreq: "monthly", priority: "0.9" },
  { path: "/industries", changefreq: "monthly", priority: "0.8" },
  { path: "/ai-products", changefreq: "monthly", priority: "0.8" },
  { path: "/business-engines", changefreq: "monthly", priority: "0.8" },
  { path: "/transformation-journey", changefreq: "monthly", priority: "0.8" },
  { path: "/transformation-stories", changefreq: "monthly", priority: "0.7" },
  { path: "/ai-assessment", changefreq: "monthly", priority: "0.8" },
  { path: "/roi-calculator", changefreq: "monthly", priority: "0.8" },
  { path: "/insights", changefreq: "weekly", priority: "0.7" },
  { path: "/about", changefreq: "yearly", priority: "0.6" },
  { path: "/contact", changefreq: "yearly", priority: "0.6" },
];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const urls = entries.map((e) =>
          [
            `  <url>`,
            `    <loc>${BASE_URL}${e.path}</loc>`,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            `  </url>`,
          ]
            .filter(Boolean)
            .join("\n"),
        );

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
