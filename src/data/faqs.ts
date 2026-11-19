import type { FAQItem } from '../types/nova.ts';

export const DEMO_FAQS: FAQItem[] = [
  {
    id: 'faq-demo-store',
    question: {
      ar: 'هل NOVA متجر حقيقي يمكنني الشراء منه الآن؟',
      en: 'Is NOVA a real store where I can place an order?',
    },
    answer: {
      ar: 'لا. NOVA علامة تجارية تخيلية أُنشئت كمشروع عرض احترافي لصفحات الهبوط التجارية. الأسعار والسياسات ونموذج الاستفسار تعمل محلياً للتجربة فقط.',
      en: 'No. NOVA is a fictional Tech & Lifestyle brand built as a portfolio storefront showcase. Prices, policies, and the inquiry form operate locally for demonstration only.',
    },
  },
  {
    id: 'faq-arc-compatibility',
    question: {
      ar: 'هل تتصل سماعات NOVA Arc بالحاسوب والهاتف في الوقت نفسه؟',
      en: 'Do NOVA Arc headphones connect to a laptop and phone simultaneously?',
    },
    answer: {
      ar: 'وفق مواصفة العرض، تدعم السماعات الاقتران متعدد النقاط عبر Bluetooth 5.4 بجهازين في آنٍ واحد، إلى جانب الاتصال السلكي عبر USB-C دون تأخير.',
      en: 'In our demo hardware spec, NOVA Arc supports Bluetooth 5.4 multipoint pairing across two active devices plus wired USB-C audio for zero-latency desk use.',
    },
  },
  {
    id: 'faq-gan-charging',
    question: {
      ar: 'هل يكفي شاحن NOVA Core 65W لتشغيل حاسوب محمول وهاتف معاً؟',
      en: 'Can NOVA Core 65W GaN power a laptop and phone together?',
    },
    answer: {
      ar: 'نعم. عند استخدام منفذ واحد يقدم قدرة تصل إلى 65W للحواسيب المحمولة، وعند توصيل جهازين يوزع الطاقة تلقائياً بواقع 45W و20W.',
      en: 'Yes. Using a single USB-C port delivers up to 65W for ultrabooks; when both ports are active, output splits dynamically at 45W + 20W.',
    },
  },
  {
    id: 'faq-chatbot-roadmap',
    question: {
      ar: 'هل الصفحة جاهزة لربط مساعد دعم ذكي مستقبلاً؟',
      en: 'Is the architecture ready for a future AI support widget?',
    },
    answer: {
      ar: 'نعم. تتضمن البنية البرمجية موضع دمج مخصصاً ومكتوب الأنواع لاستقبال أداة محادثة عائمة مرتبطة مباشرة بملفات المنتجات والسياسات والأسئلة الشائعة.',
      en: 'Yes. The codebase includes a typed integration slot wired to the structured catalog, policy, and FAQ data so a floating AI widget can mount cleanly later.',
    },
  },
];
