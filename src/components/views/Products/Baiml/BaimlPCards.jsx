"use client";

import { useProduct } from "@/context/ProductContext";

import BaimlProductCard from "@/components/common/BaimlProductCard/BaimlProductCard";
import FallbackSpinner from "@/components/common/FallbackSpinner/FallbackSpinner";

function BaimlPCards({baimlProducts /* , loading , error */}) {

  /* if (loading) {
    return (
      <div className="baiml-p-main-cards-fallback">
        <FallbackSpinner />
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  } */

  return (
    <div className="baiml-p-main-cards-container">
      {baimlProducts.map((prod) => {
        return <BaimlProductCard prod={prod} key={prod.productId} />;
      })}
    </div>
  );
}

export default BaimlPCards;
