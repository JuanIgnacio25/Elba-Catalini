import ProductDetail from "@/components/views/Products/ProductDetail/ProductDetail";

export async function generateMetadata({ params }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_WEBSITE_DOMAIN}/api/products/${params.id}`, {
    cache: "no-store",
  });

  if (!res.ok) return notFound();

  const product = await res.json();
  
  return {
    title: `${product.name}`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [{ url: product.image }],
    },
  };
}

function productDetailPage({params}) {
  return (
    <ProductDetail id={params.id}/>
  )
}

export default productDetailPage