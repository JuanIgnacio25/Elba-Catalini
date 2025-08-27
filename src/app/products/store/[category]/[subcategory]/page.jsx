import StoreProducts from "@/components/views/Products/Store/StoreProducts"
import formatParam from "@/utils/formatParam";

export async function generateMetadata({ params }) {
  const category = formatParam(params.category);
  const subcategory = formatParam(params.subcategory);

  return {
    title: `${subcategory} - ${category} | Elba Catalini`,
    description: `Descubrí nuestra selección de ${subcategory} en la categoría ${category}. Calidad y precio en Elba Catalini.`,
    openGraph: {
      title: `${subcategory} - ${category} | Elba Catalini`,
      description: `Explora ${subcategory} de la categoría ${category} en Elba Catalini.`,
      url: `https://elbacatalini.com/products/store/${params.category}/${params.subcategory}`,
      siteName: "Elba Catalini",
      type: "website",
    },
    alternates: {
      canonical: `https://elbacatalini.com/products/store/${params.category}/${params.subcategory}`,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

function storeProductsSubcategory() {
  return (
    <StoreProducts/>
  )
}

export default storeProductsSubcategory