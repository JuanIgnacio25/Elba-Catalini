"use client"

import { useProduct } from "@/context/ProductContext"

import SimplifiedViewProductCard from "@/components/views/Products/Baiml/SimplifiedView/SimplifiedViewProductCard"

function SimplifiedViewCards() {

  const {baimlProducts , loading } = useProduct();

  if(loading) return <div>Loading...</div>

  return (
    <div className="simplified-view-cards-container">
      {baimlProducts.map((prod) => {
        return <SimplifiedViewProductCard prod={prod} key={prod.productId}/>
      })}
    </div>
  )
}

export default SimplifiedViewCards