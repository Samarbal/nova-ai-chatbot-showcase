import { useCallback, useRef, useState } from 'react';
import {
  type ChatbotConfig,
  type ChatMessage,
  resolveLocalizedString,
} from '../types/index.ts';

export interface UseChatbotOptions {
  config: ChatbotConfig;
  defaultOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
  fetcher?: typeof fetch;
}

export interface UseChatbotResult {
  isOpen: boolean;
  isMinimized: boolean;
  messages: ChatMessage[];
  inputValue: string;
  isLoading: boolean;
  errorMessage: string | null;
  canRetry: boolean;
  setInputValue: (value: string) => void;
  openChat: () => void;
  closeChat: () => void;
  minimizeChat: () => void;
  toggleChat: () => void;
  sendMessage: (overrideText?: string) => Promise<void>;
  retryLastMessage: () => Promise<void>;
}

function createId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}

export function useChatbot({
  config,
  defaultOpen = false,
  onOpenChange,
  fetcher,
}: UseChatbotOptions): UseChatbotResult {
  const [isOpen, setIsOpen] = useState<boolean>(defaultOpen);
  const [isMinimized, setIsMinimized] = useState<boolean>(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [failedMessageText, setFailedMessageText] = useState<string | null>(null);

  const messagesRef = useRef<ChatMessage[]>(messages);
  messagesRef.current = messages;

  const setOpenState = useCallback(
    (nextOpen: boolean) => {
      setIsOpen(nextOpen);
      if (nextOpen) {
        setIsMinimized(false);
      }
      onOpenChange?.(nextOpen);
    },
    [onOpenChange],
  );

  const openChat = useCallback(() => setOpenState(true), [setOpenState]);

  const closeChat = useCallback(() => {
    setIsMinimized(false);
    setOpenState(false);
  }, [setOpenState]);

  const minimizeChat = useCallback(() => {
    setIsMinimized(true);
    setOpenState(false);
  }, [setOpenState]);

  const toggleChat = useCallback(() => {
    setOpenState(!isOpen);
  }, [isOpen, setOpenState]);

  const dispatchToApi = useCallback(
    async (textToSend: string, historyBeforeMessage: ChatMessage[]) => {
      setIsLoading(true);
      setErrorMessage(null);
      setFailedMessageText(null);

      const fetchImpl = fetcher ?? globalThis.fetch;
      const fallbackError = resolveLocalizedString(
        config.labels?.networkErrorText,
        config.language,
        config.language === 'ar'
          ? 'تعذر الاتصال بخدمة الدعم حالياً. يرجى المحاولة مرة أخرى.'
          : 'Unable to reach support right now. Please try again.',
      );

      try {
        const response = await fetchImpl(config.apiEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: textToSend,
            language: config.language,
            knowledgeId: config.knowledgeId,
            history: historyBeforeMessage.slice(-8).map((item) => ({
              role: item.role,
              content: item.content,
            })),
          }),
        });

        const data = (await response.json().catch(() => null)) as {
          reply?: string;
          error?: { message?: string; retryable?: boolean };
        } | null;

        if (!response.ok || !data?.reply) {
          setErrorMessage(data?.error?.message || fallbackError);
          setFailedMessageText(textToSend);
          return;
        }

        const assistantMsg: ChatMessage = {
          id: createId(),
          role: 'assistant',
          content: data.reply,
          createdAt: Date.now(),
        };

        setMessages((prev) => [...prev, assistantMsg]);
      } catch {
        setErrorMessage(fallbackError);
        setFailedMessageText(textToSend);
      } finally {
        setIsLoading(false);
      }
    },
    [config.apiEndpoint, config.knowledgeId, config.labels?.networkErrorText, config.language, fetcher],
  );

  const sendMessage = useCallback(
    async (overrideText?: string) => {
      if (isLoading) return;

      const raw = overrideText ?? inputValue;
      const trimmed = raw.trim();
      const maxLen = config.maxMessageLength ?? 600;
      if (!trimmed || trimmed.length > maxLen) return;

      const historyBefore = messagesRef.current;
      const userMsg: ChatMessage = {
        id: createId(),
        role: 'user',
        content: trimmed,
        createdAt: Date.now(),
      };

      setMessages((prev) => [...prev, userMsg]);
      if (overrideText === undefined) {
        setInputValue('');
      }

      await dispatchToApi(trimmed, historyBefore);
    },
    [config.maxMessageLength, dispatchToApi, inputValue, isLoading],
  );

  const retryLastMessage = useCallback(async () => {
    if (isLoading || !failedMessageText) return;
    const current = messagesRef.current;
    const lastUserIndex = [...current]
      .reverse()
      .findIndex((item) => item.role === 'user' && item.content === failedMessageText);
    const historyBefore =
      lastUserIndex >= 0
        ? current.slice(0, current.length - 1 - lastUserIndex)
        : current;

    await dispatchToApi(failedMessageText, historyBefore);
  }, [dispatchToApi, failedMessageText, isLoading]);

  return {
    isOpen,
    isMinimized,
    messages,
    inputValue,
    isLoading,
    errorMessage,
    canRetry: Boolean(failedMessageText),
    setInputValue,
    openChat,
    closeChat,
    minimizeChat,
    toggleChat,
    sendMessage,
    retryLastMessage,
  };
}
