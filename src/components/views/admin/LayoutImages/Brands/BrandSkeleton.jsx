import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

import { PlusCircle } from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";

export default function BrandSkeleton() {
  return (
    <div className="container mx-auto py-10 px-2 sm:px-0">
      {/* 1. Esqueleto del encabezado de la página */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Carusel de Marcas</h2>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" /> Añadir Marca
        </Button>
      </div>

      {/* 2. Contenedor de la tabla */}
      <div className="rounded-md border">
        <Table>
          {/* 3. Usamos el TableHeader real para mantener la consistencia de las columnas */}
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Imagen</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead className="w-[80px] text-center">Orden</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>

          {/* 4. Esqueleto del cuerpo de la tabla con varias filas de ejemplo */}
          <TableBody>
            {Array.from({ length: 4 }).map((_, index) => (
              <TableRow key={index}>
                {/* Celda de Imagen */}
                <TableCell>
                  <Skeleton className="h-[60px] w-[60px] rounded-md" />
                </TableCell>
                {/* Celda de Nombre */}
                <TableCell>
                  <Skeleton className="h-5 w-3/4" />
                </TableCell>
                {/* Celda de Orden */}
                <TableCell className="text-center">
                  <Skeleton className="h-5 w-8 mx-auto" />
                </TableCell>
                {/* Celda de Acciones */}
                <TableCell>
                  <div className="flex items-center justify-end space-x-2">
                    <Skeleton className="h-9 w-9" />
                    <Skeleton className="h-9 w-9" />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
