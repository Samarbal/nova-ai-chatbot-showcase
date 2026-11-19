import {
  type LLMGenerateInput,
  type LLMGenerateOutput,
  type LLMProvider,
  ProviderError,
} from './types.ts';

export type MockBehavior =
  | { type: 'reply'; text?: string }
  | { type: 'error'; error: ProviderError };

export class MockProvider implements LLMProvider {
  public readonly name = 'mock';
  public readonly model = 'mock-support-1';
  public readonly calls: LLMGenerateInput[] = [];
  private configured: boolean;
  private behavior: MockBehavior;

  constructor(options?: { configured?: boolean; behavior?: MockBehavior }) {
    this.configured = options?.configured ?? true;
    this.behavior = options?.behavior ?? { type: 'reply' };
  }

  public setConfigured(value: boolean): void {
    this.configured = value;
  }

  public setBehavior(behavior: MockBehavior): void {
    this.behavior = behavior;
  }

  public isConfigured(): boolean {
    return this.configured;
  }

  public async generateReply(input: LLMGenerateInput): Promise<LLMGenerateOutput> {
    this.calls.push(input);

    if (!this.configured) {
      throw new ProviderError(
        'PROVIDER_NOT_CONFIGURED',
        'AI provider credentials are not configured on the server.',
        503,
        false,
      );
    }

    if (this.behavior.type === 'error') {
      throw this.behavior.error;
    }

    const replyText =
      this.behavior.text ??
      (input.language === 'ar'
        ? `رد تجريبي من مزود الاختبار حول: ${input.message}`
        : `Mock test reply regarding: ${input.message}`);

    return {
      text: replyText,
      provider: this.name,
      model: this.model,
    };
  }
}
