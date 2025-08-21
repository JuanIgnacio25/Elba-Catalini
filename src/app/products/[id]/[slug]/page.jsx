import ProductDetail from "@/components/views/Products/ProductDetail/ProductDetail";
import notFound from "@/app/not-found";

export async function generateMetadata({ params }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_WEBSITE_DOMAIN}/api/products/${params.id}`, {
    cache: "no-store",
  });

  if (!res.ok) return notFound();

  const product = await res.json();
  
  return {
    title: product.name,
    description: product.description,
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
  };
}

function productDetailPage({params}) {
  return (
    <ProductDetail id={params.id}/>
  )
}

export default productDetailPage