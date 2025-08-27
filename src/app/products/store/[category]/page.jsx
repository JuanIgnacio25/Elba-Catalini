import StoreProducts from "@/components/views/Products/Store/StoreProducts"
import formatParam from "@/utils/formatParam"

export async function generateMetadata({ params }) {
  const category = formatParam(params.category);

  return {
    title: `${category} | Elba Catalini`,
    description: `Explora la categoría ${category} en Elba Catalini. Encontrá los mejores productos al mejor precio.`,
    openGraph: {
      title: `${category} | Elba Catalini`,
      description: `Explora la categoria ${category} en Elba Catalini.`,
      url: `https://elbacatalini.com/products/store/${params.category}`,
      siteName: "Elba Catalini",
      type: "website",
    },
    alternates: {
      canonical: `https://elbacatalini.com/products/store/${params.category}`,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}


function storeProductsCategory() {
  return (
    <StoreProducts/>
  )
}

export default storeProductsCategory