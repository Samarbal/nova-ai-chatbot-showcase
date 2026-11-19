import React from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { ChatbotWidget } from './components/ChatbotWidget.tsx';
import type { ChatbotConfig } from './types/index.ts';

export interface MountChatbotOptions {
  config: ChatbotConfig;
  defaultOpen?: boolean;
  target?: HTMLElement;
}

export interface MountedChatbotHandle {
  updateConfig: (nextConfig: Partial<ChatbotConfig>) => void;
  destroy: () => void;
}

export function mountChatbotWidget(options: MountChatbotOptions): MountedChatbotHandle {
  let currentConfig = options.config;
  let ownsHostElement = false;
  let hostElement = options.target;

  if (!hostElement) {
    hostElement = document.createElement('div');
    hostElement.setAttribute('data-nova-chatbot-embed', 'true');
    document.body.appendChild(hostElement);
    ownsHostElement = true;
  }

  const root: Root = createRoot(hostElement);

  const renderWidget = (cfg: ChatbotConfig, defaultOpen?: boolean) => {
    root.render(<ChatbotWidget config={cfg} defaultOpen={defaultOpen} />);
  };

  renderWidget(currentConfig, options.defaultOpen);

  return {
    updateConfig(nextConfig: Partial<ChatbotConfig>) {
      currentConfig = {
        ...currentConfig,
        ...nextConfig,
        theme: nextConfig.theme
          ? { ...currentConfig.theme, ...nextConfig.theme }
          : currentConfig.theme,
        labels: nextConfig.labels
          ? { ...currentConfig.labels, ...nextConfig.labels }
          : currentConfig.labels,
      };
      renderWidget(currentConfig);
    },
    destroy() {
      root.unmount();
      if (ownsHostElement && hostElement?.parentNode) {
        hostElement.parentNode.removeChild(hostElement);
      }
    },
  };
}

declare global {
  interface Window {
    SupportChatbot?: {
      init: (options: MountChatbotOptions) => MountedChatbotHandle;
    };
  }
}

if (typeof window !== 'undefined') {
  window.SupportChatbot = {
    init: mountChatbotWidget,
  };
}
