import { Language } from '../types/nova';

export interface UiDictionary {
  metaTitle: string;
  accessibility: {
    skipToContent: string;
    primaryNav: string;
    mobileNav: string;
    footerNav: string;
    openMenu: string;
    closeMenu: string;
    filterGroup: string;
    productSelector: string;
    heroProductSelector: string;
    policyTabs: string;
    switchLanguage: string;
  };
  header: {
    primaryCta: string;
    mobileCta: string;
    languageShortLabel: string;
  };
  categories: {
    eyebrow: string;
    heading: string;
    subtitle: string;
    ctaLabel: string;
  };
  showcase: {
    eyebrow: string;
    heading: string;
    subtitle: string;
    allFilterLabel: string;
    resetFilterLabel: string;
    specsHeading: string;
    inquireButton: string;
    activeIndicator: string;
  };
  whyNova: {
    eyebrow: string;
    heading: string;
    subtitle: string;
  };
  contact: {
    eyebrow: string;
    heading: string;
    subtitle: string;
    demoNoticeTitle: string;
    demoNoticeBody: string;
    form: {
      productLabel: string;
      generalOption: string;
      nameLabel: string;
      namePlaceholder: string;
      emailLabel: string;
      emailPlaceholder: string;
      messageLabel: string;
      messagePlaceholderDefault: string;
      messagePlaceholderProduct: (productName: string) => string;
      submitButton: string;
    };
    validation: {
      nameRequired: string;
      emailInvalid: string;
      messageRequired: string;
    };
    confirmation: {
      title: string;
      description: string;
      fieldName: string;
      fieldEmail: string;
      fieldProduct: string;
      fieldMessage: string;
      resetButton: string;
    };
    accordion: {
      title: string;
      subtitle: string;
      policiesTab: string;
      faqsTab: string;
      shippingTag: string;
      returnsTag: string;
    };
  };
  imageFallback: {
    subtitle: string;
  };
  footer: {
    copyrightSuffix: string;
  };
}

