import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Bot, CheckCircle2, ChevronLeft, ChevronRight, Clock3, Globe2, Headphones, LineChart, MessageCircle, Play, Pause, Plus, Rocket, Search, Sparkles, Star, Target, TrendingUp, Users, X, Zap } from "lucide-react";
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
  return (
    <section className="relative overflow-hidden py-20 lg:py-28">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-5xl text-center">
          <Badge>{t.hero.badge}</Badge>
          <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-7xl">{t.hero.title}</h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg text-muted-foreground">{t.hero.subtitle}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button asChild size="lg"><Link to="/contact">{t.hero.ctaPrimary}<ArrowRight className="ms-2 h-4 w-4" /></Link></Button>
            <Button asChild size="lg" variant="outline"><Link to="/products">{t.hero.ctaSecondary}</Link></Button>
          </div>
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
        <div className="mb-8 flex items-end justify-between gap-4"><div><p className="text-sm font-semibold uppercase tracking-widest text-primary">Industries</p><h2 className="mt-2 text-3xl font-bold">{t.industries.title}</h2></div><Button variant="outline" size="icon" onClick={() => setPaused(p => !p)} aria-label={paused ? "Play" : "Pause"}>{paused ? <Play /> : <Pause />}</Button></div>
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

export function FinalCTA() { return null; }
export function Journey() { return null; }
export function Capabilities() { return null; }
export function Assessment() { return null; }
export function ROI() { return null; }
export function SaudiMarket() { return null; }
