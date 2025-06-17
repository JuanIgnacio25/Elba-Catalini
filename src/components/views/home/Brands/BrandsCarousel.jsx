"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

import GradientSubtitle from "@/components/common/GradientSubtitle";

function BrandsCarousel({ brands }) {
  const [api, setApi] = useState(null);
  const [current, setCurrent] = useState(1);
  const [count, setCount] = useState(brands.length);

  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap() + 1);
    };

    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", onSelect);

    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  const scrollTo = (index) => {
    if (api) {
      api.scrollTo(index);
    }
  };

  return (
    <div className="w-full flex flex-col justify-center items-center gap-2 mt-10 sm:mt-14 lg:mt-24">
      <GradientSubtitle text={"Nuestras Marcas"} />
      <Carousel
        setApi={setApi}
        className="w-[90vw] sm:w-[80vw] m-auto mt-4 lg:mt-8"
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 1500,
          }),
        ]}
      >
        <CarouselContent className="mx-1">
          {brands.map((brand) => (
            <CarouselItem
              key={brand.brandId}
              className="basis-1/2 xs:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6 px-2 sm:px-3 py-4"
            >
              <Card className="h-[15vh] sm:h-[20vh] rounded-lg border-none shadow-md hover:shadow-lg transition">
                <CardContent className="overflow-hidden  relative h-full flex items-center justify-center p-2">
                  <div className="relative w-full h-full">
                    <Image
                      src={brand.image.url}
                      alt={`Imagen ${brand.name}`}
                      fill
                      sizes="
                        (max-width: 640px) 50vw, 
                        (max-width: 768px) 33vw, 
                        (max-width: 1024px) 25vw, 
                        (max-width: 1280px) 20vw, 
                        16vw"
                      className="object-contain rounded-t-md transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/*(Dots) */}
      <div className="flex justify-center items-center gap-2">
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
  );
}

export default BrandsCarousel;
