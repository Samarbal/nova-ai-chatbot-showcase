import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useChatbot } from '../hooks/useChatbot.ts';
import { WIDGET_STYLES } from '../styles/widget.css.ts';
import {
  type ChatbotWidgetProps,
  resolveLocalizedString,
} from '../types/index.ts';
import { ChatLauncher } from './ChatLauncher.tsx';
import { ChatWindow } from './ChatWindow.tsx';

function getContrastInk(hexColor: string): string {
  const clean = hexColor.replace('#', '').trim();
  if (!/^[0-9a-fA-F]{6}$/.test(clean)) {
    return '#FFFFFF';
  }
  const r = parseInt(clean.slice(0, 2), 16) / 255;
  const g = parseInt(clean.slice(2, 4), 16) / 255;
  const b = parseInt(clean.slice(4, 6), 16) / 255;
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return luminance > 0.56 ? '#111325' : '#FFFFFF';
}

export function ChatbotWidget({
  config,
  defaultOpen = false,
  onOpenChange,
  fetcher,
}: ChatbotWidgetProps) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const launcherRef = useRef<HTMLButtonElement | null>(null);
  const [mountNode, setMountNode] = useState<HTMLDivElement | null>(null);

  const {
    isOpen,
    messages,
    inputValue,
    isLoading,
    errorMessage,
    canRetry,
    setInputValue,
    openChat,
    closeChat,
    minimizeChat,
    sendMessage,
    retryLastMessage,
  } = useChatbot({
    config,
    defaultOpen,
    onOpenChange,
    fetcher,
  });

  useEffect(() => {
    const hostEl = hostRef.current;
    if (!hostEl) return;

    const shadow = hostEl.shadowRoot ?? hostEl.attachShadow({ mode: 'open' });
    shadow.innerHTML = '';

    const styleEl = document.createElement('style');
    styleEl.textContent = WIDGET_STYLES;

    const portalContainer = document.createElement('div');
    portalContainer.setAttribute('data-chatbot-shadow-container', 'true');

    shadow.appendChild(styleEl);
    shadow.appendChild(portalContainer);
    setMountNode(portalContainer);

    return () => {
      setMountNode(null);
    };
  }, []);

  const handleCloseAndRestoreFocus = () => {
    closeChat();
    window.setTimeout(() => {
      launcherRef.current?.focus();
    }, 0);
  };

  const handleMinimizeAndRestoreFocus = () => {
    minimizeChat();
    window.setTimeout(() => {
      launcherRef.current?.focus();
    }, 0);
  };

  const themeVars = useMemo(() => {
    const primary = config.theme?.primaryColor || config.primaryColor || '#1629D8';
    const accent = config.theme?.accentColor || '#B5F25B';

    return {
      '--cb-primary': primary,
      '--cb-primary-ink': config.theme?.primaryTextColor || getContrastInk(primary),
      '--cb-accent': accent,
      '--cb-accent-ink': config.theme?.accentTextColor || getContrastInk(accent),
      '--cb-secondary-accent': config.theme?.secondaryAccentColor || '#AE8CFF',
      '--cb-header-bg': config.theme?.headerBackground || '#111325',
      '--cb-header-ink': config.theme?.headerTextColor || '#FFFFFF',
      '--cb-surface': config.theme?.surfaceColor || '#F6F5FF',
      '--cb-card': config.theme?.cardColor || '#FFFFFF',
      '--cb-text': config.theme?.textColor || '#111325',
      '--cb-muted': config.theme?.mutedTextColor || '#4B506B',
      '--cb-border': config.theme?.borderColor || 'rgba(17, 19, 37, 0.14)',
    } as React.CSSProperties;
  }, [config.primaryColor, config.theme]);

  const lang = config.language;
  const dir = lang === 'ar' ? 'rtl' : 'ltr';
  const positionClass =
    config.position === 'bottom-left' ? 'cb-pos-bottom-left' : 'cb-pos-bottom-right';
  const assistantName = resolveLocalizedString(config.assistantName, lang, 'Support');
  const openButtonLabel = resolveLocalizedString(
    config.labels?.openButtonLabel,
    lang,
    assistantName,
  );

  const widgetContent = (
    <div
      dir={dir}
      lang={lang}
      style={themeVars}
      className={`cb-root ${positionClass}`}
    >
      {isOpen ? (
        <ChatWindow
          config={config}
          messages={messages}
          inputValue={inputValue}
          isLoading={isLoading}
          errorMessage={errorMessage}
          canRetry={canRetry}
          onInputChange={setInputValue}
          onSend={(text) => void sendMessage(text)}
          onRetry={() => void retryLastMessage()}
          onMinimize={handleMinimizeAndRestoreFocus}
          onClose={handleCloseAndRestoreFocus}
        />
      ) : (
        <ChatLauncher
          label={openButtonLabel}
          onClick={openChat}
          buttonRef={launcherRef}
        />
      )}
    </div>
  );

  return (
    <div ref={hostRef} data-chatbot-host="true">
      {mountNode ? createPortal(widgetContent, mountNode) : null}
    </div>
  );
}
