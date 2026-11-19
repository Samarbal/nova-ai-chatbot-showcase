import type { Category, Product } from '../types/nova.ts';

export type CategoryData = Omit<Category, 'imagePath'>;
export type ProductData = Omit<Product, 'imagePath'>;

export const CATALOG_CATEGORIES: CategoryData[] = [
  {
    id: 'audio',
    indexLabel: '01',
    name: { ar: 'الصوتيات', en: 'Audio' },
    tagline: {
      ar: 'عزل ضوضاء متوازن وراحة يومية',
      en: 'Balanced wireless acoustics',
    },
    imageAlt: {
      ar: 'سماعات رأس لاسلكية باللون الكحلي المطفي مع علبة شحن تيتانيوم على قاعدة خرسانية رمادية',
      en: 'Matte slate-navy wireless over-ear headphones and brushed titanium earbud case on cool concrete plinth',
    },
  },
  {
    id: 'charging',
    indexLabel: '02',
    name: { ar: 'حلول الشحن', en: 'Charging' },
    tagline: {
      ar: 'شحن مغناطيسي ومحولات GaN مدمجة',
      en: 'Magnetic & compact GaN power',
    },
    imageAlt: {
      ar: 'حامل شحن لاسلكي مغناطيسي من الألمنيوم المصقول بجانب كابل USB-C مجدول على سطح صخري رمادي',
      en: 'Brushed silver-gray aluminum magnetic wireless charging stand beside a coiled dark braided USB-C cable',
    },
  },
  {
    id: 'desk',
    indexLabel: '03',
    name: { ar: 'مستلزمات المكتب', en: 'Desk Essentials' },
    tagline: {
      ar: 'أدوات ألمنيوم دقيقة لترتيب العمل',
      en: 'Machined workspace tools',
    },
    imageAlt: {
      ar: 'حامل حاسوب محمول من الألمنيوم ولوحة مكتب صوفية رمادية وموزع USB-C على سطح رمادي بارد',
      en: 'Anodized slate aluminum laptop stand, charcoal wool desk mat, and slim USB-C hub on a cool matte desk',
    },
  },
];

export const CATALOG_PRODUCTS: ProductData[] = [
  {
    id: 'nova-arc-anc',
    name: {
      ar: 'سماعات NOVA Arc ANC',
      en: 'NOVA Arc ANC Headphones',
    },
    categoryId: 'audio',
    categoryLabel: { ar: 'الصوتيات', en: 'Audio' },
    price: 249,
    shortDescription: {
      ar: 'عزل ضوضاء هجين ووسائد ميموري فوم مع بطارية تدوم حتى 42 ساعة للتركيز اليومي.',
      en: 'Hybrid active noise cancellation, memory-foam cushions, and up to 42 hours of playback in a matte navy shell.',
    },
    specs: {
      ar: ['42 ساعة تشغيل متواصل', 'Bluetooth 5.4 متعدد الأجهزة', 'منفذ صوت USB-C · وزن 265 جم'],
      en: ['42h continuous playback', 'Multipoint Bluetooth 5.4', 'Lossless USB-C audio · 265g'],
    },
    imageAlt: {
      ar: 'سماعات NOVA Arc ANC اللاسلكية باللون الكحلي المطفي على خلفية رمادية باردة',
      en: 'NOVA Arc ANC wireless headphones in deep matte navy with brushed titanium yokes on cool slate mist backdrop',
    },
    demoStatus: { ar: 'إصدار عرض رئيسي', en: 'Demo Flagship' },
  },
  {
    id: 'nova-pulse-dock',
    name: {
      ar: 'قاعدة NOVA Pulse 3 في 1',
      en: 'NOVA Pulse 3-in-1 Dock',
    },
    categoryId: 'charging',
    categoryLabel: { ar: 'حلول الشحن', en: 'Charging' },
    price: 129,
    shortDescription: {
      ar: 'قاعدة شحن مغناطيسية موزونة تشحن الهاتف والساعة والسماعات معاً في نقطة واحدة.',
      en: 'Weighted anodized aluminum stand delivering simultaneous magnetic phone, watch, and earbud charging.',
    },
    specs: {
      ar: ['شحن لاسلكي Qi2 بقدرة 15W', 'قاعدة معدنية موزونة مانعة للانزلاق', 'مدخل USB-C خلفي مخفي'],
      en: ['15W Qi2 magnetic wireless', 'Weighted anti-slip metal base', 'Rear-routed USB-C input'],
    },
    imageAlt: {
      ar: 'قاعدة شحن NOVA Pulse المغناطيسية ثلاثية الأجهزة على سطح خرساني رمادي بارد',
      en: 'NOVA Pulse 3-in-1 magnetic wireless charging stand holding phone, watch, and earbuds on cool gray concrete',
    },
    demoStatus: { ar: 'إصدار تجريبي', en: 'Demo Edition' },
  },
  {
    id: 'nova-folio-hub',
    name: {
      ar: 'موزع مكتب NOVA Folio 7-in-1',
      en: 'NOVA Folio 7-Port Hub',
    },
    categoryId: 'desk',
    categoryLabel: { ar: 'مستلزمات المكتب', en: 'Desk Essentials' },
    price: 89,
    shortDescription: {
      ar: 'موزع من كتلة ألمنيوم موحّدة يضم سبعة منافذ أساسية مع مثبت كابلات مغناطيسي مرفق.',
      en: 'Single-block aluminum USB-C hub with 4K HDMI, gigabit ethernet, 100W passthrough, and a weighted cable anchor.',
    },
    specs: {
      ar: ['مخرج 4K HDMI ومنفذ إيثرنت جيجابت', 'تمرير طاقة 100W PD', 'مثبت كابلات مغناطيسي مرفق'],
      en: ['4K HDMI & Gigabit Ethernet', '100W USB-C PD passthrough', 'Weighted magnetic cable anchor'],
    },
    imageAlt: {
      ar: 'موزع USB-C من الألمنيوم الفضي بسبعة منافذ مع مثبت كابل مغناطيسي على سطح رمادي بارد',
      en: 'NOVA Folio machined silver-aluminum 7-port USB-C hub with weighted magnetic cable anchor on cool slate surface',
    },
    demoStatus: { ar: 'إصدار تجريبي', en: 'Demo Edition' },
  },
  {
    id: 'nova-core-gan',
    name: {
      ar: 'شاحن NOVA Core GaN 65W',
      en: 'NOVA Core 65W GaN Charger',
    },
    categoryId: 'charging',
    categoryLabel: { ar: 'حلول الشحن', en: 'Charging' },
    price: 54,
    shortDescription: {
      ar: 'محول جداري مدمج بمنفذي USB-C لشحن الحاسوب والهاتف مع كابل مجدول بطول مترين.',
      en: 'Pocket-sized dual USB-C GaN wall adapter with foldable prongs and a 2-meter slate braided charging cable.',
    },
    specs: {
      ar: ['منفذا USB-C بقدرة إجمالية 65W', 'توزيع ذكي 45W + 20W', 'كابل مجدول مرفق بطول 2م'],
      en: ['65W dual USB-C output', 'Dynamic 45W + 20W split', '2m braided USB-C cable included'],
    },
    imageAlt: {
      ar: 'شاحن جداري NOVA Core باللون الأزرق الداكن بقدرة 65W مع كابل مجدول على سطح رمادي بارد',
      en: 'NOVA Core midnight-blue 65W GaN dual USB-C wall charger next to a coiled braided cable on cool mist stone',
    },
    demoStatus: { ar: 'قطعة يومية تجريبية', en: 'Demo Essential' },
  },
];
