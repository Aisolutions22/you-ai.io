import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import {
  ArrowRight, Sparkles, TrendingUp, Cog, Heart, FileText, Lightbulb,
  Scale, Building2, Home, ShoppingBag, Stethoscope, PhoneCall, Users, PenTool, Store,
  Brain, Zap, DollarSign, ChevronRight, ChevronLeft, Calendar,
  FileSearch, BarChart3, Layers, Workflow, Plug, Maximize, Gauge,
  ShieldCheck, Globe2, Database, Rocket, AlertTriangle,
} from "lucide-react";
import { SiteLayout } from "@/components/site/Layout";
import { Section, SectionHeading, SectionEyebrow } from "@/components/site/Section";
import { LeadDialog } from "@/components/site/LeadDialog";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useT } from "@/lib/i18n";
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
      <Band tone="alt"><Journey /></Band>
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

const JOURNEY_ICONS = [FileSearch, BarChart3, Layers, Workflow, Plug, Maximize, Gauge];
const ENGINE_ICONS = [TrendingUp, Cog, Heart, FileText, Lightbulb];
const INDUSTRY_ICONS = [Scale, Building2, Home, ShoppingBag, Stethoscope, PhoneCall, Users, PenTool, Store];
const WHY_ICONS = [Globe2, ShieldCheck, Database, Brain, Rocket, Gauge];


