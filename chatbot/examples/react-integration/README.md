# React Integration Example

Use `ChatbotWidget` inside any React 18+ or React 19+ application.

## Steps

1. Install or copy the built package from `chatbot/widget` (or import directly inside a monorepo):
   ```bash
   npm --prefix chatbot/widget install
   npm --prefix chatbot/widget run build
   ```
2. Run the standalone backend (`chatbot/backend`) with your client's knowledge JSON or TypeScript config:
   ```bash
   PORT=3001 ALLOWED_ORIGINS=http://localhost:5173 GEMINI_API_KEY=your_key npm --prefix chatbot/backend run dev
   ```
3. Pass a `ChatbotConfig` object (see `App.example.tsx`) pointing `apiEndpoint` to your backend URL (e.g. `http://localhost:3001/api/chat` or a same-origin `/api/chat` proxy).
4. Toggle `language: 'ar' | 'en'` and `position: 'bottom-left' | 'bottom-right'` dynamically as shown in `App.example.tsx`.
