export type ChatbotLanguage = 'ar' | 'en';

export type ChatbotPosition = 'bottom-right' | 'bottom-left';

export type LocalizedString = string | { ar: string; en: string };
export type LocalizedStringArray = string[] | { ar: string[]; en: string[] };

export interface ChatbotFaqItem {
  id: string;
  question: LocalizedString;
  answer: LocalizedString;
  category?: string;
}

export interface ChatbotThemeConfig {
  primaryColor: string;
  primaryTextColor?: string;
  accentColor?: string;
  accentTextColor?: string;
  secondaryAccentColor?: string;
  headerBackground?: string;
  headerTextColor?: string;
  surfaceColor?: string;
  cardColor?: string;
  textColor?: string;
  mutedTextColor?: string;
  borderColor?: string;
}

export interface ChatbotUiLabels {
  openButtonLabel?: LocalizedString;
  closeButtonLabel?: LocalizedString;
  minimizeButtonLabel?: LocalizedString;
  inputPlaceholder?: LocalizedString;
  sendButtonLabel?: LocalizedString;
  retryButtonLabel?: LocalizedString;
  typingLabel?: LocalizedString;
  suggestedHeading?: LocalizedString;
  demoBadgeLabel?: LocalizedString;
  networkErrorText?: LocalizedString;
  emptyStateHint?: LocalizedString;
}

export interface ChatbotConfig {
  assistantName: LocalizedString;
  assistantSubtitle?: LocalizedString;
  welcomeMessage: LocalizedString;
  primaryColor: string;
  theme?: Partial<ChatbotThemeConfig>;
  language: ChatbotLanguage;
  position: ChatbotPosition;
  suggestedQuestions?: LocalizedStringArray;
  businessDescription?: LocalizedString;
  faqKnowledge?: ChatbotFaqItem[];
  apiEndpoint: string;
  knowledgeId?: string;
  maxMessageLength?: number;
  labels?: ChatbotUiLabels;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  createdAt: number;
}

export interface ChatbotWidgetProps {
  config: ChatbotConfig;
  defaultOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
  fetcher?: typeof fetch;
}

export function resolveLocalizedString(
  value: LocalizedString | undefined,
  language: ChatbotLanguage,
  fallback = '',
): string {
  if (!value) return fallback;
  if (typeof value === 'string') return value;
  return value[language] || value.en || value.ar || fallback;
}

export function resolveLocalizedArray(
  value: LocalizedStringArray | undefined,
  language: ChatbotLanguage,
): string[] {
  if (!value) return [];
  if (Array.isArray(value)) return value;
  return value[language] ?? value.en ?? value.ar ?? [];
}
