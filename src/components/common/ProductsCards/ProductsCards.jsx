"use client";

import "@/components/common/ProductsCards/productsCards.css";

import { useEffect, useState, useCallback } from "react";
import AnimatedProductCard from "@/components/common/AnimatedProductCard";
import FallbackSpinner from "@/components/common/FallbackSpinner/FallbackSpinner";

function ProductsCards({
  products,
  enabledResetAnimation,
  ITEMS_PER_PAGE,
  ProductCard,
}) {
  const [visibleProducts, setVisibleProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [allLoaded, setAllLoaded] = useState(false);
  const [autoLoadCount, setAutoLoadCount] = useState(0);
  const [resetAnimationKey, setResetAnimationKey] = useState(0);

  // Inicializar productos cuando cambian
  useEffect(() => {
    if (products.length > 0) {
      const initialProducts = products.slice(0, ITEMS_PER_PAGE);
      setVisibleProducts(initialProducts);
      setPage(1);
      setAllLoaded(products.length <= ITEMS_PER_PAGE);

      if (enabledResetAnimation) {
        setResetAnimationKey((prevKey) => prevKey + 1);
      }
    }
  }, [products, ITEMS_PER_PAGE, enabledResetAnimation]);

  // Cargar más productos (manual o automático)
  const loadMoreProducts = useCallback((isAutoLoad = false) => {
    if (loadingMore || allLoaded) return;

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

        if (isAutoLoad) {
          setAutoLoadCount((prevCount) => prevCount + 1);
        }

        setLoadingMore(false);
        return nextPage;
      });
    }, 800); // Delay para simular carga
  }, [loadingMore, allLoaded, products, ITEMS_PER_PAGE, visibleProducts]);

  // Cargar más automáticamente al hacer scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.innerHeight + window.scrollY;
      const bottomThreshold = document.documentElement.offsetHeight - 280;

      if (
        scrollPosition >= bottomThreshold &&
        !loadingMore &&
        !allLoaded &&
        autoLoadCount < 1
      ) {
        loadMoreProducts(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loadingMore, allLoaded, autoLoadCount, loadMoreProducts]);

  return (
    <div className="products-cards">
      {visibleProducts.map((prod, index) => {
        const isNewProduct = index >= (page - 1) * ITEMS_PER_PAGE;
        const calculatedDelay = isNewProduct
          ? Math.min((index % ITEMS_PER_PAGE) * 0.12, 0.6)
          : 0;

        return (
          <AnimatedProductCard
            key={`${
              enabledResetAnimation
                ? `${prod.productId}-${resetAnimationKey}`
                : prod.productId
            }`}
            prod={prod}
            delay={calculatedDelay}
            ProductCard={ProductCard}
          />
        );
      })}

      {loadingMore && (
        <div className="products-loading-more-spinner">
          <FallbackSpinner />
        </div>
      )}

      {!loadingMore && autoLoadCount >= 1 && !allLoaded && (
        <button
          className="products-load-more-button"
          onClick={() => loadMoreProducts(false)}
        >
          Cargar más
        </button>
      )}
    </div>
  );
}

export default ProductsCards;