import { notFound } from 'next/navigation';
import { ChatWidget } from '@/components/chat-widget';
import { ProductPage } from '@/components/product-page';
import { buildPageContext, productos } from '@/lib/store-data';

export default function ProductoSlugPage({ params }: { params: { slug: string } }) {
  const producto = productos.find((p) => p.slug === params.slug);
  if (!producto) {
    notFound();
  }

  return (
    <>
      <ProductPage producto={producto} />
      <ChatWidget pageContext={buildPageContext(producto)} />
    </>
  );
}
