import { useEffect, useMemo, useRef, useState } from 'react';

type Producto = {
  slug: string;
  nombreBase: string;
  nombre: string;
  sku: string;
  categoria: 'iPhone' | 'MacBook' | 'iPad' | 'Accesorios';
  precio: string;
  transferencia: string;
  cuotas: string;
  stock: number;
  descripcion: string;
  especificaciones: string[];
  imagenes: string[];
  colores?: {
    nombre: string;
    imagen: string;
  }[];
  memorias?: {
    nombre: string;
    precio: string;
    transferencia: string;
    cuotas: string;
  }[];
  stockPorDeposito: {
    cordoba: number;
    caba: number;
    rosario: number;
  };
};

type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
};

const promos = [
  '6 cuotas sin interés en productos seleccionados',
  '25% OFF abonando por transferencia',
  'Envíos a todo el país con seguimiento'
];

const categorias = [
  { nombre: 'iPhone', descripcion: 'Nuevos y seminuevos seleccionados con garantía real.' },
  { nombre: 'MacBook', descripcion: 'Potencia profesional para trabajo, estudio y creación.' },
  { nombre: 'iPad', descripcion: 'Productividad y portabilidad en formato premium.' },
  { nombre: 'Watch', descripcion: 'Conectividad, salud y rendimiento diario.' },
  { nombre: 'Accesorios', descripcion: 'AirPods, fundas, cargadores y esenciales Apple.' }
];

const razones = [
  {
    titulo: 'Garantía verificada',
    descripcion: 'Todos los productos cuentan con respaldo y garantía real de compra.'
  },
  {
    titulo: '+6.000 clientes',
    descripcion: 'Clientes de Córdoba y todo el país nos eligen desde 2010.'
  },
  {
    titulo: 'Envíos a todo el país',
    descripcion: 'Retirá en tienda física o recibí en tu domicilio con seguimiento.'
  },
  {
    titulo: 'Servicio técnico',
    descripcion: 'Reparación Apple con técnicos especializados y atención personalizada.'
  }
];

