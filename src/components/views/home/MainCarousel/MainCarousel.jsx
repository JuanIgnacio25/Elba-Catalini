"use client";

import Image from "next/image";

import BaimlOverlay from "./BaimlOverlay";
import ToxicShineOverlay from "./ToxicShineOverlay";

import Autoplay from "embla-carousel-autoplay";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

export default function MainCarousel() {
  const slidesData = [
    {
      src: "https://res.cloudinary.com/dzvwrmykh/image/upload/f_auto,q_auto/v1750791980/autopista-noche_wpzddp.jpg",
      overlayComponent: BaimlOverlay,
    },
    {
      src: "https://res.cloudinary.com/dzvwrmykh/image/upload/f_auto,q_auto/v1750792143/toxic-shine-portada_zoycje.jpg",
      overlayComponent: ToxicShineOverlay,
    },
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
        {slidesData.map((slide, index) => (
          <CarouselItem key={index} className="p-0">
            <Card className="rounded-none border-none">
              <CardContent className="flex w-full h-[80vh] m-0 p-0 relative">
                <Image
                  src={slide.src}
                  alt={`Imagen ${index + 1}`}
                  fill
                  quality={100}
                  priority={index === 0}
                  className="object-cover object-center"
                />
                {slide.overlayComponent && <slide.overlayComponent />}
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
