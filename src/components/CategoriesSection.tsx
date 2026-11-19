import { motion, useReducedMotion } from 'motion/react';
import { ArrowUpLeft, ArrowUpRight } from 'lucide-react';
import { CATEGORIES } from '../data/catalog';
import { UI_DICTIONARY } from '../data/i18n';
import { CategoryId, Language } from '../types/nova';
import { ProductImage } from './ProductImage';

interface CategoriesSectionProps {
  language: Language;
  onSelectCategory: (categoryId: CategoryId) => void;
}

export function CategoriesSection({ language, onSelectCategory }: CategoriesSectionProps) {
  const shouldReduceMotion = useReducedMotion();
  const t = UI_DICTIONARY[language];
  const DirectionalArrow = language === 'ar' ? ArrowUpLeft : ArrowUpRight;

  // Contrasting asymmetric spans and surface treatments per panel
  const panelStyles: Record<
    CategoryId,
    {
      span: string;
      container: string;
      scrim: string;
      indexColor: string;
      titleColor: string;
      taglineColor: string;
      iconWrap: string;
    }
  > = {
    audio: {
      span: 'md:col-span-2 lg:col-span-6',
      container:
        'bg-[#111325] border-[#111325] hover:border-[#AE8CFF]',
      scrim: 'from-[#111325]/92 via-[#111325]/40 to-transparent',
      indexColor: 'text-[#AE8CFF]',
      titleColor: 'text-white',
      taglineColor: 'text-[#F6F5FF]/90',
      iconWrap:
        'border-[#AE8CFF]/50 bg-[#111325]/70 text-[#AE8CFF] group-hover:border-[#B5F25B] group-hover:bg-[#B5F25B] group-hover:text-[#111325]',
    },
    charging: {
      span: 'lg:col-span-3',
      container:
        'bg-[#1629D8] border-[#1629D8] hover:border-[#B5F25B]',
      scrim: 'from-[#1629D8]/92 via-[#1629D8]/45 to-transparent',
      indexColor: 'text-[#B5F25B]',
      titleColor: 'text-white',
      taglineColor: 'text-[#F6F5FF]/90',
      iconWrap:
        'border-[#B5F25B]/50 bg-[#111325]/50 text-[#B5F25B] group-hover:bg-[#B5F25B] group-hover:text-[#111325]',
    },
    desk: {
      span: 'lg:col-span-3',
      container:
        'bg-white border-[#111325]/15 hover:border-[#1629D8]',
      scrim: 'from-[#111325]/88 via-[#111325]/35 to-transparent',
      indexColor: 'text-[#B5F25B]',
      titleColor: 'text-white',
      taglineColor: 'text-[#F6F5FF]/90',
      iconWrap:
        'border-white/40 bg-[#111325]/70 text-white group-hover:border-[#1629D8] group-hover:bg-[#1629D8]',
    },
  };

  return (
    <section
      id="categories"
      aria-labelledby="categories-heading"
      className="border-b border-[#111325]/10 bg-[#F6F5FF] py-16 sm:py-22"
    >
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2.5">
              <span aria-hidden="true" className="h-[3px] w-7 bg-[#1629D8]" />
              <p className="text-xs font-bold tracking-wide text-[#1629D8]">
                {t.categories.eyebrow}
              </p>
            </div>
            <h2
              id="categories-heading"
              className="text-balance text-2xl font-extrabold tracking-tight text-[#111325] sm:text-3xl"
            >
              {t.categories.heading}
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-[#4B506B]">
            {t.categories.subtitle}
          </p>
        </div>

        {/* Asymmetric Contrasting Triptych */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-12 lg:gap-6">
          {CATEGORIES.map((category, index) => {
            const style = panelStyles[category.id];
            return (
              <motion.button
                key={category.id}
                type="button"
                onClick={() => onSelectCategory(category.id)}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.4,
                  delay: shouldReduceMotion ? 0 : index * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileTap={shouldReduceMotion ? undefined : { scale: 0.99 }}
                className={`group relative flex min-h-[290px] sm:min-h-[340px] lg:min-h-[380px] w-full overflow-hidden rounded-3xl border-2 text-start transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1629D8] ${style.span} ${style.container}`}
              >
                <ProductImage
                  src={category.imagePath}
                  alt={category.imageAlt[language]}
                  fallbackTitle={category.name[language]}
                  language={language}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05]"
                />

                <div
                  aria-hidden="true"
                  className={`absolute inset-0 bg-gradient-to-t ${style.scrim}`}
                />

                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6">
                  <div className="space-y-1">
                    <span
                      dir="ltr"
                      className={`font-latin block text-xs font-extrabold tabular-nums ${style.indexColor}`}
                    >
                      {category.indexLabel}
                    </span>
                    <h3 className={`text-xl font-extrabold tracking-tight sm:text-2xl ${style.titleColor}`}>
                      {category.name[language]}
                    </h3>
                    <p className={`text-xs font-medium sm:text-sm ${style.taglineColor}`}>
                      {category.tagline[language]}
                    </p>
                  </div>

                  <span
                    aria-hidden="true"
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border transition-all duration-200 ${style.iconWrap}`}
                  >
                    <DirectionalArrow className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
                  </span>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
