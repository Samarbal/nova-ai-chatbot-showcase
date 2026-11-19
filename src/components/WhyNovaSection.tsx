import { motion, useReducedMotion } from 'motion/react';
import { Layers, ShieldCheck, Truck } from 'lucide-react';
import { WHY_NOVA_BENEFITS } from '../data/brand';
import { UI_DICTIONARY } from '../data/i18n';
import { BenefitItem, Language } from '../types/nova';

interface WhyNovaSectionProps {
  language: Language;
}

const ACCENT_STYLES: Record<
  BenefitItem['accent'],
  {
    iconWrap: string;
    iconColor: string;
    indexColor: string;
  }
> = {
  lime: {
    iconWrap: 'border-[#B5F25B]/40 bg-[#B5F25B]/10',
    iconColor: 'text-[#B5F25B]',
    indexColor: 'text-[#B5F25B]',
  },
  lavender: {
    iconWrap: 'border-[#AE8CFF]/45 bg-[#AE8CFF]/12',
    iconColor: 'text-[#AE8CFF]',
    indexColor: 'text-[#AE8CFF]',
  },
  cobalt: {
    iconWrap: 'border-[#AE8CFF]/40 bg-[#1629D8]',
    iconColor: 'text-white',
    indexColor: 'text-[#AE8CFF]',
  },
};

function BenefitIcon({
  icon,
  className,
}: {
  icon: BenefitItem['icon'];
  className: string;
}) {
  switch (icon) {
    case 'shield':
      return <ShieldCheck className={`h-5 w-5 ${className}`} aria-hidden="true" />;
    case 'truck':
      return <Truck className={`h-5 w-5 ${className}`} aria-hidden="true" />;
    case 'layers':
      return <Layers className={`h-5 w-5 ${className}`} aria-hidden="true" />;
  }
}

export function WhyNovaSection({ language }: WhyNovaSectionProps) {
  const shouldReduceMotion = useReducedMotion();
  const t = UI_DICTIONARY[language];

  return (
    <section
      id="why-nova"
      aria-labelledby="why-nova-heading"
      className="relative overflow-hidden bg-[#111325] py-16 text-white sm:py-24"
    >
      {/* Subtle geometric Electric Cobalt and Vibrant Lavender accents */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 start-0 h-72 w-72 rounded-full bg-[#1629D8]/25 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 end-10 h-64 w-64 rounded-full border border-[#AE8CFF]/20"
      />

      <div className="relative mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Start Column: Oversized Editorial Thesis */}
          <div className="space-y-5 lg:col-span-5">
            <div className="flex items-center gap-3">
              <span aria-hidden="true" className="h-[3px] w-7 bg-[#B5F25B]" />
              <p className="text-xs font-bold tracking-wide text-[#AE8CFF]">
                {t.whyNova.eyebrow}
              </p>
            </div>

            <h2
              id="why-nova-heading"
              className="text-balance text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl"
            >
              {t.whyNova.heading}
            </h2>

            <p className="max-w-md text-sm leading-relaxed text-[#E2E8F0] sm:text-base">
              {t.whyNova.subtitle}
            </p>

            {/* Electric Cobalt structural bar */}
            <div
              aria-hidden="true"
              className="flex items-center gap-2 pt-2"
            >
              <span className="h-1.5 w-16 rounded-full bg-[#1629D8]" />
              <span className="h-1.5 w-6 rounded-full bg-[#AE8CFF]" />
              <span className="h-1.5 w-3 rounded-full bg-[#B5F25B]" />
            </div>
          </div>

          {/* End Column: Architectural Horizontal Numbered Benefit Rows */}
          <div className="divide-y divide-white/15 border-y border-white/15 lg:col-span-7">
            {WHY_NOVA_BENEFITS.map((benefit, index) => {
              const accent = ACCENT_STYLES[benefit.accent];

              return (
                <motion.article
                  key={benefit.id}
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{
                    duration: 0.4,
                    delay: shouldReduceMotion ? 0 : index * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="group flex flex-col gap-4 py-7 sm:flex-row sm:items-start sm:gap-6 sm:py-8"
                >
                  <div className="flex items-center gap-4 sm:shrink-0">
                    <span
                      dir="ltr"
                      className={`font-latin text-sm font-extrabold tabular-nums ${accent.indexColor}`}
                    >
                      {benefit.indexLabel}
                    </span>
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-xl border transition-transform duration-200 group-hover:-translate-y-0.5 ${accent.iconWrap}`}
                    >
                      <BenefitIcon icon={benefit.icon} className={accent.iconColor} />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <h3 className="text-lg font-extrabold tracking-tight text-white sm:text-xl">
                      {benefit.title[language]}
                    </h3>
                    <p className="text-sm leading-relaxed text-[#CBD5E1] sm:text-base">
                      {benefit.description[language]}
                    </p>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
