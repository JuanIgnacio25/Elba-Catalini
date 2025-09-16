import { notFound } from "next/navigation";
import { getPaginatedToxicShineProducts } from "@/lib/api/getPaginatedToxicShineProducts";
import ToxicShine from "@/components/views/Products/ToxicShine/ToxicShine";
import { TOXIC_SHINE_CATEGORIES } from "@/constants/categories";

const ITEMS_PER_PAGE = 24;

export async function generateMetadata({ params, searchParams }) {
  const page = params.page?.[1] ? parseInt(params.page[1], 10) : 1;
  const categories = searchParams.categories
    ? searchParams.categories.split(",")
    : [];

  let title =
    page > 1
      ? `Toxic Shine - Página ${page} | Elba Catalini`
      : "Toxic Shine - Distribuidor Oficial | Elba Catalini";

  let description =
    "Descubrí la línea completa de Toxic Shine para el cuidado y detailing automotor. Shampoo, ceras, abrillantadores y más productos profesionales.";

  const baseUrl = "https://elbacatalini.com/products/toxic-shine";
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
          url: "https://res.cloudinary.com/dpjefhpjj/image/upload/v1751570917/f8mqczrq4z4o2bmwc39q.png",
          alt: "Toxic Shine productos detailing automotor",
        },
      ],
    },
    keywords: ["Toxic Shine", "Detailing", "Limpieza Automotor", ...categories],
    robots: { index: true, follow: true },
  };
}

async function ToxicShinePage({ params, searchParams }) {
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
  categories = categories.filter((c) => TOXIC_SHINE_CATEGORIES.includes(c));

  const { products, total } = await getPaginatedToxicShineProducts(
    page,
    categories
  );
  
  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

  if (page > totalPages && totalPages > 0) return notFound();

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Toxic Shine",
    description: "Listado de productos Toxic Shine disponibles en nuestra tienda.",
    itemListElement: products.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Product",
        name: product.name,
        sku: product.sku,
        image: product.images?.[0]?.url || "",
        brand: { "@type": "Brand", name: "Toxic Shine" },
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
      <ToxicShine
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

export default ToxicShinePage;