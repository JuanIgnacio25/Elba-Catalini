import { z } from "zod";

export const newsFormSchema = (news) =>
  z.object({
    productId: z.preprocess(
      (val) => parseInt(val, 10),
      news
        ? z.number().optional()
        : z
            .number({
              required_error: "Debe seleccionar un producto.",
              invalid_type_error: "El ID del producto debe ser un número.",
            })
            .positive("El ID del producto debe ser un número positivo.")
    ),
    order: z.preprocess(
      (val) => parseInt(val, 10),
      z
        .number({
          required_error: "Debe ingresar un número de orden.",
          invalid_type_error: "El orden debe ser un número.",
        })
        .min(1, { message: "El orden debe ser al menos 1." })
    ),
  });