export type Language = 'ar' | 'en';

export type CategoryId = 'audio' | 'charging' | 'desk';

export type InquiryProductId = 'general' | string;

export interface LocalizedValue<T = string> {
  ar: T;
  en: T;
}

export interface NavLinkItem {
  href: string;
  label: LocalizedValue;
}

export interface Category {
  id: CategoryId;
  indexLabel: string;
  name: LocalizedValue;
  tagline: LocalizedValue;
  imagePath: string;
  imageAlt: LocalizedValue;
}

export interface Product {
  id: string;
  name: LocalizedValue;
  categoryId: CategoryId;
  categoryLabel: LocalizedValue;
  price: number;
  shortDescription: LocalizedValue;
  specs: LocalizedValue<string[]>;
  imagePath: string;
  imageAlt: LocalizedValue;
  demoStatus: LocalizedValue;
}

export interface BenefitItem {
  id: string;
  indexLabel: string;
  icon: 'shield' | 'truck' | 'layers';
  accent: 'lime' | 'lavender' | 'cobalt';
  title: LocalizedValue;
  description: LocalizedValue;
}

export interface PolicyItem {
  id: string;
  category: 'shipping' | 'returns';
  title: LocalizedValue;
  summary: LocalizedValue;
  details: LocalizedValue;
}

export interface FAQItem {
  id: string;
  question: LocalizedValue;
  answer: LocalizedValue;
}
