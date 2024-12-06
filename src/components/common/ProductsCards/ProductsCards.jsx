"use client";

import "@/components/common/ProductsCards/productsCards.css";

import { useEffect, useState } from "react";

import AnimatedProductCard from "@/components/common/AnimatedProductCard";
import FallbackSpinner from "@/components/common/FallbackSpinner/FallbackSpinner";

function ProductsCards({ products , enabledResetAnimation , ITEMS_PER_PAGE ,ProductCard}) {
  const [visibleProducts, setVisibleProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [allLoaded, setAllLoaded] = useState(false);

  // Resetear la animación al cambiar los productos
  const [resetAnimationKey, setResetAnimationKey] = useState(0);

  useEffect(() => {
    if (products.length > 0) {
      const initialProducts = products.slice(0, ITEMS_PER_PAGE);
      setVisibleProducts(initialProducts);
      setPage(1);

      setAllLoaded(products.length <= ITEMS_PER_PAGE);

      if(enabledResetAnimation) setResetAnimationKey((prevKey) => prevKey + 1);
    }
  }, [products]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.innerHeight + window.scrollY;
      const bottomPosition = document.documentElement.offsetHeight - 280; // Detectar 200px antes del final

      if (scrollPosition >= bottomPosition && !loadingMore && !allLoaded) {
        setLoadingMore(true);
        setTimeout(() => {
          setPage((prevPage) => {
            const nextPage = prevPage + 1;
            const newProducts = products.slice(0, nextPage * ITEMS_PER_PAGE);

            if (newProducts.length > visibleProducts.length) {
              setVisibleProducts(newProducts);
            }

            if (newProducts.length >= products.length) {
              setAllLoaded(true);
            }

            setLoadingMore(false); // Asegúrate de que esto siempre se ejecuta
            return nextPage;
          });
        }, 800);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [products, visibleProducts, loadingMore, allLoaded]);

  return (
    <div className="products-cards">
      {visibleProducts.map((prod, index) => {
        const isNewProduct = index >= (page - 1) * ITEMS_PER_PAGE;
        const calculatedDelay = isNewProduct
          ? (index % ITEMS_PER_PAGE) * 0.1
          : 0;
        return (
          <AnimatedProductCard
            key={`${enabledResetAnimation ? `${prod.productId}-${resetAnimationKey}` : prod.productId }`}
            prod={prod}
            delay={calculatedDelay}
            ProductCard={ProductCard}
          />
        );
      })}
      {loadingMore && !allLoaded && (
        <div className="products-loading-more-spinner">
          <FallbackSpinner />
        </div>
      )}
    </div>
  );
}

export default ProductsCards;
