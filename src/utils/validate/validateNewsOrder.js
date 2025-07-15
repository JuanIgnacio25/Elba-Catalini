import { Type } from "@sinclair/typebox";
import Ajv from "ajv";
import addErrors from "ajv-errors";

const ajv = new Ajv({ allErrors: true, strict: false })
  .addKeyword("kind")
  .addKeyword("modifier");

addErrors(ajv);

const newsOrderSchema = Type.Object(
  {
    order: Type.Number({
      minimum: 1,
      errorMessage: {
        type: "order debe ser un número",
        minimum: "order debe ser mayor a 0",
      },
    }),
  },
  {
    additionalProperties: false,
    errorMessage: {
      required: {
        order: "Falta la propiedad: order",
      },
      additionalProperties: "No debe tener propiedades adicionales",
    },
  }
);

const validateNewsOrder = ajv.compile(newsOrderSchema);

export const isValidNewsOrder = (data) => {
  const valid = validateNewsOrder(data);
  if (!valid) {
    const msg =
    validateNewsOrder.errors?.[0]?.message || "Error de validación";
    throw new Error(msg);
  }
};