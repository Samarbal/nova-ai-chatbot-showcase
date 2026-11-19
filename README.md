# NOVA — Tech & Lifestyle Landing Page

A bilingual (Arabic RTL / English LTR), interactive e-commerce landing page for **NOVA**, a fictional consumer tech accessories brand offering wireless headphones, charging hardware, and desk essentials. Built as a frontend portfolio demonstration with editable structured data, Motion micro-interactions, and an integration seam reserved for a future AI customer-support widget.

## Stack

- **React 19** + **TypeScript**
- **Vite**
- **Tailwind CSS v4**
- **Motion (`motion/react`)**
- **Lucide React** icons

No backend, database, authentication, shopping cart, or checkout system is included in this phase.

## Local Development

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Run type-checking / linting:
   ```bash
   npm run lint
   ```
4. Build the production bundle:
   ```bash
   npm run build
   ```

## Page Architecture & Bilingual Support

- **Bilingual i18n (`ar` default / `en`)**: Instant language switching in the Navbar updates `document.documentElement.lang` and `dir` (`rtl` / `ltr`), switches between **Cairo** (Arabic) and **Plus Jakarta Sans** (English), persists preference in `localStorage` (`nova-lang`), and preserves active category, active showcase item, and inquiry form inputs.
- **Electric Playground Color System**: Centralized CSS tokens in `src/index.css` built around Electric Cobalt (`#1629D8`), Electric Lime (`#B5F25B`), Vibrant Lavender (`#AE8CFF`), Soft Ice (`#F6F5FF`), and Deep Ink (`#111325`).
- **Five-Section Layout**:
  1. **Hero (`HeroSection`)**: Bold Electric Cobalt stage with oversized typography, dominant `4:3` product preview, and an interactive bottom 4-product switcher strip.
  2. **Categories (`CategoriesSection`)**: Contrasting asymmetric triptych (`Audio`, `Charging`, `Desk Essentials`) with hover zoom that filters and jumps directly to the showcase.
  3. **Interactive Product Showcase (`ProductsSection`)**: Prominent animated spotlight display, clickable/touch-ready product selector strip, dynamic specifications, category filters, and direct inquiry prefill.
  4. **Why NOVA (`WhyNovaSection`)**: Deep Ink asymmetric split presenting three numbered benefits with Lavender, Lime, and Cobalt accents.
  5. **Contact & Policies (`ContactSection`)**: Client-side validated inquiry form with an honest demo-only preview confirmation alongside an animated Shipping, Returns, and FAQ accordion.

## Customizing Demo Content

All bilingual copy, products, pricing, and policies live in typed TypeScript files inside `src/data/`:

- `src/data/i18n.ts` — Bilingual UI labels, form validation messages, accessibility labels, and confirmation copy.
- `src/data/brand.ts` — Brand metadata, navigation links, hero content, and Why NOVA benefits.
- `src/data/catalog.ts` — Categories and the four featured products (`name`, `price`, `shortDescription`, `specs`, `imagePath`, `imageAlt`).
- `src/data/policies.ts` — Fictional shipping windows and 30-day return / 2-year hardware coverage terms.
- `src/data/faqs.ts` — Customer-facing FAQs shown in the accordion.

## Running Full-Stack (NOVA + Real AI Chatbot)

NOVA now runs via `server.ts`, which serves both the Vite/static storefront and the grounded `/api/chat` backend endpoint.

1. Copy `.env.example` to `.env` and add your server-side API key:
   ```env
   AI_PROVIDER=gemini
   GEMINI_API_KEY=your_real_gemini_api_key
   ```
   (Optional: set `AI_PROVIDER=groq` with `GROQ_API_KEY`, or `AI_PROVIDER=openrouter` with `OPENROUTER_API_KEY`.)
2. Start full-stack dev mode on port 3000:
   ```bash
   npm run dev
   ```
3. Run automated backend & widget tests:
   ```bash
   npm test
   ```

## Standalone Reusable Chatbot Starter Kit (`chatbot/`)

`src/components/ChatbotWidgetSlot.tsx` mounts the standalone `ChatbotWidget` from `chatbot/widget/` using `createNovaWidgetConfig` (`chatbot/config/nova.demo.config.ts`), which adapts directly from NOVA's structured data without duplicating product, policy, or FAQ copy.

See [`chatbot/README.md`](./chatbot/README.md) for instructions on reusing the backend, React widget, and standalone browser bundle (`chatbot-widget.iife.js`) for client websites.

## Deployment

1. Build the production frontend:
   ```bash
   npm run build
   ```
2. Start the production server (`server.ts` serves both `dist/` and `/api/chat`):
   ```bash
   NODE_ENV=production npm start
   ```
Make sure `GEMINI_API_KEY` (or your chosen `AI_PROVIDER` key) and `ALLOWED_ORIGINS` / `APP_URL` are configured in your hosting environment.

