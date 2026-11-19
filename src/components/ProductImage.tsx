import { useEffect, useState } from 'react';
import { Package } from 'lucide-react';
import { UI_DICTIONARY } from '../data/i18n';
import { Language } from '../types/nova';

interface ProductImageProps {
  src: string;
  alt: string;
  fallbackTitle: string;
  language: Language;
  className?: string;
  priority?: boolean;
}

export function ProductImage({
  src,
  alt,
  fallbackTitle,
  language,
  className = '',
  priority = false,
}: ProductImageProps) {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setHasError(false);
  }, [src]);

  if (hasError) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center gap-3 bg-[#EAE8FA] p-6 text-center text-[#4B506B] ${className}`}
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#1629D8]/20 bg-white text-[#1629D8]">
          <Package className="h-5 w-5" aria-hidden="true" />
        </div>
        <div className="space-y-1">
          <p className="text-sm font-semibold text-[#111325]">{fallbackTitle}</p>
          <p className="text-xs text-[#4B506B]">{UI_DICTIONARY[language].imageFallback.subtitle}</p>
        </div>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      loading={priority ? 'eager' : 'lazy'}
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
