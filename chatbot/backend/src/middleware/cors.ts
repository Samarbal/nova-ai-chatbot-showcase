import type { NextFunction, Request, Response } from 'express';

export interface CorsMiddlewareOptions {
  allowedOrigins: string[];
}

export function parseAllowedOrigins(
  rawOrigins?: string,
  appUrl?: string,
): string[] {
  const origins = new Set<string>();

  if (rawOrigins) {
    for (const part of rawOrigins.split(',')) {
      const trimmed = part.trim().replace(/\/+$/, '');
      if (trimmed) {
        origins.add(trimmed);
      }
    }
  }

  if (appUrl) {
    const trimmedAppUrl = appUrl.trim().replace(/\/+$/, '');
    if (trimmedAppUrl && trimmedAppUrl !== 'MY_APP_URL') {
      origins.add(trimmedAppUrl);
    }
  }

  if (origins.size === 0) {
    origins.add('http://localhost:3000');
    origins.add('http://127.0.0.1:3000');
    origins.add('http://localhost:5173');
    origins.add('http://127.0.0.1:5173');
  }

  return Array.from(origins);
}

export function createCorsMiddleware(options: CorsMiddlewareOptions) {
  const allowSet = new Set(options.allowedOrigins.map((o) => o.replace(/\/+$/, '')));

  return (req: Request, res: Response, next: NextFunction): void => {
    const originHeader = req.headers.origin;
    res.setHeader('Vary', 'Origin');

    if (!originHeader) {
      if (req.method === 'OPTIONS') {
        res.status(204).end();
        return;
      }
      next();
      return;
    }

    const normalizedOrigin = originHeader.replace(/\/+$/, '');
    const hostHeader = req.headers.host;
    const isSameHostOrigin =
      Boolean(hostHeader) &&
      (normalizedOrigin === `http://${hostHeader}` ||
        normalizedOrigin === `https://${hostHeader}`);

    if (!isSameHostOrigin && !allowSet.has(normalizedOrigin)) {
      res.status(403).json({
        error: {
          code: 'CORS_ORIGIN_DENIED',
          message: 'Origin is not permitted by chatbot CORS policy.',
          retryable: false,
        },
      });
      return;
    }

    res.setHeader('Access-Control-Allow-Origin', originHeader);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Max-Age', '600');

    if (req.method === 'OPTIONS') {
      res.status(204).end();
      return;
    }

    next();
  };
}
