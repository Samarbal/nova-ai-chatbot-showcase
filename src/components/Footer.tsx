import { BRAND_INFO, NAV_LINKS } from '../data/brand';
import { UI_DICTIONARY } from '../data/i18n';
import { Language } from '../types/nova';

interface FooterProps {
  language: Language;
}

export function Footer({ language }: FooterProps) {
  const t = UI_DICTIONARY[language];

  return (
    <footer className="border-t border-white/10 bg-[#111325] py-10 text-white">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-6 px-4 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2.5 text-sm">
            <span dir="ltr" className="font-latin font-extrabold tracking-tight text-white">
              {BRAND_INFO.name}
            </span>
            <span aria-hidden="true" className="text-white/30">
              ·
            </span>
            <span className="font-semibold text-[#AE8CFF]">{BRAND_INFO.tagline[language]}</span>
          </div>
          <p className="text-xs text-[#CBD5E1]">{BRAND_INFO.demoNotice[language]}</p>
        </div>

        <nav
          aria-label={t.accessibility.footerNav}
          className="flex flex-wrap items-center gap-6 text-xs font-medium text-[#E2E8F0]"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="whitespace-nowrap shrink-0 rounded-sm transition-colors duration-150 hover:text-[#B5F25B] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B5F25B]"
            >
              {link.label[language]}
            </a>
          ))}
          <span className="text-[#94A3B8]">
            © {new Date().getFullYear()} {t.footer.copyrightSuffix}
          </span>
        </nav>
      </div>
    </footer>
  );
}
