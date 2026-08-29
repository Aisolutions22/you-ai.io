import { motion, AnimatePresence } from "framer-motion";
import { useMemo, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  ChevronRight, ChevronLeft, ArrowRight, DollarSign, Calendar, Brain,
  FileSearch, BarChart3, Layers, Workflow, Plug, Maximize, Gauge,
  Sparkles, TrendingUp, Zap, MessageCircle, Globe, Users, Database, AlertTriangle,
  Cog, Heart, FileText, Lightbulb, ShieldCheck, Globe2, Rocket,
  Stethoscope, ShoppingBag, Home, Factory, Landmark, Hotel, Check,
  Scale, Building2, PhoneCall, PenTool, Store,
} from "lucide-react";
import { Section, SectionHeading, SectionEyebrow } from "@/components/site/Section";
import { LeadDialog } from "@/components/site/LeadDialog";
import { WhatsAppCTA } from "@/components/site/WhatsAppConfirmDialog";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { type WAPayload } from "@/lib/whatsapp";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { useT } from "@/lib/i18n";
import heroPortrait from "@/assets/hero-ai-robot.webp";
import heroPortraitSm from "@/assets/hero-ai-robot-sm.webp";
import saudiMarketVisual from "@/assets/saudi-market-vision-2030.jpg";

export const JOURNEY_ICONS = [FileSearch, BarChart3, Layers, Workflow, Plug, Maximize, Gauge];
const ENGINE_ICONS = [TrendingUp, Cog, Heart, FileText, Lightbulb];
const INDUSTRY_ICONS = [Scale, Building2, Home, ShoppingBag, Stethoscope, PhoneCall, Users, PenTool, Store];

/* ==================================================================
   HOME PAGE SECTIONS (used only by src/routes/index.tsx)
   ================================================================== */

/* Six flagship sectors — shared by the homepage Industries section and /industries page */
export const INDUSTRY_CARDS = [
  {
    icon: Stethoscope,
    name: "الرعاية الصحية",
    desc: "حلول ذكية للعيادات والمستشفيات لتحسين تجربة المريض وإدارة المواعيد والبيانات الطبية.",
    points: [
      "مساعد ذكي لحجز المواعيد والرد على الاستفسارات",
      "أتمتة السجلات والتقارير الطبية",
      "تحليل البيانات لتحسين جودة الرعاية",
    ],
  },
  {
    icon: ShoppingBag,
    name: "التجزئة والتجارة",
    desc: "أتمتة المبيعات وخدمة العملاء وإدارة المخزون لزيادة المبيعات وتحسين تجربة التسوق.",
    points: [
      "مساعد مبيعات ذكي على واتساب والمتاجر",
      "توقع الطلب وإدارة المخزون بذكاء",
      "تحليل سلوك العملاء وزيادة الولاء",
    ],
  },
  {
    icon: Home,
    name: "العقارات",
    desc: "حلول ذكية لإدارة العملاء (Leads) والمشاريع وتحسين العمليات العقارية.",
    points: [
      "مساعد ذكاء اصطناعي لإدارة العملاء والاهتمام",
      "أتمتة المتابعات والعروض العقارية",
      "تحليل أداء المشاريع واتخاذ قرارات أدق",
    ],
  },
  {
    icon: Factory,
    name: "التصنيع",
    desc: "تحسين العمليات الإنتاجية وسلاسل الإمداد والصيانة التنبؤية لرفع الكفاءة وتقليل التوقف.",
    points: [
      "صيانة تنبؤية باستخدام الذكاء الاصطناعي",
      "أتمتة خطوط الإنتاج ومراقبة الجودة",
      "تحسين سلاسل الإمداد وتقليل الهدر",
    ],
  },
  {
    icon: Landmark,
    name: "الخدمات المالية",
    desc: "أتمتة العمليات المالية وتحليل المخاطر والكشف عن الاحتيال وتقديم تجربة عملاء متميزة.",
    points: [
      "كشف الاحتيال وتحليل المخاطر بذكاء",
      "أتمتة معالجة الطلبات والموافقات",
      "تقارير وتحليلات مالية ذكية وفورية",
    ],
  },
  {
    icon: Hotel,
    name: "الضيافة والسياحة",
    desc: "تحسين تجربة الضيوف وإدارة الحجوزات والعمليات التشغيلية بكفاءة عالية.",
    points: [
      "مساعد ضيوف ذكي على مدار الساعة",
      "أتمتة الحجوزات والدفع والتأكيدات",
      "تحليل تقييمات الضيوف ورفع مستوى الخدمة",
    ],
  },
];

