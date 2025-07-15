"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import axios from "axios";

import { useProduct } from "@/context/ProductContext";
import { useCart } from "@/context/CartContext";

import DashboardProductsTableSearch from "./DashboardProductsTableSearch";
import AdminProductTableFallback from "@/components/Fallbacks/AdminProductTableFallback";
import ConfirmModal from "@/components/common/ConfirmModal/ConfirmModal";

import { MdDeleteForever, MdEdit } from "react-icons/md";

function DashboardProductsTable() {
  const router = useRouter();

  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search") || ""; // Obtenemos el término de búsqueda

  const { allProducts, fetchAllProducts, loading, searchProducts } =
    useProduct();
  const { fetchCart } = useCart();

  const [isDeleting, setIsDeleting] = useState(false);
  const [isDeleteProductModalOpen, setIsDeleteProductModalOpen] =
    useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const openDeleteProductModal = () => setIsDeleteProductModalOpen(true);
  const closeDeleteProductModal = () => setIsDeleteProductModalOpen(false);

  // Filtrar productos según el término de búsqueda
  const filteredProducts = searchQuery
    ? searchProducts(searchQuery)
    : allProducts;

  const handleDelete = async (id) => {
    try {
      closeDeleteProductModal();
      setIsDeleting(id);
      await axios.delete(`/api/products/${id}`);
      await fetchCart();
      fetchAllProducts();
    } catch (error) {
      console.log(error);
    } finally {
      setIsDeleting(false);
    }
  };

  if (loading) return <AdminProductTableFallback />;

  return (
    <div className="overflow-x-auto max-h-[60vh] mb-8 shadow-md sm:rounded-lg">
      <div className="flex justify-between sticky top-0 z-20 py-2 px-2 bg-white">
        <label htmlFor="table-search" className="sr-only">
          Search
        </label>
        <DashboardProductsTableSearch />
        <div className="flex gap-2">
          <button className="px-2 py-1 bg-green-600 hover:bg-green-800 text-white font-bold rounded-md transition-colors">
            <Link href="/admin/users">Panel de Usuarios</Link>
          </button>
          <button className="px-2 py-1 bg-blue-600 hover:bg-blue-800 text-white font-bold rounded-md transition-colors">
            <Link href="/admin/layout-images">Panel de Imagenes</Link>
          </button>
        </div>

      </div>
      <table className="w-full max-w-[99vw] lg:max-w-[90vw] min-w-[99vw] lg:min-w-[90vw] table-fixed text-sm text-left rtl:text-right text-gray-500">
        <thead className="sticky top-[46px] z-10 text-xs text-gray-700 uppercase bg-gray-200">
          <tr>
            <th scope="col" className="px-6 py-3 w-[5vw] lg:w-[5vw]">
              ID
            </th>
            <th scope="col" className="px-6 py-3 w-[8vw] lg:w-[8vw]">
              Imagen
            </th>
            <th
              scope="col"
              className="px-6 py-3 w-[25vw] sm:w-[19vw] lg:w-[13vw]"
            >
              Nombre Producto
            </th>
            <th
              scope="col"
              className="px-6 py-3 hidden sm:table-cell sm:w-[19vw] lg:w-[12vw]"
            >
              Nombre Pedidos
            </th>
            <th
              scope="col"
              className="px-6 py-3 hidden md:table-cell md:w-[10vw] lg:w-[10vw]"
            >
              Sku
            </th>
            <th
              scope="col"
              className="px-6 py-3 w-[20vw] sm:w-[18vw] lg:w-[11vw]"
            >
              Categoria
            </th>
            <th
              scope="col"
              className="px-6 py-3 hidden md:table-cell md:w-[13vw] lg:w-[11vw]"
            >
              Sub Categoria
            </th>
            <th scope="col" className="px-6 py-3 w-[8vw] md:w-[5vw] lg:w-[5vw]">
              Unidad
            </th>
            <th
              scope="col"
              className="px-6 py-3 hidden sm:table-cell sm:w-[8vw] md:w-[5vw] lg:w-[5vw]"
            >
              Juegos
            </th>
            <th
              scope="col"
              className="px-6 py-3 w-[12vw] md:w-[9vw] lg:w-[9vw]"
            >
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="min-h-[400px]">
          {filteredProducts.length === 0 ? (
            <tr className="h-[400px]">
              <td colSpan={10} className="px-6 py-4 text-center text-gray-500">
                {`No se encuentran productos para "${searchQuery}".`}
              </td>
            </tr>
          ) : (
            filteredProducts.map((prod) => (
              <tr
                key={prod.productId}
                className="odd:bg-white even:bg-gray-50 border-b border-gray-200"
              >
                <td className="px-6 py-4">{prod.productId}</td>
                <td className="p-0 md:px-3 xl:px-4 xl:py-2">
                  <Image
                    key={prod.id}
                    src={prod.images[0].url}
                    alt={`Imagen ${prod.id}`}
                    width={50}
                    height={50}
                  />
                </td>
                <td className="px-6 py-4 break-words">{prod.name}</td>
                <td className="px-6 py-4 hidden sm:table-cell break-words">
                  {prod.nameForOrders}
                </td>
                <td className="px-6 py-4 hidden md:table-cell break-words">
                  {prod.sku}
                </td>
                <td className="px-6 py-4 break-words">{prod.category}</td>
                <td className="px-6 py-4 hidden md:table-cell break-words">
                  {prod.subCategory}
                </td>
                <td className="px-6 py-4">{prod.unit}</td>
                <td className="px-6 py-4 hidden sm:table-cell">
                  {prod.productSet}
                </td>
                <td className="pl-6 lg:px-8 py-2 gap-2">
                  <button
                    onClick={() => {
                      openDeleteProductModal();
                      setProductToDelete({
                        id: prod.productId,
                        name: prod.name,
                      });
                    }}
                    className="pr-1 focus:outline-none text-red-400"
                  >
                    {isDeleting === prod.productId ? (
                      <div className="border-2 border-t-2 border-t-gray-500 border-white border-solid w-6 h-6 rounded-full animate-spin"></div>
                    ) : (
                      <MdDeleteForever className="text-xl" />
                    )}
                  </button>
                  <button
                    onClick={() =>
                      router.push(`/admin/editProduct/${prod.productId}`)
                    }
                    className="pl-1 focus:outline-none text-blue-400"
                  >
                    <MdEdit className="text-xl" />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <ConfirmModal
        isOpen={isDeleteProductModalOpen}
        onClose={closeDeleteProductModal}
        onConfirm={() => handleDelete(productToDelete.id)}
      >
        ¿Esta seguro que desea eliminar {productToDelete?.name} de los
        productos?
      </ConfirmModal>
    </div>
  );
}

export default DashboardProductsTable;
