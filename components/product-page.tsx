'use client';

import { useState } from 'react';
import { Producto, WHATSAPP_SITE_NAME, whatsappHref } from '@/lib/store-data';

export function ProductPage({ producto }: { producto: Producto }) {
  const [indice, setIndice] = useState(0);
  const [indiceMemoria, setIndiceMemoria] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [origin, setOrigin] = useState('50% 50%');

  const total = producto.stockPorDeposito.cordoba + producto.stockPorDeposito.caba + producto.stockPorDeposito.rosario;
  const memoriaActiva = producto.memorias?.[indiceMemoria];
  const colorActivo = producto.colores?.[indice];
  const nombreProductoMostrado =
    producto.colores && colorActivo && memoriaActiva
      ? `${producto.nombreBase} ${memoriaActiva.nombre} - ${colorActivo.nombre}`
      : producto.colores && colorActivo
        ? `${producto.nombreBase} - ${colorActivo.nombre}`
        : memoriaActiva
          ? `${producto.nombreBase} ${memoriaActiva.nombre}`
          : producto.nombre;

  const precioMostrado = memoriaActiva?.precio ?? producto.precio;
  const transferenciaMostrada = memoriaActiva?.transferencia ?? producto.transferencia;
  const cuotasMostradas = memoriaActiva?.cuotas ?? producto.cuotas;

  const detalleSeleccion = [
    colorActivo ? `Color: ${colorActivo.nombre}` : null,
    memoriaActiva ? `Memoria: ${memoriaActiva.nombre}` : null
  ]
    .filter(Boolean)
    .join(' · ');

  const mensajeProducto = detalleSeleccion
    ? `Hola! Estoy viendo en la web de ${WHATSAPP_SITE_NAME} el ${nombreProductoMostrado} (${detalleSeleccion}) y estoy interesado.`
    : `Hola! Estoy viendo en la web de ${WHATSAPP_SITE_NAME} el ${nombreProductoMostrado} y estoy interesado.`;

  const waProducto = whatsappHref(mensajeProducto);

  return (
    <div className="min-h-screen bg-bg text-text antialiased">
      <header className="sticky top-0 z-50 border-b border-border/80 bg-[rgba(255,255,255,0.82)] shadow-[0_1px_0_rgba(15,23,42,0.06)] backdrop-blur-xl">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-6 lg:px-10">
          <a href="/" className="rounded-full border border-border bg-white px-4 py-2 text-sm font-semibold transition hover:bg-panel">
            ← Volver al catálogo
          </a>
          <a href={waProducto} target="_blank" rel="noopener noreferrer" className="rounded-full bg-text px-4 py-2 text-sm font-semibold text-white">
            Consultar
          </a>
        </div>
      </header>

      <main className="mx-auto grid max-w-7xl gap-10 px-6 py-10 lg:grid-cols-[1.05fr_0.95fr] lg:px-10 lg:py-14">
        <section>
          <div
            className="flex h-[520px] items-center justify-center overflow-hidden rounded-3xl border border-border bg-white"
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = ((e.clientX - rect.left) / rect.width) * 100;
              const y = ((e.clientY - rect.top) / rect.height) * 100;
              setOrigin(`${x}% ${y}%`);
            }}
            onMouseLeave={() => setOrigin('50% 50%')}
          >
            <img
              src={producto.imagenes[indice]}
              alt={producto.nombre}
              className="h-full w-full object-contain p-6 transition-transform duration-200"
              style={{ transform: `scale(${zoom})`, transformOrigin: origin }}
            />
          </div>

          <div className="mt-4 flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">Zoom imagen</p>
            <div className="flex items-center gap-2">
              <button type="button" onClick={() => setZoom((z) => Math.max(1, z - 0.25))} className="rounded-full border border-border px-3 py-1 text-sm font-semibold">-</button>
              <span className="w-12 text-center text-sm font-semibold">{zoom.toFixed(2)}x</span>
              <button type="button" onClick={() => setZoom((z) => Math.min(3, z + 0.25))} className="rounded-full border border-border px-3 py-1 text-sm font-semibold">+</button>
            </div>
          </div>

          {producto.colores && producto.colores.length > 0 ? (
            <div className="mt-4">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-muted">Color</p>
              <div className="grid grid-cols-3 gap-3">
                {producto.colores.map((color, idx) => (
                  <button
                    type="button"
                    key={color.nombre}
                    onClick={() => setIndice(idx)}
                    className={`rounded-2xl border p-2 text-left ${idx === indice ? 'border-text' : 'border-border'} bg-white`}
                  >
                    <img src={color.imagen} alt={`${producto.nombre} color ${color.nombre}`} className="h-20 w-full object-contain" />
                    <p className="mt-2 text-xs font-medium text-muted">{color.nombre}</p>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="mt-4 grid grid-cols-3 gap-3">
              {producto.imagenes.map((img, idx) => (
                <button
                  type="button"
                  key={img}
                  onClick={() => setIndice(idx)}
                  className={`overflow-hidden rounded-2xl border ${idx === indice ? 'border-text' : 'border-border'} bg-white`}
                >
                  <img src={img} alt={`${producto.nombre} vista ${idx + 1}`} className="h-24 w-full object-contain p-2" />
                </button>
              ))}
            </div>
          )}
        </section>

        <section>
          <p className="inline-flex rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">SKU {producto.sku}</p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight tracking-[-0.02em] sm:text-5xl">{nombreProductoMostrado}</h1>
          <p className="mt-5 text-base leading-8 text-muted">{producto.descripcion}</p>

          {producto.memorias && producto.memorias.length > 0 && (
            <div className="mt-6">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-muted">Memoria</p>
              <div className="flex flex-wrap gap-2">
                {producto.memorias.map((memoria, idx) => (
                  <button
                    type="button"
                    key={memoria.nombre}
                    onClick={() => setIndiceMemoria(idx)}
                    className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                      idx === indiceMemoria ? 'border-text bg-text text-white' : 'border-border bg-white hover:bg-panel'
                    }`}
                  >
                    {memoria.nombre}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-6 space-y-1">
            <p className="text-4xl font-semibold tracking-[-0.03em]">{precioMostrado}</p>
            <p className="text-sm font-semibold text-accent">{transferenciaMostrada}</p>
            <p className="text-sm text-muted">{cuotasMostradas}</p>
          </div>

          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            {producto.especificaciones.map((spec) => (
              <p key={spec} className="rounded-xl border border-border bg-white px-4 py-3 text-sm font-medium">
                {spec}
              </p>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-border bg-white p-5">
            <p className="text-sm font-semibold">Stock por depósito</p>
            <div className="mt-3 grid grid-cols-2 gap-2 text-sm text-muted">
              <p>Córdoba: <span className="font-semibold text-text">{producto.stockPorDeposito.cordoba} u.</span></p>
              <p>CABA: <span className="font-semibold text-text">{producto.stockPorDeposito.caba} u.</span></p>
              <p>Rosario: <span className="font-semibold text-text">{producto.stockPorDeposito.rosario} u.</span></p>
              <p>Total: <span className="font-semibold text-text">{total} u.</span></p>
            </div>
          </div>

          <div className="mt-8">
            <a href={waProducto} target="_blank" rel="noopener noreferrer" className="inline-flex rounded-full bg-text px-7 py-3 text-sm font-semibold text-white">
              Consultar
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
