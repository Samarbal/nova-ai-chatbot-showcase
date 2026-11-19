export type ChatbotLanguage = 'ar' | 'en';

export type ChatMessageRole = 'user' | 'assistant';

export interface ChatHistoryItem {
  role: ChatMessageRole;
  content: string;
}

export interface LocalizedText {
  ar: string;
  en: string;
}

export interface LocalizedStringList {
  ar: string[];
  en: string[];
}

export interface FaqKnowledgeEntry {
  id: string;
  question: string | LocalizedText;
  answer: string | LocalizedText;
  category?: string;
}

export interface ProductKnowledgeEntry {
  id: string;
  name: string | LocalizedText;
  category: string | LocalizedText;
  price: number;
  currency?: string;
  description: string | LocalizedText;
  specs: string[] | LocalizedStringList;
  status?: string | LocalizedText;
}

export interface PolicyKnowledgeEntry {
  id: string;
  category: string;
  title: string | LocalizedText;
  summary: string | LocalizedText;
  details: string | LocalizedText;
}

export interface BusinessKnowledge {
  id: string;
  businessName: string;
  isDemo?: boolean;
  demoDisclaimer?: LocalizedText;
  businessDescription: string | LocalizedText;
  products?: ProductKnowledgeEntry[];
  policies?: PolicyKnowledgeEntry[];
  faqs: FaqKnowledgeEntry[];
  /** Basic tier supports up to 15 FAQ entries by default; override to expand. */
  maxFaqEntries?: number;
  unavailableFallback?: LocalizedText;
}

export interface ChatRequestPayload {
  message: string;
  language?: ChatbotLanguage;
  history?: ChatHistoryItem[];
  knowledgeId?: string;
}

export interface ChatSuccessResponse {
  reply: string;
  provider: string;
  model: string;
  grounded: true;
}

export interface ChatErrorResponse {
  error: {
    code: string;
    message: string;
    retryable: boolean;
  };
}
