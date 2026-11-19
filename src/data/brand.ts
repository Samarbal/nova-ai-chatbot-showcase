import heroHeadphonesImg from '../assets/images/hero_nova_headphones_1795113308915.jpg';

export { BRAND_INFO, NAV_LINKS, WHY_NOVA_BENEFITS } from './brandData';

export const HERO_CONTENT = {
  kicker: {
    ar: 'NOVA · صوتيات · طاقة · مكتب',
    en: 'NOVA · Audio · Power · Desk',
  },
  headlineLine1: {
    ar: 'عتادٌ مصمم',
    en: 'Sound & Desk',
  },
  headlineLine2: {
    ar: 'بجرأة ووضوح.',
    en: 'Reimagined.',
  },
  description: {
    ar: 'سماعات لاسلكية بعزل ضوضاء متوازن، قواعد شحن مغناطيسية، ومستلزمات مكتب من الألمنيوم المصقول — بهوية عصرية واضحة.',
    en: 'Balanced wireless headphones, weighted magnetic charging docks, and machined aluminum desk essentials engineered for everyday focus.',
  },
  primaryCtaLabel: {
    ar: 'استكشف المجموعة',
    en: 'Explore Collection',
  },
  primaryCtaHref: '#products',
  secondaryCtaLabel: {
    ar: 'تواصل معنا',
    en: 'Contact Us',
  },
  secondaryCtaHref: '#contact',
  selectorLabel: {
    ar: 'اختر قطعة لمعاينتها مباشرة',
    en: 'Select a hero product preview',
  },
  inspectActionLabel: {
    ar: 'عرض في المعرض',
    en: 'View in Showcase',
  },
  featuredVisual: {
    productId: 'nova-arc-anc',
    imagePath: heroHeadphonesImg,
    imageAlt: {
      ar: 'سماعات NOVA Arc ANC اللاسلكية باللون الكحلي المطفي على قاعدة خرسانية باردة بإضاءة استوديو حادة',
      en: 'NOVA Arc ANC wireless headphones in matte navy with titanium accents resting on a cool slate studio plinth',
    },
  },
} as const;
