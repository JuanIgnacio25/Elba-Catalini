import StoreProducts from "@/components/views/Products/Store/StoreProducts"
import formatParam from "@/utils/formatParam";

export async function generateMetadata({ params }) {
  const category = formatParam(params.category);
  const subCategory = formatParam(params.subCategory);

  return {
    title: `${subCategory} - ${category} | Elba Catalini`,
    description: `Descubrí nuestra selección de ${subCategory} en la categoría ${category}. Calidad y precio en Elba Catalini.`,
    openGraph: {
      title: `${subCategory} - ${category} | Elba Catalini`,
      description: `Explora ${subCategory} de la categoría ${category} en Elba Catalini.`,
      url: `https://elbacatalini.com/products/store/${params.category}/${params.subCategory}`,
      siteName: "Elba Catalini",
      type: "website",
    },
    alternates: {
      canonical: `https://elbacatalini.com/products/store/${params.category}/${params.subCategory}`,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

function storeProductsSubCategory() {
  return (
    <StoreProducts/>
  )
}

export default storeProductsSubCategory