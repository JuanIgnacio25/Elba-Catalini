import "./baimlProducts.css";
import PathHeader from "@/components/common/PathHeader/PathHeader";
import ProductsMainFallback from "@/components/Fallbacks/ProductsMainFallback/ProductsMainFallback";
import BaimlPMain from "@/components/views/Products/Baiml/BaimlPMain";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

import { BAIML_CATEGORIES } from "@/constants/categories";

import { Suspense } from "react";

function BaimlProducts() {
  const strongStyles = "text-red-500 font-bold"

  return (
    <div className="baiml-p">
      <PathHeader />
      <div className="w-full flex justify-center">
        <div className="baiml-p-header flex flex-row items-start justify-between">
          <h1 className="text-3xl text-red-500 font-bold">Faros Baiml</h1>
          <div className="baiml-p-header-accordion flex justify-end">
            <Accordion type="single" collapsible>
              <AccordionItem value="farosBaimlInfo">
                {/* Mantener el botón al tamaño del texto */}
                <AccordionTrigger className="baiml-p-header-accordion-trigger flex justify-end text-red-500 text-xs cursor-pointer">
                  Más sobre Faros Baiml
                </AccordionTrigger>

                {/* Contenido del acordeón ocupa el 75% del contenedor */}
                <AccordionContent className="text-gray-700 px-0 md:px-2 text-xs md:text-sm">
                  <p>
                    Descubre toda la línea de <strong className={strongStyles}>Faros Baiml</strong> en nuestra web,
                    donde encontrarás modelos originales de alta calidad. Somos
                    especialistas en <strong className={strongStyles}> faros para camiones </strong>, <strong className={strongStyles}>trailers</strong> y
                    {" "}<strong className={strongStyles}>faros universales</strong>. Con garantía y envío a todo el país,
                    te ayudamos a encontrar el faro ideal para tu vehículo y
                    optimizar tu seguridad en la carretera. Explora la calidad y
                    el rendimiento inigualables que solo los <strong className={strongStyles}>Faros Baiml </strong>
                    pueden ofrecerte.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>

      <Suspense
        fallback={
          <ProductsMainFallback categories={BAIML_CATEGORIES} enabled={true} />
        }
      >
        <BaimlPMain />
      </Suspense>
    </div>
  );
}

export default BaimlProducts;
