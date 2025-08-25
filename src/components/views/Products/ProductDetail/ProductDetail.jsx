import ProductDetailMain from "@/components/views/Products/ProductDetail/ProductDetailMain";
import notFound from "@/app/not-found";
import { getProductById } from "@/lib/api/getProductById";

async function ProductDetail({ id }) {
  const product = await getProductById(id);

  if (!product) return notFound();

  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: product.name,
    image: product.images,
    description: product.description,
    sku: product.sku,
    category: product.category,
    brand: {
      "@type": "Brand",
      name: "Baiml",
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