/* ---------------- HERO ---------------- */
function Hero() {
  const t = useT();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const yPortrait = useTransform(scrollYProgress, [0, 1], [0, -60]);

  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const scrollBy = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.clientWidth * 0.8), behavior: "smooth" });
  };

  const industries = t.industries.items;
  const active = openIdx != null ? industries[openIdx] : null;
  const ActiveIcon = openIdx != null ? INDUSTRY_ICONS[openIdx] : null;

  return (
    <section ref={ref} className="relative isolate overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20 [mask-image:radial-gradient(ellipse_at_center,black_25%,transparent_75%)]" />

      <div className="relative mx-auto max-w-7xl px-6 pt-2 pb-6 sm:pt-4 sm:pb-10 lg:pt-6">
        <div className="grid items-center gap-4 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
          <div className="relative z-10">
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="flex justify-center lg:justify-start">
              <SectionEyebrow>{t.hero.eyebrow}</SectionEyebrow>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display mt-3 text-center text-[28px] leading-[1.05] tracking-tight text-balance sm:text-[36px] lg:text-start lg:text-[48px]">
              {t.hero.headlineEn1} <span className="text-gradient">{t.hero.headlineEnHi}</span> {t.hero.headlineEn2}
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.2 }}
              className="mx-auto mt-3 max-w-xl text-center text-sm text-muted-foreground sm:text-base lg:mx-0 lg:text-start">
              {t.hero.sub}
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.3 }}
              className="mt-4 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
              <LeadDialog variant="roadmap">
                <button type="button" className="group inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-medium text-primary-foreground shadow-glow transition-transform hover:scale-[1.02]">
                  {t.hero.cta1}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
                </button>
              </LeadDialog>
              <a href="#capabilities" className="group inline-flex items-center gap-2 rounded-full glass-strong px-6 py-3 text-sm font-medium hover:bg-white/10">
                {t.hero.cta2}
                <ChevronRight className="h-4 w-4 rtl:rotate-180 transition-transform group-hover:translate-x-0.5" />
              </a>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.42 }}
              className="mt-5 flex flex-wrap justify-center gap-2 lg:justify-start">
              {t.hero.outcomeBadges.map((b, i) => {
                const Icon = [TrendingUp, DollarSign, Zap][i] ?? Sparkles;
                return (
                  <span key={b} className="inline-flex items-center gap-2 rounded-full glass px-3 py-1.5 text-xs text-foreground/90">
                    <Icon className="h-3.5 w-3.5 text-electric" /> {b}
                  </span>
                );
              })}
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, delay: 0.2 }} style={{ y: yPortrait }}
            className="relative mx-auto h-[280px] w-full max-w-[320px] sm:h-[340px] sm:max-w-[380px] lg:h-[460px] lg:max-w-[420px]">
            <picture>
              <source srcSet={heroPortraitSm} media="(max-width: 1023px)" />
              <img src={heroPortrait} alt="AI-powered transformation" width={1024} height={1536} fetchPriority="high" decoding="async"
                className="relative h-full w-full object-contain object-center ltr:-scale-x-100" />
            </picture>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.55 }}
          className="mx-auto mt-8 grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-4">
          {t.hero.trust.map((s) => (
            <div key={s.v} className="glass rounded-2xl p-3 text-center">
              <div className="font-display text-xl text-gradient sm:text-2xl">{s.k}</div>
              <div className="mt-1 text-[11px] leading-tight text-muted-foreground">{s.v}</div>
            </div>
          ))}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.6 }} className="relative mt-10 sm:mt-14">
          <div className="mb-4 flex items-end justify-between gap-4">
            <div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground">{t.hero.industryStripTitle}</div>
              <div className="mt-1 max-w-xl text-sm text-foreground/80">{t.hero.industryStripSub}</div>
            </div>
            <div className="hidden gap-2 sm:flex">
              <button type="button" aria-label="scroll previous" onClick={() => scrollBy(-1)} className="grid h-10 w-10 place-items-center rounded-full glass-strong hover:bg-white/10">
                <ChevronLeft className="h-4 w-4 rtl:rotate-180" />
              </button>
              <button type="button" aria-label="scroll next" onClick={() => scrollBy(1)} className="grid h-10 w-10 place-items-center rounded-full glass-strong hover:bg-white/10">
                <ChevronRight className="h-4 w-4 rtl:rotate-180" />
              </button>
            </div>
          </div>

          <div ref={scrollerRef} className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 -mx-6 px-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {industries.map((s, idx) => {
              const SIcon = INDUSTRY_ICONS[idx];
              const isHover = hoverIdx === idx;
              return (
                <motion.button key={s.k} type="button"
                  onMouseEnter={() => setHoverIdx(idx)}
                  onMouseLeave={() => setHoverIdx((h) => (h === idx ? null : h))}
                  onFocus={() => setHoverIdx(idx)}
                  onBlur={() => setHoverIdx((h) => (h === idx ? null : h))}
                  onClick={() => setOpenIdx(idx)}
                  whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 300, damping: 22 }}
                  className="group relative w-[220px] shrink-0 snap-start overflow-hidden rounded-2xl glass-strong p-5 text-start shadow-card focus:outline-none focus:ring-2 focus:ring-electric/60"
                  aria-label={`${s.k} — ${t.hero.tapHint}`}>
                  <div className="absolute -top-16 -end-12 h-32 w-32 rounded-full bg-magenta/25 blur-2xl opacity-60 transition-opacity group-hover:opacity-100" />
                  <div className="relative">
                    <div className="grid h-11 w-11 place-items-center rounded-xl bg-brand/90 shadow-glow">
                      <SIcon className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <div className="mt-4 font-display text-lg leading-tight">{s.k}</div>
                    <div className="relative mt-2 h-[64px] overflow-hidden">
                      <AnimatePresence mode="wait" initial={false}>
                        {isHover ? (
                          <motion.div key="challenge" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.22 }} className="absolute inset-0">
                            <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-ember">
                              <AlertTriangle className="h-3 w-3" /> {t.industries.pillars.challenges}
                            </div>
                            <ul className="mt-1 space-y-0.5 text-xs text-foreground/90">
                              {s.challenges.slice(0, 2).map((c) => (<li key={c} className="truncate">· {c}</li>))}
                            </ul>
                          </motion.div>
                        ) : (
                          <motion.p key="short" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.22 }} className="absolute inset-0 text-xs leading-snug text-muted-foreground line-clamp-3">
                            {s.short}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                    <div className="mt-3 flex items-center justify-between text-[11px]">
                      <span className="text-electric/90">{t.hero.tapHint}</span>
                      <ArrowRight className="h-3.5 w-3.5 text-electric rtl:rotate-180 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      </div>

      <Dialog open={openIdx != null} onOpenChange={(o) => !o && setOpenIdx(null)}>
        <DialogContent className="max-w-3xl border-white/10 bg-background/95 p-0 backdrop-blur-xl">
          {active && ActiveIcon && (
            <div className="relative overflow-hidden rounded-lg">
              <div className="pointer-events-none absolute -top-24 -end-20 h-60 w-60 rounded-full bg-magenta/30 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-24 -start-20 h-60 w-60 rounded-full bg-electric/25 blur-3xl" />
              <div className="relative p-7 sm:p-9">
                <div className="flex items-center gap-3">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-brand shadow-glow">
                    <ActiveIcon className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <div>
                    <DialogTitle className="font-display text-2xl sm:text-3xl">{active.k}</DialogTitle>
                    <DialogDescription className="mt-1 text-sm text-muted-foreground">{active.short}</DialogDescription>
                  </div>
                </div>
                <div className="mt-7 grid gap-5 sm:grid-cols-3">
                  <PanelBlock title={t.industries.pillars.challenges} items={active.challenges} tone="ember" />
                  <PanelBlock title={t.industries.pillars.solutions} items={active.solutions} tone="electric" />
                  <PanelBlock title={t.industries.pillars.impact} items={active.impact} tone="magenta" />
                </div>
                <div className="mt-7 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-brand/10 p-5">
                  <div>
                    <div className="text-xs uppercase tracking-widest text-muted-foreground">{t.industries.pillars.expectedRoi}</div>
                    <div className="font-display text-2xl text-gradient sm:text-3xl">{active.roi}</div>
                  </div>
                  <LeadDialog variant="roadmap">
                    <button type="button" className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-glow">
                      {t.hero.panelCtaPrimary} <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                    </button>
                  </LeadDialog>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}

function PanelBlock({ title, items, tone }: { title: string; items: string[]; tone: "ember" | "electric" | "magenta" }) {
  const dotClass = tone === "ember" ? "bg-ember" : tone === "electric" ? "bg-electric" : "bg-magenta";
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
      <div className="text-[11px] uppercase tracking-widest text-muted-foreground">{title}</div>
      <ul className="mt-3 space-y-2">
        {items.map((x) => (
          <li key={x} className="flex items-start gap-2 text-sm">
            <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${dotClass}`} />
            <span>{x}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ---------------- TIGHT SECTION WRAPPER ---------------- */
const TIGHT = "!py-16 sm:!py-20";

function TeaserLinks({ links }: { links: { to: any; label: string }[] }) {
  return (
    <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
      {links.map((l, i) => (
        <Link key={l.label} to={l.to}
          className={`group inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-transform hover:scale-[1.02] ${
            i === 0 ? "bg-brand text-primary-foreground shadow-glow" : "glass-strong hover:bg-white/10"
          }`}>
          {l.label}
          <ArrowRight className="h-4 w-4 rtl:rotate-180 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
        </Link>
      ))}
    </div>
  );
}

/* ---------------- JOURNEY (compact teaser: 3/7) ---------------- */
function Journey() {
  const t = useT();
  const steps = t.journey.steps.slice(0, 3);
  return (
    <Section id="journey" className={TIGHT}>
      <SectionHeading
        eyebrow={t.journey.eyebrow}
        title={<>{t.journey.title1} <span className="text-gradient italic">{t.journey.titleHi}</span> {t.journey.title2}</>}
      />
      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        {steps.map((s, i) => {
          const Icon = JOURNEY_ICONS[i];
          return (
            <motion.div key={s.k} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="glass rounded-2xl p-5">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-brand shadow-glow">
                  <Icon className="h-4 w-4 text-primary-foreground" />
                </div>
                <div className="text-[11px] uppercase tracking-widest text-muted-foreground">{t.journey.stepLabel} 0{i + 1}</div>
              </div>
              <h3 className="font-display mt-3 text-xl leading-tight">{s.k}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground line-clamp-2">{s.desc}</p>
            </motion.div>
          );
        })}
      </div>
      <TeaserLinks links={[{ to: "/transformation-journey", label: t.common.exploreProgram }]} />
    </Section>
  );
}

/* ---------------- CAPABILITIES (merged Engines + Products) ---------------- */
function Capabilities() {
  const t = useT();
  const engines = t.engines.items.map((e, i) => ({ k: e.k, desc: e.tag ?? e.desc, Icon: ENGINE_ICONS[i] ?? Sparkles }));
  const products = t.products.items.slice(0, 3).map((p) => ({ k: p.k, desc: p.solution ?? p.problem, Icon: Sparkles }));
  const items = [...engines, ...products].slice(0, 6);
  return (
    <Section id="capabilities" className={TIGHT}>
      <SectionHeading
        eyebrow={t.engines.eyebrow}
        title={<>{t.engines.title1} <span className="text-gradient italic">{t.engines.titleHi}</span>{t.engines.title2}</>}
        description={t.engines.sub}
      />
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((it, i) => {
          const Icon = it.Icon;
          return (
            <motion.div key={it.k + i} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.04 }}
              className="glass rounded-2xl p-5 hover:-translate-y-0.5 transition-transform">
              <div className="flex items-start gap-3">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand shadow-glow">
                  <Icon className="h-4 w-4 text-primary-foreground" />
                </div>
                <div className="min-w-0">
                  <div className="font-display text-base leading-tight">{it.k}</div>
                  <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{it.desc}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
      <TeaserLinks
        links={[
          { to: "/business-engines", label: t.common.modelImpact },
          { to: "/ai-products", label: t.common.exploreProgram },
        ]}
      />
    </Section>
  );
}

/* ---------------- INDUSTRIES (single chip row) ---------------- */
function Industries() {
  const t = useT();
  return (
    <Section id="industries" className={TIGHT}>
      <SectionHeading
        eyebrow={t.industries.eyebrow}
        title={<>{t.industries.title1} <span className="text-gradient italic">{t.industries.titleHi}</span> {t.industries.title2}</>}
      />
      <div className="mt-10 flex flex-wrap justify-center gap-2.5">
        {t.industries.items.map((s, i) => {
          const Icon = INDUSTRY_ICONS[i];
          return (
            <Link
              key={s.k}
              to="/industries"
              className="group inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-sm hover:bg-white/10 transition-colors"
            >
              <Icon className="h-4 w-4 text-electric" />
              <span>{s.k}</span>
            </Link>
          );
        })}
      </div>
      <TeaserLinks links={[{ to: "/industries", label: t.common.exploreProgram }]} />
    </Section>
  );
}

/* ---------------- ASSESSMENT (CTA banner) ---------------- */
function Assessment() {
  const t = useT();
  return (
    <Section id="assessment" className={TIGHT}>
      <div className="glass-strong shadow-card relative overflow-hidden rounded-3xl p-8 sm:p-10">
        <div className="absolute -top-24 -start-16 h-60 w-60 rounded-full bg-magenta/25 blur-3xl" />
        <div className="absolute -bottom-24 -end-16 h-60 w-60 rounded-full bg-electric/20 blur-3xl" />
        <div className="relative grid items-center gap-6 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <SectionEyebrow>{t.assessment.eyebrow}</SectionEyebrow>
            <h2 className="font-display mt-4 text-3xl sm:text-4xl leading-tight">
              {t.assessment.title1} <span className="text-gradient italic">{t.assessment.titleHi}</span> {t.assessment.title2}
            </h2>
            <p className="mt-3 text-sm text-muted-foreground sm:text-base">{t.assessment.sub}</p>
          </div>
          <div className="flex flex-col items-start gap-4 lg:items-end">
            <div className="flex flex-wrap gap-2 lg:justify-end">
              {[t.assessment.labels.readiness, t.assessment.labels.growth, t.assessment.labels.automation, t.assessment.labels.savings].map((l) => (
                <span key={l} className="rounded-full glass px-3 py-1.5 text-xs">{l}</span>
              ))}
            </div>
            <Link to="/ai-assessment" className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-medium text-primary-foreground shadow-glow transition-transform hover:scale-[1.02]">
              <Brain className="h-4 w-4" /> {t.cta.bookExecutive}
              <ArrowRight className="h-4 w-4 rtl:rotate-180" />
            </Link>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ---------------- ROI (compact teaser) ---------------- */
function ROITeaser() {
  const t = useT();
  return (
    <Section id="roi" className={TIGHT}>
      <div className="grid items-center gap-6 lg:grid-cols-[1fr_1fr]">
        <div>
          <SectionEyebrow>{t.roi.eyebrow}</SectionEyebrow>
          <h2 className="font-display mt-4 text-3xl sm:text-4xl leading-tight">
            {t.roi.title1} <span className="text-gradient italic">{t.roi.titleHi}</span> {t.roi.title2}
          </h2>
          <p className="mt-3 text-sm text-muted-foreground sm:text-base">{t.roi.sub}</p>
          <Link to="/roi-calculator" className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-medium text-primary-foreground shadow-glow transition-transform hover:scale-[1.02]">
            <DollarSign className="h-4 w-4" /> {t.cta.customQuote}
            <ArrowRight className="h-4 w-4 rtl:rotate-180" />
          </Link>
        </div>
        <div className="glass-strong relative overflow-hidden rounded-3xl p-8 text-center shadow-card">
          <div className="absolute -top-20 -end-16 h-52 w-52 rounded-full bg-ember/25 blur-3xl" />
          <div className="relative">
            <div className="text-xs uppercase tracking-widest text-muted-foreground">{t.roi.labels.revenueUplift}</div>
            <div className="font-display mt-3 text-5xl sm:text-6xl text-gradient">+18%</div>
            <div className="mt-4 text-xs text-muted-foreground">{t.roi.labels.productivity} · {t.roi.labels.costSaved}</div>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ---------------- WHY YOU AI (merged Scenarios + WhySaudi) ---------------- */
function WhyYouAI() {
  const t = useT();
  const scenario = t.scenarios.items[0];
  const items = t.why.items.slice(0, 4);
  return (
    <Section id="why" className={TIGHT}>
      <SectionHeading
        eyebrow={t.why.eyebrow}
        title={<>{t.why.title1} <span className="text-gradient italic">{t.why.titleHi}</span>{t.why.title2}</>}
      />

      {/* Proof strip from Scenarios deltas */}
      <div className="mt-8 flex flex-wrap justify-center gap-2">
        {scenario.deltas.map((d) => (
          <span key={d} className="rounded-full bg-brand/15 border border-white/10 px-3 py-1.5 text-xs text-foreground/90">
            {d}
          </span>
        ))}
      </div>

      {/* Differentiator bullets */}
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((w, i) => {
          const Icon = WHY_ICONS[i] ?? ShieldCheck;
          return (
            <motion.div key={w.k} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.04 }}
              className="glass rounded-2xl p-5">
              <Icon className="h-5 w-5 text-electric" />
              <h3 className="font-display mt-3 text-lg leading-tight">{w.k}</h3>
              <p className="mt-1.5 text-xs text-muted-foreground line-clamp-3">{w.d}</p>
            </motion.div>
          );
        })}
      </div>

      <TeaserLinks links={[{ to: "/transformation-stories", label: t.common.exploreProgram }]} />
    </Section>
  );
}

/* ---------------- INSIGHTS (compact) ---------------- */
function Insights() {
  const t = useT();
  const items = t.insights.articles.slice(0, 3);
  return (
    <Section id="insights" className={TIGHT}>
      <SectionHeading
        eyebrow={t.insights.eyebrow}
        title={<>{t.insights.title1} <span className="text-gradient italic">{t.insights.titleHi}</span>{t.insights.title2}</>}
      />
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((a, i) => (
          <motion.article key={a.t} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.35, delay: i * 0.04 }}
            className="group glass rounded-2xl p-5 cursor-pointer hover:-translate-y-0.5 transition-transform">
            <div className="text-[11px] uppercase tracking-widest text-electric">{a.c}</div>
            <h3 className="font-display mt-2 text-lg leading-tight line-clamp-2">{a.t}</h3>
            <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
              <span>{a.r} {t.insights.minRead}</span>
              <span className="inline-flex items-center gap-1 text-foreground/80 group-hover:text-foreground">
                {t.insights.read} <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180" />
              </span>
            </div>
          </motion.article>
        ))}
      </div>
      <TeaserLinks links={[{ to: "/insights", label: t.common.exploreProgram }]} />
    </Section>
  );
}

/* ---------------- FINAL CTA ---------------- */
function FinalCTA() {
  const t = useT();
  return (
    <Section id="cta" className="!py-24">
      <div className="relative overflow-hidden rounded-[2rem] glass-strong shadow-glow p-10 sm:p-16 text-center">
        <div className="absolute -top-32 -start-20 h-72 w-72 rounded-full bg-magenta/40 blur-3xl animate-orb" />
        <div className="absolute -bottom-32 -end-10 h-80 w-80 rounded-full bg-electric/30 blur-3xl animate-orb" />
        <div className="relative">
          <SectionEyebrow>{t.finalCta.eyebrow}</SectionEyebrow>
          <h2 className="font-display mt-6 text-4xl sm:text-5xl lg:text-6xl leading-[1.02]">
            {t.finalCta.title1} <span className="text-gradient italic">{t.finalCta.titleHi}</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-muted-foreground">{t.finalCta.sub}</p>
          <LeadDialog variant="strategy">
            <button type="button" className="mt-10 inline-flex items-center gap-2 rounded-full bg-brand px-7 py-3.5 text-sm font-medium text-primary-foreground shadow-glow transition-transform hover:scale-[1.02]">
              <Calendar className="h-4 w-4" /> {t.finalCta.button}
            </button>
          </LeadDialog>
        </div>
      </div>
    </Section>
  );
}
