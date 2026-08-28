import { createFileRoute } from "@tanstack/react-router";
import { MessageCircle, Clock, Languages, Calendar, TrendingUp, Headset } from "lucide-react";
import { SolutionPage, type SolutionPageContent } from "@/components/site/SolutionPage";

export const Route = createFileRoute("/solutions/chatbots")({
  head: () => ({
    meta: [
      { title: "روبوتات الدردشة الذكية — You AI" },
      { name: "description", content: "روبوتات دردشة بالذكاء الاصطناعي على واتساب وموقعك — تجاوب، تحجز، وتبيع على مدار الساعة." },
      { property: "og:title", content: "روبوتات الدردشة الذكية — You AI" },
      { property: "og:description", content: "روبوتات دردشة بالذكاء الاصطناعي على واتساب وموقعك." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <SolutionPage content={content} />,
});

const content: SolutionPageContent = {
  path: "/solutions/chatbots",
  metaTitle: "روبوتات الدردشة الذكية — You AI",
  metaDescription: "روبوتات دردشة بالذكاء الاصطناعي على واتساب وموقعك.",
  eyebrow: "روبوتات الدردشة",
  title: "عميلك بيتكلم، وبوتك بيرد فوراً — 24 ساعة",
  subtitle: "واتساب، موقعك، أو أي قناة — وكيل ذكاء اصطناعي بيفهم لهجتك، يرد على الاستفسارات، يحجز مواعيد، ويحوّل المحادثات الجادة لفريقك.",
  ctaButton: "احجز استشارة مجانية",
  heroImage: {
    placeholderNote: "ضع هنا: screenshot حقيقي لمحادثة (واتساب/موقع) مع بوت اشتغلتوا عليه فعلاً",
  },
  capabilities: [
    { icon: Clock, title: "متاح 24/7", desc: "مفيش وقت انتظار، مهما كانت الساعة." },
    { icon: Languages, title: "عربي ولهجات محلية", desc: "بيفهم ويرد باللهجة السعودية والخليجية." },
    { icon: Calendar, title: "حجز مواعيد تلقائي", desc: "يحجز مباشرة في الكاليندر بدون تدخل بشري." },
    { icon: Headset, title: "تصعيد ذكي", desc: "المحادثات الصعبة تروح لموظف حقيقي فوراً." },
    { icon: TrendingUp, title: "تأهيل العملاء المحتملين", desc: "يفرز العميل الجاد من المتصفح بس." },
    { icon: MessageCircle, title: "على كل القنوات", desc: "واتساب، الموقع، انستجرام — قناة واحدة أو أكتر." },
  ],
  steps: [
    { title: "نحدد الأسئلة الشائعة", desc: "نجمع أكتر استفسارات بتتكرر فعلياً." },
    { title: "ندرّب البوت", desc: "على بيانات ولغة شركتك تحديداً." },
    { title: "نربطه بأنظمتك", desc: "الكاليندر، الـ CRM، وقاعدة المعرفة." },
    { title: "نطلقه ونحسّنه", desc: "متابعة أسبوعية لتحسين الردود." },
  ],
  proofImage: {
    placeholderNote: "ضع هنا (اختياري): لقطة إحصائيات فعلية (عدد محادثات، متوسط وقت الرد)",
  },
  ctaTitle: "عايز بوت يرد على عملائك من دلوقتي؟",
  ctaSub: "نبني لك نموذج تجريبي مبني على أسئلة عملائك الفعلية.",
};
