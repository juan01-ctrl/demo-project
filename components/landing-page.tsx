'use client';

import { useLayoutEffect, useMemo, useRef, useState } from 'react';
import {
  categorias,
  filtroCategoriaOpciones,
  ordenCatalogoOpciones,
  precioStringANumero,
  productos,
  promos,
  razones,
  testimonios,
  WHATSAPP_MSG_GENERIC,
  whatsappHref
} from '@/lib/store-data';
import { CustomSelect } from '@/components/custom-select';
import { FaqSection } from '@/components/faq-section';
import { ProductCard } from '@/components/product-card';

type OrdenCatalogo = 'recomendados' | 'precio-asc' | 'precio-desc';

export function LandingPage() {
  const productosPremium = productos.slice(0, 3);
  const categoriaImagenes: Record<string, string> = {
    iPhone: '/products/iphone-1.jpg',
    MacBook: '/products/mac-1.jpg',
    iPad: '/products/ipad-1.jpg',
    Watch: '/products/watch-1.png',
    Accesorios: '/products/airpods-1.jpg'
  };
  const [busqueda, setBusqueda] = useState('');
  const [filtroCategoria, setFiltroCategoria] = useState('Todas');
  const [soloConStock, setSoloConStock] = useState(false);
  const [orden, setOrden] = useState<OrdenCatalogo>('recomendados');
  const promoBandRef = useRef<HTMLDivElement | null>(null);
  const siteHeaderRef = useRef<HTMLElement | null>(null);
  const [aboveFoldOffsetPx, setAboveFoldOffsetPx] = useState(0);

  useLayoutEffect(() => {
    const promoEl = promoBandRef.current;
    const headerEl = siteHeaderRef.current;
    if (!promoEl || !headerEl) return;

    const measure = () => {
      setAboveFoldOffsetPx(promoEl.offsetHeight + headerEl.offsetHeight);
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(promoEl);
    ro.observe(headerEl);
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, []);

  const productosFiltrados = useMemo(() => {
    const q = busqueda.trim().toLowerCase();
    const filtrados = productos.filter((item) => {
      const matchTexto = q.length === 0 || item.nombre.toLowerCase().includes(q) || item.sku.toLowerCase().includes(q);
      const matchCategoria = filtroCategoria === 'Todas' || item.categoria === filtroCategoria;
      const matchStock = !soloConStock || item.stock > 0;
      return matchTexto && matchCategoria && matchStock;
    });

    const ordenar = [...filtrados];
    switch (orden) {
      case 'precio-asc':
        ordenar.sort((a, b) => precioStringANumero(a.precio) - precioStringANumero(b.precio));
        break;
      case 'precio-desc':
        ordenar.sort((a, b) => precioStringANumero(b.precio) - precioStringANumero(a.precio));
        break;
      default:
        ordenar.sort((a, b) => productos.indexOf(a) - productos.indexOf(b));
    }
    return ordenar;
  }, [busqueda, filtroCategoria, soloConStock, orden]);

  const aplicarCategoria = (categoria: string) => {
    setFiltroCategoria(categoria);
    const target = document.getElementById('destacados');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-bg text-text antialiased selection:bg-accent/15">
      <div className="flex min-h-screen flex-col">
        <div ref={promoBandRef} className="shrink-0 border-b border-border/70 bg-white">
          <div className="relative w-full py-1.5 md:py-2">
            <div
              className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-white to-transparent motion-reduce:hidden sm:w-16"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-white to-transparent motion-reduce:hidden sm:w-16"
              aria-hidden
            />

            <div
              className="w-full overflow-hidden motion-reduce:hidden"
              role="region"
              aria-label="Promociones y beneficios"
            >
              <div className="flex w-max animate-marquee items-center will-change-transform hover:[animation-play-state:paused]">
                {Array.from({ length: 6 }, (_, dup) => (
                  <div
                    key={dup}
                    className="flex shrink-0 items-center gap-8 pr-8 sm:gap-10 sm:pr-10 md:gap-12 md:pr-12"
                    aria-hidden={dup > 0}
                  >
                    {promos.map((promo, i) => (
                      <p
                        key={`${dup}-${i}-${promo}`}
                        className="whitespace-nowrap text-[11px] font-medium leading-snug text-muted sm:text-xs"
                      >
                        {promo}
                      </p>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            <div className="hidden flex-wrap items-center justify-center gap-x-6 gap-y-1 px-4 motion-reduce:flex sm:gap-x-8">
              {promos.map((promo) => (
                <p key={`static-${promo}`} className="text-center text-[11px] font-medium text-muted sm:text-xs">
                  {promo}
                </p>
              ))}
            </div>
          </div>
        </div>

      <header
        ref={siteHeaderRef}
        className="sticky top-0 z-50 shrink-0 border-b border-border/80 bg-[rgba(255,255,255,0.82)] shadow-[0_1px_0_rgba(15,23,42,0.06)] backdrop-blur-xl"
      >
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

      <main className="flex min-h-0 flex-1 flex-col">
        <section
          id="inicio"
          className="relative flex min-h-0 flex-1 flex-col justify-center overflow-hidden border-b border-border/70 bg-white"
          style={{
            minHeight:
              aboveFoldOffsetPx > 0
                ? `max(0px, calc(100vh - ${aboveFoldOffsetPx}px))`
                : 'calc(100vh - 7rem)'
          }}
        >
          <div
            className="pointer-events-none absolute inset-0 z-0"
            style={{
              background:
                'radial-gradient(at 0% 0%, rgba(255, 45, 85, 0.1) 0px, transparent 50%), radial-gradient(at 100% 0%, rgba(0, 113, 227, 0.1) 0px, transparent 50%), radial-gradient(at 50% 50%, rgba(255, 255, 255, 1) 0px, transparent 80%)'
            }}
            aria-hidden
          />
          <div className="pointer-events-none absolute -left-14 top-10 z-0 h-56 w-56 rounded-full bg-black/10 blur-[74px]" aria-hidden />
          <div className="pointer-events-none absolute right-[-36px] top-20 z-0 h-64 w-64 rounded-full bg-black/9 blur-[80px]" aria-hidden />
          <div className="pointer-events-none absolute left-1/2 top-[-84px] z-0 h-56 w-[480px] -translate-x-1/2 rounded-full bg-black/8 blur-[90px]" aria-hidden />
          <div className="relative z-10 mx-auto max-w-7xl px-6 py-12 text-center sm:py-14 lg:px-10 lg:py-16">
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
            <div className="animate-reveal mt-10 flex flex-nowrap items-center justify-center gap-2.5 sm:gap-4">
              <a
                href="#categorias"
                className="shrink-0 rounded-full bg-text px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#1a2330] sm:px-8 sm:py-3.5"
              >
                Ver productos
              </a>
              <a
                href={whatsappHref(WHATSAPP_MSG_GENERIC)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Consultar por WhatsApp"
                className="shrink-0 rounded-full border border-border bg-white px-5 py-3 text-sm font-semibold transition hover:border-accent/40 hover:bg-accent/5 sm:px-8 sm:py-3.5"
              >
                Consultar
              </a>
            </div>
            <p className="animate-reveal mx-auto mt-9 max-w-xl px-2 text-center text-[10px] font-medium leading-snug text-muted/65 [text-wrap:balance] sm:mt-10 sm:max-w-2xl sm:text-[11px]">
              <span className="inline-flex flex-wrap items-center justify-center gap-x-1 gap-y-0.5 sm:gap-x-1.5">
                <span>+6.000 clientes</span>
                <span className="select-none text-muted/35" aria-hidden>
                  ·
                </span>
                <span>Garantía verificada</span>
                <span className="select-none text-muted/35" aria-hidden>
                  ·
                </span>
                <span>Envíos en todo el país</span>
              </span>
            </p>
          </div>
        </section>

        <section id="categorias" className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
          <div className="mb-12 rounded-[1.8rem] border border-border bg-white p-7 shadow-card lg:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">Catálogo importado</p>
            <h2 className="mt-3 text-4xl font-semibold leading-tight tracking-[-0.02em] sm:text-5xl">Elegí la línea Apple ideal para vos.</h2>
            <p className="mt-4 max-w-3xl text-base leading-7 text-muted">Selección curada de productos originales con disponibilidad local, precios claros y atención comercial personalizada.</p>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-6">
            {categorias.map((categoria, idx) => (
              <article
                key={categoria.nombre}
                className={`group overflow-hidden rounded-[1.85rem] border border-border bg-[#f3f4f6] p-5 shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-elevated ${
                  idx < 2 ? 'lg:col-span-3' : 'lg:col-span-2'
                }`}
              >
                <div className={`flex items-center justify-center rounded-[1.2rem] bg-white p-4 ${idx < 2 ? 'h-[280px]' : 'h-[220px]'}`}>
                  <img
                    src={categoriaImagenes[categoria.nombre] ?? '/product-inventory.svg'}
                    alt={categoria.nombre}
                    className="h-full w-full object-contain transition duration-500 group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                </div>
                <div className={`px-1 pb-1 text-center ${idx < 2 ? 'pt-7' : 'pt-6'}`}>
                  <h3 className="text-[2rem] font-semibold tracking-[-0.025em] text-[#111827]">{categoria.nombre}</h3>
                  <p className="mx-auto mt-2 max-w-[34ch] text-[1.02rem] leading-7 text-muted">{categoria.descripcion}</p>
                </div>
                <button
                  type="button"
                  onClick={() => aplicarCategoria(categoria.nombre)}
                  className="mt-5 w-full text-center text-[1.08rem] font-semibold text-[#2763cf] transition group-hover:tracking-[0.01em]"
                >
                  Ver {categoria.nombre} →
                </button>
              </article>
            ))}
          </div>
        </section>

        <section id="destacados" className="border-y border-border/70 bg-[#f7f7f9] py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="mb-14 border-b border-border/70 pb-14">
              <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">Selección premium</p>
                  <h2 className="mt-3 text-4xl font-semibold leading-tight tracking-[-0.02em] sm:text-5xl">Productos destacados</h2>
                </div>
                <p className="max-w-md text-sm leading-7 text-muted">Equipos con mayor demanda y disponibilidad inmediata para entrega en Argentina.</p>
              </div>
              <div className="grid gap-6 lg:grid-cols-3">
                {productosPremium.map((item) => (
                  <ProductCard key={`premium-${item.sku}`} item={item} imageHeightClass="h-[238px]" showDescription />
                ))}
              </div>
            </div>

            <div className="mb-9 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">Destacados de la semana</p>
                <h2 className="mt-3 text-4xl font-semibold leading-tight tracking-[-0.02em] sm:text-5xl">Listos para comprar</h2>
              </div>
              <p className="text-sm text-muted">Precios en ARS. Sujeto a disponibilidad.</p>
            </div>

            <div className="mb-8 flex flex-col gap-4 rounded-2xl border border-border bg-white p-4 shadow-card">
              <div className="flex flex-wrap items-end gap-4">
                <label className="flex min-w-[min(100%,280px)] flex-1 items-center gap-2 rounded-xl border border-border bg-panel px-3 py-2">
                  <span className="shrink-0 text-sm text-muted">Buscar</span>
                  <input value={busqueda} onChange={(e) => setBusqueda(e.target.value)} placeholder="Producto o SKU" className="w-full min-w-0 bg-transparent text-sm outline-none placeholder:text-muted" />
                </label>

                <CustomSelect
                  id="filtro-categoria"
                  label="Categoría"
                  value={filtroCategoria}
                  options={filtroCategoriaOpciones}
                  onChange={setFiltroCategoria}
                />

                <CustomSelect
                  id="filtro-orden"
                  label="Ordenar"
                  value={orden}
                  options={ordenCatalogoOpciones}
                  onChange={(v) => setOrden(v as OrdenCatalogo)}
                />

                <label className="flex min-w-[160px] cursor-pointer items-center gap-2 rounded-xl border border-border bg-panel px-3 py-2 text-sm">
                  <input type="checkbox" checked={soloConStock} onChange={(e) => setSoloConStock(e.target.checked)} className="h-4 w-4 accent-[#0d1420]" />
                  Solo con stock
                </label>
              </div>
            </div>

            <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
              {productosFiltrados.map((item, index) => (
                <ProductCard key={item.sku} item={item} className="animate-reveal" animationDelayMs={index * 90} />
              ))}
            </div>

            {productosFiltrados.length === 0 && (
              <div className="mt-6 rounded-2xl border border-border bg-white p-6 text-center text-sm text-muted">No encontramos productos con esos filtros.</div>
            )}
          </div>
        </section>

        <section id="confianza" className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <div className="relative overflow-hidden rounded-[2.2rem] border border-border bg-[linear-gradient(180deg,#f9fafb_0%,#ffffff_100%)] p-8 shadow-[0_28px_70px_rgba(15,23,42,0.08)] lg:p-12">
            <div className="pointer-events-none absolute -right-16 top-[-60px] h-56 w-56 rounded-full bg-black/[0.06] blur-3xl" aria-hidden />
            <div className="pointer-events-none absolute -left-16 bottom-[-80px] h-56 w-56 rounded-full bg-black/[0.05] blur-3xl" aria-hidden />

            <div className="relative z-10 mb-10 flex flex-col gap-4 lg:mb-12 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-4xl">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted">Por qué elegirnos</p>
                <h2 className="mt-3 text-4xl font-semibold leading-[1.04] tracking-[-0.024em] sm:text-5xl lg:text-[3.4rem]">
                  Compra segura, atención real y respaldo postventa.
                </h2>
              </div>
              <p className="max-w-sm text-sm leading-7 text-muted">
                Operamos con proceso comercial claro, producto original y seguimiento humano en cada etapa de la compra.
              </p>
            </div>

            <div className="relative z-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {razones.map((item, index) => (
                <article
                  key={item.titulo}
                  className="group rounded-[1.4rem] border border-border/90 bg-white p-6 shadow-[0_12px_30px_rgba(15,23,42,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_44px_rgba(15,23,42,0.11)]"
                >
                  <div className="mb-5 flex items-center justify-between">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-panel text-xs font-semibold text-[#273244]">
                      0{index + 1}
                    </span>
                    <span className="h-2.5 w-2.5 rounded-full bg-[#111827]" aria-hidden />
                  </div>
                  <h3 className="text-[1.75rem] font-semibold leading-[1.15] tracking-[-0.02em] text-[#0f172a]">{item.titulo}</h3>
                  <p className="mt-4 text-base leading-8 text-muted">{item.descripcion}</p>
                </article>
              ))}
            </div>
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

      <footer className="shrink-0 border-t border-border/80 py-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between lg:px-10">
          <p>© {new Date().getFullYear()} Store Demo AR. Todos los derechos reservados.</p>
          <p>Términos · Privacidad · Garantía y cambios</p>
        </div>
      </footer>
      </div>
    </div>
  );
}
