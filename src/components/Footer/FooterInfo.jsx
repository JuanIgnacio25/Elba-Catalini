import Image from "next/image";
import Link from "next/link";

import { FaWhatsapp } from "react-icons/fa";
import { FiPhone } from "react-icons/fi";
import { MdOutlineEmail } from "react-icons/md";
import { RiInstagramFill } from "react-icons/ri";
import { FaFacebookF } from "react-icons/fa6";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

function FooterInfo() {
  return (
    <div className="flex justify-center">
      <div className="flex flex-col lg:flex-row w-full justify-around items-start md:items-center lg:items-start gap-3 lg:gap-0 text-white">
        <div className="order-first flex self-center justify-center lg:self-start items-center w-8/12 md:w-4/12 lg:w-3/12">
          <Image
            src={"/logoelbarojo.png"}
            width={1100}
            height={420}
            alt="Main Logo"
            className="max-w-[200px] md:max-w-[250px] lg:max-w-[300px]"
          />
        </div>

        {/* Categorias y Contacto Mobile */}
        <div className="flex flex-col sm:hidden items-center w-full gap-8">
          <div className="sm:hidden w-full px-4">
            <Accordion type="multiple" className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-red-600 font-semibold text-lg py-2 hover:no-underline">
                  Categorías
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 gap-x-2 gap-y-1 text-left text-sm pt-2">
                    <Link href={"/products/store/electricidad"}>
                      Electricidad
                    </Link>
                    <Link href={"/products/store/accesorios"}>Accesorios</Link>
                    <Link href={"/products/store/iluminacion"}>
                      Iluminacion
                    </Link>
                    <Link href={"/products/store/3m"}>3M</Link>
                    <Link href={"/products/baiml"}>BAIML</Link>
                    <Link href={"/products/toxic-shine"}>Toxic Shine</Link>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Acordeón de Contactanos */}
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-red-600 font-semibold text-lg py-2 hover:no-underline">
                  Contactanos
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col gap-1 text-left pt-2">
                    <Link
                      href="https://wa.me/5493471589042"
                      target="_blank"
                      className="flex items-center gap-1"
                    >
                      <FaWhatsapp className="text-lg" />
                      3471 589042
                    </Link>
                    <Link
                      href="tel:+543471422960"
                      className="flex items-center gap-1"
                    >
                      <FiPhone className="text-lg" />
                      3471 422960
                    </Link>
                    <Link
                      href="mailto:ventascatalini@gmail.com"
                      className="flex items-center gap-1 "
                    >
                      <MdOutlineEmail className="text-lg" />
                      ventascatalini@gmail.com
                    </Link>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div className="flex justify-between mt-2">
              <div className="flex flex-col items-center gap-1">
                <h3 className="text-lg text-red-500 font-semibold">Seguínos</h3>
                <div className="flex gap-2 text-2xl">
                  <Link
                    href={"https://www.instagram.com/la_casa_del_acceso_/"}
                    target="_blank"
                  >
                    <RiInstagramFill />
                  </Link>
                  <Link
                    href={"https://www.facebook.com/ElbaCatalini"}
                    target="_blank"
                  >
                    <FaFacebookF />
                  </Link>
                </div>
              </div>
              <Link
                href={"https://www.afip.gob.ar/960/"}
                target="_blank"
                className=" flex justify-center"
              >
                <Image
                  src={"/assets/datafiscal.jpg"}
                  width={239}
                  height={327}
                  alt="data fiscal"
                  className="w-auto h-auto max-h-[60px] object-contain"
                />
              </Link>
            </div>
          </div>
        </div>

        {/* Categorias y Contacto Escritorio mayor a sm: */}
        <div
          className="
          hidden sm:flex flex-row 
          justify-between lg:justify-around items-start
          w-full lg:w-8/12
          gap-2
        "
        >
          {/* Categorías */}
          <div className="flex flex-col gap-1 text-left  sm:w-auto">
            <h3 className="text-red-600 font-semibold text-lg mb-1 md:mb-2">
              Categorías
            </h3>
            <p className="hover:text-gray-500">
              <Link href={"/products/store/electricidad"}>Electricidad</Link>
            </p>
            <p className="hover:text-gray-500">
              <Link href={"/products/store/accesorios"}>Accesorios</Link>
            </p>
            <p className="hover:text-gray-500">
              <Link href={"/products/store/iluminacion"}>Iluminacion</Link>
            </p>
            <p className="hover:text-gray-500">
              <Link href={"/products/store/3m"}>3M</Link>
            </p>
            <p className="hover:text-gray-500">
              <Link href={"/products/baiml"}>BAIML</Link>
            </p>
            <p className="hover:text-gray-500">
              <Link href={"/products/toxic-shine"}>Toxic Shine</Link>
            </p>
          </div>

          {/* Contactanos */}
          <div className="flex flex-col gap-1">
            <h3 className="text-red-600 font-semibold text-lg mb-1 md:mb-2">
              Contactanos
            </h3>
            <Link
              href="https://wa.me/5493471589042"
              target="_blank"
              className="flex items-center justify-start gap-1 hover:text-gray-500 transition"
            >
              <FaWhatsapp className="text-lg" />
              3471 589042
            </Link>
            <Link
              href="tel:+543471422960"
              className="flex items-center justify-start gap-1 hover:text-gray-500 transition"
            >
              <FiPhone className="text-lg" />
              3471 422960
            </Link>
            <Link
              href="mailto:ventascatalini@gmail.com"
              className="flex items-center justify-center md:justify-start gap-1 hover:text-gray-500 transition"
            >
              <MdOutlineEmail className="text-lg" />
              ventascatalini@gmail.com
            </Link>
          </div>

          {/* Data Fiscal */}
          <Link
            href={"https://www.afip.gob.ar/960/"}
            target="_blank"
            className="hidden sm:block mt-4 md:mt-0 w-auto"
          >
            <Image
              src={"/assets/datafiscal.jpg"}
              width={239}
              height={327}
              alt="data fiscal"
              className="w-auto h-auto max-h-[100px] object-contain"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default FooterInfo;
