"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";

function AnimatedProductCard({ prod, delay , ProductCard}) {
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
      <ProductCard prod={prod} />
    </motion.div>
  );
}

export default AnimatedProductCard;