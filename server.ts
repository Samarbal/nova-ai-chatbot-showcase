import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import 'dotenv/config';
import express, { type Request, type Response } from 'express';
import { createChatbotApp } from './chatbot/backend/src/app.ts';
import { NOVA_BACKEND_KNOWLEDGE } from './chatbot/config/nova.demo.config.ts';

const currentDir = path.dirname(fileURLToPath(import.meta.url));
const port = Number(process.env.PORT || 3000);
const isProduction = process.env.NODE_ENV === 'production';

async function startServer(): Promise<void> {
  const { app } = createChatbotApp({
    knowledgeList: [NOVA_BACKEND_KNOWLEDGE],
    defaultKnowledgeId: NOVA_BACKEND_KNOWLEDGE.id,
    mountPath: '/api/chat',
  });

  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(currentDir, 'dist');
    app.use(express.static(distDir));
    app.get('*splat', (_req: Request, res: Response) => {
      const indexPath = path.join(distDir, 'index.html');
      if (fs.existsSync(indexPath)) {
        res.sendFile(indexPath);
      } else {
        res.status(404).send('Production build not found. Run npm run build first.');
      }
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`NOVA server listening on http://localhost:${port}`);
  });
}

void startServer();
