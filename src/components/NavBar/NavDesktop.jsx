import Link from "next/link";

import Dropdown from "@/components/common/Dropdown/Dropdown";

function NavDesktop() {

  return (
    <ul className="hidden lg:flex flex-row  w-[49%] min-w-[530px] justify-around items-center gap-2">
      <li>
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
        />
      </li>
      <li>
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
        />
      </li>
      <li>
        <Dropdown
          category={{ name: "Iluminacion", slug: "Iluminacion" }}
          options={[
            { slug: "cree-led", name: "Cree Led" },
            { slug: "Lamparas-halogenas", name: "Lamparas Halogenas" },
            { slug: "reflectores y barras", name: "Reflectores y Barras" },
          ]}
          baseUrl={"/products/store"}
        />
      </li>
      <li>
        <Dropdown
          category={{ name: "3M", slug: "3M" }}
          options={[
            { slug: "bandas-reflectivas", name: "Bandas Reflectivas" },
            { slug: "circulos-de-velocidad", name: "Circulos de Velocidad" },
          ]}
          baseUrl={"/products/store"}
        />
      </li>
      <li>
        <Link href="/products/baiml" className="text-white hover:text-red-500 transition">
          BAIML
        </Link>
      </li>
      <li>
        <Link href={"/products/toxic-shine"} className="text-white hover:text-red-500 transition">
          Toxic Shine
        </Link>
      </li>
    </ul>
  );
}

export default NavDesktop;
