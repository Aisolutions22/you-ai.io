import { createFileRoute } from "@tanstack/react-router";
import { Zap, Rocket, Code2, RefreshCw, Layers, Clock } from "lucide-react";
import { SolutionPage, type SolutionPageContent } from "@/components/site/SolutionPage";

export const Route = createFileRoute("/solutions/vibe-coding")({
  head: () => ({
    meta: [
      { title: "Vibe Coding — بناء أنظمة مخصصة سريع — You AI" },
      { name: "description", content: "نظام أو أداة داخلية مخصصة لشركتك، مبنية بسرعة عبر Vibe Coding — أيام مش شهور." },
      { property: "og:title", content: "Vibe Coding — You AI" },
      { property: "og:description", content: "بناء أنظمة وأدوات داخلية مخصصة بسرعة عبر Vibe Coding." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <SolutionPage content={content} />,
});

const content: SolutionPageContent = {
  path: "/solutions/vibe-coding",
  metaTitle: "Vibe Coding — You AI",
  metaDescription: "بناء أنظمة وأدوات داخلية مخصصة بسرعة عبر Vibe Coding.",
  eyebrow: "Vibe Coding",
  title: "عندك فكرة لأداة داخلية؟ نبنيها في أيام",
  subtitle: "مش كل نظام محتاج فريق تطوير كامل وستة شهور. باستخدام أدوات البناء بالذكاء الاصطناعي، نطلعلك نظام مخصص شغّال فعلياً في أيام قليلة.",
  ctaButton: "احجز استشارة مجانية",
  heroImage: {
    placeholderNote: "ضع هنا: صورة أو فيديو قصير لنظام اتبنى فعلاً بالطريقة دي (ديمو أو before/after)",
  },
  capabilities: [
    { icon: Clock, title: "سرعة غير تقليدية", desc: "أيام بدل شهور — من الفكرة للنظام الشغال." },
    { icon: Layers, title: "مصمم على مقاسك", desc: "مش قالب جاهز — مبني على عمليتك الفعلية." },
    { icon: RefreshCw, title: "تعديل سريع وقت التطوير", desc: "تشوف وتعدل أول بأول، مش آخر المشروع." },
    { icon: Code2, title: "كود حقيقي قابل للتوسع", desc: "مش prototype للعرض بس — نظام شغّال فعلياً." },
    { icon: Rocket, title: "إطلاق سريع", desc: "تختبر فكرتك في السوق بأقل وقت وتكلفة." },
    { icon: Zap, title: "مناسب للأدوات الداخلية", desc: "أدوات فريقك، لوحات، نماذج — مش لازم تطبيق ضخم." },
  ],
  steps: [
    { title: "نفهم الفكرة", desc: "جلسة قصيرة نحدد فيها المطلوب بالظبط." },
    { title: "نبني نسخة أولى", desc: "شغالة، مش شكل بس — خلال أيام." },
    { title: "تراجع وتعدّل", desc: "ملاحظاتك بتتنفذ في نفس الأسبوع." },
    { title: "نسلّم ونؤمّن", desc: "نظام جاهز للاستخدام الفعلي." },
  ],
  proofImage: {
    placeholderNote: "ضع هنا (اختياري): لقطة قبل/بعد لنظام اتبنى بهذه الطريقة",
  },
  ctaTitle: "عندك فكرة نظام أو أداة داخلية؟",
  ctaSub: "احكيلنا عنها، ونقولك إمكانية بناءها في أيام من عدمها.",
};
