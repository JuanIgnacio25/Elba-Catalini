"use client";

import { useEffect, useState , useCallback} from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";

import ProductDetailInfo from "@/components/views/Products/ProductDetail/ProductDetailInfo";
import ProductDetailCarouselSlider from "@/components/views/Products/ProductDetail/ProductDetailCarouselSlider";
import ProductDetailHeader from "@/components/views/Products/ProductDetail/ProductDetailHeader";
import FallbackSpinner from "@/components/common/FallbackSpinner/FallbackSpinner";

function ProductDetailMain() {
  const params = useParams();
  const router = useRouter();
  const id = params.id;

  const [product, setProduct] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProduct = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/api/products/${id}`);
      setProduct(res.data);
    } catch (error) {
      setError(error.response?.data?.message || "Error desconocido");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (error) {
      router.push("/not-found");
    }
  }, [error,router]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  if (loading)
    return (
      <div className="product-detail-container">
        <div className={`product-detail-header-container`}>
          <div className="product-detail-header">
            <Link href={`/products`}>
              <p>{`Productos / `}</p>
            </Link>
          </div>
        </div>
        <div className="product-detail-main-container">
          <div className="product-detail-main-fallback">
            <FallbackSpinner />
          </div>
        </div>
      </div>
    );

  if (error) {
    return null;
  }

  return (
    <div className="product-detail-container">
      <ProductDetailHeader product={product} />
      <div className="product-detail-main-container">
        <div className="product-detail-main-carousel-slider">
          <ProductDetailCarouselSlider product={product} />
        </div>
        <div className="product-detail-main-info-container">
          <ProductDetailInfo product={product} />
        </div>
      </div>
    </div>
  );
}

export default ProductDetailMain;
