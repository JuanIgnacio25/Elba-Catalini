"use client";

import * as React from "react";
import Image from "next/image";

import Autoplay from "embla-carousel-autoplay";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

export default function MainCarousel() {
  const images = [
    { src: "/autopista-noche.jpeg" },
    { src: "/autopista-noche.jpeg" },
    { src: "/toxic-shine-portada.jpeg" },
    { src: "/baimlPortada.jpeg" },
  ];

  return (
    <Carousel
      className="w-full relative"
      opts={{
        loop: true,
      }}
      plugins={[
        Autoplay({
          delay: 4000,
        }),
      ]}
    >
      <CarouselContent>
        {images.map((img, index) => (
          <CarouselItem key={index} className="p-0">
            <Card className="rounded-none border-none">
              <CardContent className="flex w-full h-[80vh] m-0 p-0 relative">
                <Image
                  src={img.src}
                  alt={`Imagen ${index + 1}`}
                  fill
                  quality={100}
                  priority={index === 0}
                  className="object-cover object-center"
                />
                <div
                  className={`absolute inset-0 ${
                    index == 0
                      ? "bg-gradient-to-t from-red-800/80 via-gray-800/70 to-gray-900/60"
                      : "bg-black/50"
                  } h-full w-full flex flex-col justify-center z-10 `}
                >
                  <div className="flex flex-col pl-[12%]">
                    <div className="relative w-fit">
                      <h1 className="text-white text-4xl font-bold mb-4 md:mb-0 inline-block">
                        Distribuidores Oficiales Baiml
                      </h1>
                      <Image
                        src="/logo-baiml-blanco.png"
                        alt="logo-baiml"
                        width={100}
                        height={100}
                        className="drop-shadow-lg absolute left-full top-1/2 -translate-y-1/2 ml-4"
                      />
                    </div>
                    <div className="w-[40%]">
                      <p className="text-gray-300 text-lg md:text-xl mb-4">
                        Tecnología en iluminación. Faros Universales de calidad
                        y durabilidad garantizada.
                      </p>
                    </div>
                  </div>

                  <div className="w-auto pr-[12%] flex flex-col items-end justify-end ">
                    <div className="w-1/3">
                      <h2 className="text-white text-2xl font-bold mb-4 md:mb-0 inline-block">
                        Precios mayoristas imbatibles
                      </h2>
                    </div>
                    <div className="w-1/3">
                      <p className="text-gray-300 text-lg md:text-xl mb-4">
                        Iluminá tu negocio con la calidad Baiml al
                        mejor precio, asegurando rentabilidad y la satisfacción
                        de tus clientes.
                      </p>
                    </div>
                    <div className="w-1/3 flex justify-end gap-2 pr-6">
                      <button className="px-5 py-2 text-white font-semibold rounded-xl border-none bg-red-600 hover:bg-red-800 hover:text-white transition">
                        Ver Productos
                      </button>
                      <button className="px-5 py-2 bg-gray-100 text-red-800 font-semibold rounded-xl shadow-md hover:bg-gray-300 transition">
                        Obtené Cotizacion
                      </button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      {/* <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-white/60 hover:bg-white/90 " />
      <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-white/60 hover:bg-white/90" /> */}
    </Carousel>
  );
}
