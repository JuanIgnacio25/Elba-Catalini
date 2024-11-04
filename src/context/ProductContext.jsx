import { createContext, useContext, useState, useEffect , useMemo} from "react";
import axios from "axios";

const ProductContext = createContext();

export const useProduct = () => useContext(ProductContext);

export function ProductProvider({ children }) {

  const [loading , setLoading] = useState(true);
  const [baimlProducts, setBaimlProducts] = useState([]);
  const [storeProducts, setStoreProducts] = useState([]);


  const allProducts = useMemo(() => [...baimlProducts, ...storeProducts], [baimlProducts, storeProducts]);

  const fetchAllProducts = async () => {
    try {
      setLoading(true)

      const [baimlRes, storeRes] = await Promise.all([
        axios.get("/api/products/kind/Baiml"),
        axios.get("/api/products/kind/Store"),
      ]);

      setBaimlProducts(baimlRes.data.products);
      setStoreProducts(storeRes.data.products);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchAllProducts();
  }, []);

  return (
    <ProductContext.Provider value={{ baimlProducts, storeProducts , allProducts , loading }}>
      {children}
    </ProductContext.Provider>
  );
}
