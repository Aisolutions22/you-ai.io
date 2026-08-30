import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check, PlayCircle } from "lucide-react";
import { SiteLayout } from "@/components/site/Layout";
import { Section, SectionHeading } from "@/components/site/Section";
import { LeadDialog } from "@/components/site/LeadDialog";
import { useT } from "@/lib/i18n";

const IMAGE_PATHS: Record<string, string> = {
  Legal: "/assets/industries/legal.webp",
  "القانون": "/assets/industries/legal.webp",
  Construction: "/assets/industries/construction.webp",
  "المقاولات": "/assets/industries/construction.webp",
  "Real Estate": "/assets/industries/real-estate.webp",
  "العقار": "/assets/industries/real-estate.webp",
  "E-commerce": "/assets/industries/e-commerce.webp",
  "التجارة الإلكترونية": "/assets/industries/e-commerce.webp",
  Healthcare: "/assets/industries/healthcare.webp",
  "الرعاية الصحية": "/assets/industries/healthcare.webp",
  "Call Center": "/assets/industries/call-center.webp",
  "مراكز الاتصال": "/assets/industries/call-center.webp",
  Recruitment: "/assets/industries/recruitment.webp",
  "التوظيف": "/assets/industries/recruitment.webp",
  "Content Creators": "/assets/industries/content-creators.webp",
  "صنّاع المحتوى": "/assets/industries/content-creators.webp",
  SMEs: "/assets/industries/smes.webp",
  "المنشآت الصغيرة والمتوسطة": "/assets/industries/smes.webp",
  Restaurants: "/assets/industries/restaurants.webp",
  "المطاعم": "/assets/industries/restaurants.webp",
  "Digital Marketing": "/assets/industries/e-marketing.webp",
  "التسويق الإلكتروني": "/assets/industries/e-marketing.webp",
};

function slugify(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-+|-+$/g, "");
}

export const Route = createFileRoute("/industries")({
  head: () => ({
    meta: [
      { title: "Industries · القطاعات — You AI" },
      { name: "description", content: "Sector-specific AI transformation programs for Saudi businesses and growth-focused teams." },
      { property: "og:title", content: "Industries — You AI" },
      { property: "og:description", content: "Explore AI solutions designed around the challenges of each sector." },
      { property: "og:url", content: "/industries" },
    ],
    links: [{ rel: "canonical", href: "/industries" }],
  }),
  component: IndustriesPage,
});

function IndustriesPage() {
  const t = useT();

  useEffect(() => {
    const rawHash = window.location.hash.slice(1);
    if (!rawHash) return;

    const timer = window.setTimeout(() => {
      document.getElementById(decodeURIComponent(rawHash))?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 80);

    return () => window.clearTimeout(timer);
  }, []);

  return (
    <SiteLayout>
      <Section>
        <SectionHeading
          as="h1"
          eyebrow={t.industries.eyebrow}
          title={<>{t.industries.page.title1} <span className="text-gradient italic">{t.industries.page.titleHi}</span>{t.industries.page.title2}</>}
          description={t.industries.page.sub}
        />

        <div className="mt-14 space-y-7">
          {t.industries.items.map((item, index) => {
            const image = item.image || IMAGE_PATHS[item.k];
            const slug = slugify(item.k);

            return (
              <motion.article
                key={item.k}
                id={slug}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: (index % 2) * 0.06 }}
                className="scroll-mt-28 overflow-hidden rounded-[2rem] border border-border/70 bg-card shadow-card transition-all duration-300 hover:border-primary/60"
              >
                <div className="grid lg:grid-cols-[minmax(220px,0.72fr)_minmax(0,1.28fr)]">
                  <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-br from-primary/20 via-secondary to-background lg:aspect-auto lg:min-h-[360px]">
                    {image ? (
                      <img
                        src={image}
                        alt=""
                        loading={index < 2 ? "eager" : "lazy"}
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 hover:scale-[1.03]"
                        onError={(event) => {
                          event.currentTarget.style.display = "none";
                        }}
                      />
                    ) : null}
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/10 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-7">
                      <div className="mb-3 inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs backdrop-blur-sm">
                        {String(index + 1).padStart(2, "0")}
                      </div>
                      <h2 className="font-display text-2xl sm:text-3xl">{item.k}</h2>
                      <p className="mt-2 max-w-md text-sm leading-relaxed text-white/80">{item.short}</p>
                    </div>
                  </div>

                  <div className="p-6 sm:p-8 lg:p-10">
                    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                      <Pillar title={t.industries.pillars.challenges} items={item.challenges} />
                      <Pillar title={t.industries.pillars.solutions} items={item.solutions} accent />
                      <Pillar title={t.industries.pillars.impact} items={item.impact} />
                      <div className="rounded-2xl border border-border/70 bg-secondary/35 p-5 transition-all duration-300 hover:border-primary/40">
                        <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">{t.industries.pillars.expectedRoi}</p>
                        <p className="mt-4 font-display text-2xl text-gold">{item.roi}</p>
                        {item.videoUrl ? (
                          <a
                            href={item.videoUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-foreground"
                          >
                            <PlayCircle className="h-4 w-4" />
                            {t.common.learnMore}
                          </a>
                        ) : null}
                      </div>
                    </div>

                    <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-border/70 pt-6">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span className="grid h-8 w-8 place-items-center rounded-full bg-primary/10 text-primary">✓</span>
                        {t.common.explore}
                      </div>
                      <LeadDialog variant="roadmap">
                        <button type="button" className="group inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-glow transition-transform hover:-translate-y-0.5">
                          {t.common.exploreProgram}
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5" />
                        </button>
                      </LeadDialog>
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </Section>
    </SiteLayout>
  );
}

function Pillar({ title, items, accent = false }: { title: string; items: string[]; accent?: boolean }) {
  return (
    <div className="rounded-2xl border border-border/70 bg-secondary/20 p-5 transition-all duration-300 hover:border-primary/40">
      <p className={`text-xs font-medium uppercase tracking-[0.16em] ${accent ? "text-primary" : "text-muted-foreground"}`}>{title}</p>
      <ul className="mt-4 space-y-3">
        {items.map((value) => (
          <li key={value} className="flex items-start gap-2 text-sm leading-relaxed text-foreground/90">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <span>{value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
