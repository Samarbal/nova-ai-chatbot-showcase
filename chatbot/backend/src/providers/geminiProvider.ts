import { GoogleGenAI, ThinkingLevel } from '@google/genai';
import {
  type LLMGenerateInput,
  type LLMGenerateOutput,
  type LLMProvider,
  ProviderError,
} from './types.ts';

export interface GeminiProviderOptions {
  apiKey?: string;
  model?: string;
}

const DEFAULT_GEMINI_MODEL = 'gemini-4-hydrogen';

export class GeminiProvider implements LLMProvider {
  public readonly name = 'gemini';
  public readonly model: string;
  private readonly apiKey: string;
  private client: GoogleGenAI | null = null;

  constructor(options: GeminiProviderOptions = {}) {
    this.apiKey = (options.apiKey ?? process.env.GEMINI_API_KEY ?? '').trim();
    const configuredModel = (options.model ?? process.env.AI_MODEL ?? '').trim();
    this.model = configuredModel || DEFAULT_GEMINI_MODEL;
  }

  public isConfigured(): boolean {
    return this.apiKey.length > 0 && this.apiKey !== 'MY_GEMINI_API_KEY';
  }

  private getClient(): GoogleGenAI {
    if (!this.isConfigured()) {
      throw new ProviderError(
        'PROVIDER_NOT_CONFIGURED',
        'AI provider credentials are not configured on the server.',
        503,
        false,
      );
    }

    if (!this.client) {
      this.client = new GoogleGenAI({
        apiKey: this.apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });
    }

    return this.client;
  }

  public async generateReply(input: LLMGenerateInput): Promise<LLMGenerateOutput> {
    const ai = this.getClient();

    const contents = [
      ...input.history.map((turn) => ({
        role: turn.role === 'assistant' ? ('model' as const) : ('user' as const),
        parts: [{ text: turn.content }],
      })),
      {
        role: 'user' as const,
        parts: [{ text: input.message }],
      },
    ];

    try {
      const response = await ai.models.generateContent({
        model: this.model,
        contents,
        config: {
          systemInstruction: input.systemInstruction,
          thinkingConfig: {
            thinkingLevel: ThinkingLevel.LOW,
          },
        },
      });

      const text = response.text?.trim();
      if (!text) {
        throw new ProviderError(
          'PROVIDER_INVALID_RESPONSE',
          'AI provider returned an empty response.',
          502,
          true,
        );
      }

      return {
        text,
        provider: this.name,
        model: this.model,
      };
    } catch (error: unknown) {
      if (error instanceof ProviderError) {
        throw error;
      }

      const rawMessage = error instanceof Error ? error.message : String(error);
      const statusMatch = rawMessage.match(/\b(400|401|403|404|429|500|502|503|504)\b/);
      const status = statusMatch ? Number(statusMatch[1]) : 502;

      if (
        status === 401 ||
        status === 403 ||
        rawMessage.includes('API_KEY_INVALID') ||
        rawMessage.includes('PERMISSION_DENIED')
      ) {
        throw new ProviderError(
          'PROVIDER_AUTH_ERROR',
          'AI provider authentication failed. Check server API key configuration.',
          503,
          false,
        );
      }

      if (status === 429 || rawMessage.includes('RESOURCE_EXHAUSTED')) {
        throw new ProviderError(
          'PROVIDER_RATE_LIMITED',
          'AI service is temporarily busy. Please try again shortly.',
          429,
          true,
        );
      }

      throw new ProviderError(
        'PROVIDER_UPSTREAM_ERROR',
        'AI service could not complete the request.',
        502,
        true,
      );
    }
  }
}
