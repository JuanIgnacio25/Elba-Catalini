"use client";

import { useState } from "react";
import Link from "next/link";

import Dropdown from "@/components/common/Dropdown/Dropdown";

import { Menu } from "lucide-react";
import { X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetDescription,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";

import * as VisuallyHidden from "@radix-ui/react-visually-hidden";

function NavDesktopMobile() {

  const [open, setOpen] = useState(false)

  const toggleMenu = () => setOpen(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button className="lg:hidden text-white">
          <Menu size={34} />
        </button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="bg-neutral-900 border-none z-[1100] [&>button:first-of-type]:hidden"
      >
        <SheetClose asChild>
          <button className="absolute top-4 right-4 text-white">
            <X className="w-6 h-6" />
          </button>
        </SheetClose>

        <VisuallyHidden.Root>
          <SheetTitle>Menú de Navegación Móvil</SheetTitle>
        </VisuallyHidden.Root>
        <VisuallyHidden.Root>
          <SheetDescription>Navegación principal del sitio.</SheetDescription>
        </VisuallyHidden.Root>
        <nav className="grid gap-6 pt-4">
          <Dropdown
            category={{ name: "Electricidad", slug: "Electricidad" }}
            options={[
              {
                slug: "cable-tpr",
                name: "Cable TPR",
                variantSubCategory: [{ name: "Coelpla", slug: "coelpla" }],
              },
              {
                slug: "enchufes",
                name: "Enchufes",
                variantSubCategory: [
                  {
                    name: "Enchufes de Aluminio",
                    slug: "enchufes-de-aluminio",
                  },
                  {
                    name: "Enchufes de PVC",
                    slug: "enchufes-de-pvc",
                  },
                  {
                    name: "Enchufes  Vulcanizados",
                    slug: "enchufes-vulcanizados",
                  },
                ],
              },
              {
                slug: "caño-corrugado-abierto",
                name: "Caño Corrugado Abierto",
              },
              { slug: "cinta-aisladora", name: "Cinta Aisladora" },
              { slug: "cinta-helicoidal", name: "Cinta Helicoidal" },
              { slug: "fichas-plasticas", name: "Fichas Plasticas" },
              { slug: "fusibles", name: "Fusibles" },
              { slug: "grampas", name: "Grampas" },
              { slug: "interruptores", name: "Interruptores" },
              { slug: "precintos", name: "Precintos" },
              { slug: "spaghetti-pvc", name: "Spaghetti PVC" },
              { slug: "terminales-pala", name: "Terminales Pala" },
              { slug: "tubo-termocontraible", name: "Tubo Termocontraible" },
            ]}
            baseUrl={"/products/store"}
            toggleMenu={toggleMenu}
          />

          <Dropdown
            category={{ name: "Accesorios", slug: "Accesorios" }}
            options={[
              { slug: "accesorios-para-motos", name: "Accesorios para Motos" },
              { slug: "accesorios-para-niños", name: "Accesorios para Niños" },
              {
                slug: "accesorios-para-trailer",
                name: "Accesorios para Trailer",
              },
              { slug: "antenas", name: "Antenas" },
              { slug: "anti-robo", name: "Anti Robo" },
              { slug: "asientos-y-respaldos", name: "Asientos y Respaldos" },
              { slug: "compresores", name: "Compresores" },
              { slug: "cubre-alfombras", name: "Cubre Alfombras" },
              { slug: "cubre-asientos", name: "Cubre Asientos" },
              { slug: "cubre-volantes", name: "Cubre Volantes" },
              { slug: "detailing", name: "Detailing" },
              { slug: "escobillas", name: "Escobillas" },
              { slug: "seguridad", name: "Seguridad" },
              { slug: "varios", name: "Varios" },
            ]}
            baseUrl={"/products/store"}
            toggleMenu={toggleMenu}
          />

          <Dropdown
            category={{ name: "Iluminacion", slug: "Iluminacion" }}
            options={[
              { slug: "cree-led", name: "Cree Led" },
              { slug: "Lamparas-halogenas", name: "Lamparas Halogenas" },
              { slug: "reflectores y barras", name: "Reflectores y Barras" },
            ]}
            baseUrl={"/products/store"}
            toggleMenu={toggleMenu}
          />

          <Dropdown
            category={{ name: "3M", slug: "3M" }}
            options={[
              { slug: "bandas-reflectivas", name: "Bandas Reflectivas" },
              { slug: "circulos-de-velocidad", name: "Circulos de Velocidad" },
            ]}
            baseUrl={"/products/store"}
            toggleMenu={toggleMenu}
          />

          <Link
            href="/products/baiml"
            className="text-white hover:text-red-500 transition"
            onClick={toggleMenu}
          >
            BAIML
          </Link>

          <Link
            href={"/products/toxic-shine"}
            className="text-white hover:text-red-500 transition"
            onClick={toggleMenu}
          >
            Toxic Shine
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  );
}

export default NavDesktopMobile;
