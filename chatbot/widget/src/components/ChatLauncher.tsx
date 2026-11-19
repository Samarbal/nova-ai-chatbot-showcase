import React from 'react';
import { ChatBubbleIcon } from './icons.tsx';

interface ChatLauncherProps {
  label: string;
  onClick: () => void;
  buttonRef?: React.RefObject<HTMLButtonElement | null>;
}

export function ChatLauncher({ label, onClick, buttonRef }: ChatLauncherProps) {
  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={onClick}
      aria-expanded={false}
      aria-label={label}
      className="cb-launcher"
    >
      <span className="cb-launcher-icon">
        <ChatBubbleIcon size={15} />
      </span>
      <span>{label}</span>
    </button>
  );
}
