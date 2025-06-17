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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { PlusCircle, Edit, Trash2 } from "lucide-react";

import BrandForm from "./BrandForm";

/* // Datos de ejemplo para probar (reemplazarás esto con datos de tu backend)
const initialBrands = [
  { id: "1", name: "Baiml", image: "/assets/brands/BaimlBrand.png", order: 1 },
  { id: "2", name: "Toxic Shine", image: "/assets/brands/ToxicShineBrand.png", order: 2 },
  { id: "3", name: "3m", image: "/assets/brands/3mBrand.png", order: 3 },
]; */

function BrandsTable() {
  useEffect(() => {
    const fetchBrands = async() => {
      setIsLoading(true)
      try {
        const res = await axios.get('/api/layoutImages');
        setBrands(res.data.brands);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchBrands();
  }, []);

  const [isLoading, setIsLoading] = useState(true);
  const [brands, setBrands] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingBrand, setEditingBrand] = useState(null); // null para agregar, objeto para editar

  const handleAddBrand = (newBrand) => {
    setBrands((prevBrands) => [
      ...prevBrands,
      { ...newBrand, id: String(prevBrands.length + 1) }, // Generar un ID simple para el ejemplo
    ]);
    setIsFormOpen(false);
  };

  const handleEditBrand = (updatedBrand) => {
    setBrands((prevBrands) =>
      prevBrands.map((brand) =>
        brand.id === updatedBrand.id ? updatedBrand : brand
      )
    );
    setIsFormOpen(false);
    setEditingBrand(null);
  };

  const handleDeleteBrand = (id) => {
    setBrands((prevBrands) => prevBrands.filter((brand) => brand.id !== id));
  };

  const openEditDialog = (brand) => {
    setEditingBrand(brand);
    setIsFormOpen(true);
  };

  const openAddDialog = () => {
    setEditingBrand(null); // Asegura que el formulario esté en modo "agregar"
    setIsFormOpen(true);
  };

  if(isLoading) return <div>Cargando...</div>

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Gestión de Marcas del Home</h2>
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen} >
          <DialogTrigger asChild>
            <Button onClick={openAddDialog}>
              <PlusCircle className="mr-2 h-4 w-4" /> Añadir Marca
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{editingBrand ? "Editar Marca" : "Añadir Nueva Marca"}</DialogTitle>
            </DialogHeader>
            <BrandForm
              brand={editingBrand}
              onSubmit={editingBrand ? handleEditBrand : handleAddBrand}
              onCancel={() => setIsFormOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Imagen</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead className="w-[80px] text-center">Orden</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {brands.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center text-gray-500">
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
                      width={60} // Tamaño fijo para la tabla
                      height={60}
                      className="object-contain rounded-md"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{brand.name}</TableCell>
                  <TableCell className="text-center">{brand.order}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => openEditDialog(brand)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive" size="icon">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>¿Estás absolutamente seguro?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Esta acción no se puede deshacer. Esto eliminará
                            permanentemente la marca &quot;{brand.name}&quot; y la removerá de tu
                            carrusel.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDeleteBrand(brand.id)}>
                            Eliminar
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
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