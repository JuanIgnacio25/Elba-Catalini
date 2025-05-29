import Image from "next/image";
import Link from "next/link";

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
import { Button } from "@/components/ui/button";

import GradientSubtitle from "@/components/common/GradientSubtitle";

function News() {
  const images = [
    { src: "/7550ED.jpg" },
    { src: "/7550ED.jpg" },
    { src: "/7550ED.jpg" },
    { src: "/7550ED.jpg" },
    { src: "/7550ED.jpg" },
    { src: "/7550ED.jpg" },
    { src: "/7550ED.jpg" },
  ];

  return (
    <div className="w-full flex-col justify-center items-center mt-36">
      <GradientSubtitle text={"Novedades"}/>
      <Carousel
        className="w-[97vw] xs:w-[80vw] lg:w-[67vw] xl:w-[67vw] m-auto py-6"
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent className="mx-1">
          {images.map((img, index) => (
            <CarouselItem
              key={index}
              className="basis-1/2 sm:basis-1/3 lg:basis-1/4 px-2 py-4"
            >
              <Card className="flex flex-col justify-between h-[43vh] sm:h-[50vh] rounded-lg border-none shadow-md hover:shadow-lg transition">
                <CardHeader className="overflow-hidden rounded-t-lg relative h-2/5">
                  <Image
                    src={img.src}
                    alt={`Imagen ${index + 1}`}
                    fill
                    sizes="(max-width: 768px) 35vw, (max-width: 1024px) 23.33vw, 17.5vw"
                    className="object-cover rounded-t-md transition-transform duration-300 hover:scale-105"
                  />
                </CardHeader>
                <CardContent className="flex flex-col justify-center text-base text-start font-light gap-3 p-4">
                  <Link
                    href={"/products/145"}
                    className="text-black hover:text-red-600 text-center transition font-semibold"
                  >
                    Faro Baiml 7550ED Giro Amplio
                  </Link>
                  <div className="flex justify-center">
                    <p className="w-fit bg-[--soft-grey] rounded-full px-2 py-0.5 text-sm font-medium text-gray-700">
                      Bolsa x1
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-around px-1 sm:px-2 py-2 sm:py-4 gap-1">
                  <Button className="w-1/2 sm:w-[45%] bg-red-500 hover:bg-red-600 text-white font-semibold rounded-md transition-colors">
                    Añadir
                  </Button>
                  <Button
                    variant="outline"
                    className="w-1/2 sm:w-[45%] text-red-500 hover:bg-red-600 hover:text-white font-semibold rounded-md transition-colors"
                  >
                    Ver
                  </Button>
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

export default News;
