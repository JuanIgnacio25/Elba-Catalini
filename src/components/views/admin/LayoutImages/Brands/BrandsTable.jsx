"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { PlusCircle, Edit } from "lucide-react";

import BrandForm from "./BrandForm";
import BrandDeleteDialog from "./BrandDeleteDialog";
import LayoutImagesSkeleton from "@/components/views/admin/LayoutImages/LayoutImagesSkeleton";

function BrandsTable() {
  useEffect(() => {
    const fetchBrands = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get("/api/layoutImages/brands");
        setBrands(res.data.brands);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBrands();
  }, []);

  const [isLoading, setIsLoading] = useState(true);

  const [brands, setBrands] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingBrand, setEditingBrand] = useState(null); // null para agregar, objeto para editar

  const handleAddBrand = (newBrandsOrder) => {
    setBrands(newBrandsOrder);
    setIsFormOpen(false);
  };

  const handleEditBrand = (newBrandsOrder) => {
    setBrands(newBrandsOrder);
    setIsFormOpen(false);
    setEditingBrand(null);
  };

  const handleDeleteBrand = async (newBrandsOrder) => {
    setBrands(newBrandsOrder);
  };

  const openEditDialog = (brand) => {
    setEditingBrand(brand);
    setIsFormOpen(true);
  };

  const openAddDialog = () => {
    setEditingBrand(null); // Asegura que el formulario esté en modo "agregar"
    setIsFormOpen(true);
  };

  if (isLoading) return <LayoutImagesSkeleton carouselName={"Carousel de Marcas"} addButtonName={"Añadir Marca"}/>;

  return (
    <div className="container mx-auto py-10 px-2 sm:px-0">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Carusel de Marcas</h2>
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogTrigger asChild>
            <Button onClick={openAddDialog}>
              <PlusCircle className="mr-2 h-4 w-4" /> Añadir Marca
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>
                {editingBrand ? "Editar Marca" : "Añadir Nueva Marca"}
              </DialogTitle>
              <DialogDescription>
                {editingBrand
                  ? "Modificá los datos de la marca seleccionada."
                  : "Completá el formulario para añadir una nueva marca."}
              </DialogDescription>
            </DialogHeader>
            <BrandForm
              brand={editingBrand}
              onSubmit={editingBrand ? handleEditBrand : handleAddBrand}
              onCancel={() => setIsFormOpen(false)}
              brandsLength={brands.length}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="relative rounded-md border max-h-[400px] overflow-auto">
        <Table className=" min-w-full  ">
          <TableHeader>
            <TableRow>
              <TableHead className="sticky top-0 z-20 bg-white w-[100px]">
                Imagen
              </TableHead>
              <TableHead className="sticky top-0 z-20 bg-white">
                Nombre
              </TableHead>
              <TableHead className="sticky top-0 z-20 bg-white w-[80px] text-center">
                Orden
              </TableHead>
              <TableHead className="sticky top-0 z-20 bg-white text-right">
                Acciones
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {brands.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="h-24 text-center text-gray-500"
                >
                  No hay marcas para mostrar.
                </TableCell>
              </TableRow>
            ) : (
              brands.map((brand) => (
                <TableRow key={brand.brandId}>
                  <TableCell>
                    <Image
                      src={brand.image.url}
                      alt={brand.name}
                      width={60}
                      height={60}
                      className="object-contain rounded-md"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{brand.name}</TableCell>
                  <TableCell className="text-center">{brand.order}</TableCell>
                  <TableCell className="text-right space-x-2 space-y-1 sm:space-y-0">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => openEditDialog(brand)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <BrandDeleteDialog
                      brand={brand}
                      onConfirm={handleDeleteBrand}
                    />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default BrandsTable;
