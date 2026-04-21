export default function NotFound() {
  return (
    <div className="min-h-screen bg-bg px-6 py-16 text-text">
      <div className="mx-auto max-w-3xl rounded-3xl border border-border bg-white p-10 text-center shadow-card">
        <h1 className="text-3xl font-semibold">Producto no encontrado</h1>
        <a href="/" className="mt-6 inline-flex rounded-full bg-text px-6 py-3 text-sm font-semibold text-white">
          Volver al catálogo
        </a>
      </div>
    </div>
  );
}
