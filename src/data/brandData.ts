import type { BenefitItem, LocalizedValue, NavLinkItem } from '../types/nova.ts';

export const BRAND_INFO: {
  name: string;
  tagline: LocalizedValue;
  demoNotice: LocalizedValue;
} = {
  name: 'NOVA',
  tagline: {
    ar: 'تقنية وأسلوب حياة',
    en: 'Tech & Lifestyle',
  },
  demoNotice: {
    ar: 'واجهة متجر تخيلية مصممة كعرض احترافي لصفحات الهبوط وتجربة المستخدم.',
    en: 'Fictional hardware storefront built as an interactive frontend portfolio showcase.',
  },
};

export const NAV_LINKS: NavLinkItem[] = [
  { href: '#categories', label: { ar: 'الفئات', en: 'Categories' } },
  { href: '#products', label: { ar: 'المعرض', en: 'Showcase' } },
  { href: '#why-nova', label: { ar: 'لماذا NOVA', en: 'Why NOVA' } },
  { href: '#contact', label: { ar: 'تواصل معنا', en: 'Contact' } },
];

export const WHY_NOVA_BENEFITS: BenefitItem[] = [
  {
    id: 'transparent-specs',
    indexLabel: '01',
    icon: 'shield',
    accent: 'lime',
    title: {
      ar: 'مواصفات واضحة بلا مبالغة',
      en: 'Transparent Demo Specifications',
    },
    description: {
      ar: 'نعرض الخامات، قدرات الشحن، والتسعير التخيلي بلغة مباشرة وشفافة دون وعود تسويقية مبالغ فيها.',
      en: 'Every listing pairs plain-language materials, power ratings, and fictional pricing without exaggerated claims or hidden bundles.',
    },
  },
  {
    id: 'predictable-fulfillment',
    indexLabel: '02',
    icon: 'truck',
    accent: 'lavender',
    title: {
      ar: 'سياسات شحن وإرجاع محددة',
      en: 'Clear Shipping & Return Terms',
    },
    description: {
      ar: 'جداول شحن تجريبية واضحة وإرجاع خلال 30 يوماً موثقة بالكامل بجانب نموذج التواصل لسهولة المراجعة.',
      en: 'Fictional dispatch windows and a 30-day return framework are published clearly right alongside every product inquiry.',
    },
  },
  {
    id: 'cohesive-materials',
    indexLabel: '03',
    icon: 'layers',
    accent: 'cobalt',
    title: {
      ar: 'تناغم بصري على مكتبك',
      en: 'Unified Desk & Carry Palette',
    },
    description: {
      ar: 'ألوان الكحلي المطفي والألمنيوم المؤكسد والكابلات المجدولة مصممة لتنسجم معاً في المكتب أو السفر.',
      en: 'Matte navy finishes, anodized aluminum, and woven cables are engineered to pair cleanly across home offices and travel kits.',
    },
  },
];
