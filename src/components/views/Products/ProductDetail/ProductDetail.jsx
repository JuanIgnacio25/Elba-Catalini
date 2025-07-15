import ProductDetailMain from "@/components/views/Products/ProductDetail/ProductDetailMain";
import notFound from "@/app/not-found";


async function ProductDetail({id}) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_WEBSITE_DOMAIN}/api/products/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) return notFound();

  const product = await res.json();

  return (
      <ProductDetailMain product={product}/>
  );
}

export default ProductDetail;
