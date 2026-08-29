import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Pause, Play, ArrowRight, Building2, HeartPulse, Home, Megaphone, Utensils } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
import { Section, SectionHeading } from "@/components/site/Section";
import { useI18n } from "@/lib/i18n";

const ICONS = [Home, HeartPulse, Megaphone, Utensils, Building2];

const IMAGE_PATHS: Record<string, string> = {
  "Real Estate": "/assets/industries/real-estate.webp",
  "العقار": "/assets/industries/real-estate.webp",
  Healthcare: "/assets/industries/healthcare.webp",
  "الرعاية الصحية": "/assets/industries/healthcare.webp",
  "Content Creators": "/assets/industries/content-creators.webp",
  "صنّاع المحتوى": "/assets/industries/content-creators.webp",
  "Digital Marketing": "/assets/industries/e-marketing.webp",
  "التسويق الإلكتروني": "/assets/industries/e-marketing.webp",
  Restaurants: "/assets/industries/restaurants.webp",
  "المطاعم": "/assets/industries/restaurants.webp",
};

function slugify(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-+|-+$/g, "");
}

export function IndustryCarousel() {
  const { t, lang } = useI18n();
  const [api, setApi] = useState<CarouselApi>();
  const [manualPaused, setManualPaused] = useState(false);
  const [interactionPaused, setInteractionPaused] = useState(false);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const items = useMemo(() => t.industries.items.filter((item) => item.featured), [t.industries.items]);
  const isPaused = manualPaused || interactionPaused;

  const pauseForInteraction = useCallback(() => {
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    setInteractionPaused(true);
  }, []);

  const resumeAfterInteraction = useCallback(() => {
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => setInteractionPaused(false), 1400);
  }, []);

  useEffect(() => {
    if (!api || isPaused) return;
    const timer = setInterval(() => api.scrollNext(), 4500);
    return () => clearInterval(timer);
  }, [api, isPaused]);

  useEffect(() => () => {
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
  }, []);

  return (
    <Section id="industries">
      <SectionHeading
        eyebrow={t.industries.eyebrow}
        title={<>{t.industries.title1} <span className="text-gradient italic">{t.industries.titleHi}</span> {t.industries.title2}</>}
        description={t.industries.sub}
      />

      <div
        className="relative mt-10"
        onMouseEnter={pauseForInteraction}
        onMouseLeave={() => setInteractionPaused(false)}
        onFocusCapture={pauseForInteraction}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setInteractionPaused(false);
        }}
        onTouchStart={pauseForInteraction}
        onTouchEnd={resumeAfterInteraction}
      >
        <Carousel
          opts={{ direction: "rtl", loop: true, align: "start" }}
          setApi={setApi}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {items.map((item, index) => {
              const image = item.image || IMAGE_PATHS[item.k];
              const Icon = ICONS[index % ICONS.length];
              const hrefHash = `#${slugify(item.k)}`;

              return (
                <CarouselItem key={item.k} className="basis-[82%] pl-4 sm:basis-[48%] lg:basis-[30%] xl:basis-[22%]">
                  <motion.div
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.45, delay: index * 0.05 }}
                    className="h-full"
                  >
                    <Link
                      to="/industries"
                      hash={hrefHash}
                      className="group block h-full overflow-hidden rounded-[1.75rem] border border-border/70 bg-card shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/70 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                      aria-label={`${item.k} — ${t.common.explore}`}
                    >
                      <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-br from-primary/15 via-secondary to-background">
                        {image ? (
                          <img
                            src={image}
                            alt=""
                            loading="lazy"
                            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                            onError={(event) => {
                              event.currentTarget.style.display = "none";
                            }}
                          />
                        ) : null}
                        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/10 to-transparent" />
                        <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                          <div className="mb-3 grid h-10 w-10 place-items-center rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm">
                            <Icon className="h-5 w-5" />
                          </div>
                          <h3 className="font-display text-xl leading-tight">{item.k}</h3>
                          <div className="mt-2 flex items-center gap-1.5 text-xs text-white/80">
                            {lang === "ar" ? "استكشف الحلول" : "Explore solutions"}
                            <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                </CarouselItem>
              );
            })}
          </CarouselContent>

          <button
            type="button"
            onClick={() => setManualPaused((value) => !value)}
            className="absolute end-4 top-4 z-20 grid h-9 w-9 place-items-center rounded-full border border-white/20 bg-black/35 text-white backdrop-blur-md transition-colors hover:bg-black/55 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            aria-label={manualPaused ? "Play industry carousel" : "Pause industry carousel"}
            title={manualPaused ? "Play" : "Pause"}
          >
            {manualPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
          </button>
        </Carousel>
      </div>
    </Section>
  );
}
