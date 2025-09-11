import { notFound } from "next/navigation";
import { getPaginatedProducts } from "@/lib/api/getPaginatedProducts";
import BaimlProducts from "@/components/views/Products/Baiml/BaimlProducts";
import { BAIML_CATEGORIES } from "@/constants/categories";

const ITEMS_PER_PAGE = 24;

export async function generateMetadata({ params, searchParams }) {
  const page = params.page?.[1] ? parseInt(params.page[1], 10) : 1;
  const categories = searchParams.categories
    ? searchParams.categories.split(",")
    : [];

  let title =
    page > 1
      ? `Faros Baiml - Pagina ${page} | Elba Catalini`
      : "Faros Baiml | Elba Catalini";
  let description =
    "Faros Baiml originales. Distribuidor oficial en Argentina. Encontrá faros y repuestos Baiml para trailers y camiones en Elba Catalini.";

  const baseUrl = "https://elbacatalini.com/products/baiml";
  const url = page === 1 ? baseUrl : `${baseUrl}/page/${page}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: "Elba Catalini",
      type: "website",
      images: [
        {
          url: "https://res.cloudinary.com/dzvwrmykh/image/upload/v1750676088/vd8mym1rubdy4rj4blbo.png",
          alt: "Faros Baiml para camiones y trailers",
        },
      ],
    },
    keywords: ["Baiml", "Faros", "Repuestos", "Accesorios", ...categories],
    robots: { index: true, follow: true },
  };
}

async function BaimlProductsPage({ params, searchParams }) {
  // Si no hay params → página 1
  if (!params.page) params.page = [];

  // Validar formato de la URL
  if (
    params.page.length > 0 &&
    (params.page[0] !== "page" || isNaN(parseInt(params.page[1], 10)))
  ) {
    return notFound();
  }

  const page = params.page.length === 0 ? 1 : parseInt(params.page[1], 10);

  if (!page || page < 1) return notFound();

  let categories = searchParams.categories
    ? searchParams.categories.split(",")
    : [];

  // Validar que las categorías sean válidas
  categories = categories.filter((c) => BAIML_CATEGORIES.includes(c));

  const { products, total } = await getPaginatedProducts(page, categories);
  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

  if (page > totalPages && totalPages > 0) return notFound();

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Faros Baiml",
    description: "Listado de faros Baiml disponibles en nuestra tienda.",
    itemListElement: products.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Product",
        name: product.name,
        sku: product.sku,
        image: product.images?.[0]?.url || "",
        brand: { "@type": "Brand", name: "Baiml" },
        category: product.category || undefined,
        url: `${process.env.NEXT_PUBLIC_WEBSITE_DOMAIN.replace(
          /\/$/,
          ""
        )}/products/${product.productId}/${product.slug}`,
        description: product.description || undefined,
      },
    })),
  };

  return (
    <>
      <BaimlProducts
        products={products}
        currentPage={page}
        totalPages={totalPages}
        totalProducts={total}
        searchParams={searchParams}
        itemsPerPage={ITEMS_PER_PAGE}
        initialCategories={categories}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
    </>
  );
}

export default BaimlProductsPage;
