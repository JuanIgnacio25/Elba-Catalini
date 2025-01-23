"use client";

import "@/components/common/ProductsCards/productsCards.css";

import { useEffect, useState } from "react";

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

  // Estado para contar cargas automáticas
  const [autoLoadCount, setAutoLoadCount] = useState(0);

  // Resetear la animación al cambiar los productos
  const [resetAnimationKey, setResetAnimationKey] = useState(0);

  useEffect(() => {
    if (products.length > 0) {
      const initialProducts = products.slice(0, ITEMS_PER_PAGE);
      setVisibleProducts(initialProducts);
      setPage(1);

      setAllLoaded(products.length <= ITEMS_PER_PAGE);

      if (enabledResetAnimation) setResetAnimationKey((prevKey) => prevKey + 1);
    }
  }, [products]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.innerHeight + window.scrollY;
      const bottomPosition = document.documentElement.offsetHeight - 280; // Detectar 280px antes del final

      // Solo cargar automáticamente si el contador es menor a 2
      if (
        scrollPosition >= bottomPosition &&
        !loadingMore &&
        !allLoaded &&
        autoLoadCount < 2
      ) {
        loadMoreProducts(true);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [products, visibleProducts, loadingMore, allLoaded, autoLoadCount]);

  const loadMoreProducts = (isAutoLoad = false) => {
    if (loadingMore || allLoaded) return;

    setLoadingMore(true); // Activar spinner inmediatamente

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
          setAutoLoadCount((prevCount) => prevCount + 1); // Incrementar contador si es carga automática
        }

        setLoadingMore(false); // Detener spinner después de cargar productos
        return nextPage;
      });
    }, 800); // Simular retraso en la carga
  };

  return (
    <div className="products-cards">
      {visibleProducts.map((prod, index) => {
        const isNewProduct = index >= (page - 1) * ITEMS_PER_PAGE;
        const calculatedDelay = isNewProduct
          ? (index % ITEMS_PER_PAGE) * 0.1
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

      {!loadingMore && autoLoadCount >= 2 && !allLoaded && (
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
