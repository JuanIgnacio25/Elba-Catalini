"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";

import ProductDetailInfo from "@/components/views/Products/ProductDetail/ProductDetailInfo";
import ProductDetailCarouselSlider from "@/components/views/Products/ProductDetail/ProductDetailCarouselSlider";
import ProductDetailHeader from "@/components/views/Products/ProductDetail/ProductDetailHeader";

function ProductDetailMain() {
  const params = useParams();
  const router = useRouter();
  const id = params.id;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [product, setProduct] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/api/products/${id}`);
      console.log(res);
      setProduct(res.data);
    } catch (error) {
      setError(error.response.data.message);
      console.log(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  if (loading) return <div>...loading</div>;

  return (
    <div className="product-detail-container">
      <ProductDetailHeader product={product}/>
      <div className="product-detail">
        <div className="product-detail-main">
          <ProductDetailCarouselSlider product={product} />
          <ProductDetailInfo product={product} />
        </div>
      </div>
    </div>
  );
}

export default ProductDetailMain;
