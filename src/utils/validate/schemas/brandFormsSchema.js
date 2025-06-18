import * as z from "zod";

export const brandFormSchema = z.object({
  name: z.string().min(2, {
    message: "El nombre debe tener al menos 2 caracteres.",
  }),
  image: z.union([
    z
      .string()
      .url("La URL de la imagen no es válida si no es un archivo nuevo."),
    z
      .any()
      .refine((files) => files?.length === 1, "Debe seleccionar un archivo.")
      .refine(
        (files) => files?.[0]?.size <= 5 * 1024 * 1024,
        "La imagen debe ser menor a 5MB."
      )
      .refine(
        (files) =>
          ["image/jpeg", "image/png", "image/webp"].includes(files?.[0]?.type),
        "Solo se permiten archivos .jpg, .jpeg, .png y .webp."
      ),
  ]),
  order: z.preprocess(
    (val) => {
      if (typeof val === "string" && val.trim() === "") return undefined;
      const parsed = parseInt(val, 10);
      return isNaN(parsed) ? undefined : parsed;
    },
    z
      .number({
        required_error: "Debe ingresar un número de orden.",
        invalid_type_error: "El orden debe ser un número válido.",
      })
      .min(1, { message: "El orden debe ser al menos 1." })
  ),
});
