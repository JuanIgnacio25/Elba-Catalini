"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";

import BaimlProductCard from "@/components/common/BaimlProductCard/BaimlProductCard";
import FallbackSpinner from "@/components/common/FallbackSpinner/FallbackSpinner";

function BaimlPCards({ baimlProducts , filterLoading}) {
  
  if(filterLoading) return (
    <div className="baiml-p-main-cards-fallback">
        <FallbackSpinner />
      </div>
  )

  return (
    <div className="baiml-p-main-cards-container">
      {baimlProducts.map((prod, index) => (
        <AnimatedProductCard key={prod.productId} prod={prod} delay={index * 0.2} />
      ))}
    </div>
  );
}

function AnimatedProductCard({ prod, delay }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      className="baiml-product-card"
    >
      <BaimlProductCard prod={prod} />
    </motion.div>
  );
}

export default BaimlPCards;