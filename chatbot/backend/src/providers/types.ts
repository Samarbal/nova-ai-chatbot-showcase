import type { ChatbotLanguage, ChatHistoryItem } from '../types/chat.ts';

export type ProviderErrorCode =
  | 'PROVIDER_NOT_CONFIGURED'
  | 'PROVIDER_AUTH_ERROR'
  | 'PROVIDER_RATE_LIMITED'
  | 'PROVIDER_UPSTREAM_ERROR'
  | 'PROVIDER_INVALID_RESPONSE';

export class ProviderError extends Error {
  public readonly code: ProviderErrorCode;
  public readonly statusCode: number;
  public readonly retryable: boolean;

  constructor(
    code: ProviderErrorCode,
    message: string,
    statusCode: number,
    retryable: boolean,
  ) {
    super(message);
    this.name = 'ProviderError';
    this.code = code;
    this.statusCode = statusCode;
    this.retryable = retryable;
  }
}

export interface LLMGenerateInput {
  systemInstruction: string;
  message: string;
  history: ChatHistoryItem[];
  language: ChatbotLanguage;
}

export interface LLMGenerateOutput {
  text: string;
  provider: string;
  model: string;
}

export interface LLMProvider {
  readonly name: string;
  readonly model: string;
  isConfigured(): boolean;
  generateReply(input: LLMGenerateInput): Promise<LLMGenerateOutput>;
}
