import ProductDetail from "@/components/views/Products/ProductDetail/ProductDetail";

function productDetailPage({params}) {
  return (
    <ProductDetail id={params.id}/>
  )
}

export default productDetailPage