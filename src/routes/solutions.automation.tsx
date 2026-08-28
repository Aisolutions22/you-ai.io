import { createFileRoute } from "@tanstack/react-router";
import { Workflow, Plug, Gauge, FileText, RefreshCw, ShieldCheck } from "lucide-react";
import { SolutionPage, type SolutionPageContent } from "@/components/site/SolutionPage";

export const Route = createFileRoute("/solutions/automation")({
  head: () => ({
    meta: [
      { title: "أتمتة العمليات — You AI" },
      { name: "description", content: "أتمتة العمليات وربط الأنظمة (CRM, ERP, WhatsApp) وتقليل العمل اليدوي لشركتك في السعودية." },
      { property: "og:title", content: "أتمتة العمليات — You AI" },
      { property: "og:description", content: "أتمتة العمليات وربط الأنظمة وتقليل العمل اليدوي." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <SolutionPage content={content} />,
});

const content: SolutionPageContent = {
  path: "/solutions/automation",
  metaTitle: "أتمتة العمليات — You AI",
  metaDescription: "أتمتة العمليات وربط الأنظمة وتقليل العمل اليدوي.",
  eyebrow: "أتمتة العمليات",
  title: "اربط أنظمتك، وخلّي الأعمال المتكررة تمشي لوحدها",
  subtitle: "من إدخال البيانات لمتابعة الطلبات، نبني أتمتة حقيقية تربط CRM وERP والواتساب وباقي أنظمتك ببعض — من غير ما موظفينك يعملوا نفس الخطوة مرتين.",
  ctaButton: "احجز استشارة مجانية",
  heroImage: {
    placeholderNote: "ضع هنا: screenshot حقيقي لسير عمل أتمتة (n8n/Zapier) اشتغلتوا عليه فعلاً",
  },
  capabilities: [
    { icon: Plug, title: "ربط الأنظمة", desc: "CRM، ERP، واتساب، جداول بيانات — كلها تتكلم مع بعض تلقائياً." },
    { icon: RefreshCw, title: "سير عمل بلا تدخل يدوي", desc: "من استلام الطلب لغاية الفاتورة، من غير نسخ ولصق." },
    { icon: Gauge, title: "تقليل وقت الاستجابة", desc: "أتمتة الردود والتنبيهات الفورية بدل الانتظار." },
    { icon: FileText, title: "تقارير تلقائية", desc: "تقارير يومية/أسبوعية تتولد وتترسل لوحدها." },
    { icon: ShieldCheck, title: "بدون أخطاء بشرية", desc: "تقليل الأخطاء الناتجة عن الإدخال اليدوي المتكرر." },
    { icon: Workflow, title: "قابلة للتوسع", desc: "تبدأ بعملية واحدة وتتوسع مع نمو شركتك." },
  ],
  steps: [
    { title: "نفهم عملياتك", desc: "نحدد أين الوقت بيضيع فعلياً." },
    { title: "نصمم السير", desc: "خريطة واضحة لكل خطوة قبل البناء." },
    { title: "نبني ونربط", desc: "توصيل الأنظمة الفعلية ببعضها." },
    { title: "نشغّل ونتابع", desc: "إطلاق حي مع متابعة الأداء." },
  ],
  proofImage: {
    placeholderNote: "ضع هنا (اختياري): مثال فعلي لنتيجة أتمتة — تقرير أو مقارنة قبل/بعد",
  },
  ctaTitle: "جاهز تشوف إيه اللي ممكن يتأتمت في شركتك؟",
  ctaSub: "استشارة مجانية 20 دقيقة، بنطلع فيها أكتر 3 عمليات بتضيّع وقتك.",
};
