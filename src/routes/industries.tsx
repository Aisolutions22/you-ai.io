import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { Section, SectionHeading } from "@/components/site/Section";
import { LeadDialog } from "@/components/site/LeadDialog";
import { ArrowRight } from "lucide-react";
import { useT } from "@/lib/i18n";
import { IndustryCards } from "@/components/site/sections";

export const Route = createFileRoute("/industries")({
  head: () => ({
    meta: [
      { title: "Industries · القطاعات — You AI" },
      { name: "description", content: "حلول ذكاء اصطناعي مصممة لقطاعك: الرعاية الصحية، التجزئة، العقارات، التصنيع، الخدمات المالية، والضيافة والسياحة." },
      { property: "og:title", content: "Industries — You AI" },
      { property: "og:description", content: "Sector-specific AI transformation programs." },
      { property: "og:url", content: "/industries" },
    ],
    links: [{ rel: "canonical", href: "/industries" }],
  }),
  component: IndustriesPage,
});

function IndustriesPage() {
  const t = useT();
  return (
    <SiteLayout>
      <Section>
        <SectionHeading
          as="h1"
          eyebrow={t.industries.eyebrow}
          title={<>{t.industries.page.title1} <span className="text-gradient italic">{t.industries.page.titleHi}</span>{t.industries.page.title2}</>}
          description="نفهم تحديات كل قطاع ونبني حلول ذكاء اصطناعي وأتمتة تعزز الكفاءة، تخفض التكاليف، وتحقق نتائج ملموسة."
        />
        <div className="mt-14">
          <IndustryCards />
        </div>
        <div className="mt-12 flex justify-center">
          <LeadDialog variant="roadmap">
            <button type="button" className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-medium text-primary-foreground shadow-glow transition-transform hover:scale-[1.02]">
              {t.common.exploreProgram} <ArrowRight className="h-4 w-4 rtl:rotate-180" />
            </button>
          </LeadDialog>
        </div>
      </Section>
    </SiteLayout>
  );
}
