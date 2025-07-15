"use client";

import { useState } from "react";
import { motion } from "framer-motion";

import { newsAddToCartSchema } from "@/utils/validate/schemas/newsAddToCartSchema";
import { useCart } from "@/context/CartContext";

import { IoCloseCircleOutline } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import { toast } from "sonner"

function NewsAddToCart({ productId, onCancel }) {

  const { addProductToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError(null);

    const parsedQuantity = Number(quantity);
    const result = newsAddToCartSchema.safeParse({ quantity: parsedQuantity });

    if (!result.success) {
      setError(result.error.issues[0].message);
      return;
    }

    try {

      const res = await addProductToCart(productId, parsedQuantity);
      toast.success(`${res.data.name} x ${res.data.quantity} se agrego al carrito.`);
      onCancel();
    } catch (error) {
      console.log(error);
      setError("Error al agregar producto al carrito");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      className="absolute flex justify-center items-center h-full w-full z-10 rounded-lg bg-neutral-900/70 backdrop-blur-sm"
    >
      <div className="flex flex-col w-full py-2 gap-4 items-center bg-neutral-900/30">
        <div className="w-full flex flex-col justify-center items-center gap-1 px-2">
          <input
            type="number"
            value={quantity}
            onClick={() => setError(false)}
            onChange={(e) => setQuantity(e.target.value)}
            className="focus:outline focus:outline-red-600 focus:outline-2 rounded px-2 py-1 w-24 text-center transition"
            min={1}
          />
          <Button
            onClick={handleSubmit}
            className="w-full bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded"
          >
            {isSubmitting ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              </>
            ) : (
              "Añadir al carrito"
            )}
          </Button>
        </div>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <button
          onClick={onCancel}
          className="text-3xl text-white flex justify-center items-center hover:text-red-600 transition"
        >
          <IoCloseCircleOutline />
        </button>
      </div>
    </motion.div>
  );
}

export default NewsAddToCart;
