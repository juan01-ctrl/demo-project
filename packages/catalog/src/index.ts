export type Producto = {
  slug: string;
  nombreBase: string;
  nombre: string;
  sku: string;
  categoria: 'iPhone' | 'MacBook' | 'iPad' | 'Watch' | 'Accesorios';
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

export const WHATSAPP_PHONE = '5491140431125';
export const WHATSAPP_SITE_NAME = 'Store Demo AR';
export const WHATSAPP_MSG_GENERIC = `Hola! Estaba viendo la web de ${WHATSAPP_SITE_NAME} y quería hacerles una consulta.`;

export function mensajeConsultaProducto(nombreProducto: string) {
  return `Hola! Vi ${nombreProducto} en la web de ${WHATSAPP_SITE_NAME} y me gustaría consultar.`;
}

export function whatsappHref(message: string) {
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
}

export const promos = [
  '6 cuotas sin interés en productos seleccionados',
  '25% OFF abonando por transferencia',
  'Envíos a todo el país con seguimiento'
];

export const categorias = [
  { nombre: 'iPhone', descripcion: 'Nuevos y seminuevos seleccionados con garantía real.' },
  { nombre: 'MacBook', descripcion: 'Potencia profesional para trabajo, estudio y creación.' },
  { nombre: 'iPad', descripcion: 'Productividad y portabilidad en formato premium.' },
  { nombre: 'Watch', descripcion: 'Conectividad, salud y rendimiento diario.' },
  { nombre: 'Accesorios', descripcion: 'AirPods, fundas, cargadores y esenciales Apple.' }
];

export const filtroCategoriaOpciones = [
  { value: 'Todas', label: 'Todas' },
  { value: 'iPhone', label: 'iPhone' },
  { value: 'MacBook', label: 'Mac' },
  { value: 'iPad', label: 'iPad' },
  { value: 'Watch', label: 'Watch' },
  { value: 'Accesorios', label: 'Accesorios' }
] as const;

export const ordenCatalogoOpciones = [
  { value: 'recomendados', label: 'Recomendados' },
  { value: 'precio-asc', label: 'Precio: menor a mayor' },
  { value: 'precio-desc', label: 'Precio: mayor a menor' }
] as const;

export const razones = [
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

export const productos: Producto[] = [
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
    slug: 'apple-watch-series-10-gps-46',
    nombreBase: 'Apple Watch Series 10',
    nombre: 'Apple Watch Series 10 GPS 46mm',
    sku: 'APL-AW-S10-46',
    categoria: 'Watch',
    precio: 'AR$ 892.500',
    transferencia: 'AR$ 668.200 transferencia',
    cuotas: '6 cuotas sin interés de AR$ 148.750',
    stock: 14,
    descripcion:
      'Reloj inteligente con pantalla más grande, carga rápida y sensores de salud avanzados. Ideal para uso diario y deportivo.',
    especificaciones: ['Caja 46mm', 'GPS', 'Resistencia al agua 50m', 'Batería para todo el día'],
    imagenes: ['/products/ipad-2.jpg', '/products/ipad-3.jpg'],
    stockPorDeposito: { cordoba: 8, caba: 4, rosario: 2 }
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

export const testimonios = [
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

export const faqs = [
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

export function buildPageContext(productoActual?: Producto) {
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
