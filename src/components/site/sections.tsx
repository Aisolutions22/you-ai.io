import { motion, AnimatePresence } from "framer-motion";
import { openWhatsApp } from "@/lib/whatsapp";
import { Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Bot, BriefcaseBusiness, Building2, CheckCircle2, ChevronLeft, ChevronRight, Clock3, Globe2, HardHat, Headphones, HeartPulse, LineChart, Megaphone, MessageCircle, Pause, PenTool, PhoneCall, Play, Plus, Rocket, Scale, Search, ShoppingCart, Sparkles, Star, Target, TrendingUp, UserPlus, Users, UtensilsCrossed, X, Zap } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useI18n } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const INDUSTRY_ICONS = [Building2, HeartPulse, PenTool, UtensilsCrossed, Megaphone, Scale, HardHat, ShoppingCart, PhoneCall, UserPlus, BriefcaseBusiness];

function IconForIndustry({ index }: { index: number }) {
  const Icon = INDUSTRY_ICONS[index] ?? Sparkles;
  return <Icon className="h-5 w-5" aria-hidden="true" />;
}

export function Hero() {
  const { t } = useI18n();
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const items = t.industries.items ?? [];
  const h = t.hero;
  return (
    <section className="relative overflow-hidden py-20 lg:py-28">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-5xl text-center">
          <Badge>{h.eyebrow}</Badge>
          <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            {h.headlineAr && <span className="block">{h.headlineAr}</span>}
            <span className="block">
              {h.headlineEn1} <span className="text-primary">{h.headlineEnHi}</span> {h.headlineEn2}
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg text-muted-foreground">{h.sub}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button asChild size="lg"><Link to="/contact">{h.cta1}<ArrowRight className="ms-2 h-4 w-4" /></Link></Button>
            <Button asChild size="lg" variant="outline"><Link to="/ai-products">{h.cta2}</Link></Button>
          </div>
          {h.trust?.length ? (
            <div className="mt-10 flex flex-wrap justify-center gap-x-10 gap-y-4">
              {h.trust.map((s) => (
                <div key={s.k} className="text-center">
                  <p className="text-2xl font-bold text-primary">{s.v}</p>
                  <p className="text-xs text-muted-foreground">{s.k}</p>
                </div>
              ))}
            </div>
          ) : null}
        </div>
        <div className="mt-14 flex gap-3 overflow-x-auto pb-3">
          {items.map((item, idx) => (
            <button key={item.k} type="button" onClick={() => setOpenIdx(idx)} className="shrink-0 rounded-xl border bg-card px-4 py-3 text-sm transition-all duration-300 hover:border-primary">
              <span className="flex items-center gap-2"><IconForIndustry index={idx} />{item.k}</span>
            </button>
          ))}
        </div>
      </div>
      <AnimatePresence>
        {openIdx !== null && items[openIdx] && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-6" onClick={() => setOpenIdx(null)}>
            <motion.div initial={{ y: 20, scale: .98 }} animate={{ y: 0, scale: 1 }} exit={{ y: 20, scale: .98 }} className="w-full max-w-2xl rounded-2xl bg-background p-6 shadow-2xl" onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between gap-4"><h2 className="text-2xl font-bold">{items[openIdx].k}</h2><Button variant="ghost" size="icon" onClick={() => setOpenIdx(null)}><X /></Button></div>
              <p className="mt-4 text-muted-foreground">{items[openIdx].short}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function IndustryCarousel() {
  const { t } = useI18n();
  const [api, setApi] = useState<CarouselApi>();
  const [paused, setPaused] = useState(false);
  const items = useMemo(() => (t.industries.items ?? []).filter((item: any) => item.featured), [t.industries.items]);
  const autoplay = useMemo(() => Autoplay({ delay: 4500, stopOnInteraction: false, stopOnMouseEnter: true }), []);
  useEffect(() => { if (!api) return; if (paused) autoplay.stop(); else autoplay.play(); }, [api, paused, autoplay]);
  return (
    <section className="py-16">
      <div className="container mx-auto px-6">
        <div className="mb-8 flex items-end justify-between gap-4"><div><p className="text-sm font-semibold uppercase tracking-widest text-primary">Industries</p><h2 className="mt-2 text-3xl font-bold">{t.industries.title1} <span className="text-primary">{t.industries.titleHi}</span> {t.industries.title2}</h2></div><Button variant="outline" size="icon" onClick={() => setPaused(p => !p)} aria-label={paused ? "Play" : "Pause"}>{paused ? <Play /> : <Pause />}</Button></div>
        <Carousel opts={{ direction: "rtl", loop: true }} setApi={setApi} plugins={[autoplay]} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}>
          <CarouselContent>
            {items.map((item: any) => <CarouselItem key={item.k} className="basis-1/2 md:basis-1/3 lg:basis-1/5"><Link to="/industries" hash={item.k.toLowerCase().replace(/\s+/g, "-")} className="group block overflow-hidden rounded-2xl border bg-card transition-all duration-300 hover:border-primary"><div className="aspect-[4/5] bg-gradient-to-t from-primary/70 via-primary/10 to-transparent"><div className="flex h-full items-end p-5"><h3 className="text-xl font-bold text-white">{item.k}</h3></div></div></Link></CarouselItem>)}
          </CarouselContent>
          <div className="mt-5 flex justify-center gap-2"><Button variant="outline" size="icon" onClick={() => api?.scrollPrev()}><ChevronRight /></Button><Button variant="outline" size="icon" onClick={() => api?.scrollNext()}><ChevronLeft /></Button></div>
        </Carousel>
      </div>
    </section>
  );
}

export function Industries() { return <IndustryCarousel />; }

export function Insights() { return null; }

export function Scenarios() {
  const { t } = useI18n();
  const s = t.scenarios;
  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-3xl text-center">
          <Badge>{s.eyebrow}</Badge>
          <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            {s.title1} <span className="text-primary">{s.titleHi}</span> {s.title2}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">{s.sub}</p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {s.items.map((item, i) => (
            <motion.div key={item.k} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.05 }}>
              <Card className="h-full">
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold">{item.k}</h2>
                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <div className="rounded-xl border bg-muted/40 p-4">
                      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{s.labels.before}</p>
                      <p className="mt-2 text-sm text-muted-foreground">{item.before}</p>
                    </div>
                    <div className="rounded-xl border border-primary/30 bg-primary/5 p-4">
                      <p className="text-xs font-semibold uppercase tracking-widest text-primary">{s.labels.after}</p>
                      <p className="mt-2 text-sm">{item.after}</p>
                    </div>
                  </div>
                  <ul className="mt-4 space-y-2">
                    {item.deltas.map((d) => (
                      <li key={d} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button asChild size="lg"><Link to="/contact">{t.hero.ctaPrimary}<ArrowRight className="ms-2 h-4 w-4" /></Link></Button>
        </div>
      </div>
    </section>
  );
}

export function FinalCTA() { return null; }
export function Journey() { return null; }
export const JourneyTeaser = Journey;
export const ROITeaser = ROI;
export function Capabilities() { return null; }
export function Assessment() { return null; }
export function ROI() { return null; }

export function ROICalculator() {
  const { t } = useI18n();
  const r = t.roi;
  const [employees, setEmployees] = useState(25);
  const [salary, setSalary] = useState(8000);
  const [hours, setHours] = useState(6);
  const [revenue, setRevenue] = useState(500000);

  const monthlyHoursSaved = employees * hours * 4.33;
  const hourlyCost = salary / 160;
  const monthlyCostSaved = Math.round(monthlyHoursSaved * hourlyCost);
  const productivity = Math.min(60, Math.round((hours / 40) * 100));
  const revenueUplift = Math.round(revenue * 0.08);

  const numberFmt = (n: number) => n.toLocaleString("en-US");

  const inputCls = "w-full rounded-xl border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary";

  const submit = () => {
    openWhatsApp({
      type: "roi",
      fields: [
        { label: r.labels.employees, value: String(employees) },
        { label: r.labels.salary, value: numberFmt(salary) },
        { label: r.labels.hours, value: `${hours} ${r.units.hrs}` },
        { label: r.labels.revenue, value: numberFmt(revenue) },
        { label: r.labels.hoursSaved, value: `${numberFmt(Math.round(monthlyHoursSaved))} ${r.units.hrs}` },
        { label: r.labels.costSaved, value: numberFmt(monthlyCostSaved) },
        { label: r.labels.productivity, value: `${productivity}%` },
        { label: r.labels.revenueUplift, value: numberFmt(revenueUplift) },
      ],
    });
  };

  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-3xl text-center">
          <Badge>{r.eyebrow}</Badge>
          <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            {r.title1} <span className="text-primary">{r.titleHi}</span> {r.title2}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">{r.sub}</p>
        </div>

        <div className="mx-auto mt-12 grid max-w-5xl gap-6 lg:grid-cols-2">
          <Card>
            <CardContent className="space-y-5 p-6">
              <div>
                <label className="mb-1.5 block text-sm font-medium">{r.labels.employees}</label>
                <input type="number" min={1} value={employees} onChange={(e) => setEmployees(Math.max(1, Number(e.target.value) || 1))} className={inputCls} />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium">{r.labels.salary}</label>
                <input type="number" min={0} value={salary} onChange={(e) => setSalary(Math.max(0, Number(e.target.value) || 0))} className={inputCls} />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium">{r.labels.hours}</label>
                <input type="number" min={0} max={40} value={hours} onChange={(e) => setHours(Math.min(40, Math.max(0, Number(e.target.value) || 0)))} className={inputCls} />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium">{r.labels.revenue}</label>
                <input type="number" min={0} value={revenue} onChange={(e) => setRevenue(Math.max(0, Number(e.target.value) || 0))} className={inputCls} />
              </div>
            </CardContent>
          </Card>

          <Card className="border-primary/30">
            <CardContent className="flex h-full flex-col gap-4 p-6">
              <div className="rounded-xl bg-primary/5 p-4">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{r.labels.hoursSaved}</p>
                <p className="mt-1 text-2xl font-bold text-primary">{numberFmt(Math.round(monthlyHoursSaved))} {r.units.hrs}</p>
              </div>
              <div className="rounded-xl bg-primary/5 p-4">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{r.labels.costSaved}</p>
                <p className="mt-1 text-2xl font-bold text-primary">{numberFmt(monthlyCostSaved)}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl border p-4">
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{r.labels.productivity}</p>
                  <p className="mt-1 text-xl font-bold">{productivity}%</p>
                </div>
                <div className="rounded-xl border p-4">
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{r.labels.revenueUplift}</p>
                  <p className="mt-1 text-xl font-bold">{numberFmt(revenueUplift)}</p>
                </div>
              </div>
              <Button size="lg" className="mt-auto w-full" onClick={submit}>
                {t.hero.ctaPrimary}<ArrowRight className="ms-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
export function SaudiMarket() { return null; }
