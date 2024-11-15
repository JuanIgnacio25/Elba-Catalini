"use client";

import { useEffect, useState } from "react";

import StoreProductCard from "@/components/views/Products/Store/StoreProductCard";
import AnimatedProductCard from "@/components/common/AnimatedProductCard";
import FallbackSpinner from "@/components/common/FallbackSpinner/FallbackSpinner";

function ProductsCards({ products }) {
  const [visibleProducts, setVisibleProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [allLoaded, setAllLoaded] = useState(false);
  const ITEMS_PER_PAGE = 12;

  useEffect(() => {
    if (products.length > 0) {
      const initialProducts = products.slice(0, ITEMS_PER_PAGE);
      setVisibleProducts(initialProducts);
      setPage(1);

      // Verificamos si hay menos de 12 productos en total
      if (products.length <= ITEMS_PER_PAGE) {
        setAllLoaded(true);
      } else {
        setAllLoaded(false);
      }
    } else {
      setVisibleProducts([]);
      setAllLoaded(true); // Si no hay productos, marcamos que todo está cargado
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
              return prevPage;
            }
            setLoadingMore(false);
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
    <div className="store-products-cards">
      {visibleProducts.map((prod, index) => {
        const isNewProduct = index >= (page - 1) * ITEMS_PER_PAGE;
        const calculatedDelay = isNewProduct
          ? (index % ITEMS_PER_PAGE) * 0.1
          : 0;

        return (
          <AnimatedProductCard
            key={prod.productId}
            prod={prod}
            delay={calculatedDelay}
            ProductCard={StoreProductCard}
          />
        );
      })}

      {!loadingMore && (
        <div className="store-products-loading-more-spinner"></div>
      )}

      {loadingMore && !allLoaded && (
        <div className="store-products-loading-more-spinner">
          <FallbackSpinner />
        </div>
      )}
    </div>
  );
}

export default ProductsCards;
