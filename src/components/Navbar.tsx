import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Globe, Menu, X } from 'lucide-react';
import { BRAND_INFO, NAV_LINKS } from '../data/brand';
import { UI_DICTIONARY } from '../data/i18n';
import { Language } from '../types/nova';

interface NavbarProps {
  language: Language;
  onToggleLanguage: () => void;
}

export function Navbar({ language, onToggleLanguage }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = UI_DICTIONARY[language];

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#111325]/95 text-white backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between gap-4 sm:gap-8 px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Stable English Brand Wordmark */}
        <a
          href="#hero"
          dir="ltr"
          className="font-latin whitespace-nowrap shrink-0 rounded-sm text-xl font-extrabold tracking-tight text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B5F25B]"
        >
          {BRAND_INFO.name}
        </a>

        {/* Zone 2: Concise single-line navigation links */}
        <nav
          aria-label={t.accessibility.primaryNav}
          className="hidden md:flex items-center gap-7 lg:gap-8 text-sm font-medium text-[#E2E8F0]"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="whitespace-nowrap shrink-0 rounded-sm py-1 transition-colors duration-150 hover:text-[#B5F25B] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B5F25B]"
            >
              {link.label[language]}
            </a>
          ))}
        </nav>

        {/* Zone 3: Language switcher + Electric Lime primary CTA + Mobile trigger */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          <button
            type="button"
            onClick={onToggleLanguage}
            aria-label={t.accessibility.switchLanguage}
            className="inline-flex min-h-[40px] items-center gap-1.5 whitespace-nowrap shrink-0 rounded-lg border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white transition-colors duration-150 hover:border-[#AE8CFF] hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B5F25B]"
          >
            <Globe className="h-3.5 w-3.5 text-[#AE8CFF]" aria-hidden="true" />
            <span className={language === 'ar' ? 'font-latin' : ''}>
              {t.header.languageShortLabel}
            </span>
          </button>

          <a
            href="#contact"
            className="hidden md:inline-flex min-h-[40px] items-center justify-center whitespace-nowrap shrink-0 rounded-lg bg-[#B5F25B] px-4 py-2 text-sm font-bold text-[#111325] transition-colors duration-150 hover:bg-[#c5f779] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B5F25B]"
          >
            {t.header.primaryCta}
          </a>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation-panel"
            aria-label={mobileMenuOpen ? t.accessibility.closeMenu : t.accessibility.openMenu}
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-white/20 bg-white/10 text-white transition-colors duration-150 hover:border-[#AE8CFF] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B5F25B] md:hidden"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Animated Mobile Navigation Drawer */}
      <AnimatePresence initial={false}>
        {mobileMenuOpen && (
          <motion.nav
            id="mobile-navigation-panel"
            aria-label={t.accessibility.mobileNav}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-white/10 bg-[#111325] md:hidden"
          >
            <div className="flex flex-col gap-1 px-4 py-4">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={handleNavClick}
                  className="flex min-h-[44px] items-center rounded-lg px-3 text-base font-medium text-white transition-colors duration-150 hover:bg-white/10 hover:text-[#B5F25B] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B5F25B]"
                >
                  {link.label[language]}
                </a>
              ))}
              <a
                href="#contact"
                onClick={handleNavClick}
                className="mt-2 flex min-h-[44px] items-center justify-center rounded-lg bg-[#B5F25B] px-4 py-2.5 text-sm font-bold text-[#111325] transition-colors duration-150 hover:bg-[#c5f779] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B5F25B]"
              >
                {t.header.mobileCta}
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
