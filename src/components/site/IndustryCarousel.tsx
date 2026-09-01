import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Pause, Play, ArrowRight, Building2, HeartPulse, Home, Megaphone, Utensils } from "lucide-react";
import { Section } from "@/components/site/Section";
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
  return value.trim().toLowerCase().replace(/[^\p{L}\p{N}]+/gu, "-").replace(/^-+|-+$/g, "");
}

export function IndustryCarousel() {
  const { t } = useI18n();
  const [manualPaused, setManualPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const isPaused = manualPaused || hovered;

  const items = useMemo(() => t.industries.items.filter((item) => item.featured), [t.industries.items]);
  // Duplicate the list once so the track can loop seamlessly: translating the
  // whole strip by exactly -50% of its width wraps perfectly with no jump.
  const track = useMemo(() => [...items, ...items], [items]);

  if (items.length === 0) return null;

  return (
    <Section id="industries" className="!pt-2 !pb-16 sm:!pt-3 sm:!pb-20">
      <h2 className="font-display text-xl sm:text-2xl">
        {t.industries.title1} <span className="text-gradient italic">{t.industries.titleHi}</span> {t.industries.title2}
      </h2>

      <div
        className="relative mt-6"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Edge fades so cards don't hard-cut at the container edges */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 start-0 z-10 hidden w-16 bg-gradient-to-r from-background to-transparent sm:block" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 end-0 z-10 hidden w-16 bg-gradient-to-l from-background to-transparent sm:block" />

        <div className="overflow-hidden" dir="ltr">
          <div
            className="flex w-max gap-4"
            style={{
              animation: "marquee-scroll 40s linear infinite",
              animationPlayState: isPaused ? "paused" : "running",
            }}
          >
            {track.map((item, index) => {
              const image = item.image || IMAGE_PATHS[item.k];
              const Icon = ICONS[index % ICONS.length];
              const hrefHash = slugify(item.k);

              return (
                <Link
                  key={`${item.k}-${index}`}
                  to="/industries"
                  hash={hrefHash}
                  aria-hidden={index >= items.length}
                  tabIndex={index >= items.length ? -1 : 0}
                  className="group block w-[240px] shrink-0 overflow-hidden rounded-[1.75rem] border border-border/70 bg-card shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/70 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:w-[280px]"
                  aria-label={`${item.k} — ${t.common.explore}`}
                >
                  <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-br from-primary/15 via-secondary to-background">
                    {image ? (
                      <img
                        src={image}
                        alt=""
                        loading="lazy"
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                        onError={(event) => { event.currentTarget.style.display = "none"; }}
                      />
                    ) : null}
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/10 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                      <div className="mb-3 grid h-10 w-10 place-items-center rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className="font-display text-xl leading-tight">{item.k}</h3>
                      <div className="mt-2 flex items-center gap-1.5 text-xs text-white/80">
                        {t.common.explore}
                        <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180" />
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        <button
          type="button"
          onClick={() => setManualPaused((v) => !v)}
          className="absolute end-4 top-4 z-20 grid h-9 w-9 place-items-center rounded-full border border-white/20 bg-black/35 text-white backdrop-blur-md transition-colors hover:bg-black/55 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          aria-label={manualPaused ? "Play industry carousel" : "Pause industry carousel"}
          title={manualPaused ? "Play" : "Pause"}
        >
          {manualPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
        </button>
      </div>
    </Section>
  );
}