const productos: Producto[] = [
  {
    slug: 'iphone-17-pro-max-256gb',
    nombreBase: 'iPhone 17 Pro Max',
    nombre: 'iPhone 17 Pro Max 256GB',
    sku: 'APL-IP16PM-256',
    categoria: 'iPhone',
    precio: 'AR$ 3.144.012',
    transferencia: 'AR$ 2.341.580 transferencia',
    cuotas: '6 cuotas sin interés de AR$ 524.002',
    stock: 18,
    descripcion:
      'iPhone premium con disponibilidad inmediata, ideal para quienes buscan rendimiento tope de gama y compra segura.',
    especificaciones: ['Pantalla Super Retina XDR', 'Chip de alto rendimiento', 'Cámara Pro avanzada', 'Garantía 12 meses'],
    imagenes: ['/products/iphone-1.jpg', '/products/iphone-2.jpg', '/products/iphone-3.jpg'],
    colores: [
      { nombre: 'Silver', imagen: '/products/iphone-1.jpg' },
      { nombre: 'Cosmic Orange', imagen: '/products/iphone-2.jpg' },
      { nombre: 'Deep Blue', imagen: '/products/iphone-3.jpg' }
    ],
    memorias: [
      {
        nombre: '256GB',
        precio: 'AR$ 3.144.012',
        transferencia: 'AR$ 2.341.580 transferencia',
        cuotas: '6 cuotas sin interés de AR$ 524.002'
      },
      {
        nombre: '512GB',
        precio: 'AR$ 3.592.027',
        transferencia: 'AR$ 2.682.880 transferencia',
        cuotas: '6 cuotas sin interés de AR$ 598.671'
      },
      {
        nombre: '1TB',
        precio: 'AR$ 4.056.118',
        transferencia: 'AR$ 3.029.180 transferencia',
        cuotas: '6 cuotas sin interés de AR$ 676.020'
      }
    ],
    stockPorDeposito: { cordoba: 62, caba: 48, rosario: 21 }
  },
  {
    slug: 'macbook-air-13-m4-16gb-256gb',
    nombreBase: 'MacBook Air 13" M4',
    nombre: 'MacBook Air 13" M4 (16GB, 256GB SSD)',
    sku: 'APL-MBA-M3-13-16',
    categoria: 'MacBook',
    precio: 'AR$ 2.572.027',
    transferencia: 'AR$ 1.915.580 transferencia',
    cuotas: '6 cuotas sin interés de AR$ 428.671',
    stock: 9,
    descripcion:
      'Notebook liviana y potente para trabajo, estudio y uso profesional, con garantía y entrega en todo el país.',
    especificaciones: ['Pantalla Liquid Retina', 'Chip Apple M4', 'Memoria 16GB', 'SSD 256GB'],
    imagenes: ['/products/mac-1.jpg', '/products/mac-2.jpg', '/products/mac-3.jpg'],
    colores: [
      { nombre: 'Sky Blue', imagen: '/products/mac-1.jpg' },
      { nombre: 'Silver', imagen: '/products/mac-2.jpg' },
      { nombre: 'Midnight', imagen: '/products/mac-3.jpg' }
    ],
    memorias: [
      {
        nombre: '16GB / 256GB SSD',
        precio: 'AR$ 2.572.027',
        transferencia: 'AR$ 1.915.580 transferencia',
        cuotas: '6 cuotas sin interés de AR$ 428.671'
      },
      {
        nombre: '16GB / 512GB SSD',
        precio: 'AR$ 3.048.603',
        transferencia: 'AR$ 2.277.480 transferencia',
        cuotas: '6 cuotas sin interés de AR$ 508.100'
      },
      {
        nombre: '24GB / 512GB SSD',
        precio: 'AR$ 3.686.900',
        transferencia: 'AR$ 2.755.390 transferencia',
        cuotas: '6 cuotas sin interés de AR$ 614.483'
      }
    ],
    stockPorDeposito: { cordoba: 18, caba: 11, rosario: 8 }
  },
  {
    slug: 'ipad-a16-11-wifi-256gb-silver',
    nombreBase: 'iPad A16 (11") Wi-Fi',
    nombre: 'iPad A16 (11") Wi-Fi 256GB - Silver',
    sku: 'APL-IPDA11-256',
    categoria: 'iPad',
    precio: 'AR$ 1.157.071',
    transferencia: 'AR$ 864.780 transferencia',
    cuotas: '6 cuotas sin interés de AR$ 192.845',
    stock: 27,
    descripcion:
      'Tablet versátil y liviana para productividad, creatividad y entretenimiento, con stock propio de importación.',
    especificaciones: ['Pantalla 11"', 'Chip A16', 'Almacenamiento 256GB', 'Wi-Fi'],
    imagenes: ['/products/ipad-1.jpg', '/products/ipad-2.jpg', '/products/ipad-3.jpg'],
    colores: [
      { nombre: 'Silver', imagen: '/products/ipad-1.jpg' },
      { nombre: 'Space Black', imagen: '/products/ipad-2.jpg' },
      { nombre: 'Space Gray', imagen: '/products/ipad-3.jpg' }
    ],
    memorias: [
      {
        nombre: '128GB',
        precio: 'AR$ 937.436',
        transferencia: 'AR$ 703.091 transferencia',
        cuotas: '6 cuotas sin interés de AR$ 156.239'
      },
      {
        nombre: '256GB',
        precio: 'AR$ 1.157.071',
        transferencia: 'AR$ 864.780 transferencia',
        cuotas: '6 cuotas sin interés de AR$ 192.845'
      }
    ],
    stockPorDeposito: { cordoba: 31, caba: 19, rosario: 13 }
  },
  {
    slug: 'airpods-pro-3',
    nombreBase: 'AirPods Pro 3',
    nombre: 'AirPods Pro 3',
    sku: 'APL-APPRO2',
    categoria: 'Accesorios',
    precio: 'AR$ 610.124',
    transferencia: 'AR$ 454.400 transferencia',
    cuotas: '6 cuotas sin interés de AR$ 101.687',
    stock: 56,
    descripcion:
      'Accesorio de alta salida para ticket rápido. Excelente opción para bundles con iPhone y campañas promocionales.',
    especificaciones: ['Cancelación activa de ruido', 'Audio espacial', 'Estuche de carga', 'Conectividad inalámbrica'],
    imagenes: ['/products/airpods-1.jpg', '/products/airpods-2.jpg', '/products/airpods-3.jpg'],
    stockPorDeposito: { cordoba: 121, caba: 96, rosario: 52 }
  }
];

const WHATSAPP_PHONE = '5491159570977';

/** Nombre del comercio tal como querés que figure en los mensajes de WhatsApp. */
const WHATSAPP_SITE_NAME = 'Store Demo AR';

const WHATSAPP_MSG_GENERIC = `Hola! Estaba viendo la web de ${WHATSAPP_SITE_NAME} y quería hacerles una consulta.`;

function mensajeConsultaProducto(nombreProducto: string) {
  return `Hola! Vi ${nombreProducto} en la web de ${WHATSAPP_SITE_NAME} y me gustaría consultar.`;
}

