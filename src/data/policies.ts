import type { PolicyItem } from '../types/nova.ts';

export const DEMO_POLICIES: PolicyItem[] = [
  {
    id: 'shipping-standard',
    category: 'shipping',
    title: {
      ar: 'الشحن القياسي والسريع (تجريبي)',
      en: 'Standard & Express Demo Shipping',
    },
    summary: {
      ar: 'شحن قياسي مجاني للطلبات فوق $100',
      en: 'Free standard shipping over $100 (Demo)',
    },
    details: {
      ar: 'في هذا النموذج التخيلي، تُجهز الطلبات قبل الساعة 2:00 ظهراً خلال يوم إلى يومي عمل. يستغرق الشحن القياسي 3–5 أيام عمل ($8 دون $100 ومجاني فوقها)، ويتوفر الشحن السريع خلال يومين مقابل $18.',
      en: 'In this fictional specification, orders placed before 2:00 PM dispatch within 1–2 business days. Standard ground delivery takes 3–5 business days ($8 flat rate under $100, free at $100+); express 2-day air is $18.',
    },
  },
  {
    id: 'shipping-regions',
    category: 'shipping',
    title: {
      ar: 'نطاق التغطية والتتبع التخيلي',
      en: 'Supported Demo Regions & Tracking',
    },
    summary: {
      ar: 'مناطق محلية ودولية مختارة مع رقم تتبع',
      en: 'Select domestic & international zones',
    },
    details: {
      ar: 'توضح المواصفة التجريبية لمتجر NOVA الشحن إلى مناطق مختارة مع إتاحة رقم تتبع فور التجهيز، وعرض الرسوم الجمركية المقدرة بشفافية قبل الإتمام في النسخ الإنتاجية.',
      en: 'NOVA’s fictional fulfillment model covers the US, Canada, UK, and EU with tracking issued upon dispatch and transparent duties shown prior to checkout in live builds.',
    },
  },
  {
    id: 'returns-window',
    category: 'returns',
    title: {
      ar: 'سياسة الإرجاع خلال 30 يوماً',
      en: '30-Day Demo Return Policy',
    },
    summary: {
      ar: 'متاحة للقطع بحالتها الأصلية وكامل ملحقاتها',
      en: 'Unopened or gently tested items eligible',
    },
    details: {
      ar: 'يمكن إرجاع المنتجات التجريبية خلال 30 يوماً من الاستلام داخل عبوتها الأصلية مع الكابلات المرفقة. تتحمل العلامة تكلفة إرجاع القطع المعيبة، بينما يُحتسب رسم ثابت $6 لإرجاع التفضيل الشخصي.',
      en: 'Demo items may be returned within 30 calendar days of delivery in original packaging with included cables. Return labels are prepaid for defective items and $6 flat-rate for preference returns.',
    },
  },
  {
    id: 'warranty-coverage',
    category: 'returns',
    title: {
      ar: 'تغطية عتاد محدودة لمدة عامين',
      en: '2-Year Limited Hardware Coverage',
    },
    summary: {
      ar: 'تشمل عيوب التصنيع ومنافذ USB-C (تجريبي)',
      en: 'Covers manufacturing & port defects (Demo)',
    },
    details: {
      ar: 'تشمل سياسة NOVA التخيلية استبدال القطع التي تظهر بها أعطال تصنيع في البطارية أو المفاصل أو منافذ التوصيل خلال عامين من الاستخدام الطبيعي.',
      en: 'All NOVA audio, GaN power, and machined desk accessories carry a fictional 2-year replacement policy covering battery wear below 80%, hinge faults, and USB-C port defects.',
    },
  },
];
