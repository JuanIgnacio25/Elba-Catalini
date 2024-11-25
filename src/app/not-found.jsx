function notFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-96 bg-gray-100 px-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        Página no encontrada
      </h1>
      <p className="text-lg text-gray-600">
        El enlace no corresponde a ninguna página válida.
      </p>
      <a
        href="/"
        className="mt-5 px-5 py-2 bg-red-600 text-white font-medium text-base rounded-lg shadow-md hover:bg-red-700 transition"
      >
        Volver al inicio
      </a>
    </div>
  );
}

export default notFound;
