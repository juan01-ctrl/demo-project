import Link from 'next/link';
import { Producto, mensajeConsultaProducto, whatsappHref } from '@/lib/store-data';

type ProductCardProps = {
  item: Producto;
  imageHeightClass?: string;
  showDescription?: boolean;
  className?: string;
  animationDelayMs?: number;
};

export function ProductCard({
  item,
  imageHeightClass = 'h-[320px]',
  showDescription = false,
  className = '',
  animationDelayMs
}: ProductCardProps) {
  return (
    <article
      className={`group rounded-[1.5rem] border border-border bg-white p-5 shadow-card transition duration-500 hover:-translate-y-1 hover:shadow-elevated ${className}`}
      style={animationDelayMs !== undefined ? { animationDelay: `${animationDelayMs}ms` } : undefined}
    >
      <div className={`relative flex ${imageHeightClass} items-center justify-center overflow-hidden rounded-2xl border border-border bg-white`}>
        <img src={item.imagenes[0]} alt={item.nombre} className="h-full w-full object-contain p-3 transition duration-500 group-hover:scale-[1.02]" loading="lazy" />
        <p className="absolute right-3 top-3 z-10 rounded-full border border-border bg-white/95 px-3 py-1 text-xs font-semibold shadow-sm backdrop-blur-sm">
          Stock {item.stock}
        </p>
      </div>
      <div className="mt-5">
        <h3 className="text-2xl font-semibold leading-tight tracking-[-0.01em]">{item.nombre}</h3>
        <p className="mt-1 text-sm text-muted">SKU: {item.sku}</p>
        {showDescription && <p className="mt-3 text-sm leading-7 text-muted">{item.descripcion}</p>}
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
  );
}
