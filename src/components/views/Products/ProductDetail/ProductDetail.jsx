import ProductDetailMain from "@/components/views/Products/ProductDetail/ProductDetailMain";
import notFound from "@/app/not-found";

async function ProductDetail({ id }) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_WEBSITE_DOMAIN}/api/products/${id}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) return notFound();

  const product = await res.json();

  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: product.name,
    image: product.images,
    description: product.description,
    sku: product.sku,
    brand: {
      "@type": "Brand",
      name: "Baiml",
    },
    offers: {
      "@type": "Offer",
      url: `${process.env.NEXT_PUBLIC_WEBSITE_DOMAIN}/products/${product.productId}/${product.slug}`,
      priceCurrency: "ARS",
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
    },
  };

  return (
    <>
      <ProductDetailMain product={product} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
    </>
  );
}

export default ProductDetail;
