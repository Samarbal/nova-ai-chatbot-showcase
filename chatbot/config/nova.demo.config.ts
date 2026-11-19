import type { BusinessKnowledge } from '../backend/src/types/chat.ts';
import type { ChatbotConfig, ChatbotLanguage } from '../widget/src/types/index.ts';
import { BRAND_INFO } from '../../src/data/brandData.ts';
import { CATALOG_CATEGORIES, CATALOG_PRODUCTS } from '../../src/data/catalogData.ts';
import { DEMO_FAQS } from '../../src/data/faqs.ts';
import { DEMO_POLICIES } from '../../src/data/policies.ts';

const categoryNameMap = new Map(
  CATALOG_CATEGORIES.map((category) => [category.id, category.name]),
);

/**
 * NOVA demo knowledge adapter built directly from NOVA's single-source-of-truth
 * data files (zero duplicated product, policy, or FAQ strings).
 */
export const NOVA_BACKEND_KNOWLEDGE: BusinessKnowledge = {
  id: 'nova-demo',
  businessName: `${BRAND_INFO.name} — ${BRAND_INFO.tagline.en}`,
  isDemo: true,
  demoDisclaimer: BRAND_INFO.demoNotice,
  businessDescription: {
    ar: 'علامة تخيلية لإكسسوارات التقنية وأسلوب الحياة تقدم سماعات لاسلكية، وحلول شحن GaN مغناطيسية، ومستلزمات مكتب من الألمنيوم المؤكسد.',
    en: 'Fictional Tech & Lifestyle consumer hardware storefront offering wireless ANC headphones, magnetic & GaN charging gear, and machined aluminum desk essentials.',
  },
  products: CATALOG_PRODUCTS.map((product) => ({
    id: product.id,
    name: product.name,
    category: categoryNameMap.get(product.categoryId) ?? product.categoryLabel,
    price: product.price,
    currency: '$',
    description: product.shortDescription,
    specs: product.specs,
    status: product.demoStatus,
  })),
  policies: DEMO_POLICIES.map((policy) => ({
    id: policy.id,
    category: policy.category,
    title: policy.title,
    summary: policy.summary,
    details: policy.details,
  })),
  faqs: DEMO_FAQS.map((faq) => ({
    id: faq.id,
    question: faq.question,
    answer: faq.answer,
  })),
  maxFaqEntries: 15,
  unavailableFallback: {
    ar: 'هذه المعلومة غير متوفرة في بيانات عرض NOVA الحالية. يمكنك استخدام نموذج الاستفسار أسفل الصفحة لتسجيل استفسارك التجريبي.',
    en: 'That detail is not included in NOVA’s current demo catalog. Please use the on-page inquiry form at the bottom of the page for further questions.',
  },
};

/**
 * Creates the NOVA Electric Playground widget configuration synced with the
 * active storefront language (Arabic RTL or English LTR).
 */
export function createNovaWidgetConfig(language: ChatbotLanguage): ChatbotConfig {
  return {
    assistantName: {
      ar: 'مساعد NOVA للدعم',
      en: 'NOVA Support Assistant',
    },
    assistantSubtitle: {
      ar: 'إجابات فورية عن المنتجات والشحن التجريبي',
      en: 'Instant answers on products & demo policies',
    },
    welcomeMessage: {
      ar: 'أهلاً بك في NOVA! اسألني عن سماعات Arc ANC أو شاحن Core 65W أو سياسات الشحن والإرجاع التجريبية.',
      en: 'Welcome to NOVA! Ask me about Arc ANC headphones, Core 65W GaN charging, or our demo shipping & 30-day return terms.',
    },
    primaryColor: '#1629D8',
    theme: {
      primaryColor: '#1629D8',
      primaryTextColor: '#FFFFFF',
      accentColor: '#B5F25B',
      accentTextColor: '#111325',
      secondaryAccentColor: '#AE8CFF',
      headerBackground: '#111325',
      headerTextColor: '#FFFFFF',
      surfaceColor: '#F6F5FF',
      cardColor: '#FFFFFF',
      textColor: '#111325',
      mutedTextColor: '#4B506B',
      borderColor: 'rgba(17, 19, 37, 0.14)',
    },
    language,
    position: language === 'ar' ? 'bottom-left' : 'bottom-right',
    suggestedQuestions: {
      ar: [
        'ما سعر ومواصفات سماعات NOVA Arc ANC؟',
        'كم تبلغ رسوم الشحن التجريبي وهل يوجد شحن مجاني؟',
        'هل يكفي شاحن Core 65W لتشغيل حاسوب وهاتف معاً؟',
        'ما هي سياسة الإرجاع خلال 30 يوماً؟',
      ],
      en: [
        'What are the specs and price of NOVA Arc ANC?',
        'How does demo shipping work and when is it free?',
        'Can Core 65W GaN charge a laptop and phone together?',
        'What is the 30-day demo return policy?',
      ],
    },
    businessDescription: NOVA_BACKEND_KNOWLEDGE.businessDescription,
    apiEndpoint: '/api/chat',
    knowledgeId: NOVA_BACKEND_KNOWLEDGE.id,
    maxMessageLength: 600,
    labels: {
      openButtonLabel: {
        ar: 'اسأل NOVA',
        en: 'Ask NOVA',
      },
      closeButtonLabel: {
        ar: 'إغلاق المحادثة',
        en: 'Close chat',
      },
      minimizeButtonLabel: {
        ar: 'تصغير المحادثة',
        en: 'Minimize chat',
      },
      inputPlaceholder: {
        ar: 'اسأل عن أي منتج أو سياسة...',
        en: 'Ask about any product or policy...',
      },
      sendButtonLabel: {
        ar: 'إرسال',
        en: 'Send',
      },
      retryButtonLabel: {
        ar: 'إعادة المحاولة',
        en: 'Retry',
      },
      typingLabel: {
        ar: 'مساعد NOVA يكتب...',
        en: 'NOVA Assistant is typing...',
      },
      suggestedHeading: {
        ar: 'أسئلة سريعة',
        en: 'Quick questions',
      },
    },
  };
}
