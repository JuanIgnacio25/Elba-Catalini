import StoreProducts from "@/components/views/Products/Store/StoreProducts"

export async function generateMetadata({ params }) {
  const category = formatParam(params.category);
  const subCategory = formatParam(params.subCategory);
  const variant = formatParam(params.variantSubCategory);

  return {
    title: `${subCategory} - ${variant} | Elba Catalini`,
    description: `Encontrá ${variant} dentro de la categoría ${subCategory}. Comprá con confianza en Elba Catalini.`,
    openGraph: {
      title: `${subCategory} - ${variant} | Elba Catalini`,
      description: `Explora la subcategoría ${variant} en ${subCategory}`,
      url: `https://elbacatalini.com/products/store/${params.category}/${params.subCategory}/${params.variantSubCategory}`,
      siteName: "Elba Catalini",
      type: "website",
    },
    alternates: {
      canonical: `https://elbacatalini.com/products/store/${params.category}/${params.subCategory}/${params.variantSubCategory}`,
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