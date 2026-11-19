import React, { useEffect, useRef } from 'react';
import type { ChatMessage } from '../types/index.ts';

interface MessageListProps {
  welcomeMessage: string;
  messages: ChatMessage[];
  suggestedQuestions: string[];
  suggestedHeading: string;
  isLoading: boolean;
  typingLabel: string;
  onSelectSuggestion: (question: string) => void;
}

export function MessageList({
  welcomeMessage,
  messages,
  suggestedQuestions,
  suggestedHeading,
  isLoading,
  typingLabel,
  onSelectSuggestion,
}: MessageListProps) {
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView?.({ behavior: 'smooth', block: 'end' });
  }, [messages.length, isLoading]);

  return (
    <div className="cb-messages" role="log" aria-live="polite" aria-relevant="additions text">
      <div className="cb-bubble-row cb-bubble-row-assistant">
        <div className="cb-bubble cb-bubble-assistant">{welcomeMessage}</div>
      </div>

      {suggestedQuestions.length > 0 && messages.length === 0 && (
        <div className="cb-suggestions">
          <p className="cb-suggestions-label">{suggestedHeading}</p>
          <div className="cb-chip-list">
            {suggestedQuestions.map((question) => (
              <button
                key={question}
                type="button"
                disabled={isLoading}
                onClick={() => onSelectSuggestion(question)}
                className="cb-chip"
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      )}

      {messages.map((message) => (
        <div
          key={message.id}
          className={`cb-bubble-row ${
            message.role === 'user' ? 'cb-bubble-row-user' : 'cb-bubble-row-assistant'
          }`}
        >
          <div
            className={`cb-bubble ${
              message.role === 'user' ? 'cb-bubble-user' : 'cb-bubble-assistant'
            }`}
          >
            {message.content}
          </div>
        </div>
      ))}

      {isLoading && (
        <div className="cb-bubble-row cb-bubble-row-assistant">
          <div
            className="cb-bubble cb-bubble-assistant cb-typing"
            role="status"
            aria-label={typingLabel}
          >
            <span className="cb-dot" aria-hidden="true" />
            <span className="cb-dot" aria-hidden="true" />
            <span className="cb-dot" aria-hidden="true" />
          </div>
        </div>
      )}

      <div ref={endRef} />
    </div>
  );
}
