"use client";

import { useProduct } from "@/context/ProductContext";
import StoreProductCard from "@/components/views/Products/Store/StoreProductCard";

function StoreProductsCards() {
  const { storeProducts } = useProduct();

  return (
    <div className="store-products-cards">
      {storeProducts.map((prod) => {
        return <StoreProductCard key={prod.productId} prod={prod} />;
      })}
      {storeProducts.map((prod) => {
        return <StoreProductCard key={prod.productId} prod={prod} />;
      })}
      {storeProducts.map((prod) => {
        return <StoreProductCard key={prod.productId} prod={prod} />;
      })}
      {storeProducts.map((prod) => {
        return <StoreProductCard key={prod.productId} prod={prod} />;
      })}
      {storeProducts.map((prod) => {
        return <StoreProductCard key={prod.productId} prod={prod} />;
      })}
      {storeProducts.map((prod) => {
        return <StoreProductCard key={prod.productId} prod={prod} />;
      })}
      {storeProducts.map((prod) => {
        return <StoreProductCard key={prod.productId} prod={prod} />;
      })}
      {storeProducts.map((prod) => {
        return <StoreProductCard key={prod.productId} prod={prod} />;
      })}
      {storeProducts.map((prod) => {
        return <StoreProductCard key={prod.productId} prod={prod} />;
      })}
      {storeProducts.map((prod) => {
        return <StoreProductCard key={prod.productId} prod={prod} />;
      })}
      {storeProducts.map((prod) => {
        return <StoreProductCard key={prod.productId} prod={prod} />;
      })}
      {storeProducts.map((prod) => {
        return <StoreProductCard key={prod.productId} prod={prod} />;
      })}
      {storeProducts.map((prod) => {
        return <StoreProductCard key={prod.productId} prod={prod} />;
      })}
      {storeProducts.map((prod) => {
        return <StoreProductCard key={prod.productId} prod={prod} />;
      })}
      {storeProducts.map((prod) => {
        return <StoreProductCard key={prod.productId} prod={prod} />;
      })}
      {storeProducts.map((prod) => {
        return <StoreProductCard key={prod.productId} prod={prod} />;
      })}
      {storeProducts.map((prod) => {
        return <StoreProductCard key={prod.productId} prod={prod} />;
      })}
      {storeProducts.map((prod) => {
        return <StoreProductCard key={prod.productId} prod={prod} />;
      })}
      {storeProducts.map((prod) => {
        return <StoreProductCard key={prod.productId} prod={prod} />;
      })}
      {storeProducts.map((prod) => {
        return <StoreProductCard key={prod.productId} prod={prod} />;
      })}
      {storeProducts.map((prod) => {
        return <StoreProductCard key={prod.productId} prod={prod} />;
      })}
    </div>
  );
}

export default StoreProductsCards;