/* Detailed sector card grid — flat cards, 1px border, no glow/blur */
export function IndustryCards() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {INDUSTRY_CARDS.map((s, i) => {
        const Icon = s.icon;
        return (
          <motion.div
            key={s.name}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45, delay: (i % 3) * 0.08 }}
            className="flex flex-col rounded-3xl border border-border bg-card p-6 shadow-card sm:p-7"
          >
            <div className="flex items-center gap-3">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-primary/10">
                <Icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-display text-xl leading-tight">{s.name}</h3>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
            <ul className="mt-4 space-y-2 border-t border-border pt-4">
              {s.points.map((p) => (
                <li key={p} className="flex items-start gap-2 text-sm text-foreground/90">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span className="leading-snug">{p}</span>
                </li>
              ))}
            </ul>
            <Link
              to="/industries"
              className="group mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-medium text-primary hover:text-foreground transition-colors"
            >
              اكتشف الحلول
              <ArrowRight className="h-4 w-4 rtl:rotate-180 transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
}
export function Hero() {
  const t = useT();
  const ref = useRef<HTMLDivElement>(null);

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
      {/* Calm light background — very soft emerald tint in the top corner, no glows */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,color-mix(in_srgb,var(--primary)_6%,var(--background))_0%,var(--background)_60%)]" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_50%_0%,color-mix(in_srgb,var(--primary)_9%,transparent),transparent_70%)]" />
      {/* Mobile: portrait as extended section backdrop behind all hero content */}
      <img
        aria-hidden="true"
        src={heroPortraitSm}
        alt=""
        loading="eager"
        decoding="async"
        fetchPriority="high"
        className="pointer-events-none absolute inset-x-0 top-0 h-full w-full object-cover object-top opacity-20 lg:hidden"
        style={{
          maskImage: "linear-gradient(180deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.55) 40%, transparent 85%)",
          WebkitMaskImage: "linear-gradient(180deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.55) 40%, transparent 85%)",
        }}
      />

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

          {/* Desktop visual: original full-color portrait with connected capability chips */}
          <div className="relative hidden lg:block">
            <div className="relative mx-auto w-full max-w-md">
              {/* Dotted connector lines (primary color) from portrait center to each chip */}
              <svg aria-hidden="true" viewBox="0 0 400 480" className="pointer-events-none absolute -inset-x-12 -inset-y-8 h-[calc(100%+4rem)] w-[calc(100%+6rem)] overflow-visible">
                <line x1="200" y1="240" x2="60" y2="60" stroke="var(--primary)" strokeWidth="1.5" strokeDasharray="4 6" opacity="0.55" />
                <line x1="200" y1="240" x2="340" y2="60" stroke="var(--primary)" strokeWidth="1.5" strokeDasharray="4 6" opacity="0.55" />
                <line x1="200" y1="240" x2="40" y2="240" stroke="var(--primary)" strokeWidth="1.5" strokeDasharray="4 6" opacity="0.55" />
                <line x1="200" y1="240" x2="360" y2="240" stroke="var(--primary)" strokeWidth="1.5" strokeDasharray="4 6" opacity="0.55" />
                <line x1="200" y1="240" x2="200" y2="460" stroke="var(--primary)" strokeWidth="1.5" strokeDasharray="4 6" opacity="0.55" />
              </svg>

              {/* Soft teal glow behind the image */}
              <div aria-hidden="true" className="absolute -inset-8 rounded-full bg-[radial-gradient(closest-side,color-mix(in_srgb,var(--primary)_30%,transparent),transparent)] blur-2xl" />

              <motion.img
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.15 }}
                src={heroPortrait}
                alt={t.hero.headlineEn1}
                loading="eager"
                decoding="async"
                fetchPriority="high"
                className="relative z-10 w-full object-cover"
                style={{
                  maskImage: "radial-gradient(ellipse 78% 82% at 50% 46%, black 55%, transparent 82%)",
                  WebkitMaskImage: "radial-gradient(ellipse 78% 82% at 50% 46%, black 55%, transparent 82%)",
                }}
              />

              {/* Floating capability chips */}
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.5 }}
                className="absolute -top-4 left-0 z-20 flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2 shadow-card">
                <MessageCircle className="h-4 w-4 text-primary" />
                <span className="text-xs font-medium">واتساب</span>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.6 }}
                className="absolute -top-4 right-0 z-20 flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2 shadow-card">
                <Globe className="h-4 w-4 text-primary" />
                <span className="text-xs font-medium">موقع ويب</span>
              </motion.div>
              <motion.div initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.7 }}
                className="absolute -left-12 top-1/2 z-20 flex -translate-y-1/2 items-center gap-2 rounded-xl border border-border bg-card px-3 py-2 shadow-card">
                <Users className="h-4 w-4 text-primary" />
                <span className="text-xs font-medium">CRM</span>
              </motion.div>
              <motion.div initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.8 }}
                className="absolute -right-12 top-1/2 z-20 flex -translate-y-1/2 items-center gap-2 rounded-xl border border-border bg-card px-3 py-2 shadow-card">
                <Database className="h-4 w-4 text-primary" />
                <span className="text-xs font-medium">قاعدة بيانات</span>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.9 }}
                className="absolute -bottom-4 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 rounded-xl border border-border bg-card px-3 py-2 shadow-card">
                <BarChart3 className="h-4 w-4 text-primary" />
                <span className="text-xs font-medium">تحليلات</span>
              </motion.div>
            </div>
          </div>
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

        {/* Trusted-by strip (placeholder logos — to be replaced with real clients) */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.65 }}
          className="mx-auto mt-8 max-w-4xl text-center">
          <div className="text-xs text-muted-foreground">يثق بنا أصحاب الأعمال لبناء أنظمتهم الذكية</div>
          <div className="mt-3 flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
            {["Nova Tech", "Falcon Group", "Zenith Retail", "Orbit Finance", "Vertex Care"].map((name) => (
              <span key={name} dir="ltr" className="font-display text-sm tracking-wide text-muted-foreground/70">{name}</span>
            ))}
          </div>
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
export function JourneyTeaser() {
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
export function Capabilities() {
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
export function Industries() {
  const t = useT();
  return (
    <Section id="industries" className={TIGHT}>
      <SectionHeading
        eyebrow={t.industries.eyebrow}
        title={<>{t.industries.title1} <span className="text-gradient italic">{t.industries.titleHi}</span> {t.industries.title2}</>}
        description="نفهم تحديات كل قطاع ونبني حلول ذكاء اصطناعي وأتمتة تعزز الكفاءة، تخفض التكاليف، وتحقق نتائج ملموسة."
      />
      <div className="mt-10">
        <IndustryCards />
      </div>
      <TeaserLinks links={[{ to: "/industries", label: t.common.exploreProgram }]} />
    </Section>
  );
}
/* ---------------- ASSESSMENT (CTA banner) ---------------- */
export function Assessment() {
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
export function ROITeaser() {
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
/* ---------------- SAUDI MARKET / VISION 2030 ---------------- */
export function SaudiMarket() {
  const t = useT();
  return (
    <Section id="saudi-market" className={TIGHT}>
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
        {/* Text content */}
        <div className="order-1">
          <SectionEyebrow>{t.saudiMarket.eyebrow}</SectionEyebrow>
          <h2 className="font-display mt-4 text-3xl leading-[1.1] sm:text-4xl lg:text-5xl">
            {t.saudiMarket.title1}{" "}
            <span className="text-gradient">{t.saudiMarket.titleHi}</span>
            {t.saudiMarket.title2}
          </h2>
          <p className="mt-5 max-w-xl text-base text-muted-foreground sm:text-lg">
            {t.saudiMarket.sub}
          </p>

          <ul className="mt-8 space-y-4">
            {t.saudiMarket.bullets.map((b) => (
              <li key={b.k} className="flex items-start gap-3">
                <span className="mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Check className="h-3 w-3" />
                </span>
                <div>
                  <span className="font-medium text-foreground">{b.k}</span>
                  <p className="text-sm text-muted-foreground">{b.d}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <Link
              to="/industries"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              {t.saudiMarket.cta}
              <ArrowRight className="h-4 w-4 rtl:rotate-180" />
            </Link>
          </div>
        </div>

        {/* Image — exact uploaded asset, no filters */}
        <div className="order-2">
          <div className="relative overflow-hidden rounded-2xl border border-border bg-secondary/30 shadow-card">
            <img
              src={saudiMarketVisual}
              alt="Saudi Vision 2030 AI solutions"
              width={1536}
              height={1024}
              loading="lazy"
              decoding="async"
              className="h-auto w-full object-contain"
            />
          </div>
        </div>
      </div>
    </Section>
  );
}
/* ---------------- INSIGHTS (compact) ---------------- */
export function Insights() {
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
export function FinalCTA() {
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

/* ==================================================================
   FULL-PAGE SECTIONS (used by /transformation-journey, /roi-calculator, /transformation-stories)
   ================================================================== */

/* ---------------- JOURNEY (full) ---------------- */
export function Journey() {
  const t = useT();
  const [active, setActive] = useState(0);
  const A = t.journey.steps[active];
  const Icon = JOURNEY_ICONS[active];
  return (
    <Section id="journey">
      <SectionHeading
        as="h1"
        eyebrow={t.journey.eyebrow}
        title={<>{t.journey.title1} <span className="text-gradient italic">{t.journey.titleHi}</span> {t.journey.title2}</>}
        description={t.journey.sub}
      />
      <div className="mt-14 grid gap-8 lg:grid-cols-[1fr_1.1fr]">
        <ol className="relative">
          <div className="absolute start-5 top-3 bottom-3 w-px bg-white/10" />
          {t.journey.steps.map((s, i) => {
            const SIcon = JOURNEY_ICONS[i];
            const isActive = i === active;
            return (
              <li key={s.k}>
                <button
                  onClick={() => setActive(i)}
                  className={`relative flex w-full items-center gap-4 rounded-2xl px-3 py-3 text-start transition-colors ${isActive ? "bg-white/5" : "hover:bg-white/[0.03]"}`}
                >
                  <span className={`relative z-10 grid h-10 w-10 place-items-center rounded-full transition-all ${isActive ? "bg-brand shadow-glow text-primary-foreground" : "glass text-muted-foreground"}`}>
                    <SIcon className="h-4 w-4" />
                  </span>
                  <span className="flex-1">
                    <span className="block text-xs uppercase tracking-widest text-muted-foreground">{t.journey.stepLabel} 0{i + 1}</span>
                    <span className={`block font-display text-2xl ${isActive ? "text-foreground" : "text-mist"}`}>{s.k}</span>
                  </span>
                  <ChevronRight className={`h-4 w-4 rtl:rotate-180 transition-transform ${isActive ? "translate-x-1 rtl:-translate-x-1 text-foreground" : "text-muted-foreground"}`} />
                </button>
              </li>
            );
          })}
        </ol>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35 }}
            className="glass-strong shadow-card relative overflow-hidden rounded-3xl p-8 sm:p-10"
          >
            <div className="absolute -top-20 -end-20 h-60 w-60 rounded-full bg-magenta/30 blur-3xl" />
            <div className="relative">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-brand shadow-glow">
                <Icon className="h-5 w-5 text-primary-foreground" />
              </div>
              <h3 className="font-display mt-6 text-4xl">{A.k}</h3>
              <p className="mt-3 text-muted-foreground">{A.desc}</p>
              <div className="mt-8 grid grid-cols-3 gap-3">
                {t.journey.chips.map((c) => (
                  <div key={c} className="rounded-xl glass px-3 py-2 text-center text-xs text-muted-foreground">{c}</div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </Section>
  );
}

/* ---------------- ROI CALCULATOR (full) ---------------- */
export function ROICalculator() {
  const t = useT();
  const [employees, setEmployees] = useState(80);
  const [salary, setSalary] = useState(45000);
  const [hours, setHours] = useState(12);
  const [revenue, setRevenue] = useState(8000000);

  const results = useMemo(() => {
    const hourly = salary / (52 * 40);
    const hoursSaved = employees * hours * 0.65 * 52;
    const costSaved = Math.round(hoursSaved * hourly);
    const productivity = Math.round((hours * 0.65 / 40) * 100);
    const revenueUplift = Math.round(revenue * 0.18);
    return { hoursSaved: Math.round(hoursSaved), costSaved, productivity, revenueUplift };
  }, [employees, salary, hours, revenue]);

  return (
    <Section id="roi">
      <SectionHeading
        as="h1"
        eyebrow={t.roi.eyebrow}
        title={<>{t.roi.title1} <span className="text-gradient italic">{t.roi.titleHi}</span> {t.roi.title2}</>}
        description={t.roi.sub}
      />
      <div className="mt-14 grid gap-6 lg:grid-cols-[1fr_1.1fr]">
        <div className="glass-strong rounded-3xl p-7 sm:p-9 shadow-card">
          <RoiSlider label={t.roi.labels.employees} value={employees} min={5} max={2000} step={5} onChange={setEmployees} />
          <RoiSlider label={t.roi.labels.salary} value={salary} prefix="$" min={10000} max={250000} step={1000} onChange={setSalary} />
          <RoiSlider label={t.roi.labels.hours} value={hours} suffix={t.roi.units.hrs} min={1} max={40} step={1} onChange={setHours} />
          <RoiSlider label={t.roi.labels.revenue} value={revenue} prefix="$" min={500000} max={500000000} step={100000} onChange={setRevenue} />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <ResultCard label={t.roi.labels.hoursSaved} value={results.hoursSaved.toLocaleString()} accent="electric" />
          <ResultCard label={t.roi.labels.costSaved} value={`$${results.costSaved.toLocaleString()}`} accent="magenta" />
          <ResultCard label={t.roi.labels.productivity} value={`+${results.productivity}%`} accent="ember" />
          <ResultCard label={t.roi.labels.revenueUplift} value={`$${results.revenueUplift.toLocaleString()}`} accent="magenta" big />
          <div className="sm:col-span-2">
            <WhatsAppCTA
              eventName="cta_roi_quote"
              title={t.whatsapp.roiTitle}
              description={t.whatsapp.roiDescription}
              payload={(): WAPayload => ({
                type: "roi",
                fields: [
                  { label: t.whatsapp.fields.type, value: t.whatsapp.types.roi },
                  { label: t.whatsapp.fields.employees, value: String(employees) },
                  { label: t.whatsapp.fields.avgSalary, value: `$${salary.toLocaleString()}` },
                  { label: t.whatsapp.fields.hoursWeekly, value: String(hours) },
                  { label: t.whatsapp.fields.annualRevenue, value: `$${revenue.toLocaleString()}` },
                  { label: t.whatsapp.fields.hoursSaved, value: results.hoursSaved.toLocaleString() },
                  { label: t.whatsapp.fields.costSaved, value: `$${results.costSaved.toLocaleString()}` },
                  { label: t.whatsapp.fields.productivity, value: `+${results.productivity}%` },
                  { label: t.whatsapp.fields.revenueUplift, value: `$${results.revenueUplift.toLocaleString()}` },
                ],
              })}
            >
              {(openCTA) => (
                <button
                  type="button"
                  onClick={openCTA}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-brand px-7 py-3.5 text-sm font-medium text-primary-foreground shadow-glow transition-transform hover:scale-[1.02]"
                >
                  <DollarSign className="h-4 w-4" /> {t.cta.customQuote}
                  <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                </button>
              )}
            </WhatsAppCTA>
          </div>
        </div>
      </div>
    </Section>
  );
}
function RoiSlider({ label, value, min, max, step, onChange, prefix = "", suffix = "" }: { label: string; value: number; min: number; max: number; step: number; onChange: (v: number) => void; prefix?: string; suffix?: string }) {
  return (
    <div className="mb-6">
      <div className="flex items-baseline justify-between">
        <Label className="text-xs uppercase tracking-widest text-muted-foreground">{label}</Label>
        <span className="font-display text-2xl">{prefix}{value.toLocaleString()}{suffix}</span>
      </div>
      <div className="mt-3"><Slider min={min} max={max} step={step} value={[value]} onValueChange={(v) => onChange(v[0])} /></div>
    </div>
  );
}
function ResultCard({ label, value, accent, big }: { label: string; value: string; accent: "magenta" | "electric" | "ember"; big?: boolean }) {
  const glow = accent === "magenta" ? "bg-magenta/30" : accent === "electric" ? "bg-electric/30" : "bg-ember/30";
  return (
    <div className={`relative overflow-hidden rounded-3xl glass-strong p-7 shadow-card ${big ? "sm:col-span-2" : ""}`}>
      <div className={`absolute -top-20 -end-20 h-48 w-48 rounded-full ${glow} blur-3xl`} />
      <div className="relative">
        <div className="text-xs uppercase tracking-widest text-muted-foreground">{label}</div>
        <div className={`font-display mt-3 ${big ? "text-6xl" : "text-4xl"} text-gradient`}>{value}</div>
      </div>
    </div>
  );
}

/* ---------------- SCENARIOS (full) ---------------- */
export function Scenarios() {
  const t = useT();
  return (
    <Section id="scenarios">
      <SectionHeading
        as="h1"
        eyebrow={t.scenarios.eyebrow}
        title={<>{t.scenarios.title1} <span className="text-gradient italic">{t.scenarios.titleHi}</span> {t.scenarios.title2}</>}
        description={t.scenarios.sub}
      />
      <div className="mt-14 grid gap-5 lg:grid-cols-2">
        {t.scenarios.items.map((s, i) => (
          <motion.article
            key={s.k}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            className="glass-strong shadow-card relative overflow-hidden rounded-3xl p-7"
          >
            <div className="absolute -bottom-20 -end-16 h-52 w-52 rounded-full bg-ember/20 blur-3xl" />
            <div className="relative">
              <h3 className="font-display text-2xl">{s.k}</h3>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 p-4">
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">{t.scenarios.labels.before}</div>
                  <p className="mt-2 text-sm text-muted-foreground">{s.before}</p>
                </div>
                <div className="rounded-2xl bg-brand/10 border border-white/10 p-4">
                  <div className="text-xs uppercase tracking-widest text-electric">{t.scenarios.labels.after}</div>
                  <p className="mt-2 text-sm">{s.after}</p>
                </div>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {s.deltas.map((d) => (
                  <span key={d} className="rounded-full bg-brand px-3 py-1 text-xs text-primary-foreground shadow-glow">{d}</span>
                ))}
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}
