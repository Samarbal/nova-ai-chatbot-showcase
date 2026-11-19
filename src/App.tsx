import { useEffect, useRef, useState } from 'react';
import { MotionConfig } from 'motion/react';
import { CategoriesSection } from './components/CategoriesSection';
import { ChatbotWidgetSlot } from './components/ChatbotWidgetSlot';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { Navbar } from './components/Navbar';
import { ProductsSection } from './components/ProductsSection';
import { WhyNovaSection } from './components/WhyNovaSection';
import { CATEGORIES, FEATURED_PRODUCTS } from './data/catalog';
import { DEMO_FAQS } from './data/faqs';
import { UI_DICTIONARY } from './data/i18n';
import { DEMO_POLICIES } from './data/policies';
import { CategoryId, InquiryProductId, Language, Product } from './types/nova';

const LANGUAGE_STORAGE_KEY = 'nova-lang';

function getInitialLanguage(): Language {
  try {
    const saved = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (saved === 'en' || saved === 'ar') {
      return saved;
    }
  } catch {
    // Ignore storage read errors in restricted environments
  }
  return 'ar';
}

export default function App() {
  const [language, setLanguage] = useState<Language>(getInitialLanguage);
  const [activeCategory, setActiveCategory] = useState<CategoryId | 'all'>('all');
  const [activeProductId, setActiveProductId] = useState<string>(FEATURED_PRODUCTS[0].id);
  const [selectedProductId, setSelectedProductId] = useState<InquiryProductId>('general');
  const nameInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const html = document.documentElement;
    html.lang = language;
    html.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.title = UI_DICTIONARY[language].metaTitle;

    try {
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    } catch {
      // Ignore storage write errors in restricted environments
    }
  }, [language]);

  const handleToggleLanguage = () => {
    setLanguage((prev) => (prev === 'ar' ? 'en' : 'ar'));
  };

  const handleCategoryChange = (category: CategoryId | 'all') => {
    setActiveCategory(category);
    if (category !== 'all') {
      const firstMatch = FEATURED_PRODUCTS.find((item) => item.categoryId === category);
      if (firstMatch) {
        setActiveProductId(firstMatch.id);
      }
    }
  };

  const handleSelectCategoryFromCard = (categoryId: CategoryId) => {
    handleCategoryChange(categoryId);
    const productsEl = document.getElementById('products');
    productsEl?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleInspectFeaturedProduct = (productId: string) => {
    setActiveCategory('all');
    setActiveProductId(productId);
    const productsEl = document.getElementById('products');
    productsEl?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleInquireProduct = (product: Product) => {
    setSelectedProductId(product.id);
    const contactEl = document.getElementById('contact');
    contactEl?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    window.setTimeout(() => {
      nameInputRef.current?.focus({ preventScroll: true });
    }, 350);
  };

  const t = UI_DICTIONARY[language];

  return (
    <MotionConfig reducedMotion="user">
      <div
        dir={language === 'ar' ? 'rtl' : 'ltr'}
        className="min-h-screen bg-[#F6F5FF] text-[#111325]"
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-[#1629D8] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
        >
          {t.accessibility.skipToContent}
        </a>

        <Navbar language={language} onToggleLanguage={handleToggleLanguage} />

        <main id="main-content">
          <HeroSection
            language={language}
            onInspectFeaturedProduct={handleInspectFeaturedProduct}
          />
          <CategoriesSection
            language={language}
            onSelectCategory={handleSelectCategoryFromCard}
          />
          <ProductsSection
            language={language}
            activeCategory={activeCategory}
            activeProductId={activeProductId}
            onCategoryChange={handleCategoryChange}
            onSelectProduct={setActiveProductId}
            onInquireProduct={handleInquireProduct}
          />
          <WhyNovaSection language={language} />
          <ContactSection
            language={language}
            selectedProductId={selectedProductId}
            onSelectedProductChange={setSelectedProductId}
            nameInputRef={nameInputRef}
          />
        </main>

        <Footer language={language} />

        {/* Standalone AI Customer Support Chatbot Widget */}
        <ChatbotWidgetSlot
          enabled={true}
          supportContext={{
            language,
            products: FEATURED_PRODUCTS,
            categories: CATEGORIES,
            policies: DEMO_POLICIES,
            faqs: DEMO_FAQS,
            onSelectProductInquiry: handleInquireProduct,
          }}
        />
      </div>
    </MotionConfig>
  );
}
