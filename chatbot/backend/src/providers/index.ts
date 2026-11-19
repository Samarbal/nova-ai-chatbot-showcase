import { GeminiProvider } from './geminiProvider.ts';
import { OpenAICompatibleProvider } from './openAiCompatibleProvider.ts';
import type { LLMProvider } from './types.ts';

export type ProviderKind = 'gemini' | 'groq' | 'openrouter';

export function createProviderFromEnv(env: NodeJS.ProcessEnv = process.env): LLMProvider {
  const providerKind = (env.AI_PROVIDER ?? 'gemini').trim().toLowerCase() as ProviderKind;

  if (providerKind === 'groq') {
    return new OpenAICompatibleProvider({
      providerName: 'groq',
      apiKey: env.GROQ_API_KEY,
      baseUrl: 'https://api.groq.com/openai/v1',
      model: env.AI_MODEL?.trim() || 'llama-3.3-70b-versatile',
    });
  }

  if (providerKind === 'openrouter') {
    return new OpenAICompatibleProvider({
      providerName: 'openrouter',
      apiKey: env.OPENROUTER_API_KEY,
      baseUrl: 'https://openrouter.ai/api/v1',
      model: env.AI_MODEL?.trim() || 'google/gemini-2.5-flash',
    });
  }

  return new GeminiProvider({
    apiKey: env.GEMINI_API_KEY,
    model: env.AI_MODEL,
  });
}

export { GeminiProvider } from './geminiProvider.ts';
export { OpenAICompatibleProvider } from './openAiCompatibleProvider.ts';
export { MockProvider } from './mockProvider.ts';
export { ProviderError, type LLMProvider, type LLMGenerateInput, type LLMGenerateOutput } from './types.ts';