export const UI_DICTIONARY: Record<Language, UiDictionary> = {
  ar: {
    metaTitle: 'NOVA — إكسسوارات تقنية وأسلوب حياة عصري',
    accessibility: {
      skipToContent: 'الانتقال إلى المحتوى الرئيسي',
      primaryNav: 'التنقل الرئيسي',
      mobileNav: 'قائمة الهاتف المحمول',
      footerNav: 'روابط التذييل',
      openMenu: 'فتح قائمة التنقل',
      closeMenu: 'إغلاق قائمة التنقل',
      filterGroup: 'تصفية المنتجات حسب الفئة',
      productSelector: 'اختيار منتج للعرض التفصيلي',
      heroProductSelector: 'تبديل المنتج المعروض في الواجهة الرئيسية',
      policyTabs: 'أقسام السياسات والأسئلة الشائعة',
      switchLanguage: 'Switch interface to English',
    },
    header: {
      primaryCta: 'استفسر الآن',
      mobileCta: 'استفسر عن منتج',
      languageShortLabel: 'EN',
    },
    categories: {
      eyebrow: 'الفئات',
      heading: 'ثلاث فئات مصممة لتكامل يومك',
      subtitle: 'اختر الفئة لاستعراض القطع التجريبية المطابقة مباشرة.',
      ctaLabel: 'تصفح الفئة',
    },
    showcase: {
      eyebrow: 'المعرض التفاعلي',
      heading: 'اختبر تفاصيل مجموعة NOVA',
      subtitle: 'اختر أي قطعة لاستعراض المواصفات والتفاصيل، ثم انتقل إلى الاستفسار بضغطة واحدة.',
      allFilterLabel: 'الكل',
      resetFilterLabel: 'عرض كل القطع',
      specsHeading: 'المواصفات الأساسية',
      inquireButton: 'استفسر عن هذا المنتج',
      activeIndicator: 'مختار حالياً',
    },
    whyNova: {
      eyebrow: 'لماذا NOVA',
      heading: 'تصميم يجمع بين الجرأة البصرية ووضوح التجربة',
      subtitle: 'مواصفات شفافة، سياسات شحن وإرجاع محددة، وخامات متناسقة بين الصوتيات والطاقة والمكتب.',
    },
    contact: {
      eyebrow: 'التواصل والسياسات',
      heading: 'استفسر عن منتج أو راجع سياسات العرض',
      subtitle: 'نموذج تفاعلي مع تعبئة تلقائية للمنتج المختار، وتحقق فوري، وإجابات واضحة حول الشحن والإرجاع.',
      demoNoticeTitle: 'نموذج عرض توضيحي فقط:',
      demoNoticeBody: 'يعمل التحقق من الحقول وتحديد المنتج محلياً في المتصفح دون إرسال أي بيانات أو رسائل فعلية.',
      form: {
        productLabel: 'المنتج محل الاستفسار',
        generalOption: 'استفسار عام',
        nameLabel: 'الاسم الكامل',
        namePlaceholder: 'سارة المنصور',
        emailLabel: 'البريد الإلكتروني',
        emailPlaceholder: 'name@example.com',
        messageLabel: 'سؤالك أو ملاحظتك',
        messagePlaceholderDefault: 'اكتب استفسارك حول الأبعاد أو التوافق أو سياسات العرض التوضيحية...',
        messagePlaceholderProduct: (productName: string) =>
          `استفسر عن مواصفات ${productName} أو التوافق أو تفاصيل الشحن التجريبي...`,
        submitButton: 'معاينة الاستفسار التجريبي',
      },
      validation: {
        nameRequired: 'يرجى إدخال الاسم (حرفان على الأقل).',
        emailInvalid: 'يرجى إدخال بريد إلكتروني صحيح.',
        messageRequired: 'يرجى كتابة رسالة قصيرة (10 أحرف على الأقل).',
      },
      confirmation: {
        title: 'تمت معاينة الاستفسار التجريبي',
        description: 'هذه معاينة واجهة فقط ضمن العرض التوضيحي، ولم يتم إرسال أي طلب إلى خادم أو بريد فعلي.',
        fieldName: 'الاسم',
        fieldEmail: 'البريد الإلكتروني',
        fieldProduct: 'المنتج المختار',
        fieldMessage: 'الرسالة',
        resetButton: 'تعديل أو تجربة استفسار آخر',
      },
      accordion: {
        title: 'الشحن والإرجاع والأسئلة الشائعة',
        subtitle: 'بنود عرض تخيلية منظمة في ملفات بيانات قابلة للتعديل.',
        policiesTab: 'الشحن والإرجاع',
        faqsTab: 'الأسئلة الشائعة',
        shippingTag: 'الشحن',
        returnsTag: 'الإرجاع والتغطية',
      },
    },
    imageFallback: {
      subtitle: 'معاينة منتج تجريبية',
    },
    footer: {
      copyrightSuffix: 'عرض تجريبي · NOVA',
    },
  },
  en: {
    metaTitle: 'NOVA — Tech & Lifestyle Accessories',
    accessibility: {
      skipToContent: 'Skip to main content',
      primaryNav: 'Primary navigation',
      mobileNav: 'Mobile navigation',
      footerNav: 'Footer navigation',
      openMenu: 'Open navigation menu',
      closeMenu: 'Close navigation menu',
      filterGroup: 'Filter products by category',
      productSelector: 'Select a product to inspect',
      heroProductSelector: 'Switch featured product in hero stage',
      policyTabs: 'Policy and FAQ sections',
      switchLanguage: 'التبديل إلى اللغة العربية',
    },
    header: {
      primaryCta: 'Inquire',
      mobileCta: 'Inquire About a Product',
      languageShortLabel: 'عربي',
    },
    categories: {
      eyebrow: 'Collections',
      heading: 'Three focused hardware categories',
      subtitle: 'Select a category to filter and jump straight to matching demo hardware.',
      ctaLabel: 'Explore Category',
    },
    showcase: {
      eyebrow: 'Interactive Showcase',
      heading: 'Explore the NOVA collection',
      subtitle: 'Select any item to inspect specifications, then prefill an inquiry in one click.',
      allFilterLabel: 'All',
      resetFilterLabel: 'Show all items',
      specsHeading: 'Key Specifications',
      inquireButton: 'Inquire About This Product',
      activeIndicator: 'Selected',
    },
    whyNova: {
      eyebrow: 'Why NOVA',
      heading: 'Bold clarity meets practical daily hardware',
      subtitle: 'Transparent specifications, documented demo policies, and cohesive materials across audio, power, and desk.',
    },
    contact: {
      eyebrow: 'Contact & Demo Policies',
      heading: 'Inquire about a product or review demo terms',
      subtitle: 'Test live product prefill, client-side validation, and editable shipping, return, and FAQ disclosures.',
      demoNoticeTitle: 'Demo-only preview form:',
      demoNoticeBody: 'Validation and product prefill run locally in your browser. No real message or email is transmitted.',
      form: {
        productLabel: 'Product of interest',
        generalOption: 'General Inquiry',
        nameLabel: 'Full name',
        namePlaceholder: 'Alex Morgan',
        emailLabel: 'Email address',
        emailPlaceholder: 'name@example.com',
        messageLabel: 'Question or note',
        messagePlaceholderDefault: 'Ask about dimensions, device compatibility, or demo policies...',
        messagePlaceholderProduct: (productName: string) =>
          `Ask about ${productName} specs, compatibility, or demo shipping...`,
        submitButton: 'Preview Demo Inquiry',
      },
      validation: {
        nameRequired: 'Please enter your name (at least 2 characters).',
        emailInvalid: 'Please enter a valid email address.',
        messageRequired: 'Please include a short note (at least 10 characters).',
      },
      confirmation: {
        title: 'Demo Inquiry Preview Ready',
        description: 'This is a portfolio demonstration only—no backend request was sent and no team member was notified.',
        fieldName: 'Name',
        fieldEmail: 'Email',
        fieldProduct: 'Selected Product',
        fieldMessage: 'Message',
        resetButton: 'Edit or Test Another Inquiry',
      },
      accordion: {
        title: 'Shipping, Returns & FAQs',
        subtitle: 'Fictional demo policies sourced directly from editable data modules.',
        policiesTab: 'Shipping & Returns',
        faqsTab: 'FAQs',
        shippingTag: 'Shipping',
        returnsTag: 'Returns & Coverage',
      },
    },
    imageFallback: {
      subtitle: 'Demo product preview',
    },
    footer: {
      copyrightSuffix: 'NOVA Demo',
    },
  },
};
