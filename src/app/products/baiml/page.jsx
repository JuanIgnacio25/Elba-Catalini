import BaimlProducts from "@/components/views/Products/Baiml/BaimlProducts";
import { getProducts } from "@/lib/api/getProducts";

export async function generateMetadata() {
  return {
    title: "Faros Baiml - Distribuidor Oficial | Elba Catalini",
    description:
      "Faros Baiml originales. Distribuidor oficial en Argentina. Encontrá faros y repuestos Baiml para trailers y camiones en Elba Catalini.",
    keywords: [
      "Faros Baiml",
      "Baiml",
      "Faros para trailers",
      "Faros para camiones",
      "Faros universales",
    ],
    openGraph: {
      title: "Faros Baiml - Distribuidor Oficial | Elba Catalini",
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
    },
    alternates: {
      canonical: "https://elbacatalini.com/products/baiml",
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

async function baimlProductsPage() {
  const products = await getProducts();

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Faros Baiml",
    description: "Listado de faros Baiml disponibles en nuestra tienda.",
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
          name: "Baiml",
        },
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
