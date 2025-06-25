import { Type } from "@sinclair/typebox";
import Ajv from "ajv";
import addErrors from "ajv-errors";

const ajv = new Ajv({allErrors:true, errorsLimit: 5})
  .addKeyword("kind")
  .addKeyword("modifier");
addErrors(ajv);

const brandSchema = Type.Object(
  {
    name: Type.String({
      minLength: 2,
      errorMessage: {
        type: "name debe ser un String",
        minLength: "name debe tener más de un carácter",
      },
    }),
    order: Type.Number({
      minimum: 1,
      errorMessage: {
        type: "order debe ser un Number",
        minimum: "order debe tener al menos un numero",
      },
    }),
  },
  {
    additionalProperties: false,
    errorMessage: {
      additionalProperties: "No debe tener propiedades adicionales",
      required: {
        name: "Falta la propiedad: name",
        order: "Falta la propiedad: order",
      },
    },
  }
);

const validateBrand = ajv.compile(brandSchema);

export const isValidBrand = (data) => {
  try {
    const isValid = validateBrand(data);
    if (!isValid) {
      throw new Error(validateBrand.errors[0]?.message || "Error de validación");
    }
  } catch (error) {
    throw error;
  }
};