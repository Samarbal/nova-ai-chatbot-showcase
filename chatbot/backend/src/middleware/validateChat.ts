import type { NextFunction, Request, Response } from 'express';
import type { ChatbotLanguage, ChatHistoryItem } from '../types/chat.ts';

export interface ValidatedChatBody {
  message: string;
  language: ChatbotLanguage;
  history: ChatHistoryItem[];
  knowledgeId?: string;
}

export interface ValidateChatOptions {
  maxMessageLength?: number;
  maxHistoryLength?: number;
  maxHistoryItemLength?: number;
}

export function createValidateChatMiddleware(options: ValidateChatOptions = {}) {
  const maxMessageLength = options.maxMessageLength ?? 600;
  const maxHistoryLength = options.maxHistoryLength ?? 10;
  const maxHistoryItemLength = options.maxHistoryItemLength ?? 1000;

  return (req: Request, res: Response, next: NextFunction): void => {
    const body = req.body as Record<string, unknown> | null | undefined;

    if (!body || typeof body !== 'object' || Array.isArray(body)) {
      res.status(400).json({
        error: {
          code: 'INVALID_REQUEST',
          message: 'Request body must be a JSON object.',
          retryable: false,
        },
      });
      return;
    }

    if (typeof body.message !== 'string') {
      res.status(400).json({
        error: {
          code: 'INVALID_MESSAGE',
          message: 'A text message is required.',
          retryable: false,
        },
      });
      return;
    }

    const trimmedMessage = body.message.trim();
    if (trimmedMessage.length === 0) {
      res.status(400).json({
        error: {
          code: 'EMPTY_MESSAGE',
          message: 'Message cannot be empty.',
          retryable: false,
        },
      });
      return;
    }

    if (trimmedMessage.length > maxMessageLength) {
      res.status(400).json({
        error: {
          code: 'MESSAGE_TOO_LONG',
          message: `Message must not exceed ${maxMessageLength} characters.`,
          retryable: false,
        },
      });
      return;
    }

    let language: ChatbotLanguage = 'en';
    if (body.language !== undefined) {
      if (body.language !== 'ar' && body.language !== 'en') {
        res.status(400).json({
          error: {
            code: 'INVALID_LANGUAGE',
            message: 'Supported languages are "ar" and "en".',
            retryable: false,
          },
        });
        return;
      }
      language = body.language;
    }

    const sanitizedHistory: ChatHistoryItem[] = [];
    if (body.history !== undefined) {
      if (!Array.isArray(body.history)) {
        res.status(400).json({
          error: {
            code: 'INVALID_HISTORY',
            message: 'History must be an array of chat turns.',
            retryable: false,
          },
        });
        return;
      }

      const recentTurns = body.history.slice(-maxHistoryLength);
      for (const item of recentTurns) {
        if (!item || typeof item !== 'object') {
          res.status(400).json({
            error: {
              code: 'INVALID_HISTORY',
              message: 'Each history turn must be an object.',
              retryable: false,
            },
          });
          return;
        }
        const candidate = item as Record<string, unknown>;
        if (candidate.role !== 'user' && candidate.role !== 'assistant') {
          res.status(400).json({
            error: {
              code: 'INVALID_HISTORY',
              message: 'History role must be "user" or "assistant".',
              retryable: false,
            },
          });
          return;
        }
        if (typeof candidate.content !== 'string' || !candidate.content.trim()) {
          continue;
        }
        sanitizedHistory.push({
          role: candidate.role,
          content: candidate.content.trim().slice(0, maxHistoryItemLength),
        });
      }
    }

    let knowledgeId: string | undefined;
    if (body.knowledgeId !== undefined) {
      if (
        typeof body.knowledgeId !== 'string' ||
        !/^[a-zA-Z0-9_-]{1,64}$/.test(body.knowledgeId)
      ) {
        res.status(400).json({
          error: {
            code: 'INVALID_KNOWLEDGE_ID',
            message: 'Invalid knowledgeId format.',
            retryable: false,
          },
        });
        return;
      }
      knowledgeId = body.knowledgeId;
    }

    res.locals.validatedChat = {
      message: trimmedMessage,
      language,
      history: sanitizedHistory,
      knowledgeId,
    } satisfies ValidatedChatBody;

    next();
  };
}
