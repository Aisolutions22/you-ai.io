import { createFileRoute } from "@tanstack/react-router";
import { BarChart3, Eye, Bell, LayoutGrid, TrendingUp, Smartphone } from "lucide-react";
import { SolutionPage, type SolutionPageContent } from "@/components/site/SolutionPage";

export const Route = createFileRoute("/solutions/dashboards")({
  head: () => ({
    meta: [
      { title: "لوحات التحكم — You AI" },
      { name: "description", content: "لوحات تحكم تنفيذية تعرض أداء شركتك لحظياً — بدون تقارير Excel يدوية." },
      { property: "og:title", content: "لوحات التحكم — You AI" },
      { property: "og:description", content: "لوحات تحكم تنفيذية تعرض أداء شركتك لحظياً." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <SolutionPage content={content} />,
});

const content: SolutionPageContent = {
  path: "/solutions/dashboards",
  metaTitle: "لوحات التحكم — You AI",
  metaDescription: "لوحات تحكم تنفيذية تعرض أداء شركتك لحظياً.",
  eyebrow: "لوحات التحكم",
  title: "شوف أداء شركتك في شاشة واحدة، لحظة بلحظة",
  subtitle: "بدل ما تنتظر تقرير Excel آخر الشهر، لوحة تحكم حية تجمع بياناتك من كل الأنظمة وتوريك المبيعات والتكاليف والأداء أول بأول.",
  ctaButton: "احجز استشارة مجانية",
  heroImage: {
    placeholderNote: "ضع هنا: screenshot حقيقي للوحة تحكم بنيتوها فعلاً (حتى لو نسخة تجريبية داخلية)",
  },
  capabilities: [
    { icon: Eye, title: "رؤية لحظية", desc: "أرقام حية، مش تقارير قديمة." },
    { icon: LayoutGrid, title: "كل الأنظمة في مكان واحد", desc: "مبيعات، مخزون، تسويق — شاشة واحدة." },
    { icon: Bell, title: "تنبيهات ذكية", desc: "تنبيه فوري لو رقم خرج عن المعدل الطبيعي." },
    { icon: TrendingUp, title: "تحليل اتجاهات", desc: "تعرف وين متجه أداءك قبل ما يحصل." },
    { icon: Smartphone, title: "على الموبايل والديسكتوب", desc: "تابع شركتك وانت في أي مكان." },
    { icon: BarChart3, title: "مخصصة لقطاعك", desc: "مؤشرات الأداء اللي تهمك انت، مش قوالب جاهزة." },
  ],
  steps: [
    { title: "نحدد المؤشرات المهمة", desc: "إيه الأرقام اللي فعلاً بتحرك القرار." },
    { title: "نربط مصادر البيانات", desc: "أنظمتك الحالية، بدون نقل يدوي." },
    { title: "نصمم اللوحة", desc: "واضحة، بسيطة، وبدون تشتيت." },
    { title: "نسلّم ونطوّر", desc: "تحديث مستمر مع تغيّر احتياجك." },
  ],
  proofImage: {
    placeholderNote: "ضع هنا (اختياري): مقارنة قبل/بعد — تقرير Excel يدوي مقابل اللوحة الحية",
  },
  ctaTitle: "تعبت من انتظار التقارير آخر الشهر؟",
  ctaSub: "نبنيلك لوحة تحكم تجريبية على بيانات شركتك الحقيقية.",
};
