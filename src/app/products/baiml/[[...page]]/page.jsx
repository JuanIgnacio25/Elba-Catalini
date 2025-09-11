import { notFound } from "next/navigation";
import { getPaginatedProducts } from "@/lib/api/getPaginatedProducts";
import BaimlProducts from "@/components/views/Products/Baiml/BaimlProducts";

async function baimlProductsPage({ params, searchParams }) {
  const ITEMS_PER_PAGE = 24;

  // Si no hay params → página 1
  if (!params.page) {
    params.page = [];
  }

  // Validar formato de la URL
  if (
    params.page.length > 0 && // si viene algo
    (params.page[0] !== "page" || isNaN(parseInt(params.page[1], 10)))
  ) {
    return notFound();
  }

  const page = params.page.length === 0 ? 1 : parseInt(params.page[1], 10);

  // Página inválida (menor que 1, NaN, etc.)
  if (!page || page < 1) {
    return notFound();
  }

  const categories = searchParams.categories
    ? searchParams.categories.split(",")
    : [];

  const { products, total } = await getPaginatedProducts(page, categories);
  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

  // Si se pide una página mayor al total, también devolver 404
  if (page > totalPages && totalPages > 0) {
    return notFound();
  }

  return (
    <BaimlProducts
      products={products}
      currentPage={page}
      totalPages={totalPages}
      totalProducts={total}
      searchParams={searchParams}
      itemsPerPage={ITEMS_PER_PAGE}
      initialCategories={categories}
    />
  );
}

export default baimlProductsPage;
