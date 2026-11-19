import { useMemo } from 'react';
import { ChatbotWidget } from '../../chatbot/widget/src/index';
import { createNovaWidgetConfig } from '../../chatbot/config/nova.demo.config';
import type { Category, FAQItem, Language, PolicyItem, Product } from '../types/nova';

export interface NovaSupportContext {
  language: Language;
  products: Product[];
  categories: Category[];
  policies: PolicyItem[];
  faqs: FAQItem[];
  onSelectProductInquiry?: (product: Product) => void;
}

export interface ChatbotWidgetSlotProps {
  /**
   * Structured bilingual store catalog, shipping/return policies, and FAQs
   * passed cleanly so the AI customer-support widget syncs with page language.
   */
  supportContext: NovaSupportContext;
  /**
   * Controls whether the floating AI Customer Support Chatbot Widget is rendered.
   */
  enabled?: boolean;
}

/**
 * Mounts the standalone reusable AI Customer Support Chatbot Widget
 * styled for NOVA's Electric Playground design system and synced with RTL/LTR.
 */
export function ChatbotWidgetSlot({
  supportContext,
  enabled = true,
}: ChatbotWidgetSlotProps) {
  const widgetConfig = useMemo(
    () => createNovaWidgetConfig(supportContext.language),
    [supportContext.language],
  );

  if (!enabled) {
    return null;
  }

  return <ChatbotWidget config={widgetConfig} />;
}
