import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import {
  Hero, JourneyTeaser, Capabilities, Industries, Assessment,
  ROITeaser, SaudiMarket, Insights, FinalCTA,
} from "@/components/site/sections";
import heroPortrait from "@/assets/hero-ai-portrait.webp";
import heroPortraitSm from "@/assets/hero-ai-portrait-sm.webp";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "You AI — نبني شركات تعمل بالذكاء الاصطناعي · Building AI-Powered Businesses" },
      { name: "description", content: "Enterprise AI transformation for Saudi Arabia, GCC and global businesses. Grow revenue, cut costs, and scale faster with AI-powered operations, sales and customer experience." },
      { property: "og:title", content: "You AI — Building AI-Powered Businesses" },
      { property: "og:description", content: "From automation and digital transformation to AI-powered growth, sales and customer service systems." },
      { property: "og:url", content: "/" },
    ],
    links: [
      { rel: "canonical", href: "/" },
      { rel: "preload", as: "image", href: heroPortraitSm, fetchpriority: "high", media: "(max-width: 1023px)" },
      { rel: "preload", as: "image", href: heroPortrait, fetchpriority: "high", media: "(min-width: 1024px)" },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <SiteLayout>
      <Hero />
      <Band tone="alt"><JourneyTeaser /></Band>
      <Band><Capabilities /></Band>
      <Band tone="alt"><Industries /></Band>
      <Band><Assessment /></Band>
      <Band tone="alt"><ROITeaser /></Band>
      <Band><WhyYouAI /></Band>
      <Band tone="alt"><Insights /></Band>
      <FinalCTA />
    </SiteLayout>
  );
}

/* Subtle rhythm: alternating background tone between sections */
function Band({ children, tone }: { children: React.ReactNode; tone?: "alt" }) {
  return (
    <div className={tone === "alt" ? "bg-secondary/40" : "bg-background"}>
      {children}
    </div>
  );
}
