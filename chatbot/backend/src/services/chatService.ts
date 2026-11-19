import type { LLMProvider } from '../providers/types.ts';
import type {
  BusinessKnowledge,
  ChatbotLanguage,
  ChatHistoryItem,
  ChatSuccessResponse,
} from '../types/chat.ts';
import { buildGroundedSystemInstruction } from './promptBuilder.ts';

export interface ChatServiceOptions {
  provider: LLMProvider;
  knowledgeRegistry: Map<string, BusinessKnowledge>;
  defaultKnowledgeId: string;
}

export class UnknownKnowledgeError extends Error {
  constructor(knowledgeId: string) {
    super(`Unknown knowledge configuration: ${knowledgeId}`);
    this.name = 'UnknownKnowledgeError';
  }
}

export class ChatService {
  private readonly provider: LLMProvider;
  private readonly knowledgeRegistry: Map<string, BusinessKnowledge>;
  private readonly defaultKnowledgeId: string;

  constructor(options: ChatServiceOptions) {
    this.provider = options.provider;
    this.knowledgeRegistry = options.knowledgeRegistry;
    this.defaultKnowledgeId = options.defaultKnowledgeId;
  }

  public isProviderConfigured(): boolean {
    return this.provider.isConfigured();
  }

  public getProviderMetadata(): { provider: string; model: string; configured: boolean } {
    return {
      provider: this.provider.name,
      model: this.provider.model,
      configured: this.provider.isConfigured(),
    };
  }

  public hasKnowledge(knowledgeId: string): boolean {
    return this.knowledgeRegistry.has(knowledgeId);
  }

  public async handleMessage(input: {
    message: string;
    language: ChatbotLanguage;
    history: ChatHistoryItem[];
    knowledgeId?: string;
  }): Promise<ChatSuccessResponse> {
    const resolvedId = input.knowledgeId ?? this.defaultKnowledgeId;
    const knowledge = this.knowledgeRegistry.get(resolvedId);

    if (!knowledge) {
      throw new UnknownKnowledgeError(resolvedId);
    }

    const systemInstruction = buildGroundedSystemInstruction(knowledge, input.language);

    const output = await this.provider.generateReply({
      systemInstruction,
      message: input.message,
      history: input.history,
      language: input.language,
    });

    return {
      reply: output.text,
      provider: output.provider,
      model: output.model,
      grounded: true,
    };
  }
}
