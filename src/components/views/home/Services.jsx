"use client"

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

import GradientSubtitle from "@/components/common/GradientSubtitle";
import { Button } from "@/components/ui/button";

import Autoplay from "embla-carousel-autoplay"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

function Services() {
  const [api, setApi] = useState(null);
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  const whatsappUrl = (service) =>
    `https://web.whatsapp.com/send/?phone=5493471589042&text=${encodeURIComponent(
      `¡Hola! Me gustaría solicitar información sobre ${
        service ? service : "colocación de [ej. Polarizados]"
      }.`
    )}`;

  // Datos de los servicios con título y descripción
  const servicesData = [
    {
      title: "Colocación de Polarizados",
      description:
        "Contamos con instalador oficial con licencia 3M, garantizando un trabajo de máxima calidad. Reducí el calor y protegé tu interior de los rayos UV. ",
      imageSrc: "/assets/services/polarizados.jpg",
      serviceNameForWhatsapp: "Polarizados",
    },
    {
      title: "Instalación de Cubre asientos",
      description:
        "Renová el interior de tu auto con estilo. Protegé tus asientos originales de desgastes y derrames.",
      imageSrc: "/assets/services/cubre-asientos.jpg",
      serviceNameForWhatsapp: "Cubre Asientos",
    },
    {
      title: "Cubre volantes cocidos",
      description:
        "Confort y protección para tu volante. Mejorá el agarre y personalizá tu interior.",
      imageSrc: "/assets/services/cubre-volantes.jpg",
      serviceNameForWhatsapp: "Cubre Volantes",
    },
  ];

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });

    return () => {
      api.off("select");
    };
  }, [api]);

  const scrollTo = (index) => {
    if (api) {
      api.scrollTo(index);
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center gap-6 md:gap-10 mt-28">
      <div className="w-11/12 sm:w-4/5 flex flex-row items-center justify-between px-2 gap-4 md:gap-0">
        <div className="inline-block w-fit">
          <GradientSubtitle text={"Servicios"} />
        </div>
        <Button variant={"primaryRed"} asChild>
          <Link href={whatsappUrl()} target="_blank" rel="noreferrer noopener">
            Consultar Servicios
          </Link>
        </Button>
      </div>

      {/* --- CARRUSEL PARA PANTALLAS PEQUEÑAS (<lg) --- */}
      <div className="block lg:hidden w-11/12 sm:w-4/5">
        <Carousel
          setApi={setApi}
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 1500,
            }),
          ]}
          className="w-full mx-auto"
        >
          <CarouselContent className="-ml-4">
            {servicesData.map((service, index) => (
              <CarouselItem
                key={index}
                className="pl-4 basis-full sm:basis-1/2"
              >
                <div className="p-0">
                  <div className="w-full rounded-lg shadow-lg overflow-hidden relative">
                    <Link
                      href={whatsappUrl(service.serviceNameForWhatsapp)}
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      <div className="relative w-full aspect-[4/3] max-h-52  sm:min-h-72 sm:max-h-72 md:max-h-64 md:min-h-52">
                        <Image
                          src={service.imageSrc}
                          alt={`Imagen de ${service.title}`}
                          fill
                          sizes="(max-width: 640px) 90vw, (max-width: 768px) 45vw"
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                        <h3 className="w-full absolute top-0 text-lg md:text-xl font-semibold py-3 px-2 bg-gradient-to-b from-black/80 to-transparent text-red-500 z-50">
                          {service.title}
                        </h3>
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 text-white">
                          <p className="text-sm sm:text-base font-light">
                            {service.description}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        {/*(Dots) */}
        <div className="flex justify-center items-center gap-2 mt-2">
          {Array.from({ length: count }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => scrollTo(idx)}
              className={`
              w-2 sm:w-3 h-2 sm:h-3 rounded-full bg-gray-400 outline-none border-none cursor-pointer transition-transform duration-200 ease-in-out
              ${
                idx + 1 === current
                  ? "scale-100 !bg-red-500"
                  : "scale-75 hover:bg-red-500"
              }
            `}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* --- GRID PARA PANTALLAS GRANDES (lg y superiores) --- */}
      <div className="hidden lg:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 xl:gap-8 w-4/5">
        {servicesData.map((service, index) => (
          <div
            key={index}
            className="w-full rounded-lg shadow-lg overflow-hidden group"
          >
            <Link
              href={whatsappUrl(service.serviceNameForWhatsapp)}
              target="_blank"
              rel="noreferrer noopener"
            >
              <div className="relative w-full aspect-[4/3]">
                <Image
                  src={service.imageSrc}
                  alt={`Imagen de ${service.title}`}
                  fill
                  sizes="(max-width: 640px) 90vw, (max-width: 768px) 45vw, (max-width: 1024px) 30vw, 25vw"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <h3 className="w-full absolute top-0 text-lg xl:text-xl font-semibold py-3 px-2 bg-gradient-to-b from-black/80 to-transparent text-white">
                  {service.title}
                </h3>
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-70 transition-all duration-300 flex items-center justify-center p-4 text-white opacity-0 group-hover:opacity-100">
                  <h3 className="w-full absolute top-0 text-lg sm:text-xl font-semibold py-3 px-2 bg-gradient-to-b from-black/80 to-transparent text-red-500">
                    {service.title}
                  </h3>
                  <p className="text-center text-sm sm:text-base font-light">
                    {service.description}
                  </p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Services;
