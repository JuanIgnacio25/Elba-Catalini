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

import NewsForm from "./NewsForm";
import NewsDeleteDialog from "./NewsDeleteDialog";
import LayoutImagesSkeleton from "@/components/views/admin/LayoutImages/LayoutImagesSkeleton";

function NewsTable() {
  useEffect(() => {
    const fetchNews = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get("/api/layoutImages/news");
        setNews(res.data.news);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNews();
  }, []);

  const [isLoading, setIsLoading] = useState(true);

  const [news, setNews] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingNews, setEditingNews] = useState(null); // null para agregar, objeto para editar

  const handleAddNews = (newNewsOrder) => {
    setNews(newNewsOrder);
    setIsFormOpen(false);
  };

  const handleEditNews = (newNewsOrder) => {
    setNews(newNewsOrder);
    setIsFormOpen(false);
    setEditingNews(null);
  };

  const handleDeleteNews = (newNewsOrder) => {
    setNews(newNewsOrder);
  };

  const openEditDialog = (news) => {
    setEditingNews(news);
    setIsFormOpen(true);
  };

  const openAddDialog = () => {
    setEditingNews(null); // Asegura que el formulario esté en modo "agregar"
    setIsFormOpen(true);
  };

  if (isLoading)
    return (
      <LayoutImagesSkeleton
        carouselName={"Carousel de Novedades"}
        addButtonName={"Añadir Novedad"}
      />
    );

  return (
    <div className="container mx-auto py-10 px-2 sm:px-0">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Carusel de Novedades</h2>
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogTrigger asChild>
            <Button onClick={openAddDialog}>
              <PlusCircle className="mr-2 h-4 w-4" /> Añadir Novedad
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>
                {editingNews ? "Editar Novedad" : "Añadir Nueva Novedad"}
              </DialogTitle>
              <DialogDescription>
                {editingNews
                  ? "Modificá los datos de la novedad seleccionada."
                  : "Completá el formulario para añadir una nueva novedad."}
              </DialogDescription>
            </DialogHeader>
            <NewsForm
              news={editingNews}
              onSubmit={editingNews ? handleEditNews : handleAddNews}
              onCancel={() => setIsFormOpen(false)}
              newsLength={news.length}
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
              <TableHead className="sticky top-0 z-20 bg-white  text-center">
                Orden
              </TableHead>
              <TableHead className="sticky top-0 z-20 bg-white text-center">
                ID
              </TableHead>
              <TableHead className="sticky top-0 z-20 bg-white text-right">
                Acciones
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {news.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="h-24 text-center text-gray-500"
                >
                  No hay marcas para mostrar.
                </TableCell>
              </TableRow>
            ) : (
              news.map((news) => (
                <TableRow key={news.newsId}>
                  <TableCell>
                    <Image
                      src={news.product.images[0].url}
                      alt={news.product.name}
                      width={60}
                      height={60}
                      className="object-contain rounded-md"
                    />
                  </TableCell>
                  <TableCell className="font-medium">
                    {news.product.name}
                  </TableCell>
                  <TableCell className="text-center">{news.order}</TableCell>
                  <TableCell className="text-center">
                    {news.product.productId}
                  </TableCell>
                  <TableCell className="text-right space-x-2 space-y-1 sm:space-y-0">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => openEditDialog(news)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <NewsDeleteDialog
                      news={news}
                      onConfirm={handleDeleteNews}
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

export default NewsTable;
