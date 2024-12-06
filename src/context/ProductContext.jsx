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

  const toxicShineProducts = useMemo(() => {
    return storeProducts.filter(
      (product) => product.category?.toLowerCase() === "toxic shine"
    );
  }, [storeProducts]);

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

  const filterBaimlProducts = (categories = []) => {
    return categories.length > 0
      ? baimlProducts.filter((product) => categories.includes(product.category))
      : baimlProducts;
  };

  const filterToxicShineProducts = (categories = []) => {
    return categories.length > 0
      ? toxicShineProducts.filter((product) => categories.includes(product.subCategory))
      : toxicShineProducts;
  }

  const searchProducts = (query) => {
    const lowerCaseQuery = query.toLowerCase();

    return allProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(lowerCaseQuery) ||
        product.description.toLowerCase().includes(lowerCaseQuery)
    );
  };

  const filterStoreProductsByCategory = (category, subcategory) => {
    
    if (subcategory) {
      return storeProducts.filter(
        (product) =>{
          return (product.category.toLowerCase() === category?.split("-").join(" ").toLowerCase() &&
          product.subCategory.toLowerCase() === subcategory?.split("-").join(" ").toLowerCase())
          }
      );
    }
    if (category) {
      return storeProducts.filter(
        (product) => product.category.toLowerCase() === category?.toLowerCase()
      );
    }
    return storeProducts;
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  return (
    <ProductContext.Provider
      value={{
        baimlProducts,
        storeProducts,
        toxicShineProducts,
        allProducts,
        loading,
        error,
        filterBaimlProducts,
        filterToxicShineProducts,
        fetchAllProducts,
        searchProducts,
        filterStoreProductsByCategory
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}
