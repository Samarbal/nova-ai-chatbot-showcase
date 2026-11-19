import { useState } from 'react';
import { ChatbotWidget, type ChatbotLanguage } from '../../widget/src/index.ts';
import { createExampleWidgetConfig } from '../../config/chatbot.config.example.ts';

/**
 * Minimal example showing how to drop the standalone ChatbotWidget into any React app.
 */
export function ClientStorefrontExample() {
  const [language, setLanguage] = useState<ChatbotLanguage>('en');
  const widgetConfig = createExampleWidgetConfig(language);

  return (
    <div dir={language === 'ar' ? 'rtl' : 'ltr'} style={{ padding: 32, fontFamily: 'sans-serif' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Acme Hardware Storefront</h1>
        <button
          type="button"
          onClick={() => setLanguage((prev) => (prev === 'en' ? 'ar' : 'en'))}
        >
          {language === 'en' ? 'العربية' : 'English'}
        </button>
      </header>

      <p>
        This host page uses plain React with no Tailwind dependency in the chatbot widget. The
        widget mounts inside a Shadow DOM root so host styles never break it.
      </p>

      <ChatbotWidget config={widgetConfig} />
    </div>
  );
}
