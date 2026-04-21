'use client';

import { useEffect, useRef, useState } from 'react';

export type CustomSelectOption = { value: string; label: string };

type CustomSelectProps = {
  label: string;
  value: string;
  options: readonly CustomSelectOption[];
  onChange: (value: string) => void;
  className?: string;
  buttonClassName?: string;
  id?: string;
  listboxId?: string;
};

export function CustomSelect({
  label,
  value,
  options,
  onChange,
  className = '',
  buttonClassName = '',
  id,
  listboxId
}: CustomSelectProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const selected = options.find((o) => o.value === value) ?? options[0];
  const lbId = listboxId ?? `${id ?? 'select'}-listbox`;

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div ref={rootRef} className={`relative flex min-w-[200px] flex-1 flex-col gap-1.5 sm:max-w-[280px] ${className}`}>
      <span className="text-sm text-muted">{label}</span>
      <div className="relative">
        <button
          type="button"
          id={id}
          aria-expanded={open}
          aria-controls={lbId}
          aria-haspopup="listbox"
          onClick={() => setOpen((v) => !v)}
          className={`flex w-full items-center justify-between gap-3 rounded-xl border border-border bg-panel px-3 py-2 text-left text-sm font-medium text-text transition hover:border-border/80 ${buttonClassName}`}
        >
          <span className="truncate">{selected.label}</span>
          <span
            className={`shrink-0 text-muted transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
            aria-hidden
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </button>
        {open && (
          <ul
            id={lbId}
            role="listbox"
            aria-labelledby={id}
            className="absolute left-0 right-0 top-[calc(100%+6px)] z-[100] max-h-60 overflow-auto rounded-xl border border-border bg-white p-1 shadow-elevated"
          >
            {options.map((opt) => (
              <li key={opt.value} role="presentation">
                <button
                  type="button"
                  role="option"
                  aria-selected={opt.value === value}
                  className={`w-full rounded-lg px-3 py-2.5 text-left text-sm transition ${
                    opt.value === value ? 'bg-[#111827] font-medium text-white' : 'text-text hover:bg-panel'
                  }`}
                  onClick={() => {
                    onChange(opt.value);
                    setOpen(false);
                  }}
                >
                  {opt.label}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
