import { createFileRoute } from "@tanstack/react-router";
import { Building2, Layers, Target, ShieldCheck, LineChart, Users } from "lucide-react";
import { SolutionPage, type SolutionPageContent } from "@/components/site/SolutionPage";

export const Route = createFileRoute("/solutions/enterprise-transformation")({
  head: () => ({
    meta: [
      { title: "تحول رقمي شامل للمؤسسات — You AI" },
      { name: "description", content: "شراكة تحول رقمي كاملة للمؤسسات الكبرى في السعودية — من التقييم للتنفيذ للتشغيل." },
      { property: "og:title", content: "تحول رقمي شامل للمؤسسات — You AI" },
      { property: "og:description", content: "شراكة تحول رقمي كاملة للمؤسسات الكبرى." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <SolutionPage content={content} />,
});

const content: SolutionPageContent = {
  path: "/solutions/enterprise-transformation",
  metaTitle: "تحول رقمي شامل للمؤسسات — You AI",
  metaDescription: "شراكة تحول رقمي كاملة للمؤسسات الكبرى.",
  eyebrow: "تحول رقمي شامل",
  title: "مش أداة واحدة — شريك تحول كامل لمؤسستك",
  subtitle: "لو شركتك محتاجة تحول شامل مش حل واحد بس — أتمتة، ذكاء اصطناعي، ربط أنظمة، ولوحات تحكم — بنبني معاك خارطة طريق كاملة وننفذها خطوة بخطوة.",
  ctaButton: "احجز جلسة استراتيجية",
  heroImage: {
    placeholderNote: "ضع هنا: صورة حقيقية من مشروع مؤسسي فعلي (workshop، اجتماع فريق، أو خارطة طريق حقيقية)",
  },
  capabilities: [
    { icon: Target, title: "تقييم شامل أولاً", desc: "نفهم عملياتك كاملة قبل أي حل." },
    { icon: Layers, title: "خارطة طريق موحدة", desc: "كل الحلول (أتمتة، بوتات، لوحات) في خطة واحدة." },
    { icon: Users, title: "فريق مخصص", desc: "مش استشارة وخلاص — تنفيذ ومتابعة مستمرة." },
    { icon: ShieldCheck, title: "حوكمة وأمان بيانات", desc: "متوافق مع متطلبات المؤسسات الكبرى." },
    { icon: LineChart, title: "قياس أثر حقيقي", desc: "أرقام واضحة على الإيرادات والتكاليف." },
    { icon: Building2, title: "يتوسع مع نموك", desc: "بنية قابلة للتوسع مع كل مرحلة نمو." },
  ],
  steps: [
    { title: "التقييم", desc: "تحليل كامل للعمليات والأنظمة الحالية." },
    { title: "التصميم", desc: "خارطة طريق تحول بأولويات واضحة." },
    { title: "التنفيذ", desc: "بناء وربط الحلول مرحلة بمرحلة." },
    { title: "التشغيل والتطوير", desc: "متابعة أداء مستمرة وتحسين دوري." },
  ],
  proofImage: {
    placeholderNote: "ضع هنا (اختياري): صورة فعلية لخارطة طريق أو نتائج مشروع تحول حقيقي",
  },
  ctaTitle: "جاهز تبدأ رحلة التحول الكاملة؟",
  ctaSub: "جلسة استراتيجية تنفيذية نحدد فيها أولويات مؤسستك.",
};
