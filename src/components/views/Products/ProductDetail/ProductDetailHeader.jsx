"use client"
import { useState , useEffect} from "react";

function ProductDetailHeader({product}) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={`product-detail-header-container ${isScrolled ? "product-detail-header-container-scrolled" : ""}`}>
      <div className="product-detail-header">
        {`Productos / Baiml / ${product.category} / ${product.sku}`}
      </div>
    </div>
  );
}

export default ProductDetailHeader;
