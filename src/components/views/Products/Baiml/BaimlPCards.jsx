"use client";

import { useState, useEffect } from "react";

import BaimlProductCard from "@/components/common/BaimlProductCard/BaimlProductCard";
import FallbackSpinner from "@/components/common/FallbackSpinner/FallbackSpinner";
import AnimatedProductCard from "@/components/common/AnimatedProductCard";

function BaimlPCards({ baimlProducts }) {
  const [visibleProducts, setVisibleProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [allLoaded, setAllLoaded] = useState(false);
  const ITEMS_PER_PAGE = 12;

  // Resetear la animación al cambiar los productos
  const [resetAnimationKey, setResetAnimationKey] = useState(0);

  useEffect(() => {
    if (baimlProducts.length > 0) {
      const initialProducts = baimlProducts.slice(0, ITEMS_PER_PAGE);
      setVisibleProducts(initialProducts);
      setPage(1);

      // Verificamos si hay menos de 12 productos en total
      if (baimlProducts.length <= ITEMS_PER_PAGE) {
        setAllLoaded(true);
      } else {
        setAllLoaded(false);
      }

      // Resetear la animación con un nuevo valor de clave
      setResetAnimationKey((prevKey) => prevKey + 1);
    } else {
      setVisibleProducts([]);
      setAllLoaded(true); // Si no hay productos, marcamos que todo está cargado
    }
  }, [baimlProducts]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.innerHeight + window.scrollY;
      const bottomPosition = document.documentElement.offsetHeight - 280; // Detectar 200px antes del final

      if (scrollPosition >= bottomPosition && !loadingMore && !allLoaded) {
        setLoadingMore(true);
        setTimeout(() => {
          setLoadingMore(false);
          setPage((prevPage) => {
            const nextPage = prevPage + 1;
            const newProducts = baimlProducts.slice(
              0,
              nextPage * ITEMS_PER_PAGE
            );

            if (newProducts.length > visibleProducts.length) {
              setVisibleProducts(newProducts);
            }

            if (newProducts.length >= baimlProducts.length) {
              setAllLoaded(true);
              return prevPage;
            }

            return nextPage;
          });
        }, 800);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [baimlProducts, visibleProducts, loadingMore, allLoaded]);

  return (
    <div className="baiml-p-main-cards-container">
      {visibleProducts.map((prod, index) => (
        <AnimatedProductCard
          key={`${prod.productId}-${resetAnimationKey}`} // Forzar nuevo render con cambio en key
          prod={prod}
          delay={index * 0.1}
          ProductCard={BaimlProductCard}
        />
      ))}

      {!loadingMore && (
        <div className="baiml-p-main-loading-more-spinner"></div>
      )}

      {loadingMore && !allLoaded && (
        <div className="baiml-p-main-loading-more-spinner">
          <FallbackSpinner />
        </div>
      )}
    </div>
  );
}

export default BaimlPCards;
