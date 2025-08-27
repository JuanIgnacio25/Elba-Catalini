import ToxicShine from "@/components/views/Products/ToxicShine/ToxicShine";
import { getProducts } from '@/lib/api/getProducts';

export async function generateMetadata() {
  const url = "https://elbacatalini.com/products/toxic-shine";

  return {
    title: "Toxic Shine - Distribuidor Oficial | Elba Catalini",
    description:
      "Descubrí la línea completa de Toxic Shine para el cuidado y detailing automotor. Shampoo, ceras, abrillantadores y más productos profesionales.",
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: "Toxic Shine - Distribuidor Oficial | Elba Catalini",
      description:
        "Compra online productos Toxic Shine para el cuidado y detailing automotor. Distribuidor oficial en Argentina.",
      url,
      siteName: "Elba Catalini",
      images: [
        {
          url: "https://res.cloudinary.com/dpjefhpjj/image/upload/v1751570917/f8mqczrq4z4o2bmwc39q.png",
          alt: "Toxic Shine productos detailing automotor",
        },
      ],
      type: "website",
    },
    keywords: [
      "Toxic Shine",
      "Limpieza Automotor",
      "Detailing",
      "Productos Limpieza Automotor",
    ],
    robots: {
      index: true,
      follow: true,
    },
  };
}

async function ToxicShinePage() {
  const products = await getProducts();

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Toxic Shine",
    description: "Listado de productos Toxic Shine disponibles en nuestra tienda.",
    itemListElement: products.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${process.env.NEXT_PUBLIC_WEBSITE_DOMAIN.replace(
        /\/$/,
        ""
      )}/products/${product.productId}/${product.slug}`,
      item: {
        "@type": "Product",
        name: product.name,
        sku: product.sku,
        image: product.images?.[0]?.url || "",
        brand: {
          "@type": "Brand",
          name: "Toxic Shine",
        },
      },
    })),
  };

  return (
    <>
      <ToxicShine />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
    </>
  );
}

export default ToxicShinePage;
