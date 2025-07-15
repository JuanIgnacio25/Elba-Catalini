"use client";

import { useState } from "react";

import Image from "next/image";
import Link from "next/link";

import { AnimatePresence } from "framer-motion";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

import Autoplay from "embla-carousel-autoplay";

import { Button } from "@/components/ui/button";

import GradientSubtitle from "@/components/common/GradientSubtitle";
import formatStoreProductUnit from "@/utils/formatStoreProductUnit";

import { formatBaimlProductQuantityLabel } from "@/utils/formatBaimlProductQuantity";
import { formatBaimlProductSetLabel } from "@/utils/formatBaimlProductQuantity";
import NewsAddToCart from "./NewsAddToCart";

function NewsCarousel({ news }) {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  const onCancel = () => {
    setIsOverlayOpen(false);
  };

  return (
    <div className="w-full flex-col justify-center items-center mt-20 sm:mt-28">
      <GradientSubtitle text={"Novedades"} />
      <Carousel
        className="w-[97vw] xs:w-[80vw] lg:w-[67vw] xl:w-[67vw] m-auto py-6"
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 2000,
          }),
        ]}
      >
        <CarouselContent className="mx-1">
          {news.map((nw, index) => (
            <CarouselItem
              key={index}
              className="basis-1/2 sm:basis-1/3 lg:basis-1/4 px-2 py-4"
            >
              <Card className="relative flex flex-col justify-between h-[43vh] sm:h-[50vh] rounded-lg border-none shadow-md hover:shadow-lg transition">
                <AnimatePresence>
                  {isOverlayOpen && isOverlayOpen === nw.product.productId && (
                    <NewsAddToCart
                      productId={nw.product.productId}
                      onCancel={onCancel}
                    />
                  )}
                </AnimatePresence>
                <CardHeader className="relative aspect-square overflow-hidden rounded-t-lg p-2">
                  <Link
                    href={`/products/${nw.product.productId}/${nw.product.slug}`}
                    className="block w-full h-full relative"
                  >
                    <Image
                      src={nw.product.images[0].url}
                      alt={`Foto de ${nw.product.name}`}
                      fill
                      sizes="(max-width: 768px) 35vw, (max-width: 1024px) 23.33vw, 17.5vw"
                      className="object-contain transition-transform duration-300 hover:scale-105"
                    />
                  </Link>
                </CardHeader>
                <CardContent className="flex flex-col justify-center text-base text-start font-light gap-3 p-4">
                  <Link
                    href={`/products/${nw.product.productId}/${nw.product.slug}`}
                    className="text-black hover:text-red-600 text-center transition font-semibold"
                  >
                    {nw.product.name}
                  </Link>
                  <div className="flex justify-center">
                    <p className="w-fit bg-[--soft-grey] rounded-full px-1.5 py-1 text-center text-xs font-medium text-gray-700">
                      {nw.product.kind === "Baiml"
                        ? `${formatBaimlProductQuantityLabel(
                            nw.product.category,
                            nw.product.sku,
                            nw.product.kind
                          )} x ${nw.product.unit} ${formatBaimlProductSetLabel(
                            nw.product.productSet,
                            nw.product.unit
                          )} `
                        : `Cantidad x ${formatStoreProductUnit(
                            nw.product.subCategory,
                            nw.product.unit
                          )}`}
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-around px-1 sm:px-2 py-2 sm:py-4 gap-1">
                  <Button
                    className="w-1/2 sm:w-[45%] bg-red-500 hover:bg-red-600 text-white font-semibold rounded-md transition-colors"
                    onClick={() => setIsOverlayOpen(nw.product.productId)}
                  >
                    Añadir
                  </Button>
                  <Link
                    href={`/products/${nw.product.productId}/${nw.product.slug}`}
                    className="w-1/2 sm:w-[45%]"
                  >
                    <Button
                      variant="outline"
                      className="w-full text-red-500 hover:bg-red-600 hover:text-white font-semibold rounded-md transition-colors"
                    >
                      Ver
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden xs:flex absolute -left-8 top-1/2 -translate-y-1/2 z-30 bg-white hover:bg-gray-300 " />
        <CarouselNext className="hidden xs:flex absolute -right-8 top-1/2 -translate-y-1/2 z-30 bg-white hover:bg-gray-300" />
      </Carousel>
    </div>
  );
}

export default NewsCarousel;
