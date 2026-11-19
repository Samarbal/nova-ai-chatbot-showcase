import type { BusinessKnowledge } from '../backend/src/types/chat.ts';
import type { ChatbotConfig, ChatbotLanguage } from '../widget/src/types/index.ts';

/**
 * Sample client knowledge profile for the backend.
 * Duplicate and customize this object (or load JSON from faq.example.json)
 * when deploying the chatbot for a new client website.
 */
export const EXAMPLE_BACKEND_KNOWLEDGE: BusinessKnowledge = {
  id: 'acme-studio',
  businessName: 'Acme Hardware Co.',
  isDemo: false,
  businessDescription: {
    en: 'Boutique studio crafting ergonomic desk lamps, mechanical keyboards, and aluminum monitor risers.',
    ar: 'استوديو متخصص في مصابيح المكتب المريحة ولوحات المفاتيح الميكانيكية وحوامل الشاشات المصنوعة من الألمنيوم.',
  },
  products: [
    {
      id: 'acme-lamp-pro',
      name: { en: 'Acme Halo Desk Lamp', ar: 'مصباح مكتب Acme Halo' },
      category: { en: 'Lighting', ar: 'الإضاءة' },
      price: 135,
      currency: '$',
      description: {
        en: 'CRI 97+ glare-free LED task lamp with rotary brightness and color-temperature dial.',
        ar: 'مصباح مكتب LED بدقة ألوان +97 CRI دون توهج مع قرص دوار لضبط السطوع ودرجة الحرارة اللونية.',
      },
      specs: {
        en: ['2700K–5500K stepless dimming', 'Weighted cast-aluminum base', 'USB-C powered'],
        ar: ['تعتيم متدرج 2700K–5500K', 'قاعدة ألمنيوم موزونة', 'تشغيل عبر منفذ USB-C'],
      },
    },
  ],
  policies: [
    {
      id: 'acme-shipping',
      category: 'shipping',
      title: { en: 'Shipping', ar: 'الشحن' },
      summary: { en: 'Ships in 1–2 business days', ar: 'يُشحن خلال يوم إلى يومي عمل' },
      details: {
        en: 'Free ground shipping on orders over $95 within the US and Canada.',
        ar: 'شحن أرضي مجاني للطلبات فوق $95 داخل الولايات المتحدة وكندا.',
      },
    },
  ],
  faqs: [
    {
      id: 'faq-warranty',
      question: {
        en: 'What warranty is included?',
        ar: 'ما مدة الضمان المشمول؟',
      },
      answer: {
        en: 'Every Acme Hardware product includes a 2-year replacement warranty covering hardware and power faults.',
        ar: 'تشمل كل منتجات Acme Hardware ضمان استبدال لمدة عامين يغطي الأعطال المصنعية والطاقة.',
      },
    },
  ],
  maxFaqEntries: 15,
};

/**
 * Sample client widget configuration.
 * Pass this object to <ChatbotWidget config={...} /> or window.SupportChatbot.init({ config }).
 */
export function createExampleWidgetConfig(language: ChatbotLanguage = 'en'): ChatbotConfig {
  return {
    assistantName: {
      en: 'Acme Support',
      ar: 'دعم Acme',
    },
    assistantSubtitle: {
      en: 'Product specs, shipping & returns',
      ar: 'المواصفات والشحن والإرجاع',
    },
    welcomeMessage: {
      en: 'Hello! Ask me about Acme products, shipping timelines, or our 2-year warranty.',
      ar: 'مرحباً! اسألني عن منتجات Acme أو مواعيد الشحن أو ضمان العامين.',
    },
    primaryColor: '#1E293B',
    theme: {
      primaryColor: '#1E293B',
      accentColor: '#10B981',
      secondaryAccentColor: '#38BDF8',
      headerBackground: '#0F172A',
      surfaceColor: '#F8FAFC',
    },
    language,
    position: language === 'ar' ? 'bottom-left' : 'bottom-right',
    suggestedQuestions: {
      en: [
        'Tell me about the Acme Halo Desk Lamp',
        'Do you offer free shipping?',
        'What warranty is included?',
      ],
      ar: [
        'ما مواصفات مصباح مكتب Acme Halo؟',
        'هل يتوفر شحن مجاني؟',
        'ما مدة الضمان المشمول؟',
      ],
    },
    businessDescription: EXAMPLE_BACKEND_KNOWLEDGE.businessDescription,
    apiEndpoint: '/api/chat',
    knowledgeId: EXAMPLE_BACKEND_KNOWLEDGE.id,
  };
}

export const EXAMPLE_CHATBOT_CONFIG: ChatbotConfig = createExampleWidgetConfig('en');
