"use client";

import "@/components/common/ProductsCards/productsCards.css";
import AnimatedProductCard from "@/components/common/AnimatedProductCard";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

function ProductsCardsServerSide({
  products,
  currentPage,
  totalPages,
  searchParams,
  ProductCard,
}) {
  const pathname = usePathname();

  // basePath = ruta actual sin el /page/[n]
  const basePath = pathname.replace(/\/page\/\d+$/, "") || "/products";

  // Construir la URL manteniendo los filtros
  const buildUrl = (pageNum) => {
    const params = new URLSearchParams(searchParams);
    const queryString = params.toString();

    const fullPath =
      pageNum === 1 ? basePath : `${basePath}/page/${pageNum}`;

    return queryString ? `${fullPath}?${queryString}` : fullPath;
  };

  // Generar los números de página
  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(
          1,
          "...",
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages
        );
      } else {
        pages.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages
        );
      }
    }
    return pages;
  };

  return (
    <div className="products-cards-container">
      {/* Grid de productos */}
      <div className="products-cards">
        {products.map((prod, index) => (
          <AnimatedProductCard
            key={prod.productId}
            prod={prod}
            delay={Math.min(index * 0.12, 0.6)}
            ProductCard={ProductCard}
          />
        ))}
      </div>

      <div className="mt-8">
        {/* Paginación */}
        {totalPages > 1 && (
          <Pagination>
            <PaginationContent>
              {/* Flecha izquierda */}
              {currentPage > 1 && (
                <PaginationItem>
                  <Link href={buildUrl(currentPage - 1)}>
                    <ChevronLeft className="h-5 w-5" />
                  </Link>
                </PaginationItem>
              )}

              {/* Números */}
              {getPageNumbers().map((pageNum, index) => (
                <PaginationItem key={index}>
                  {pageNum === "..." ? (
                    <PaginationEllipsis />
                  ) : (
                    <PaginationLink
                      asChild
                      isActive={pageNum === currentPage}
                    >
                      <Link href={buildUrl(pageNum)}>{pageNum}</Link>
                    </PaginationLink>
                  )}
                </PaginationItem>
              ))}

              {/* Flecha derecha */}
              {currentPage < totalPages && (
                <PaginationItem>
                  <Link href={buildUrl(currentPage + 1)}>
                    <ChevronRight className="h-5 w-5" />
                  </Link>
                </PaginationItem>
              )}
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </div>
  );
}

export default ProductsCardsServerSide;
