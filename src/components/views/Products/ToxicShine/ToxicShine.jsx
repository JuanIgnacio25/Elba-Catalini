import "@/components/views/Products/ToxicShine/toxicShine.css";

import PathHeader from "@/components/common/PathHeader/PathHeader";
import ToxicShineMain from "@/components/views/Products/ToxicShine/ToxicShineMain";

function ToxicShine({
  products,
  currentPage,
  totalPages,
  totalProducts,
  searchParams,
  itemsPerPage,
  initialCategories,
}) {

  return (
    <div className="toxic-products-container">
      <PathHeader />
      <div className="w-full flex justify-center">
        <h1 className="max-[871px]:w-[90%] w-[80%] text-3xl text-red-500 font-bold">
          Toxic Shine
        </h1>
      </div>
      <ToxicShineMain
        products={products}
        currentPage={currentPage}
        totalPages={totalPages}
        totalProducts={totalProducts}
        searchParams={searchParams}
        itemsPerPage={itemsPerPage}
        initialCategories={initialCategories}
      />
    </div>
  );
}

export default ToxicShine;
