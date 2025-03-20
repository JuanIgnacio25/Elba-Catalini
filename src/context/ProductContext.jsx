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
      setError("ocurrio un error");
    } finally {
      setLoading(false);
    }
  };

  const filterBaimlProducts = (categories = []) => {
    return categories.length > 0
      ? baimlProducts.filter((product) =>
          categories.some((cat) => product.category === cat)
        )
      : baimlProducts;
  };

  const filterToxicShineProducts = (categories = []) => {
    return categories.length > 0
      ? toxicShineProducts.filter((product) =>
          categories.includes(product.subCategory)
        )
      : toxicShineProducts;
  };

  const searchProducts = (query) => {
    const lowerCaseQuery = query.toLowerCase();
    const wordsInQuery = lowerCaseQuery.split(/\s+/); // Divide la búsqueda en palabras
  
    const filteredProducts = allProducts
      .map((product) => {
        const name = product.name.toLowerCase();
        const description = product.description.toLowerCase();
  
        let nameScore = 0;
        let descScore = 0;
  
        wordsInQuery.forEach((word) => {
          if (name.includes(word)) {
            if (name.startsWith(word)) {
              nameScore += 300; // Coincidencia al inicio del nombre (máxima prioridad)
            } else {
              nameScore += 200; // Coincidencia en cualquier parte del nombre
            }
          }
  
          if (description.includes(word)) {
            if (description.startsWith(word)) {
              descScore += 100; // Coincidencia al inicio de la descripción
            } else {
              descScore += 50; // Coincidencia en cualquier parte de la descripción
            }
          }
        });
  
        return { ...product, score: nameScore + descScore };
      })
      .filter((product) => product.score > 0)
      .sort((a, b) => b.score - a.score); // Ordenar por puntuación
  
    return filteredProducts;
  };

  const filterStoreProductsByCategory = (
    category,
    subcategory,
    variantSubCategory
  ) => {
  
    category = decodeURIComponent(category || "").split("-").join(" ").toLowerCase();
    subcategory = decodeURIComponent(subcategory || "").split("-").join(" ").toLowerCase();
    variantSubCategory = decodeURIComponent(variantSubCategory || "").split("-").join(" ").toLowerCase();
  
    if (variantSubCategory) {
      return storeProducts.filter((product) => {
        return (
          product.category.toLowerCase() === category &&
          product.subCategory.toLowerCase() === subcategory &&
          product.variantSubCategory.toLowerCase() === variantSubCategory
        );
      });
    }
  
    if (subcategory) {
      return storeProducts.filter((product) => {
        return (
          product.category.toLowerCase() === category &&
          product.subCategory.toLowerCase() === subcategory
        );
      });
    }
  
    if (category) {
      return storeProducts.filter(
        (product) => product.category.toLowerCase() === category
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
        filterStoreProductsByCategory,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}
