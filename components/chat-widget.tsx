'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
};

const API_BASE = (process.env.NEXT_PUBLIC_API_BASE_URL || '').replace(/\/+$/, '');

export function ChatWidget({ pageContext }: { pageContext: string }) {
  const [abierto, setAbierto] = useState(false);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState('');
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: 'Hola, soy tu asistente de compras. Puedo ayudarte con productos, precios, colores, memoria y disponibilidad de esta página.'
    }
  ]);

  const enviar = async () => {
    const content = input.trim();
    if (!content || loading) return;

    const nextMessages = [...messages, { role: 'user' as const, content }];
    setMessages(nextMessages);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: nextMessages, pageContext })
      });

      const contentType = response.headers.get('content-type') || '';
      const isJson = contentType.includes('application/json');
      const payload = isJson ? await response.json() : await response.text();

      if (!response.ok) {
        const detail =
          typeof payload === 'string'
            ? payload.slice(0, 220)
            : payload?.detail || payload?.error || `HTTP ${response.status}`;
        setMessages((prev) => [...prev, { role: 'assistant', content: `No pude responder ahora. Error: ${detail}` }]);
        return;
      }

      const answer =
        (typeof payload === 'object' ? payload?.answer : '') ||
        (typeof payload === 'object' ? payload?.error : '') ||
        (typeof payload === 'object' ? payload?.detail : '') ||
        'No pude responder en este momento.';
      setMessages((prev) => [...prev, { role: 'assistant', content: answer }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'No pude conectarme ahora. Probá nuevamente en unos segundos.' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!abierto) return;
    const container = messagesContainerRef.current;
    if (!container) return;
    container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages, loading, abierto]);

  return (
    <div className="fixed bottom-5 right-5 z-[70]">
      {abierto ? (
        <div className="w-[350px] overflow-hidden rounded-2xl border border-border bg-white shadow-elevated">
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <p className="flex items-center gap-2 text-sm font-semibold">
              <BotIcon className="h-4 w-4 text-[#111827]" />
              Asistente de compras
            </p>
            <button type="button" onClick={() => setAbierto(false)} className="text-sm text-muted">
              Cerrar
            </button>
          </div>

          <div ref={messagesContainerRef} className="max-h-[360px] space-y-3 overflow-y-auto p-4">
            {messages.map((m, idx) => (
              <div key={`${m.role}-${idx}`} className={m.role === 'user' ? 'text-right' : 'text-left'}>
                <div
                  className={`inline-block max-w-[92%] rounded-2xl px-3 py-2 text-sm leading-6 ${
                    m.role === 'user' ? 'bg-[#111827] text-white' : 'bg-panel text-text'
                  } ${m.role === 'assistant' ? 'whitespace-pre-wrap text-left' : ''}`}
                >
                  {m.role === 'assistant' ? (
                    <FormattedAssistantContent text={m.content} />
                  ) : (
                    m.content
                  )}
                </div>
              </div>
            ))}
            {loading && <p className="text-xs text-muted">Pensando respuesta...</p>}
            <div ref={messagesEndRef} />
          </div>

          <div className="border-t border-border p-3">
            <div className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    void enviar();
                  }
                }}
                placeholder="Escribí tu consulta..."
                className="w-full rounded-xl border border-border px-3 py-2 text-sm outline-none focus:border-[#111827]"
              />
              <button
                type="button"
                onClick={() => void enviar()}
                className="rounded-xl bg-text px-3 py-2 text-sm font-semibold text-white"
              >
                Enviar
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setAbierto(true)}
          className="group relative overflow-hidden rounded-full bg-black px-5 py-3 text-sm font-semibold text-white shadow-elevated transition duration-300 hover:-translate-y-0.5"
        >
          <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.16),transparent_35%)]" aria-hidden />
          <span className="relative flex items-center gap-2">
            <BotIcon className="h-4 w-4 text-white" />
            Chat de ayuda
          </span>
        </button>
      )}
    </div>
  );
}

/** Renderiza texto con enlaces Markdown [etiqueta](url) como <a> clickeables (sin mostrar URL larga). */
function FormattedAssistantContent({ text }: { text: string }) {
  const re = /\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g;
  const parts: ReactNode[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  let i = 0;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) {
      parts.push(<span key={`t-${i++}`}>{text.slice(last, m.index)}</span>);
    }
    parts.push(
      <a
        key={`a-${i++}`}
        href={m[2]}
        target="_blank"
        rel="noopener noreferrer"
        className="font-semibold text-[#0071e3] underline decoration-[#0071e3]/40 underline-offset-2 hover:text-[#0058b3]"
      >
        {m[1]}
      </a>
    );
    last = m.index + m[0].length;
  }
  if (last < text.length) {
    parts.push(<span key={`t-${i++}`}>{text.slice(last)}</span>);
  }
  return <>{parts.length > 0 ? parts : text}</>;
}

function BotIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className={className}>
      <path d="M12 3V6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <rect x="4" y="7" width="16" height="12" rx="4" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="9" cy="13" r="1.2" fill="currentColor" />
      <circle cx="15" cy="13" r="1.2" fill="currentColor" />
      <path d="M9 16.5H15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M4 12H2.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M21.5 12H20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
