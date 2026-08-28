import { ImageIcon, ArrowRight, Check } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { Section, SectionEyebrow } from "@/components/site/Section";
import { LeadDialog } from "@/components/site/LeadDialog";
import type { LucideIcon } from "lucide-react";

export interface SolutionImageSlot {
  placeholderNote: string;
  src?: string;
  alt?: string;
}

export interface SolutionPageContent {
  eyebrow: string;
  title: string;
  subtitle: string;
  heroImage: SolutionImageSlot;
  capabilities: { icon: LucideIcon; title: string; desc: string }[];
  steps: { title: string; desc: string }[];
  proofImage?: SolutionImageSlot;
  ctaTitle: string;
  ctaSub: string;
  ctaButton: string;
  metaTitle: string;
  metaDescription: string;
  path: string;
}

function ImagePlaceholder({ slot, aspect = "aspect-[4/3]" }: { slot: SolutionImageSlot; aspect?: string }) {
  if (slot.src) {
    return (
      <div className={`overflow-hidden rounded-3xl border border-border shadow-card ${aspect}`}>
        <img src={slot.src} alt={slot.alt ?? ""} loading="lazy" decoding="async" className="h-full w-full object-cover" />
      </div>
    );
  }
  return (
    <div className={`grid place-items-center gap-3 rounded-3xl border border-dashed border-border bg-muted/30 p-8 text-center ${aspect}`}>
      <ImageIcon className="h-8 w-8 text-muted-foreground" aria-hidden />
      <p className="max-w-sm text-xs leading-relaxed text-muted-foreground">{slot.placeholderNote}</p>
    </div>
  );
}

export function SolutionPage({ content }: { content: SolutionPageContent }) {
  return (
    <SiteLayout>
      <Section className="!py-14 sm:!py-20">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <SectionEyebrow>{content.eyebrow}</SectionEyebrow>
            <h1 className="font-display mt-4 text-4xl leading-[1.1] sm:text-5xl">{content.title}</h1>
            <p className="mt-5 text-base text-muted-foreground sm:text-lg">{content.subtitle}</p>
            <div className="mt-8">
              <LeadDialog variant="strategy">
                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-medium text-primary-foreground shadow-glow transition-transform hover:scale-[1.02]"
                >
                  {content.ctaButton}
                  <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                </button>
              </LeadDialog>
            </div>
          </div>
          <ImagePlaceholder slot={content.heroImage} />
        </div>
      </Section>

      <Section className="!py-14">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {content.capabilities.map((c) => (
            <div key={c.title} className="rounded-3xl border border-border bg-card p-6 shadow-card">
              <span className="grid h-10 w-10 place-items-center rounded-2xl bg-brand/10">
                <c.icon className="h-5 w-5 text-primary" aria-hidden />
              </span>
              <h2 className="font-display mt-4 text-lg leading-tight">{c.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{c.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section className="!py-14">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {content.steps.map((s, i) => (
            <div key={s.title} className="rounded-3xl border border-border bg-card p-6 shadow-card">
              <span className="font-display text-2xl text-primary">{String(i + 1).padStart(2, "0")}</span>
              <h2 className="font-display mt-3 text-lg leading-tight">{s.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {content.proofImage && (
        <Section className="!py-14">
          <ImagePlaceholder slot={content.proofImage} aspect="aspect-[16/9]" />
        </Section>
      )}

      <Section className="!py-16">
        <div className="mx-auto max-w-3xl rounded-3xl border border-border bg-card p-10 text-center shadow-card">
          <h2 className="font-display text-3xl leading-tight sm:text-4xl">{content.ctaTitle}</h2>
          <p className="mt-4 text-base text-muted-foreground">{content.ctaSub}</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <LeadDialog variant="strategy">
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-medium text-primary-foreground shadow-glow transition-transform hover:scale-[1.02]"
              >
                {content.ctaButton}
                <ArrowRight className="h-4 w-4 rtl:rotate-180" />
              </button>
            </LeadDialog>
            <Link
              to="/industries"
              className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium hover:bg-muted/40"
            >
              <Check className="h-4 w-4 text-primary" aria-hidden />
              شوف حالات الاستخدام حسب قطاعك
            </Link>
          </div>
        </div>
      </Section>
    </SiteLayout>
  );
}
