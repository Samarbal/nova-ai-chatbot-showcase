import type { NextFunction, Request, Response } from 'express';

export interface RateLimitOptions {
  windowMs?: number;
  maxRequests?: number;
}

export interface RateLimiterMiddleware {
  (req: Request, res: Response, next: NextFunction): void;
  reset: () => void;
}

export function createRateLimitMiddleware(
  options: RateLimitOptions = {},
): RateLimiterMiddleware {
  const windowMs = options.windowMs ?? 60_000;
  const maxRequests = options.maxRequests ?? 20;
  const hitsByClient = new Map<string, number[]>();

  const middleware = (req: Request, res: Response, next: NextFunction): void => {
    const now = Date.now();
    const clientKey =
      (typeof req.ip === 'string' && req.ip) ||
      req.socket.remoteAddress ||
      'unknown';

    const existing = hitsByClient.get(clientKey) ?? [];
    const recent = existing.filter((ts) => now - ts < windowMs);

    if (recent.length >= maxRequests) {
      const oldestInWindow = recent[0] ?? now;
      const retryAfterSeconds = Math.max(
        1,
        Math.ceil((oldestInWindow + windowMs - now) / 1000),
      );

      res.setHeader('Retry-After', String(retryAfterSeconds));
      res.setHeader('X-RateLimit-Limit', String(maxRequests));
      res.setHeader('X-RateLimit-Remaining', '0');

      res.status(429).json({
        error: {
          code: 'RATE_LIMITED',
          message: 'Too many chat requests. Please wait a moment and try again.',
          retryable: true,
        },
      });
      return;
    }

    recent.push(now);
    hitsByClient.set(clientKey, recent);

    res.setHeader('X-RateLimit-Limit', String(maxRequests));
    res.setHeader('X-RateLimit-Remaining', String(Math.max(0, maxRequests - recent.length)));
    next();
  };

  middleware.reset = () => {
    hitsByClient.clear();
  };

  return middleware;
}
