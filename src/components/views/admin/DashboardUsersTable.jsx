"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";

import DashboardProductsTableSearch from "./DashboardProductsTableSearch";
import AdminProductTableFallback from "@/components/Fallbacks/AdminProductTableFallback";

function DashboardUsersTable() {
  const router = useRouter();

  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const users = await axios.get("/api/users");
        setUsers(users.data.users);
        setLoading(false);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  /*  // Filtrar productos según el término de búsqueda
  const filteredProducts = searchQuery
    ? searchProducts(searchQuery)
    : allProducts; */

  if (loading) return <AdminProductTableFallback />;

  return (
    <div className="w-full min-h-[60vh] flex flex-col items-center my-8">
      <div className="overflow-x-auto max-h-[60vh] mb-8 shadow-md sm:rounded-lg">
        <div className="sticky top-0 z-20 py-2 px-2 bg-white">
          <label htmlFor="table-search" className="sr-only">
            Search
          </label>
          <DashboardProductsTableSearch />
        </div>
        <table className="w-full max-w-[99vw] lg:max-w-[90vw] min-w-[99vw] lg:min-w-[90vw] table-fixed text-sm text-left rtl:text-right text-gray-500">
          <thead className="sticky top-[46px] z-10 text-xs text-gray-700 uppercase bg-gray-200">
            <tr>
              <th scope="col" className="px-6 py-3">
                ID
              </th>
              <th scope="col" className="px-6 py-3">
                Razon Social
              </th>
              <th scope="col" className="px-6 py-3 ">
                Localidad
              </th>
              <th scope="col" className="px-6 py-3">
                Direccion
              </th>
              <th scope="col" className="px-6 py-3">
                Transporte
              </th>
              <th scope="col" className="px-6 py-3 ">
                Encargado de Compras
              </th>
              <th scope="col" className="px-6 py-3 ">
                Email
              </th>
              <th scope="col" className="px-6 py-3 ">
                Cuit
              </th>
              <th scope="col" className="px-6 py-3 ">
                Celular
              </th>
            </tr>
          </thead>
          <tbody className="min-h-[400px]">
            {users.length === 0 ? (
              <tr className="h-[400px]">
                <td
                  colSpan={10}
                  className="px-6 py-4 text-center text-gray-500"
                >
                  {`No se encuentran productos para "${searchQuery}".`}
                </td>
              </tr>
            ) : (
              users.map((usr) => (
                <tr
                  key={usr.userId}
                  className="odd:bg-white even:bg-gray-50 border-b border-gray-200"
                >
                  <td className="px-6 py-4">{usr.userId}</td>
                  <td className="px-6 py-4">{usr.companyName}</td>
                  <td className="px-6 py-4 break-words">{usr.location}</td>
                  <td className="px-6 py-4 break-words">{usr.address}</td>
                  <td className="px-6 py-4 break-words">{usr.carrier}</td>
                  <td className="px-6 py-4 break-words">
                    {usr.purchasingManagerName}
                  </td>
                  <td className="px-6 py-4 break-words">{usr.email}</td>
                  <td className="px-6 py-4 break-words">{usr.cuit}</td>
                  <td className="px-6 py-4 break-words">{usr.phoneNumber}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DashboardUsersTable;
