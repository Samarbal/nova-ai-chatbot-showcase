import { Router, type Request, type Response } from 'express';
import { ProviderError } from '../providers/types.ts';
import { ChatService, UnknownKnowledgeError } from '../services/chatService.ts';
import { createCorsMiddleware } from '../middleware/cors.ts';
import { createRateLimitMiddleware, type RateLimiterMiddleware } from '../middleware/rateLimit.ts';
import { createValidateChatMiddleware, type ValidatedChatBody } from '../middleware/validateChat.ts';

export interface CreateChatRouterOptions {
  chatService: ChatService;
  allowedOrigins: string[];
  rateLimitMax?: number;
  rateLimitWindowMs?: number;
  maxMessageLength?: number;
}

export function createChatRouter(options: CreateChatRouterOptions): {
  router: Router;
  rateLimiter: RateLimiterMiddleware;
} {
  const router = Router();
  const corsMiddleware = createCorsMiddleware({
    allowedOrigins: options.allowedOrigins,
  });
  const rateLimiter = createRateLimitMiddleware({
    maxRequests: options.rateLimitMax,
    windowMs: options.rateLimitWindowMs,
  });
  const validateChat = createValidateChatMiddleware({
    maxMessageLength: options.maxMessageLength,
  });

  router.use(corsMiddleware);

  router.get('/health', (_req: Request, res: Response) => {
    const meta = options.chatService.getProviderMetadata();
    res.status(200).json({
      ok: true,
      provider: meta.provider,
      model: meta.model,
      configured: meta.configured,
    });
  });

  router.post('/', rateLimiter, validateChat, async (_req: Request, res: Response) => {
    const payload = res.locals.validatedChat as ValidatedChatBody;

    try {
      const result = await options.chatService.handleMessage({
        message: payload.message,
        language: payload.language,
        history: payload.history,
        knowledgeId: payload.knowledgeId,
      });

      res.status(200).json(result);
    } catch (error: unknown) {
      if (error instanceof UnknownKnowledgeError) {
        res.status(400).json({
          error: {
            code: 'UNKNOWN_KNOWLEDGE_ID',
            message: 'The requested assistant knowledge profile does not exist.',
            retryable: false,
          },
        });
        return;
      }

      if (error instanceof ProviderError) {
        res.status(error.statusCode).json({
          error: {
            code: error.code,
            message: error.message,
            retryable: error.retryable,
          },
        });
        return;
      }

      res.status(500).json({
        error: {
          code: 'INTERNAL_ERROR',
          message: 'An unexpected error occurred while processing the support request.',
          retryable: true,
        },
      });
    }
  });

  return { router, rateLimiter };
}
