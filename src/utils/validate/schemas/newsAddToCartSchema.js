// app/schemas/newsAddToCartSchema.js
import { z } from "zod";

export const newsAddToCartSchema = z.object({
  quantity: z
    .number({ invalid_type_error: "Debe ser un número" })
    .min(1, "Debe ser al menos 1"),
});