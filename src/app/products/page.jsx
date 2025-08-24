import Products from "@/components/views/Products/Products/Products"

export const generateMetadata = async () => {
  return {
    title: "Productos - Elba Catalini",
    description:
      "Descubrí todos nuestros productos en Elba Catalini: Electricidad, Accesorios, Iluminación, 3M, Faros Baiml, Toxic Shine y mucho más. Encuentra cables, enchufes, accesorios para motos y trailers, lámparas, reflectores y productos de detailing para tu vehículo.",
    keywords: [
      "Electricidad",
      "Cables TPR",
      "Enchufes",
      "Caño Corrugado",
      "Cinta aisladora",
      "Accesorios para motos",
      "Accesorios para niños",
      "Accesorios para trailer",
      "Antenas",
      "Seguridad",
      "Iluminación",
      "Cree Led",
      "Lámparas halógenas",
      "Reflectores",
      "3M",
      "Faros Baiml",
      "Toxic Shine",
      "Detailing",
      "Productos para trailers",
      "Productos para camiones",
      "Repuestos originales"
    ],
    openGraph: {
      title: "Productos - Elba Catalini",
      description:
        "Explorá toda nuestra línea de productos: Electricidad, Accesorios, Iluminación, 3M, Faros Baiml, Toxic Shine y más.",
      url: "https://elbacatalini.com/products",
      siteName: "Elba Catalini",
      images: [
        {
          url: "https://res.cloudinary.com/dpjefhpjj/image/upload/v1752665181/logo-elba_i1polx.png",
          alt: "Logo Elba Catalini",
        },
      ],
      type: "website",
    },
    alternates: {
      canonical: "https://elbacatalini.com/products",
    },
    robots: {
      index: true,
      follow: true,
    },
  };
};

function productsPage() {
  return (
    <Products/>
  )
}

export default productsPage