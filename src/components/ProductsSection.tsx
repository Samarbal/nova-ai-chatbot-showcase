import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { MessageSquare, RotateCcw } from 'lucide-react';
import { CATEGORIES, FEATURED_PRODUCTS } from '../data/catalog';
import { UI_DICTIONARY } from '../data/i18n';
import { CategoryId, Language, Product } from '../types/nova';
import { ProductImage } from './ProductImage';

interface ProductsSectionProps {
  language: Language;
  activeCategory: CategoryId | 'all';
  activeProductId: string;
  onCategoryChange: (category: CategoryId | 'all') => void;
  onSelectProduct: (productId: string) => void;
  onInquireProduct: (product: Product) => void;
}

export function ProductsSection({
  language,
  activeCategory,
  activeProductId,
  onCategoryChange,
  onSelectProduct,
  onInquireProduct,
}: ProductsSectionProps) {
  const shouldReduceMotion = useReducedMotion();
  const t = UI_DICTIONARY[language];

  const filteredProducts =
    activeCategory === 'all'
      ? FEATURED_PRODUCTS
      : FEATURED_PRODUCTS.filter((product) => product.categoryId === activeCategory);

  const activeProduct =
    filteredProducts.find((product) => product.id === activeProductId) ??
    filteredProducts[0] ??
    FEATURED_PRODUCTS[0];

  const filterOptions: Array<{ id: CategoryId | 'all'; label: string; count: number }> = [
    { id: 'all', label: t.showcase.allFilterLabel, count: FEATURED_PRODUCTS.length },
    ...CATEGORIES.map((category) => ({
      id: category.id,
      label: category.name[language],
      count: FEATURED_PRODUCTS.filter((product) => product.categoryId === category.id).length,
    })),
  ];

  return (
    <section
      id="products"
      aria-labelledby="products-heading"
      className="border-b border-[#111325]/10 bg-white py-16 sm:py-24"
    >
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        {/* Section Header & Electric Cobalt Filter Bar */}
        <div className="mb-10 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2.5">
              <span aria-hidden="true" className="h-[3px] w-7 bg-[#1629D8]" />
              <p className="text-xs font-bold tracking-wide text-[#1629D8]">
                {t.showcase.eyebrow}
              </p>
            </div>
            <h2
              id="products-heading"
              className="text-balance text-2xl font-extrabold tracking-tight text-[#111325] sm:text-3xl"
            >
              {t.showcase.heading}
            </h2>
            <p className="max-w-xl text-sm leading-relaxed text-[#4B506B]">
              {t.showcase.subtitle}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <div
              role="group"
              aria-label={t.accessibility.filterGroup}
              className="inline-flex flex-wrap items-center gap-1 rounded-xl border border-[#111325]/10 bg-[#F6F5FF] p-1"
            >
              {filterOptions.map((option) => {
                const isSelected = activeCategory === option.id;
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => onCategoryChange(option.id)}
                    aria-pressed={isSelected}
                    className={`relative min-h-[40px] whitespace-nowrap shrink-0 rounded-lg px-3.5 py-1.5 text-xs font-bold transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1629D8] ${
                      isSelected ? 'text-white' : 'text-[#4B506B] hover:text-[#111325]'
                    }`}
                  >
                    {isSelected && (
                      <motion.span
                        layoutId="active-category-pill"
                        transition={{ type: 'spring', stiffness: 360, damping: 32 }}
                        className="absolute inset-0 rounded-lg bg-[#1629D8]"
                      />
                    )}
                    <span className="relative z-10">
                      {option.label} ({option.count})
                    </span>
                  </button>
                );
              })}
            </div>

            {activeCategory !== 'all' && (
              <button
                type="button"
                onClick={() => onCategoryChange('all')}
                className="inline-flex min-h-[40px] items-center gap-1.5 whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-bold text-[#1629D8] transition-colors duration-150 hover:bg-[#F6F5FF] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1629D8]"
              >
                <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                <span>{t.showcase.resetFilterLabel}</span>
              </button>
            )}
          </div>
        </div>

        {/* Main Interactive Product Stage */}
        <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-12 lg:gap-8">
          {/* Large Featured Product Visual */}
          <div className="lg:col-span-7">
            <div className="relative aspect-[4/3] h-full w-full overflow-hidden rounded-3xl border border-[#111325]/10 bg-[#F6F5FF]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeProduct.id}
                  initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.985 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={shouldReduceMotion ? undefined : { opacity: 0, scale: 1.01 }}
                  transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
                  className="h-full w-full"
                >
                  <ProductImage
                    src={activeProduct.imagePath}
                    alt={activeProduct.imageAlt[language]}
                    fallbackTitle={activeProduct.name[language]}
                    language={language}
                    className="h-full w-full object-cover"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Deep Ink Product Details Panel with Lavender & Lime Accents */}
          <div className="flex flex-col justify-between rounded-3xl bg-[#111325] p-6 text-white sm:p-8 lg:col-span-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeProduct.id}-${language}`}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={shouldReduceMotion ? undefined : { opacity: 0, y: -6 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-1 flex-col justify-between gap-6"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#AE8CFF]">
                    <span>{activeProduct.categoryLabel[language]}</span>
                    <span aria-hidden="true">·</span>
                    <span>{activeProduct.demoStatus[language]}</span>
                  </div>

                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="text-2xl font-extrabold tracking-tight text-white">
                      {activeProduct.name[language]}
                    </h3>
                    <span
                      dir="ltr"
                      className="font-latin shrink-0 text-2xl font-extrabold tabular-nums text-[#B5F25B]"
                    >
                      ${activeProduct.price}
                    </span>
                  </div>

                  <p className="text-sm leading-relaxed text-[#E2E8F0] sm:text-base">
                    {activeProduct.shortDescription[language]}
                  </p>

                  <div className="border-t border-white/15 pt-4">
                    <p className="mb-2.5 text-xs font-bold text-[#AE8CFF]">
                      {t.showcase.specsHeading}
                    </p>
                    <ul className="space-y-2 text-sm text-[#F6F5FF]">
                      {activeProduct.specs[language].map((spec) => (
                        <li key={spec} className="flex items-center gap-2.5">
                          <span aria-hidden="true" className="text-[#AE8CFF]">
                            ·
                          </span>
                          <span>{spec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="border-t border-white/15 pt-5">
                  <motion.button
                    type="button"
                    whileTap={shouldReduceMotion ? undefined : { scale: 0.985 }}
                    onClick={() => onInquireProduct(activeProduct)}
                    className="inline-flex min-h-[50px] w-full items-center justify-center gap-2.5 whitespace-nowrap rounded-xl bg-[#B5F25B] px-6 py-3 text-sm font-bold text-[#111325] transition-colors duration-150 hover:bg-[#c5f779] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B5F25B]"
                  >
                    <MessageSquare className="h-4 w-4 shrink-0" aria-hidden="true" />
                    <span>{t.showcase.inquireButton}</span>
                  </motion.button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Selectable Product Strip */}
        <div
          role="group"
          aria-label={t.accessibility.productSelector}
          className={`mt-6 grid gap-3 sm:gap-4 ${
            filteredProducts.length === 1
              ? 'grid-cols-1 sm:max-w-sm'
              : filteredProducts.length === 2
                ? 'grid-cols-2 lg:grid-cols-2'
                : 'grid-cols-2 lg:grid-cols-4'
          }`}
        >
          {filteredProducts.map((product) => {
            const isSelected = product.id === activeProduct.id;

            return (
              <motion.button
                key={product.id}
                type="button"
                onClick={() => onSelectProduct(product.id)}
                aria-pressed={isSelected}
                whileTap={shouldReduceMotion ? undefined : { scale: 0.985 }}
                className={`group relative flex flex-col overflow-hidden rounded-2xl border-2 text-start transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1629D8] ${
                  isSelected
                    ? 'border-[#1629D8] bg-[#F6F5FF] shadow-sm'
                    : 'border-[#111325]/10 bg-[#F6F5FF]/60 hover:border-[#AE8CFF] hover:bg-white'
                }`}
              >
                <div className="aspect-[4/3] w-full overflow-hidden bg-[#EAE8FA]">
                  <ProductImage
                    src={product.imagePath}
                    alt={product.imageAlt[language]}
                    fallbackTitle={product.name[language]}
                    language={language}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="flex flex-1 flex-col justify-between gap-1.5 p-3.5 sm:p-4">
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-sm font-bold leading-snug text-[#111325]">
                      {product.name[language]}
                    </span>
                    <span
                      dir="ltr"
                      className="font-latin shrink-0 text-sm font-extrabold tabular-nums text-[#1629D8]"
                    >
                      ${product.price}
                    </span>
                  </div>
                  <span
                    className={`text-xs font-semibold ${
                      isSelected ? 'text-[#1629D8]' : 'text-[#4B506B]'
                    }`}
                  >
                    {isSelected ? t.showcase.activeIndicator : product.categoryLabel[language]}
                  </span>
                </div>

                {isSelected && (
                  <motion.span
                    layoutId="active-product-bar"
                    transition={{ type: 'spring', stiffness: 360, damping: 32 }}
                    className="absolute inset-x-0 bottom-0 h-[4px] bg-[#B5F25B]"
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
