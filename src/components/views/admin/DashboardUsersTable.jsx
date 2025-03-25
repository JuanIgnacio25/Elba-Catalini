"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";

import DashboardUsersTableSearch from "./DashboardUsersTableSearch";
import AdminUserTableFallback from "@/components/Fallbacks/AdminUserTableFallback";

function DashboardUsersTable() {
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

  const searchUsers = (query) => {
    const lowerCaseQuery = query.toLowerCase();
    const wordsInQuery = lowerCaseQuery.split(/\s+/); // Divide la búsqueda en palabras

    const filteredUsers = users
      .map((user) => {
        const companyName = user.companyName.toLowerCase();

        let score = 0;

        wordsInQuery.forEach((word) => {
          if (companyName.includes(word)) {
            if (companyName.startsWith(word)) {
              score += 300; // Coincidencia al inicio del nombre de la empresa
            } else {
              score += 200; // Coincidencia en cualquier parte del nombre de la empresa
            }
          }
        });

        return { ...user, score };
      })
      .filter((user) => user.score > 0)
      .sort((a, b) => b.score - a.score); // Ordenar por puntuación

    return filteredUsers;
  };

  // Filtrar productos según el término de búsqueda
  const filteredUsers = searchQuery ? searchUsers(searchQuery) : users;

  if (loading)
    return (
      <div className="w-full min-h-[60vh] flex flex-col items-center my-8">
        <AdminUserTableFallback />
      </div>
    );

  return (
    <div className="w-full min-h-[60vh] flex flex-col items-center my-8">
      <div className="overflow-x-auto max-h-[60vh] mb-8 shadow-md sm:rounded-lg">
        <div className="sticky top-0 z-20 py-2 px-2 bg-white">
          <label htmlFor="table-search" className="sr-only">
            Search
          </label>
          <DashboardUsersTableSearch />
        </div>
        <table className="w-full max-w-[99vw] lg:max-w-[94vw] min-w-[99vw] lg:min-w-[94vw] table-fixed text-sm text-left rtl:text-right text-gray-500">
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
            {filteredUsers.length === 0 ? (
              <tr className="h-[400px]">
                <td
                  colSpan={10}
                  className="px-6 py-4 text-center text-gray-500"
                >
                  {`No se encuentran productos para "${searchQuery}".`}
                </td>
              </tr>
            ) : (
              filteredUsers.map((usr) => (
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
