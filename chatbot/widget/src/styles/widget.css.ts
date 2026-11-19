export const WIDGET_STYLES = `
:host {
  all: initial;
  font-family: 'Cairo', 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

.cb-root,
.cb-root * {
  box-sizing: border-box;
  font-family: inherit;
}

.cb-root {
  position: fixed;
  bottom: 20px;
  z-index: 2147483000;
  color: var(--cb-text, #111325);
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
}

.cb-pos-bottom-right {
  right: 20px;
}

.cb-pos-bottom-left {
  left: 20px;
}

.cb-launcher {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  min-height: 52px;
  padding: 0 20px;
  border: 2px solid var(--cb-accent, #B5F25B);
  border-radius: 9999px;
  background: var(--cb-header-bg, #111325);
  color: var(--cb-header-ink, #FFFFFF);
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 14px 32px rgba(17, 19, 37, 0.28);
  transition: transform 150ms cubic-bezier(0.16, 1, 0.3, 1), background-color 150ms ease, box-shadow 150ms ease;
}

.cb-launcher:hover {
  transform: translateY(-2px);
  background: var(--cb-primary, #1629D8);
  color: var(--cb-primary-ink, #FFFFFF);
}

.cb-launcher:active {
  transform: scale(0.98);
}

.cb-launcher:focus-visible,
.cb-icon-btn:focus-visible,
.cb-send-btn:focus-visible,
.cb-chip:focus-visible,
.cb-retry-btn:focus-visible,
.cb-input:focus-visible {
  outline: 2px solid var(--cb-primary, #1629D8);
  outline-offset: 2px;
}

.cb-launcher-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 9999px;
  background: var(--cb-accent, #B5F25B);
  color: var(--cb-accent-ink, #111325);
  flex-shrink: 0;
}

.cb-window {
  width: min(390px, calc(100vw - 24px));
  height: min(560px, calc(100vh - 36px));
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-radius: 22px;
  border: 1px solid var(--cb-border, rgba(17, 19, 37, 0.14));
  background: var(--cb-surface, #F6F5FF);
  box-shadow: 0 24px 56px rgba(17, 19, 37, 0.26);
  animation: cb-pop-in 180ms cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes cb-pop-in {
  from {
    opacity: 0;
    transform: translateY(10px) scale(0.98);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.cb-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 14px 16px;
  background: var(--cb-header-bg, #111325);
  color: var(--cb-header-ink, #FFFFFF);
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
}

.cb-header-brand {
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
}

.cb-avatar {
  width: 36px;
  height: 36px;
  border-radius: 12px;
  background: var(--cb-primary, #1629D8);
  color: var(--cb-primary-ink, #FFFFFF);
  border: 1px solid var(--cb-secondary-accent, #AE8CFF);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.cb-header-titles {
  min-width: 0;
}

.cb-title {
  margin: 0;
  font-size: 15px;
  font-weight: 800;
  color: var(--cb-header-ink, #FFFFFF);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.cb-subtitle {
  margin: 0;
  font-size: 12px;
  font-weight: 600;
  color: var(--cb-secondary-accent, #AE8CFF);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.cb-header-actions {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;
}

.cb-icon-btn {
  width: 38px;
  height: 38px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  background: rgba(255, 255, 255, 0.08);
  color: var(--cb-header-ink, #FFFFFF);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 140ms ease, border-color 140ms ease, color 140ms ease;
}

.cb-icon-btn:hover {
  background: rgba(255, 255, 255, 0.18);
  border-color: var(--cb-accent, #B5F25B);
  color: var(--cb-accent, #B5F25B);
}

.cb-icon-btn:focus-visible {
  outline: 2px solid var(--cb-accent, #B5F25B);
  outline-offset: 2px;
}

.cb-messages {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.cb-bubble-row {
  display: flex;
  flex-direction: column;
  max-width: 86%;
}

.cb-bubble-row-assistant {
  align-self: flex-start;
}

.cb-bubble-row-user {
  align-self: flex-end;
}

.cb-bubble {
  padding: 10px 14px;
  border-radius: 16px;
  font-size: 13.5px;
  line-height: 1.55;
  white-space: pre-wrap;
  word-break: break-word;
}

.cb-bubble-assistant {
  background: var(--cb-card, #FFFFFF);
  color: var(--cb-text, #111325);
  border: 1px solid var(--cb-border, rgba(17, 19, 37, 0.1));
  border-start-start-radius: 4px;
}

.cb-bubble-user {
  background: var(--cb-primary, #1629D8);
  color: var(--cb-primary-ink, #FFFFFF);
  border-end-end-radius: 4px;
}

.cb-typing {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 12px 16px;
}

.cb-dot {
  width: 7px;
  height: 7px;
  border-radius: 9999px;
  background: var(--cb-primary, #1629D8);
  opacity: 0.45;
  animation: cb-bounce 1s infinite ease-in-out;
}

.cb-dot:nth-child(2) {
  animation-delay: 140ms;
}

.cb-dot:nth-child(3) {
  animation-delay: 280ms;
}

@keyframes cb-bounce {
  0%, 80%, 100% {
    transform: translateY(0);
    opacity: 0.4;
  }
  40% {
    transform: translateY(-4px);
    opacity: 1;
  }
}

.cb-suggestions {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-top: 4px;
}

.cb-suggestions-label {
  margin: 0;
  font-size: 11.5px;
  font-weight: 700;
  color: var(--cb-muted, #4B506B);
}

.cb-chip-list {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.cb-chip {
  text-align: start;
  padding: 7px 11px;
  min-height: 36px;
  border-radius: 10px;
  border: 1px solid var(--cb-border, rgba(17, 19, 37, 0.14));
  background: var(--cb-card, #FFFFFF);
  color: var(--cb-text, #111325);
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: border-color 140ms ease, background-color 140ms ease, color 140ms ease;
}

.cb-chip:hover:not(:disabled) {
  border-color: var(--cb-primary, #1629D8);
  color: var(--cb-primary, #1629D8);
}

.cb-chip:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.cb-error-banner {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 10px;
  margin: 0 12px 8px;
  padding: 10px 12px;
  border-radius: 12px;
  border: 1px solid rgba(185, 28, 28, 0.25);
  background: #FEF2F2;
  color: #991B1B;
  font-size: 12.5px;
}

.cb-error-text {
  display: flex;
  align-items: flex-start;
  gap: 7px;
  margin: 0;
  line-height: 1.45;
}

.cb-retry-btn {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  min-height: 34px;
  padding: 0 10px;
  border-radius: 8px;
  border: 1px solid rgba(185, 28, 28, 0.35);
  background: #FFFFFF;
  color: #991B1B;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  flex-shrink: 0;
}

.cb-retry-btn:hover {
  background: #FEE2E2;
}

.cb-composer {
  display: flex;
  align-items: flex-end;
  gap: 8px;
  padding: 12px;
  background: var(--cb-card, #FFFFFF);
  border-top: 1px solid var(--cb-border, rgba(17, 19, 37, 0.1));
}

.cb-input {
  flex: 1;
  min-height: 44px;
  max-height: 110px;
  resize: none;
  border-radius: 12px;
  border: 1px solid var(--cb-border, rgba(17, 19, 37, 0.18));
  background: var(--cb-surface, #F6F5FF);
  color: var(--cb-text, #111325);
  padding: 10px 12px;
  font-size: 13.5px;
  line-height: 1.4;
}

.cb-input::placeholder {
  color: var(--cb-muted, #4B506B);
  opacity: 0.78;
}

.cb-send-btn {
  min-width: 44px;
  height: 44px;
  padding: 0 14px;
  border-radius: 12px;
  border: none;
  background: var(--cb-accent, #B5F25B);
  color: var(--cb-accent-ink, #111325);
  font-size: 13px;
  font-weight: 800;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  cursor: pointer;
  flex-shrink: 0;
  transition: filter 140ms ease, transform 120ms ease, opacity 140ms ease;
}

.cb-send-btn:hover:not(:disabled) {
  filter: brightness(0.96);
}

.cb-send-btn:active:not(:disabled) {
  transform: scale(0.97);
}

.cb-send-btn:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}

@media (max-width: 480px) {
  .cb-root {
    bottom: 12px;
  }
  .cb-pos-bottom-right {
    right: 12px;
  }
  .cb-pos-bottom-left {
    left: 12px;
  }
  .cb-window {
    width: calc(100vw - 24px);
    height: min(74vh, 520px);
  }
}

@media (prefers-reduced-motion: reduce) {
  .cb-window,
  .cb-launcher,
  .cb-dot {
    animation: none;
    transition: none;
  }
}
`;
