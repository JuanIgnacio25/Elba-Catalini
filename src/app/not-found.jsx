import "./not-found.css"

function notFound() {
  return (
    <div className="not-found-container flex flex-col items-center justify-center min-h-96 bg-gray-100 px-4">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 text-center mb-4">
        Página no encontrada
      </h1>
      <p className="text-base lg:text-lg text-gray-600 text-center">
        El enlace no corresponde a ninguna página válida.
      </p>
      <a
        href="/"
        className="mt-4 px-4 py-1 md:mt-5 md:px-5 md:py-2 bg-red-600 text-white font-medium text-sm sm:text-base rounded-lg shadow-md hover:bg-red-700 transition"
      >
        Volver al inicio
      </a>
    </div>
  );
}

export default notFound;
