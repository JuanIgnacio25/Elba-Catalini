import { createContext, useContext, useState, useEffect, useMemo } from "react";
import axios from "axios";

const ProductContext = createContext();

export const useProduct = () => useContext(ProductContext);

export function ProductProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [baimlProducts, setBaimlProducts] = useState([]);
  const [storeProducts, setStoreProducts] = useState([]);

  const allProducts = useMemo(() => {
    if (!baimlProducts.length && !storeProducts.length) return [];
    return [...baimlProducts, ...storeProducts];
  }, [baimlProducts, storeProducts]);

  const fetchAllProducts = async () => {
    try {
      setLoading(true);

      const [baimlRes, storeRes] = await Promise.all([
        axios.get("/api/products/kind/Baiml"),
        axios.get("/api/products/kind/Store"),
      ]);

      setBaimlProducts(baimlRes.data.products);
      setStoreProducts(storeRes.data.products);
    } catch (error) {
      console.log(error);
      setError("ocurrio un error");
    } finally {
      setLoading(false);
    }
  };

  const filterProducts = (categories = []) => {
    return categories.length > 0
      ? baimlProducts.filter((product) => categories.includes(product.category))
      : baimlProducts;
  };

  const searchProducts = (query) => {
    const lowerCaseQuery = query.toLowerCase();

    return allProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(lowerCaseQuery) ||
        product.description.toLowerCase().includes(lowerCaseQuery)
    );
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  return (
    <ProductContext.Provider
      value={{
        baimlProducts,
        storeProducts,
        allProducts,
        loading,
        error,
        filterProducts,
        fetchAllProducts,
        searchProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}
