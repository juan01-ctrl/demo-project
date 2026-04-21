'use client';

import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
  categorias,
  mensajeConsultaProducto,
  productos,
  promos,
  razones,
  testimonios,
  WHATSAPP_MSG_GENERIC,
  whatsappHref
} from '@/lib/store-data';
import { FaqSection } from '@/components/faq-section';

export function LandingPage() {
  const categoriasFiltro = ['Todas', 'iPhone', 'MacBook', 'iPad', 'Accesorios'] as const;
  const [busqueda, setBusqueda] = useState('');
  const [filtroCategoria, setFiltroCategoria] = useState('Todas');
  const [soloConStock, setSoloConStock] = useState(false);
  const [categoriaAbierta, setCategoriaAbierta] = useState(false);
  const categoriaRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onClickOutside = (event: MouseEvent) => {
      if (!categoriaRef.current) return;
      if (!categoriaRef.current.contains(event.target as Node)) {
        setCategoriaAbierta(false);
      }
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  const productosFiltrados = useMemo(() => {
    const q = busqueda.trim().toLowerCase();
    return productos.filter((item) => {
      const matchTexto = q.length === 0 || item.nombre.toLowerCase().includes(q) || item.sku.toLowerCase().includes(q);
      const matchCategoria = filtroCategoria === 'Todas' || item.categoria === filtroCategoria;
      const matchStock = !soloConStock || item.stock > 0;
      return matchTexto && matchCategoria && matchStock;
    });
  }, [busqueda, filtroCategoria, soloConStock]);

  const aplicarCategoria = (categoria: string) => {
    setFiltroCategoria(categoria);
    setCategoriaAbierta(false);
    const target = document.getElementById('destacados');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-bg text-text antialiased selection:bg-accent/15">
      <div className="border-b border-border/70 bg-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-8 gap-y-2 px-6 py-2 text-xs font-medium text-muted lg:px-10">
          {promos.map((promo) => (
            <p key={promo}>{promo}</p>
          ))}
        </div>
      </div>

      <header className="sticky top-0 z-50 border-b border-border/80 bg-[rgba(255,255,255,0.82)] shadow-[0_1px_0_rgba(15,23,42,0.06)] backdrop-blur-xl">
        <nav className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-6 lg:px-10" aria-label="Principal">
          <a href="#inicio" className="text-[17px] font-semibold tracking-[-0.01em] text-[#0f172a]">
            Store Demo AR
          </a>
          <ul className="hidden items-center gap-8 md:flex">
            <li><a href="#categorias" className="text-sm text-[#475569] transition-colors hover:text-[#0f172a]">Categorías</a></li>
            <li><a href="#destacados" className="text-sm text-[#475569] transition-colors hover:text-[#0f172a]">Destacados</a></li>
            <li><a href="#confianza" className="text-sm text-[#475569] transition-colors hover:text-[#0f172a]">Confianza</a></li>
            <li><a href="#faqs" className="text-sm text-[#475569] transition-colors hover:text-[#0f172a]">FAQs</a></li>
            <li><a href="#visitanos" className="text-sm text-[#475569] transition-colors hover:text-[#0f172a]">Visitanos</a></li>
          </ul>
          <a
            href={whatsappHref(WHATSAPP_MSG_GENERIC)}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-text px-4 py-2 text-sm font-semibold text-white shadow-card transition hover:-translate-y-0.5 hover:bg-[#1a2330] hover:shadow-elevated"
          >
            Consultar
          </a>
        </nav>
      </header>

      <main id="inicio">
        <section className="relative overflow-hidden border-b border-border/70 bg-white">
          <div className="pointer-events-none absolute -left-16 top-12 z-0 h-64 w-64 rounded-full bg-black/14 blur-[76px]" aria-hidden />
          <div className="pointer-events-none absolute right-[-40px] top-24 z-0 h-72 w-72 rounded-full bg-black/12 blur-[84px]" aria-hidden />
          <div className="pointer-events-none absolute left-1/2 top-[-90px] z-0 h-64 w-[520px] -translate-x-1/2 rounded-full bg-black/10 blur-[92px]" aria-hidden />
          <div className="relative z-10 mx-auto max-w-7xl px-6 pb-16 pt-20 text-center lg:px-10 lg:pb-24 lg:pt-28">
            <p className="animate-reveal inline-flex rounded-full border border-border bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-muted">
              Importador Apple en Argentina
            </p>
            <h1 className="animate-reveal mt-6 text-5xl font-semibold leading-[1.01] tracking-[-0.035em] sm:text-6xl lg:text-[5.25rem]">
              Apple original,
              <br className="hidden sm:block" />
              al precio que esperabas.
            </h1>
            <p className="animate-reveal mx-auto mt-7 max-w-3xl text-lg leading-8 text-muted sm:text-xl">
              Disponibilidad inmediata, condiciones claras y entrega en todo el país. Comprá directo al importador, sin fricción y con respaldo real.
            </p>
            <div className="animate-reveal mt-10 flex flex-wrap items-center justify-center gap-4">
              <a href="#destacados" className="rounded-full bg-text px-7 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#1a2330]">
                Ver productos
              </a>
              <a
                href={whatsappHref(WHATSAPP_MSG_GENERIC)}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-border bg-white px-7 py-3 text-sm font-semibold transition hover:border-accent/40 hover:bg-accent/5"
              >
                Consultar por WhatsApp
              </a>
            </div>
            <div className="animate-reveal mt-8 flex flex-wrap items-center justify-center gap-3">
              <p className="rounded-full border border-border bg-white px-4 py-2 text-xs font-semibold tracking-[0.12em] text-[#334155]">+6.000 CLIENTES</p>
              <p className="rounded-full border border-border bg-white px-4 py-2 text-xs font-semibold tracking-[0.12em] text-[#334155]">GARANTÍA VERIFICADA</p>
              <p className="rounded-full border border-border bg-white px-4 py-2 text-xs font-semibold tracking-[0.12em] text-[#334155]">ENVÍOS TODO EL PAÍS</p>
            </div>
          </div>
        </section>

        <section id="categorias" className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
          <div className="mb-12 rounded-[1.8rem] border border-border bg-white p-7 shadow-card lg:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">Catálogo importado</p>
            <h2 className="mt-3 text-4xl font-semibold leading-tight tracking-[-0.02em] sm:text-5xl">Elegí la línea Apple ideal para vos.</h2>
            <p className="mt-4 max-w-3xl text-base leading-7 text-muted">Selección curada de productos originales con disponibilidad local, precios claros y atención comercial personalizada.</p>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-5">
            {categorias.map((categoria, idx) => (
              <article key={categoria.nombre} className="group rounded-2xl border border-border bg-white p-5 shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-elevated">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">Línea {idx + 1}</p>
                <h3 className="text-xl font-semibold tracking-[-0.01em]">{categoria.nombre}</h3>
                <p className="mt-2 min-h-[72px] text-sm leading-6 text-muted">{categoria.descripcion}</p>
                <button type="button" onClick={() => aplicarCategoria(categoria.nombre)} className="mt-4 text-sm font-semibold text-accent transition group-hover:translate-x-1">
                  Ver catálogo →
                </button>
              </article>
            ))}
          </div>
        </section>

        <section id="destacados" className="border-y border-border/70 bg-[#f7f7f9] py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="mb-9 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">Destacados de la semana</p>
                <h2 className="mt-3 text-4xl font-semibold leading-tight tracking-[-0.02em] sm:text-5xl">Listos para comprar</h2>
              </div>
              <p className="text-sm text-muted">Precios en ARS. Sujeto a disponibilidad.</p>
            </div>

            <div className="mb-8 grid gap-4 rounded-2xl border border-border bg-white p-4 shadow-card md:grid-cols-[1fr_auto_auto] md:items-center">
              <label className="flex items-center gap-2 rounded-xl border border-border bg-panel px-3 py-2">
                <span className="text-sm text-muted">Buscar</span>
                <input value={busqueda} onChange={(e) => setBusqueda(e.target.value)} placeholder="Producto o SKU" className="w-full bg-transparent text-sm outline-none placeholder:text-muted" />
              </label>

              <div ref={categoriaRef} className="relative">
                <button type="button" onClick={() => setCategoriaAbierta((v) => !v)} className="flex min-w-[210px] items-center justify-between gap-3 rounded-xl border border-border bg-panel px-3 py-2 text-left">
                  <span className="text-sm text-muted">Categoría</span>
                  <span className="text-sm font-medium">{filtroCategoria}</span>
                </button>
                {categoriaAbierta && (
                  <div className="absolute left-0 top-[calc(100%+8px)] z-20 w-full rounded-xl border border-border bg-white p-1 shadow-elevated">
                    {categoriasFiltro.map((categoria) => (
                      <button
                        key={categoria}
                        type="button"
                        onClick={() => aplicarCategoria(categoria)}
                        className={`w-full rounded-lg px-3 py-2 text-left text-sm transition ${filtroCategoria === categoria ? 'bg-[#111827] text-white' : 'hover:bg-panel'}`}
                      >
                        {categoria}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <label className="flex items-center gap-2 rounded-xl border border-border bg-panel px-3 py-2 text-sm">
                <input type="checkbox" checked={soloConStock} onChange={(e) => setSoloConStock(e.target.checked)} className="h-4 w-4 accent-[#0d1420]" />
                Solo con stock
              </label>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {productosFiltrados.map((item, index) => (
                <article key={item.sku} className="group rounded-[1.5rem] border border-border bg-white p-5 shadow-card transition duration-500 hover:-translate-y-1 hover:shadow-elevated animate-reveal" style={{ animationDelay: `${index * 90}ms` }}>
                  <div className="flex h-[320px] items-center justify-center overflow-hidden rounded-2xl border border-border bg-white">
                    <img src={item.imagenes[0]} alt={item.nombre} className="h-full w-full object-contain p-3 transition duration-500 group-hover:scale-[1.02]" loading="lazy" />
                  </div>
                  <div className="mt-5 flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-2xl font-semibold leading-tight tracking-[-0.01em]">{item.nombre}</h3>
                      <p className="mt-1 text-sm text-muted">SKU: {item.sku}</p>
                    </div>
                    <p className="rounded-full border border-border px-3 py-1 text-xs font-semibold">Stock {item.stock}</p>
                  </div>
                  <div className="mt-4 space-y-1">
                    <p className="text-2xl font-semibold tracking-[-0.02em]">{item.precio}</p>
                    <p className="text-sm font-semibold text-accent">{item.transferencia}</p>
                    <p className="text-sm text-muted">{item.cuotas}</p>
                  </div>
                  <div className="mt-5 flex items-center gap-3">
                    <Link href={`/producto/${item.slug}`} className="rounded-full bg-text px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#1a2330]">
                      Ver producto
                    </Link>
                    <a href={whatsappHref(mensajeConsultaProducto(item.nombre))} target="_blank" rel="noopener noreferrer" className="rounded-full border border-border px-5 py-2 text-sm font-semibold transition hover:bg-panel">
                      Consultar
                    </a>
                  </div>
                </article>
              ))}
            </div>

            {productosFiltrados.length === 0 && (
              <div className="mt-6 rounded-2xl border border-border bg-white p-6 text-center text-sm text-muted">No encontramos productos con esos filtros.</div>
            )}
          </div>
        </section>

        <section id="confianza" className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
          <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">Por qué elegirnos</p>
              <h2 className="mt-3 text-4xl font-semibold leading-tight tracking-[-0.02em] sm:text-5xl">Compra segura, atención real y respaldo postventa.</h2>
            </div>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {razones.map((item) => (
              <article key={item.titulo} className="rounded-2xl border border-border bg-white p-6 shadow-card">
                <h3 className="text-lg font-semibold tracking-[-0.01em]">{item.titulo}</h3>
                <p className="mt-3 text-sm leading-7 text-muted">{item.descripcion}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="border-y border-border/70 bg-white py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">Prueba social</p>
                <h2 className="mt-2 text-4xl font-semibold leading-tight tracking-[-0.02em] sm:text-5xl">Clientes que compran directo con confianza.</h2>
              </div>
              <p className="text-sm font-semibold text-accent">+6.000 clientes en todo el país</p>
            </div>
            <div className="mt-9 grid gap-5 md:grid-cols-3">
              {testimonios.map((t) => (
                <article key={t.cliente} className="rounded-2xl border border-border bg-white p-6 shadow-card">
                  <p className="text-sm tracking-[0.08em] text-[#ff8a00]">★★★★★</p>
                  <p className="mt-4 text-sm leading-7 text-[#2f3c4f]">{t.texto}</p>
                  <div className="mt-5 border-t border-border pt-4">
                    <p className="text-sm font-semibold text-text">{t.cliente}</p>
                    <p className="mt-1 text-xs text-muted">{t.compra}</p>
                  </div>
                  <p className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-accent">Compra verificada</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <FaqSection />

        <section id="contacto" className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <div className="grid gap-7 lg:grid-cols-[1.05fr_0.95fr]">
            <article className="rounded-[1.8rem] border border-white/10 bg-black p-9 text-white shadow-elevated lg:p-12">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/70">Atención comercial</p>
              <h2 className="mt-4 text-4xl font-semibold leading-tight tracking-[-0.02em] sm:text-5xl">¿No sabés cuál elegir?</h2>
              <p className="mt-5 max-w-2xl text-white/80 leading-7">Te asesoramos según presupuesto, uso y disponibilidad. Atención por WhatsApp sin compromiso.</p>
              <div className="mt-9">
                <a href={whatsappHref(WHATSAPP_MSG_GENERIC)} target="_blank" rel="noopener noreferrer" className="inline-flex rounded-full bg-white px-7 py-3 text-sm font-semibold text-[#0d1625] transition hover:-translate-y-0.5">
                  Hablar con un asesor
                </a>
              </div>
            </article>

            <article id="visitanos" className="rounded-[1.8rem] border border-border bg-white p-8 shadow-card lg:p-10">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">Visitanos</p>
              <h3 className="mt-3 text-2xl font-semibold tracking-[-0.01em]">Tienda física en Córdoba</h3>
              <div className="mt-6 space-y-4 text-sm text-[#354256]">
                <p><span className="font-semibold text-text">Dirección:</span> Av. Recta Martinolli 7120, Local 3156</p>
                <p><span className="font-semibold text-text">Horarios:</span> Lunes a Viernes 10:30 a 13:30 y 16:30 a 19:30</p>
                <p><span className="font-semibold text-text">Sábados:</span> 10:30 a 13:30</p>
                <p><span className="font-semibold text-text">Contacto:</span> +54 351 810-6793</p>
              </div>
            </article>
          </div>
        </section>
      </main>

      <footer className="border-t border-border/80 py-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between lg:px-10">
          <p>© {new Date().getFullYear()} Store Demo AR. Todos los derechos reservados.</p>
          <p>Términos · Privacidad · Garantía y cambios</p>
        </div>
      </footer>
    </div>
  );
}