function whatsappHref(message: string) {
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
}

const testimonios = [
  {
    texto:
      '“Compré iPhone para mi local y llegó en 24 horas. Sellado, original y en perfecto estado. La atención por WhatsApp fue impecable.”',
    cliente: 'Martín L.',
    compra: 'iPhone 16 Pro Max · Córdoba'
  },
  {
    texto:
      '“Ya es la tercera compra que hacemos. Precios claros, stock confirmado antes de pagar y entrega puntual.”',
    cliente: 'Carolina S.',
    compra: 'MacBook Air M3 · Buenos Aires'
  },
  {
    texto:
      '“Tenía dudas de comprar online, pero me enviaron fotos reales y detalle de estado. Llegó perfecto a mi sucursal.”',
    cliente: 'Lucas R.',
    compra: 'iPad Air 11” · CABA'
  }
];

const faqs = [
  {
    pregunta: '¿Los equipos son originales Apple?',
    respuesta:
      'Sí. Importamos producto sellado y original con trazabilidad. Cada unidad se controla antes del despacho y facturamos con datos impositivos claros.'
  },
  {
    pregunta: '¿Qué cobertura de garantía ofrecen?',
    respuesta:
      'Incluimos garantía de 12 meses en productos nuevos según condiciones del fabricante y nuestro respaldo comercial. Ante cualquier inconveniente, te guiamos por WhatsApp o en tienda.'
  },
  {
    pregunta: '¿Hacen envíos a todo el país?',
    respuesta:
      'Despachamos a Córdoba, CABA, Rosario y resto del país con seguimiento. También podés retirar en nuestra sucursal con coordinación previa.'
  },
  {
    pregunta: '¿Puedo pagar en cuotas o con transferencia?',
    respuesta:
      'Publicamos precios en cuotas sin interés en productos seleccionados y un precio preferencial abonando por transferencia. El detalle figura en cada producto.'
  },
  {
    pregunta: '¿Cómo confirmo stock antes de pagar?',
    respuesta:
      'El catálogo muestra disponibilidad actualizada y, si lo necesitás, validamos unidad y color por WhatsApp antes de cerrar la compra.'
  },
  {
    pregunta: '¿Atienden empresas o compras mayoristas?',
    respuesta:
      'Sí. Trabajamos con particulares, profesionales y comercios. Armamos propuestas según volumen, facturación y plazos de entrega.'
  }
];

function getPathname() {
  const path = window.location.pathname.replace(/\/+$/, '');
  return path || '/';
}

function buildPageContext(productoActual?: Producto) {
  const resumenProductos = productos
    .map((p) => {
      const memorias = p.memorias?.map((m) => m.nombre).join(', ') || 'No especificado';
      const colores = p.colores?.map((c) => c.nombre).join(', ') || 'No aplica';
      return [
        `Producto: ${p.nombreBase}`,
        `SKU: ${p.sku}`,
        `Precio base: ${p.precio}`,
        `Transferencia: ${p.transferencia}`,
        `Cuotas: ${p.cuotas}`,
        `Stock: ${p.stock}`,
        `Memorias: ${memorias}`,
        `Colores: ${colores}`
      ].join(' | ');
    })
    .join('\n');

  const paginaActual = productoActual
    ? `Página actual: detalle de ${productoActual.nombreBase}`
    : 'Página actual: landing de catálogo';

  return [
    `Fecha consulta: ${new Date().toISOString()}`,
    paginaActual,
    'Negocio: importador Apple en Argentina con venta directa.',
    'Canal de contacto principal: WhatsApp ventas.',
    'Datos actuales del catálogo:',
    resumenProductos
  ].join('\n');
}

