"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";

import BaimlProductCard from "@/components/common/BaimlProductCard/BaimlProductCard";
import FallbackSpinner from "@/components/common/FallbackSpinner/FallbackSpinner";

function BaimlPCards({ baimlProducts, filterLoading }) {
  const [visibleProducts, setVisibleProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [allLoaded, setAllLoaded] = useState(false);
  const ITEMS_PER_PAGE = 6;

  // Resetear la animación al cambiar los productos
  const [resetAnimationKey, setResetAnimationKey] = useState(0);

  useEffect(() => {
    if (baimlProducts.length > 0) {
      const initialProducts = baimlProducts.slice(0, ITEMS_PER_PAGE);
      setVisibleProducts(initialProducts);
      setPage(1);

      // Verificamos si hay menos de 12 productos en total
      if (baimlProducts.length <= ITEMS_PER_PAGE * 2) {
        setAllLoaded(true); // Marcar como cargado si hay menos de 12 productos
      } else {
        setAllLoaded(false); // Si hay más de 12, no marcamos como cargado
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
      const bottomPosition = document.documentElement.offsetHeight - 200; // Detectar 200px antes del final

      if (scrollPosition >= bottomPosition && !loadingMore && !allLoaded) {
        setLoadingMore(true);
        setTimeout(() => {
          setLoadingMore(false);
          setPage((prevPage) => {
            const nextPage = prevPage + 1;
            const newProducts = baimlProducts.slice(0, nextPage * ITEMS_PER_PAGE);

            if (newProducts.length > visibleProducts.length) {
              setVisibleProducts(newProducts);
            }

            if (newProducts.length >= baimlProducts.length) {
              setAllLoaded(true); // Marcar como cargado si ya no hay más productos
              return prevPage;
            }

            return nextPage;
          });
        }, 800);
      }
    };

    // Agregar evento de scroll
    window.addEventListener("scroll", handleScroll);

    // Limpieza del evento al desmontar
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [baimlProducts, visibleProducts, loadingMore, allLoaded]);

  // Cuando los productos están siendo filtrados
  if (filterLoading)
    return (
      <div className="baiml-p-main-cards-fallback">
        <FallbackSpinner />
      </div>
    );

  return (
    <div className="baiml-p-main-cards-container">
      {visibleProducts.map((prod, index) => (
        <AnimatedProductCard
          key={`${prod.productId}-${resetAnimationKey}`} // Forzar nuevo render con cambio en key
          prod={prod}
          delay={index * 0.1}
        />
      ))}

      {loadingMore && !allLoaded && (
        <div className="baiml-p-main-loading-more-spinner">
          <FallbackSpinner />
        </div>
      )}
    </div>
  );
}

function AnimatedProductCard({ prod, delay }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      className="baiml-product-card"
    >
      <BaimlProductCard prod={prod} />
    </motion.div>
  );
}

export default BaimlPCards;