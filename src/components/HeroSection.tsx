import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowLeft, ArrowRight, ArrowUpLeft, ArrowUpRight } from 'lucide-react';
import { HERO_CONTENT } from '../data/brand';
import { FEATURED_PRODUCTS } from '../data/catalog';
import { UI_DICTIONARY } from '../data/i18n';
import { Language } from '../types/nova';
import { ProductImage } from './ProductImage';

interface HeroSectionProps {
  language: Language;
  onInspectFeaturedProduct: (productId: string) => void;
}

export function HeroSection({ language, onInspectFeaturedProduct }: HeroSectionProps) {
  const [heroProductId, setHeroProductId] = useState<string>(FEATURED_PRODUCTS[0].id);
  const shouldReduceMotion = useReducedMotion();
  const t = UI_DICTIONARY[language];

  const activeHeroProduct =
    FEATURED_PRODUCTS.find((item) => item.id === heroProductId) ?? FEATURED_PRODUCTS[0];

  // Use the bespoke hero headphone photography when flagship Arc ANC is selected
  const heroImageSrc =
    activeHeroProduct.id === HERO_CONTENT.featuredVisual.productId
      ? HERO_CONTENT.featuredVisual.imagePath
      : activeHeroProduct.imagePath;

  const heroImageAlt =
    activeHeroProduct.id === HERO_CONTENT.featuredVisual.productId
      ? HERO_CONTENT.featuredVisual.imageAlt[language]
      : activeHeroProduct.imageAlt[language];

  const DirectionalArrow = language === 'ar' ? ArrowLeft : ArrowRight;
  const InspectArrow = language === 'ar' ? ArrowUpLeft : ArrowUpRight;

  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative overflow-hidden bg-[#1629D8] py-10 text-white sm:py-14 lg:py-16"
    >
      {/* Clean geometric architectural framing in Deep Ink and Vibrant Lavender */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 end-0 hidden w-5/12 bg-[#111325]/25 lg:block"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 end-24 h-80 w-80 rounded-full border border-[#AE8CFF]/25"
      />

      <div className="relative mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Left/Start: Oversized Editorial Typography + Dual CTAs */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col justify-between gap-7 lg:col-span-5"
          >
            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <span aria-hidden="true" className="h-[2px] w-7 bg-[#B5F25B]" />
                <p className="text-xs font-bold tracking-wide text-[#AE8CFF]">
                  {HERO_CONTENT.kicker[language]}
                </p>
              </div>

              <h1
                id="hero-heading"
                className="text-balance text-[clamp(2.5rem,5vw,4.25rem)] font-extrabold leading-[1.06] tracking-tight text-white"
              >
                <span className="block">{HERO_CONTENT.headlineLine1[language]}</span>
                <span className="block text-[#B5F25B]">{HERO_CONTENT.headlineLine2[language]}</span>
              </h1>

              <p className="max-w-md text-base leading-relaxed text-[#F6F5FF]/90 sm:text-lg">
                {HERO_CONTENT.description[language]}
              </p>

              <div className="flex flex-wrap items-center gap-3.5 pt-1">
                <motion.a
                  href={HERO_CONTENT.primaryCtaHref}
                  whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
                  className="inline-flex min-h-[50px] items-center justify-center gap-2.5 whitespace-nowrap shrink-0 rounded-xl bg-[#B5F25B] px-7 py-3 text-base font-bold text-[#111325] transition-colors duration-150 hover:bg-[#c5f779] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B5F25B]"
                >
                  <span>{HERO_CONTENT.primaryCtaLabel[language]}</span>
                  <DirectionalArrow className="h-4 w-4 shrink-0" aria-hidden="true" />
                </motion.a>

                <motion.a
                  href={HERO_CONTENT.secondaryCtaHref}
                  whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
                  className="inline-flex min-h-[50px] items-center justify-center whitespace-nowrap shrink-0 rounded-xl border border-white/30 bg-[#111325]/35 px-6 py-3 text-sm font-semibold text-white transition-colors duration-150 hover:border-[#AE8CFF] hover:bg-[#111325]/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B5F25B]"
                >
                  {HERO_CONTENT.secondaryCtaLabel[language]}
                </motion.a>
              </div>
            </div>

            {/* Active Hero Product Readout + Direct Inspect Trigger */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/20 pt-5">
              <div className="space-y-0.5">
                <span className="block text-xs font-medium text-[#AE8CFF]">
                  {activeHeroProduct.categoryLabel[language]} · {activeHeroProduct.demoStatus[language]}
                </span>
                <div className="flex items-baseline gap-3">
                  <span className="text-base font-bold text-white">
                    {activeHeroProduct.name[language]}
                  </span>
                  <span
                    dir="ltr"
                    className="font-latin text-lg font-extrabold tabular-nums text-[#B5F25B]"
                  >
                    ${activeHeroProduct.price}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onInspectFeaturedProduct(activeHeroProduct.id)}
                className="inline-flex min-h-[42px] items-center gap-1.5 whitespace-nowrap rounded-lg border border-[#AE8CFF]/50 bg-[#111325]/45 px-3.5 py-2 text-xs font-semibold text-[#F6F5FF] transition-colors duration-150 hover:border-[#B5F25B] hover:text-[#B5F25B] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B5F25B]"
              >
                <span>{HERO_CONTENT.inspectActionLabel[language]}</span>
                <InspectArrow className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              </button>
            </div>
          </motion.div>

          {/* Right/End: Dominant Product Stage with Technical Callout Framing */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            <div className="relative overflow-hidden rounded-3xl bg-[#111325] p-3 sm:p-4 ring-1 ring-white/20 shadow-2xl">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-[#111325]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeHeroProduct.id}
                    initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.985 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={shouldReduceMotion ? undefined : { opacity: 0, scale: 1.01 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    className="h-full w-full"
                  >
                    <ProductImage
                      src={heroImageSrc}
                      alt={heroImageAlt}
                      fallbackTitle={activeHeroProduct.name[language]}
                      language={language}
                      priority
                      className="h-full w-full object-cover"
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Crisp architectural spec callout overlay on bottom edge */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#111325]/90 via-[#111325]/35 to-transparent p-4 sm:p-5">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-medium text-[#F6F5FF]">
                    <span>{activeHeroProduct.specs[language][0]}</span>
                    <span className="text-[#AE8CFF]">{activeHeroProduct.specs[language][1]}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Interactive Hero Product Switcher Strip */}
        <div className="mt-8 border-t border-white/15 pt-5">
          <p className="mb-3 text-xs font-semibold text-[#AE8CFF]">
            {HERO_CONTENT.selectorLabel[language]}
          </p>
          <div
            role="group"
            aria-label={t.accessibility.heroProductSelector}
            className="grid grid-cols-2 gap-2.5 sm:grid-cols-4 sm:gap-3"
          >
            {FEATURED_PRODUCTS.map((product, index) => {
              const isSelected = product.id === activeHeroProduct.id;
              return (
                <button
                  key={product.id}
                  type="button"
                  onClick={() => setHeroProductId(product.id)}
                  aria-pressed={isSelected}
                  className={`relative flex min-h-[54px] items-center justify-between gap-2 overflow-hidden rounded-xl border px-3.5 py-2.5 text-start transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B5F25B] ${
                    isSelected
                      ? 'border-[#B5F25B] bg-[#111325] text-white'
                      : 'border-white/20 bg-[#111325]/35 text-[#F6F5FF] hover:border-[#AE8CFF] hover:bg-[#111325]/60'
                  }`}
                >
                  <div className="min-w-0">
                    <span
                      dir="ltr"
                      className={`font-latin block text-[11px] font-bold tabular-nums ${
                        isSelected ? 'text-[#B5F25B]' : 'text-[#AE8CFF]'
                      }`}
                    >
                      0{index + 1}
                    </span>
                    <span className="block truncate text-xs font-semibold sm:text-sm">
                      {product.name[language]}
                    </span>
                  </div>
                  <span
                    dir="ltr"
                    className={`font-latin shrink-0 text-xs font-bold tabular-nums ${
                      isSelected ? 'text-[#B5F25B]' : 'text-white/80'
                    }`}
                  >
                    ${product.price}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
