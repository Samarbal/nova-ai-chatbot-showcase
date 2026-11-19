# Reusable AI Customer-Support Chatbot Kit

A standalone, configuration-driven AI customer-support chatbot product designed for freelance client websites and demonstrated inside the **NOVA — Tech & Lifestyle** landing page.

## Folder Structure

```text
chatbot/
├── backend/                 # Standalone Express API + modular LLM providers (zero NOVA dependencies)
│   ├── src/
│   │   ├── app.ts           # Reusable Express app factory (createChatbotApp)
│   │   ├── server.ts        # Standalone backend HTTP server entrypoint
│   │   ├── middleware/      # Strict CORS allowlist, IP rate limiter, payload validator
│   │   ├── providers/       # GeminiProvider (default), OpenAICompatibleProvider (Groq/OpenRouter), MockProvider
│   │   ├── routes/chat.ts   # GET /api/chat/health & POST /api/chat
│   │   └── services/        # Grounded system instruction builder (15 FAQ default cap) & ChatService
│   ├── .env.example
│   ├── package.json
│   └── tsconfig.json
├── widget/                  # Standalone React + Shadow DOM widget (ESM + browser IIFE bundle)
│   ├── src/
│   │   ├── components/      # ChatLauncher, ChatWindow, MessageList, ChatbotWidget, inline SVG icons
│   │   ├── hooks/           # useChatbot (session history, loading, retry without duplicate user messages)
│   │   ├── styles/          # Shadow-DOM-scoped CSS variables stylesheet
│   │   ├── mount.tsx        # window.SupportChatbot.init(...) & mountChatbotWidget()
│   │   └── index.ts
│   ├── package.json
│   ├── vite.config.ts       # Builds dist/chatbot-widget.es.js
│   └── vite.embed.config.ts # Builds dist/chatbot-widget.iife.js
├── config/
│   ├── chatbot.config.example.ts # Starter config template for new clients
│   ├── faq.example.json          # Sample standalone JSON knowledge profile (up to 15 FAQs)
│   └── nova.demo.config.ts       # NOVA storefront adapter importing src/data/* directly
├── examples/
│   ├── react-integration/   # Drop-in React integration example
│   └── html-embed/          # Plain HTML script-tag embed with aggressive CSS isolation demo
└── tests/                   # Automated backend security/grounding & widget DOM tests
```

## Architecture & Security Principles

- **Server-Side Keys Only**: LLM credentials (`GEMINI_API_KEY`, `GROQ_API_KEY`, or `OPENROUTER_API_KEY`) never enter frontend bundles.
- **Strict Grounding & Injection Defense**: Client requests can only pass `{ message, language, history, knowledgeId }`. Server-side `promptBuilder.ts` constructs all rules and `<BUSINESS_KNOWLEDGE>` facts (`products`, `policies`, and up to `maxFaqEntries`, defaulting to `15`), ignoring any prompt overrides or injected facts sent by the browser.
- **Honest Failure Handling**: Missing keys return `503 PROVIDER_NOT_CONFIGURED`; upstream provider failures return `502` or `429` with retry support in the widget—never fabricated AI replies.
- **CSS Isolation**: The widget mounts into an open Shadow DOM root (`attachShadow({ mode: 'open' })`), isolating typography, spacing, RTL/LTR direction, and Electric/custom theme variables from host CSS rules.
- **Zero Lock-In Providers**: Swap models via environment variables (`AI_PROVIDER=gemini|groq|openrouter`, `AI_MODEL=...`) without changing widget code.

## Running Standalone Backend

1. Copy environment variables:
   ```bash
   cp chatbot/backend/.env.example chatbot/backend/.env
   ```
2. Set `GEMINI_API_KEY` (or switch `AI_PROVIDER` to `groq` / `openrouter`) and `ALLOWED_ORIGINS`.
3. Point `CHATBOT_KNOWLEDGE_FILE` to a client JSON file (defaults to `chatbot/config/faq.example.json`).
4. Start the backend server:
   ```bash
   npm --prefix chatbot/backend run dev
   ```

## Building the Standalone Widget Bundles

```bash
npm --prefix chatbot/widget run build
```

This generates:
- `chatbot/widget/dist/chatbot-widget.es.js` (ESM library for React / bundler projects)
- `chatbot/widget/dist/chatbot-widget.iife.js` (single-file browser embed exposing `window.SupportChatbot.init`)

## Onboarding a New Freelance Client

1. Copy `chatbot/config/faq.example.json` (or `chatbot/config/chatbot.config.example.ts`) and fill in the client's business overview, products, policies, and up to 15 FAQ entries (increase `maxFaqEntries` for higher tiers).
2. Customize `primaryColor`, `theme`, `assistantName`, `welcomeMessage`, `suggestedQuestions`, `position`, and `language` (`en` or `ar`).
3. Deploy `chatbot/backend` with the client's allowed origin(s) in `ALLOWED_ORIGINS` and embed `chatbot-widget.iife.js` or `<ChatbotWidget />` on the client site.

## Running Automated Tests

From the workspace root:

```bash
npm test
```
