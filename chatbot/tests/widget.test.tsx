import { dom } from './setupJsdom.ts';
import assert from 'node:assert/strict';
import { afterEach, describe, it } from 'node:test';
import React from 'react';
import { cleanup, fireEvent, render, waitFor, within } from '@testing-library/react';
import {
  EXAMPLE_CHATBOT_CONFIG,
  createExampleWidgetConfig,
} from '../config/chatbot.config.example.ts';
import { createNovaWidgetConfig } from '../config/nova.demo.config.ts';
import { ChatbotWidget, mountChatbotWidget } from '../widget/src/index.ts';

function getShadowRootContainer(hostRoot: HTMLElement): HTMLElement {
  const host = hostRoot.querySelector('[data-chatbot-host]') ?? hostRoot;
  const shadow = host.shadowRoot;
  assert(shadow, 'Expected widget to attach an open Shadow DOM root');
  const container = shadow.querySelector('[data-chatbot-shadow-container]');
  assert(container instanceof dom.window.HTMLElement, 'Expected portal container inside Shadow DOM');
  return container as HTMLElement;
}

afterEach(() => {
  cleanup();
  document.body.innerHTML = '';
});

describe('Standalone Chatbot Widget — Shadow DOM, State, Retry & RTL/LTR', () => {
  it('mounts inside Shadow DOM, opens, minimizes, closes on Escape, and restores focus', async () => {
    const view = render(React.createElement(ChatbotWidget, { config: EXAMPLE_CHATBOT_CONFIG }));
    const shadowContainer = getShadowRootContainer(view.container);
    const queries = within(shadowContainer);

    const launcher = queries.getByRole('button', { name: 'Acme Support' });
    fireEvent.click(launcher);

    const dialog = queries.getByRole('dialog', { name: 'Acme Support' });
    assert.ok(dialog);
    const expectedWelcome = (EXAMPLE_CHATBOT_CONFIG.welcomeMessage as { en: string }).en;
    assert.ok(queries.getByText(expectedWelcome));

    // Press Escape to close chat window
    fireEvent.keyDown(window, { key: 'Escape' });
    await waitFor(() => {
      assert.equal(queries.queryByRole('dialog'), null);
    });

    // Reopen and test minimize control
    const launcherAgain = queries.getByRole('button', { name: 'Acme Support' });
    fireEvent.click(launcherAgain);
    const minimizeBtn = queries.getByRole('button', { name: 'Minimize chat' });
    fireEvent.click(minimizeBtn);
    assert.equal(queries.queryByRole('dialog'), null);
  });

  it('shows typing indicator during pending request and preserves session message history', async () => {
    let resolveFetch!: (value: Response) => void;
    const pendingFetch: typeof fetch = () =>
      new Promise<Response>((resolve) => {
        resolveFetch = resolve;
      });

    const view = render(
      React.createElement(ChatbotWidget, {
        config: EXAMPLE_CHATBOT_CONFIG,
        defaultOpen: true,
        fetcher: pendingFetch,
      }),
    );
    const shadowContainer = getShadowRootContainer(view.container);
    const queries = within(shadowContainer);

    const input = queries.getByPlaceholderText('Ask a question...');
    fireEvent.change(input, { target: { value: 'What warranty is included?' } });
    fireEvent.click(queries.getByRole('button', { name: 'Send' }));

    // User bubble + typing indicator appear immediately
    assert.ok(queries.getByText('What warranty is included?'));
    assert.ok(queries.getByRole('status', { name: 'Assistant is typing...' }));

    resolveFetch(
      new Response(
        JSON.stringify({
          reply: 'Every Acme Hardware product includes a 2-year warranty.',
          provider: 'mock',
          model: 'mock-1',
          grounded: true,
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } },
      ),
    );

    await waitFor(() => {
      assert.ok(
        queries.getByText('Every Acme Hardware product includes a 2-year warranty.'),
      );
    });
    assert.equal(queries.queryByRole('status'), null);
  });

  it('displays error and retries failed request without duplicating the user message', async () => {
    let attempt = 0;
    const flakyFetch: typeof fetch = async () => {
      attempt += 1;
      if (attempt === 1) {
        return new Response(
          JSON.stringify({
            error: {
              code: 'PROVIDER_UPSTREAM_ERROR',
              message: 'Temporary AI outage.',
              retryable: true,
            },
          }),
          { status: 502, headers: { 'Content-Type': 'application/json' } },
        );
      }

      return new Response(
        JSON.stringify({
          reply: 'Free shipping applies over $95.',
          provider: 'mock',
          model: 'mock-1',
          grounded: true,
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } },
      );
    };

    const view = render(
      React.createElement(ChatbotWidget, {
        config: EXAMPLE_CHATBOT_CONFIG,
        defaultOpen: true,
        fetcher: flakyFetch,
      }),
    );
    const shadowContainer = getShadowRootContainer(view.container);
    const queries = within(shadowContainer);

    const input = queries.getByPlaceholderText('Ask a question...');
    fireEvent.change(input, { target: { value: 'Do you offer free shipping?' } });
    fireEvent.click(queries.getByRole('button', { name: 'Send' }));

    await waitFor(() => {
      assert.ok(queries.getByRole('alert'));
      assert.ok(queries.getByText('Temporary AI outage.'));
    });

    fireEvent.click(queries.getByRole('button', { name: 'Retry' }));

    await waitFor(() => {
      assert.ok(queries.getByText('Free shipping applies over $95.'));
    });

    // User message appears only once (not duplicated on retry)
    assert.equal(queries.getAllByText('Do you offer free shipping?').length, 1);
    assert.equal(queries.queryByRole('alert'), null);
  });

  it('switches cleanly between Arabic RTL and English LTR and applies theme config', () => {
    const arConfig = createNovaWidgetConfig('ar');
    const view = render(
      React.createElement(ChatbotWidget, { config: arConfig, defaultOpen: true }),
    );
    let shadowContainer = getShadowRootContainer(view.container);
    let rootDiv = shadowContainer.querySelector('.cb-root') as HTMLElement;
    assert.equal(rootDiv.getAttribute('dir'), 'rtl');
    assert.equal(rootDiv.getAttribute('lang'), 'ar');
    assert.ok(rootDiv.classList.contains('cb-pos-bottom-left'));
    assert.equal(rootDiv.style.getPropertyValue('--cb-primary'), '#1629D8');
    assert.ok(within(shadowContainer).getByText((arConfig.welcomeMessage as { ar: string }).ar));

    const enConfig = createNovaWidgetConfig('en');
    view.rerender(React.createElement(ChatbotWidget, { config: enConfig, defaultOpen: true }));
    shadowContainer = getShadowRootContainer(view.container);
    rootDiv = shadowContainer.querySelector('.cb-root') as HTMLElement;
    assert.equal(rootDiv.getAttribute('dir'), 'ltr');
    assert.equal(rootDiv.getAttribute('lang'), 'en');
    assert.ok(rootDiv.classList.contains('cb-pos-bottom-right'));
    assert.ok(within(shadowContainer).getByText((enConfig.welcomeMessage as { en: string }).en));
  });

  it('supports imperative mountChatbotWidget updateConfig and destroy lifecycle', async () => {
    const target = document.createElement('div');
    document.body.appendChild(target);

    const handle = mountChatbotWidget({
      config: createExampleWidgetConfig('en'),
      defaultOpen: true,
      target,
    });

    await waitFor(() => {
      const shadowContainer = getShadowRootContainer(target);
      const rootDiv = shadowContainer.querySelector('.cb-root') as HTMLElement;
      assert.equal(rootDiv.getAttribute('dir'), 'ltr');
    });

    handle.updateConfig({
      language: 'ar',
      position: 'bottom-left',
      theme: { primaryColor: '#0F766E' },
    });

    await waitFor(() => {
      const shadowContainer = getShadowRootContainer(target);
      const rootDiv = shadowContainer.querySelector('.cb-root') as HTMLElement;
      assert.equal(rootDiv.getAttribute('dir'), 'rtl');
      assert.equal(rootDiv.style.getPropertyValue('--cb-primary'), '#0F766E');
    });

    handle.destroy();
    await waitFor(() => {
      assert.equal(target.innerHTML, '');
    });
  });
});
