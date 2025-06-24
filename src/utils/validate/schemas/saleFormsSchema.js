import { z } from "zod";

export const saleImageSchema = z.object({
  image: z
    .any()
    .refine((file) => !!file, "Debe seleccionar una imagen.")
    .refine(
      (file) => file?.size <= 5 * 1024 * 1024,
      "La imagen debe ser menor a 5MB."
    )
    .refine(
      (file) =>
        ["image/jpeg", "image/png", "image/webp"].includes(file?.type),
      "Solo se permiten archivos .jpg, .jpeg, .png y .webp."
    ),
});