'use client';

import { useState } from 'react';
import { faqs, WHATSAPP_MSG_GENERIC, whatsappHref } from '@/lib/store-data';

export function FaqSection() {
  const [abierto, setAbierto] = useState<number | null>(0);

  return (
    <section
      id="faqs"
      className="relative overflow-hidden border-y border-white/10 bg-[#06080c] py-24 text-white lg:py-28"
      aria-labelledby="faqs-titulo"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_60%_at_50%_-15%,rgba(0,113,227,0.18),transparent_55%)]"
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-16 lg:items-start">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/45">Preguntas frecuentes</p>
            <h2 id="faqs-titulo" className="mt-5 font-display text-4xl font-medium leading-[1.12] tracking-[-0.03em] text-white sm:text-5xl">
              Todo lo que necesitás saber antes de comprar.
            </h2>
            <p className="mt-6 text-base leading-relaxed text-white/60">
              Respuestas claras sobre originales, garantía, envíos y pagos. Si tu duda es más específica, escribinos por WhatsApp.
            </p>
            <a
              href={whatsappHref(WHATSAPP_MSG_GENERIC)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-10 inline-flex rounded-full border border-white/20 bg-white/5 px-7 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:border-white/35 hover:bg-white/10"
            >
              Consultar por WhatsApp
            </a>
          </div>

          <div className="flex flex-col gap-3">
            {faqs.map((item, i) => {
              const isOpen = abierto === i;
              return (
                <div
                  key={item.pregunta}
                  className={`rounded-2xl border transition-[border-color,box-shadow] duration-300 ${
                    isOpen
                      ? 'border-white/[0.14] bg-white/[0.06] shadow-[0_0_0_1px_rgba(255,255,255,0.06)]'
                      : 'border-white/[0.08] bg-white/[0.02] hover:border-white/[0.12]'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setAbierto(isOpen ? null : i)}
                    className="flex w-full items-start justify-between gap-4 px-6 py-5 text-left"
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    id={`faq-trigger-${i}`}
                  >
                    <span className="text-[15px] font-semibold leading-snug tracking-[-0.01em] text-white sm:text-base">
                      {item.pregunta}
                    </span>
                    <span
                      className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5 transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                      aria-hidden
                    >
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white/90">
                        <path d="M3.5 5.25L7 8.75L10.5 5.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </button>
                  <div
                    className={`grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p
                        id={`faq-panel-${i}`}
                        role="region"
                        aria-labelledby={`faq-trigger-${i}`}
                        className="px-6 pb-5 text-sm leading-7 text-white/65"
                      >
                        {item.respuesta}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
