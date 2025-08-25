import ProductDetail from "@/components/views/Products/ProductDetail/ProductDetail";
import notFound from "@/app/not-found";
import { getProductById } from "@/lib/api/getProductById";

export async function generateMetadata({ params }) {
  const product = await getProductById(params.id);

  if (!product) return notFound();

  return {
    title: product.name,
    description: product.description,
    alternates: {
      canonical: `https://elbacatalini.com/products/${params.id}/${product.slug}`,
    },
    openGraph: {
      title: product.name,
      description: product.description,
      images: product.images.map((img) => ({
        url: img.url,
        width: 485, 
        height: 485, 
        alt: product.name,
      })),
    },
    robots: {
      index: true,
      follow: true,
    }
  };
}

function productDetailPage({params}) {
  return (
    <ProductDetail id={params.id}/>
  )
}

export default productDetailPage