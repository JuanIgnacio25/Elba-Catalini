import StoreProducts from "@/components/views/Products/Store/StoreProducts"
import formatParam from "@/utils/formatParam";

export async function generateMetadata({ params }) {
  const category = formatParam(params.category);
  const subcategory = formatParam(params.subcategory);
  const variant = formatParam(params.variantSubCategory);

  return {
    title: `${subcategory} - ${variant} | Elba Catalini`,
    description: `Encontrá ${variant} dentro de la categoría ${subcategory}. Comprá con confianza en Elba Catalini.`,
    openGraph: {
      title: `${subcategory} - ${variant} | Elba Catalini`,
      description: `Explora la subcategoría ${variant} en ${subcategory}`,
      url: `https://elbacatalini.com/products/store/${params.category}/${params.subcategory}/${params.variantSubCategory}`,
      siteName: "Elba Catalini",
      type: "website",
    },
    alternates: {
      canonical: `https://elbacatalini.com/products/store/${params.category}/${params.subcategory}/${params.variantSubCategory}`,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

function storeProductsVariantSubCategory() {
  return (
    <StoreProducts/>
  )
}

export default storeProductsVariantSubCategory