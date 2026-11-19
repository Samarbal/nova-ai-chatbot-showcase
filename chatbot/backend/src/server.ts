import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import 'dotenv/config';
import { createChatbotApp } from './app.ts';
import type { BusinessKnowledge } from './types/chat.ts';

const currentDir = path.dirname(fileURLToPath(import.meta.url));
const defaultFaqPath = path.resolve(currentDir, '../../config/faq.example.json');
const knowledgeFilePath = process.env.CHATBOT_KNOWLEDGE_FILE
  ? path.resolve(process.cwd(), process.env.CHATBOT_KNOWLEDGE_FILE)
  : defaultFaqPath;

const rawKnowledge = fs.readFileSync(knowledgeFilePath, 'utf-8');
const knowledge = JSON.parse(rawKnowledge) as BusinessKnowledge;

const port = Number(process.env.PORT || 3001);
const { app } = createChatbotApp({
  knowledgeList: [knowledge],
  defaultKnowledgeId: knowledge.id,
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Chatbot backend listening on http://localhost:${port}/api/chat`);
});
