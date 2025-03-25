import React from 'react'

function ProductsFormFallback() {
    return (
      <div className="pb-4 mx-2 max-w-full lg:pb-6 border-2 border-solid border-gray-500 rounded-md bg-gray-100">
        <div className="flex w-full">
          <h2 className="p-4 text-2xl  font-bold text-gray-800 underline">
            Editar Producto
          </h2>
        </div>
        <form className="px-4">
          <div className="grid gap-4 grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 sm:gap-3">
            <div className="w-full">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Nombre
              </label>
              <input
                type="text"
                placeholder="Faro Baiml 1035.A"
                name="name"
                autoComplete="name"
                required={true}
                id="name"
                className="bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg outline-none focus:border-red-600 block w-full p-2.5"
              />
            </div>
  
            <div className="w-full">
              <label
                htmlFor="nameForOrders"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Nombre Para Pedidos
              </label>
              <input
                type="text"
                placeholder="FARO 1035.A"
                name="nameForOrders"
                autoComplete="off"
                required={true}
                id="nameForOrders"
                className="bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg outline-none focus:border-red-600 block w-full p-2.5"
              />
            </div>
  
            <div className="w-full">
              <label
                htmlFor="sku"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Sku
              </label>
              <input
                type="text"
                placeholder="sku"
                name="sku"
                autoComplete="sku"
                id="sku"
                className="bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg outline-none focus:border-red-600 block w-full p-2.5"
              />
            </div>
  
            <div>
              <label
                htmlFor="kind-options"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Tipo de Producto
              </label>
              <select
                id="kind-options"
                className="bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg outline-none focus:border-red-500 block w-full p-2.5"
              >
                <option value="" disabled hidden>
                  Tipo
                </option>
                <option value={"Baiml"}>Baiml</option>
                <option value={"Store"}>Producto de la Tienda</option>
              </select>
            </div>
  
            <div className="w-full">
              <label
                htmlFor="unit"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Unidad
              </label>
              <input
                type="number"
                placeholder="12"
                name="unit"
                autoComplete="unit"
                id="unit"
                className="bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg outline-none focus:border-red-600 block w-full p-2.5"
              />
            </div>
  
            <div className="sm:col-span-2">
              <label
                htmlFor="description"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Descripcion del Producto
              </label>
              <textarea
                type="text"
                placeholder="Unipolar Peso aprox.: Unidad: 90 g Caja x 12: 1230 g"
                name="description"
                autoComplete="description"
                required={true}
                id="description"
                rows="11"
                className="bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg outline-none focus:border-red-600 block w-full p-2.5"
              ></textarea>
            </div>
  
            <div
              className="col-span-1 sm:col-span-2 lg:col-span-2"
            >
              <label
                htmlFor="file-upload"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Imágenes del Producto
              </label>
              <input
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                id="file-upload"
              />
  
              {/* Botón Estilizado */}
  
              <label
                htmlFor="file-upload"
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg cursor-pointer hover:bg-red-800"
              >
                Seleccionar imágenes
              </label>
            </div>
          </div>
          <div className="flex justify-center w-full">
            <button
              type="submit"
              className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-red-600 hover:bg-red-800 rounded-lg "
            >
                Editar Producto
            </button>
          </div>
        </form>
      </div>
    );
}

export default ProductsFormFallback