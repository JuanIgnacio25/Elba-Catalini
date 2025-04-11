"use client";

import { motion } from "framer-motion";

function AnimatedProductCard({ prod, delay, ProductCard }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: delay || 0.1, ease: "easeOut" }}
    >
      <ProductCard prod={prod} />
    </motion.div>
  );
}

export default AnimatedProductCard;
