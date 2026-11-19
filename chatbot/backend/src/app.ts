import express, { type Express, type NextFunction, type Request, type Response } from 'express';
import { createProviderFromEnv } from './providers/index.ts';
import type { LLMProvider } from './providers/types.ts';
import { parseAllowedOrigins } from './middleware/cors.ts';
import type { RateLimiterMiddleware } from './middleware/rateLimit.ts';
import { createChatRouter } from './routes/chat.ts';
import { ChatService } from './services/chatService.ts';
import type { BusinessKnowledge } from './types/chat.ts';

export interface CreateChatbotAppOptions {
  knowledgeList: BusinessKnowledge[];
  defaultKnowledgeId?: string;
  provider?: LLMProvider;
  allowedOrigins?: string[];
  rateLimitMax?: number;
  rateLimitWindowMs?: number;
  maxMessageLength?: number;
  mountPath?: string;
}

export function createChatbotApp(options: CreateChatbotAppOptions): {
  app: Express;
  chatService: ChatService;
  rateLimiter: RateLimiterMiddleware;
} {
  if (options.knowledgeList.length === 0) {
    throw new Error('createChatbotApp requires at least one BusinessKnowledge entry.');
  }

  const knowledgeRegistry = new Map<string, BusinessKnowledge>();
  for (const entry of options.knowledgeList) {
    knowledgeRegistry.set(entry.id, entry);
  }

  const defaultKnowledgeId = options.defaultKnowledgeId ?? options.knowledgeList[0].id;
  if (!knowledgeRegistry.has(defaultKnowledgeId)) {
    throw new Error(`defaultKnowledgeId "${defaultKnowledgeId}" is not in knowledgeList.`);
  }

  const provider = options.provider ?? createProviderFromEnv(process.env);
  const chatService = new ChatService({
    provider,
    knowledgeRegistry,
    defaultKnowledgeId,
  });

  const allowedOrigins =
    options.allowedOrigins ??
    parseAllowedOrigins(process.env.ALLOWED_ORIGINS, process.env.APP_URL);

  const app = express();
  app.disable('x-powered-by');
  app.use(express.json({ limit: '32kb' }));

  app.use((err: unknown, _req: Request, res: Response, next: NextFunction) => {
    if (err && typeof err === 'object' && 'type' in err && (err as { type?: string }).type === 'entity.parse.failed') {
      res.status(400).json({
        error: {
          code: 'INVALID_JSON',
          message: 'Request body must be valid JSON.',
          retryable: false,
        },
      });
      return;
    }
    next(err);
  });

  const { router, rateLimiter } = createChatRouter({
    chatService,
    allowedOrigins,
    rateLimitMax: options.rateLimitMax ?? Number(process.env.CHAT_RATE_LIMIT_MAX || 20),
    rateLimitWindowMs:
      options.rateLimitWindowMs ?? Number(process.env.CHAT_RATE_LIMIT_WINDOW_MS || 60_000),
    maxMessageLength: options.maxMessageLength ?? 600,
  });

  const mountPath = options.mountPath ?? '/api/chat';
  app.use(mountPath, router);

  return { app, chatService, rateLimiter };
}
