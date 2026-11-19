import {
  type LLMGenerateInput,
  type LLMGenerateOutput,
  type LLMProvider,
  ProviderError,
} from './types.ts';

export interface OpenAICompatibleProviderOptions {
  providerName: 'groq' | 'openrouter' | 'openai-compatible';
  apiKey?: string;
  baseUrl: string;
  model: string;
  extraHeaders?: Record<string, string>;
}

export class OpenAICompatibleProvider implements LLMProvider {
  public readonly name: string;
  public readonly model: string;
  private readonly apiKey: string;
  private readonly baseUrl: string;
  private readonly extraHeaders: Record<string, string>;

  constructor(options: OpenAICompatibleProviderOptions) {
    this.name = options.providerName;
    this.apiKey = (options.apiKey ?? '').trim();
    this.baseUrl = options.baseUrl.replace(/\/+$/, '');
    this.model = options.model;
    this.extraHeaders = options.extraHeaders ?? {};
  }

  public isConfigured(): boolean {
    return this.apiKey.length > 0;
  }

  public async generateReply(input: LLMGenerateInput): Promise<LLMGenerateOutput> {
    if (!this.isConfigured()) {
      throw new ProviderError(
        'PROVIDER_NOT_CONFIGURED',
        `${this.name} API credentials are not configured on the server.`,
        503,
        false,
      );
    }

    const messages = [
      { role: 'system', content: input.systemInstruction },
      ...input.history.map((turn) => ({
        role: turn.role,
        content: turn.content,
      })),
      { role: 'user', content: input.message },
    ];

    let response: Response;
    try {
      response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.apiKey}`,
          ...this.extraHeaders,
        },
        body: JSON.stringify({
          model: this.model,
          messages,
        }),
      });
    } catch {
      throw new ProviderError(
        'PROVIDER_UPSTREAM_ERROR',
        'Unable to reach the configured AI provider.',
        502,
        true,
      );
    }

    if (response.status === 401 || response.status === 403) {
      throw new ProviderError(
        'PROVIDER_AUTH_ERROR',
        'AI provider authentication failed. Check server API key configuration.',
        503,
        false,
      );
    }

    if (response.status === 429) {
      throw new ProviderError(
        'PROVIDER_RATE_LIMITED',
        'AI service is temporarily busy. Please try again shortly.',
        429,
        true,
      );
    }

    if (!response.ok) {
      throw new ProviderError(
        'PROVIDER_UPSTREAM_ERROR',
        'AI service returned an upstream error.',
        502,
        true,
      );
    }

    const payload = (await response.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    const text = payload.choices?.[0]?.message?.content?.trim();

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
  }
}
