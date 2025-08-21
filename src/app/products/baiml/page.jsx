import BaimlProducts from "@/components/views/Products/Baiml/BaimlProducts";
import { getBaimlProducts } from "@/lib/api/getBaimlProducts";

export async function generateMetadata() {
  return {
    title: "Faros Baiml | Elba Catalini",
    description:
      "Descubrí todos los modelos de Faros Baiml originales en Elba Catalini. Faros para camiones y trailers, calidad garantizada y envío a todo el país.",
    keywords: [
      "Faros Baiml",
      "Baiml",
      "Faros para trailers",
      "Faros para camiones",
      "Faros universales",
    ],
    openGraph: {
      title: "Faros Baiml | Distribuidor oficial en Argentina",
      description:
        "Descubrí la línea completa de Faros Baiml en Elba Catalini.",
      url: "https://elbacatalini.com/products/baiml",
      siteName: "Elba Catalini",
      images: [
        {
          url: "https://res.cloudinary.com/dzvwrmykh/image/upload/v1750676088/vd8mym1rubdy4rj4blbo.png",
          alt: "Faros Baiml para camiones y trailers",
        },
      ],
      type: "website",
      alternates: {
        canonical: "https://elbacatalini.com/products/baiml",
      },
      robots: {
        index: true,
        follow: true,
      },
    },
  };
}

async function baimlProductsPage() {
  const products = await getBaimlProducts();

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Faros Baiml",
    description: "Listado de faros Baiml disponibles en nuestra tienda.",
    itemListElement: products.map((product, index) => ({
      "@type": "ListItem",
      position: product.productId,
      url: `${process.env.NEXT_PUBLIC_WEBSITE_DOMAIN}/products/${product.productId}/${product.slug}`,
      name: product.name,
      image: product.images?.[0],
      sku: product.sku,
      offers: {
        "@type": "Offer",
        priceCurrency: "ARS",
        availability: "https://schema.org/InStock",
        itemCondition: "https://schema.org/NewCondition",
      },
    })),
  };

  return (
    <>
      <BaimlProducts />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
    </>
  );
}

export default baimlProductsPage;
