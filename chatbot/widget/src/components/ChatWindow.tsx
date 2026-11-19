import React, { useEffect, useRef } from 'react';
import {
  type ChatbotConfig,
  type ChatMessage,
  resolveLocalizedArray,
  resolveLocalizedString,
} from '../types/index.ts';
import {
  AlertIcon,
  ChatBubbleIcon,
  CloseIcon,
  MinimizeIcon,
  RetryIcon,
  SendIcon,
} from './icons.tsx';
import { MessageList } from './MessageList.tsx';

interface ChatWindowProps {
  config: ChatbotConfig;
  messages: ChatMessage[];
  inputValue: string;
  isLoading: boolean;
  errorMessage: string | null;
  canRetry: boolean;
  onInputChange: (value: string) => void;
  onSend: (overrideText?: string) => void;
  onRetry: () => void;
  onMinimize: () => void;
  onClose: () => void;
}

export function ChatWindow({
  config,
  messages,
  inputValue,
  isLoading,
  errorMessage,
  canRetry,
  onInputChange,
  onSend,
  onRetry,
  onMinimize,
  onClose,
}: ChatWindowProps) {
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const lang = config.language;

  const assistantName = resolveLocalizedString(config.assistantName, lang, 'Support');
  const subtitle = resolveLocalizedString(
    config.assistantSubtitle ?? config.businessDescription,
    lang,
    lang === 'ar' ? 'مساعد خدمة العملاء' : 'Customer Support Assistant',
  );
  const welcomeMessage = resolveLocalizedString(config.welcomeMessage, lang);
  const suggestedQuestions = resolveLocalizedArray(config.suggestedQuestions, lang);

  const minimizeLabel = resolveLocalizedString(
    config.labels?.minimizeButtonLabel,
    lang,
    lang === 'ar' ? 'تصغير المحادثة' : 'Minimize chat',
  );
  const closeLabel = resolveLocalizedString(
    config.labels?.closeButtonLabel,
    lang,
    lang === 'ar' ? 'إغلاق المحادثة' : 'Close chat',
  );
  const placeholder = resolveLocalizedString(
    config.labels?.inputPlaceholder,
    lang,
    lang === 'ar' ? 'اكتب سؤالك هنا...' : 'Ask a question...',
  );
  const sendLabel = resolveLocalizedString(
    config.labels?.sendButtonLabel,
    lang,
    lang === 'ar' ? 'إرسال' : 'Send',
  );
  const retryLabel = resolveLocalizedString(
    config.labels?.retryButtonLabel,
    lang,
    lang === 'ar' ? 'إعادة المحاولة' : 'Retry',
  );
  const typingLabel = resolveLocalizedString(
    config.labels?.typingLabel,
    lang,
    lang === 'ar' ? 'المساعد يكتب الرد...' : 'Assistant is typing...',
  );
  const suggestedHeading = resolveLocalizedString(
    config.labels?.suggestedHeading,
    lang,
    lang === 'ar' ? 'أسئلة مقترحة' : 'Suggested questions',
  );

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.stopPropagation();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const maxLength = config.maxMessageLength ?? 600;
  const canSend = inputValue.trim().length > 0 && !isLoading;

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (canSend) {
      onSend();
    }
  };

  const handleTextareaKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      if (canSend) {
        onSend();
      }
    }
  };

  return (
    <section
      role="dialog"
      aria-modal="false"
      aria-label={assistantName}
      className="cb-window"
    >
      <header className="cb-header">
        <div className="cb-header-brand">
          <span className="cb-avatar">
            <ChatBubbleIcon size={17} />
          </span>
          <div className="cb-header-titles">
            <h2 className="cb-title">{assistantName}</h2>
            {subtitle && <p className="cb-subtitle">{subtitle}</p>}
          </div>
        </div>

        <div className="cb-header-actions">
          <button
            type="button"
            onClick={onMinimize}
            aria-label={minimizeLabel}
            title={minimizeLabel}
            className="cb-icon-btn"
          >
            <MinimizeIcon size={16} />
          </button>
          <button
            type="button"
            onClick={onClose}
            aria-label={closeLabel}
            title={closeLabel}
            className="cb-icon-btn"
          >
            <CloseIcon size={16} />
          </button>
        </div>
      </header>

      <MessageList
        welcomeMessage={welcomeMessage}
        messages={messages}
        suggestedQuestions={suggestedQuestions}
        suggestedHeading={suggestedHeading}
        isLoading={isLoading}
        typingLabel={typingLabel}
        onSelectSuggestion={(q) => onSend(q)}
      />

      {errorMessage && (
        <div role="alert" className="cb-error-banner">
          <p className="cb-error-text">
            <AlertIcon size={15} />
            <span>{errorMessage}</span>
          </p>
          {canRetry && (
            <button type="button" onClick={onRetry} className="cb-retry-btn">
              <RetryIcon size={13} />
              <span>{retryLabel}</span>
            </button>
          )}
        </div>
      )}

      <form onSubmit={handleSubmit} className="cb-composer">
        <textarea
          ref={inputRef}
          rows={1}
          maxLength={maxLength}
          value={inputValue}
          onChange={(e) => onInputChange(e.target.value)}
          onKeyDown={handleTextareaKeyDown}
          placeholder={placeholder}
          aria-label={placeholder}
          className="cb-input"
        />
        <button
          type="submit"
          disabled={!canSend}
          aria-label={sendLabel}
          className="cb-send-btn"
        >
          <SendIcon size={15} />
          <span>{sendLabel}</span>
        </button>
      </form>
    </section>
  );
}