function FaqSection() {
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

function App() {
  const [pathname, setPathname] = useState(getPathname());

  useEffect(() => {
    const onPopState = () => setPathname(getPathname());
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const navigate = (to: string) => {
    if (to === pathname) return;
    window.history.pushState({}, '', to);
    setPathname(to);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const match = pathname.match(/^\/producto\/([^/]+)$/);
  const producto = useMemo(
    () => (match ? productos.find((p) => p.slug === match[1]) : undefined),
    [match]
  );

  if (match) {
    if (!producto) {
      return (
        <>
          <div className="min-h-screen bg-bg px-6 py-16 text-text">
            <div className="mx-auto max-w-3xl rounded-3xl border border-border bg-white p-10 text-center shadow-card">
              <h1 className="text-3xl font-semibold">Producto no encontrado</h1>
              <button
                type="button"
                onClick={() => navigate('/')}
                className="mt-6 rounded-full bg-text px-6 py-3 text-sm font-semibold text-white"
              >
                Volver al catálogo
              </button>
            </div>
          </div>
          <ChatWidget pageContext={buildPageContext()} />
        </>
      );
    }

    return (
      <>
        <ProductoPage producto={producto} onBack={() => navigate('/')} />
        <ChatWidget pageContext={buildPageContext(producto)} />
      </>
    );
  }

  return (
    <>
      <LandingPage onOpenProduct={(slug) => navigate(`/producto/${slug}`)} />
      <ChatWidget pageContext={buildPageContext()} />
    </>
  );
}

function LandingPage({ onOpenProduct }: { onOpenProduct: (slug: string) => void }) {
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
      const matchTexto =
        q.length === 0 ||
        item.nombre.toLowerCase().includes(q) ||
        item.sku.toLowerCase().includes(q);
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

      <header className="sticky top-0 z-50 border-b border-border/90 bg-white/95 shadow-[0_1px_0_rgba(15,23,42,0.08)] backdrop-blur-2xl">
        <nav className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-6 lg:px-10" aria-label="Principal">
          <a href="#inicio" className="text-[17px] font-semibold tracking-[-0.01em] text-[#0f172a]">
            Store Demo AR
          </a>
          <ul className="hidden items-center gap-8 md:flex">
            <li><a href="#categorias" className="text-sm text-[#334155] transition-colors hover:text-[#0f172a]">Categorías</a></li>
            <li><a href="#destacados" className="text-sm text-[#334155] transition-colors hover:text-[#0f172a]">Destacados</a></li>
            <li><a href="#confianza" className="text-sm text-[#334155] transition-colors hover:text-[#0f172a]">Confianza</a></li>
            <li><a href="#faqs" className="text-sm text-[#334155] transition-colors hover:text-[#0f172a]">FAQs</a></li>
            <li><a href="#visitanos" className="text-sm text-[#334155] transition-colors hover:text-[#0f172a]">Visitanos</a></li>
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
        <section className="relative overflow-hidden border-b border-border/70">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(circle_at_50%_0%,rgba(0,113,227,0.16),transparent_56%)]" aria-hidden />
          <div className="mx-auto max-w-7xl px-6 pb-16 pt-20 text-center lg:px-10 lg:pb-24 lg:pt-28">
            <p className="animate-reveal text-xs font-semibold uppercase tracking-[0.22em] text-muted">Importador Apple en Argentina</p>
            <h1 className="animate-reveal mt-5 text-5xl font-semibold leading-[1.04] tracking-[-0.03em] sm:text-6xl lg:text-7xl">
              Importamos Apple original.
              <br className="hidden sm:block" />
              Vendemos directo, sin intermediarios.
            </h1>
            <p className="animate-reveal mx-auto mt-7 max-w-3xl text-lg leading-8 text-muted sm:text-xl">
              Stock propio, precios competitivos y atención personalizada para personas, empresas y locales en todo el país.
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
          </div>
        </section>

        <section id="categorias" className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
          <div className="mb-12 rounded-[1.8rem] border border-border bg-white p-7 shadow-card lg:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">Catálogo importado</p>
            <h2 className="mt-3 text-4xl font-semibold leading-tight tracking-[-0.02em] sm:text-5xl">
              Elegí la línea Apple ideal para vos.
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-7 text-muted">
              Selección curada de productos originales con disponibilidad local, precios claros y atención comercial personalizada.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-5">
            {categorias.map((categoria, idx) => (
              <article
                key={categoria.nombre}
                className="group rounded-2xl border border-border bg-white p-5 shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-elevated"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">Línea {idx + 1}</p>
                <h3 className="text-xl font-semibold tracking-[-0.01em]">{categoria.nombre}</h3>
                <p className="mt-2 min-h-[72px] text-sm leading-6 text-muted">{categoria.descripcion}</p>
                <button
                  type="button"
                  onClick={() => aplicarCategoria(categoria.nombre)}
                  className="mt-4 text-sm font-semibold text-accent transition group-hover:translate-x-1"
                >
                  Ver catálogo →
                </button>
              </article>
            ))}
          </div>
        </section>

        <section id="destacados" className="border-y border-border/70 bg-panel/40 py-24">
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
                <input
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                  placeholder="Producto o SKU"
                  className="w-full bg-transparent text-sm outline-none placeholder:text-muted"
                />
              </label>

              <div ref={categoriaRef} className="relative">
                <button
                  type="button"
                  onClick={() => setCategoriaAbierta((v) => !v)}
                  className="flex min-w-[210px] items-center justify-between gap-3 rounded-xl border border-border bg-panel px-3 py-2 text-left"
                >
                  <span className="text-sm text-muted">Categoría</span>
                  <span className="text-sm font-medium">{filtroCategoria}</span>
                </button>
                {categoriaAbierta && (
                  <div className="absolute left-0 top-[calc(100%+8px)] z-20 w-full rounded-xl border border-border bg-white p-1 shadow-elevated">
                    {categoriasFiltro.map((categoria) => (
                      <button
                        key={categoria}
                        type="button"
                        onClick={() => {
                          aplicarCategoria(categoria);
                        }}
                        className={`w-full rounded-lg px-3 py-2 text-left text-sm transition ${
                          filtroCategoria === categoria ? 'bg-[#111827] text-white' : 'hover:bg-panel'
                        }`}
                      >
                        {categoria}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <label className="flex items-center gap-2 rounded-xl border border-border bg-panel px-3 py-2 text-sm">
                <input
                  type="checkbox"
                  checked={soloConStock}
                  onChange={(e) => setSoloConStock(e.target.checked)}
                  className="h-4 w-4 accent-[#0d1420]"
                />
                Solo con stock
              </label>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {productosFiltrados.map((item, index) => (
                <article
                  key={item.sku}
                  className="group rounded-[1.5rem] border border-border bg-white p-5 shadow-card transition duration-500 hover:-translate-y-1 hover:shadow-elevated animate-reveal"
                  style={{ animationDelay: `${index * 90}ms` }}
                >
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
                    <button
                      type="button"
                      onClick={() => onOpenProduct(item.slug)}
                      className="rounded-full bg-text px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#1a2330]"
                    >
                      Ver producto
                    </button>
                    <a
                      href={whatsappHref(mensajeConsultaProducto(item.nombre))}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full border border-border px-5 py-2 text-sm font-semibold transition hover:bg-panel"
                    >
                      Consultar
                    </a>
                  </div>
                </article>
              ))}
            </div>

            {productosFiltrados.length === 0 && (
              <div className="mt-6 rounded-2xl border border-border bg-white p-6 text-center text-sm text-muted">
                No encontramos productos con esos filtros.
              </div>
            )}
          </div>
        </section>

        <section id="confianza" className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
          <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">Por qué elegirnos</p>
              <h2 className="mt-3 text-4xl font-semibold leading-tight tracking-[-0.02em] sm:text-5xl">
                Compra segura, atención real y respaldo postventa.
              </h2>
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

        <section className="border-y border-border/70 bg-[linear-gradient(180deg,#ffffff_0%,#f7f9fd_100%)] py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">Prueba social</p>
                <h2 className="mt-2 text-4xl font-semibold leading-tight tracking-[-0.02em] sm:text-5xl">
                  Clientes que compran directo con confianza.
                </h2>
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
              <p className="mt-5 max-w-2xl text-white/80 leading-7">
                Te asesoramos según presupuesto, uso y disponibilidad. Atención por WhatsApp sin compromiso.
              </p>
              <div className="mt-9">
                <a
                  href={whatsappHref(WHATSAPP_MSG_GENERIC)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex rounded-full bg-white px-7 py-3 text-sm font-semibold text-[#0d1625] transition hover:-translate-y-0.5"
                >
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

function ProductoPage({ producto, onBack }: { producto: Producto; onBack: () => void }) {
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
      <header className="sticky top-0 z-50 border-b border-border/90 bg-white/96 shadow-[0_1px_0_rgba(15,23,42,0.08)] backdrop-blur-2xl">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-6 lg:px-10">
          <button type="button" onClick={onBack} className="rounded-full border border-border bg-white px-4 py-2 text-sm font-semibold transition hover:bg-panel">
            ← Volver al catálogo
          </button>
          <a
            href={waProducto}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-text px-4 py-2 text-sm font-semibold text-white"
          >
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
            <a
              href={waProducto}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex rounded-full bg-text px-7 py-3 text-sm font-semibold text-white"
            >
              Consultar
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}

function ChatWidget({ pageContext }: { pageContext: string }) {
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
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: nextMessages, pageContext })
      });
      const data = await response.json();
      const answer =
        data?.answer ||
        data?.error ||
        data?.detail ||
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
                <p
                  className={`inline-block max-w-[92%] rounded-2xl px-3 py-2 text-sm leading-6 ${
                    m.role === 'user' ? 'bg-[#111827] text-white' : 'bg-panel text-text'
                  }`}
                >
                  {m.content}
                </p>
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

export default App;
