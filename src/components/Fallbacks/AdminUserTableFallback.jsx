import { IoIosSearch } from "react-icons/io";
import { CgSpinner } from "react-icons/cg";

function AdminUserTableFallback() {
  return (
    <div className="relative mb-8">
      <div className="overflow-x-auto overflow-y-auto min-h-[60vh] max-h-[60vh] shadow-md  opacity-60">
        <div className="sticky top-0 z-20 py-2 px-2 bg-white">
          <label htmlFor="table-search" className="sr-only">Search</label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <IoIosSearch className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="text"
              id="table-search"
              className="block py-1 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:outline-none focus:border-red-500"
              placeholder="Buscar usuarios..."
            />
          </div>
        </div>

        <table className="w-full max-w-[99vw] lg:max-w-[94vw] min-w-[99vw] lg:min-w-[94vw] max-w-[90vh]text-sm text-left text-gray-500">
          <thead className="sticky top-[46px] z-10 text-xs text-gray-700 uppercase bg-gray-200">
            <tr>
              <th className="px-6 py-3">ID</th>
              <th className="px-6 py-3">Razon Social</th>
              <th className="px-6 py-3">Localidad</th>
              <th className="px-6 py-3">Direccion</th>
              <th className="px-6 py-3">Transporte</th>
              <th className="px-6 py-3">Encargado de Compras</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Cuit</th>
              <th className="px-6 py-3">Celular</th>
            </tr>
          </thead>
          <tbody>
            {["1", "2", "3", "4" , "5"].map((value) => (
              <tr key={value} className="odd:bg-white even:bg-gray-50 border-b border-gray-200">
                <td className="px-6 py-6">{value}</td>
                <td className="px-6 py-6"></td>
                <td className="px-6 py-6 w-[200px] whitespace-normal break-words"></td>
                <td className="px-6 py-6 w-[200px] whitespace-normal break-words"></td>
                <td className="px-6 py-6 w-[180px] whitespace-normal break-words"></td>
                <td className="px-6 py-6 w-[180px] whitespace-normal break-words"></td>
                <td className="px-6 py-6 w-[180px] whitespace-normal break-words"></td>
                <td className="px-6 py-6"></td>
                <td className="px-6 py-6"></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Overlay con Spinner */}
      <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-60">
        <CgSpinner className="w-11 h-11 text-red-500 animate-spin" />
      </div>
    </div>
  );
}

export default AdminUserTableFallback;
