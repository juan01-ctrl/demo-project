import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Store Demo AR',
  description: 'Importador Apple en Argentina. Catálogo con stock, precios y atención comercial.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
