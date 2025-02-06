import { Type } from "@sinclair/typebox";
import Ajv from "ajv";
import addErrors from "ajv-errors";
import { BAIML_CATEGORIES, TOXIC_SHINE_CATEGORIES } from "@/constants/categories";

const ajv = new Ajv()
  .addKeyword("kind")
  .addKeyword("modifier");
addErrors(ajv);

const productInfoDtoSchema = Type.Object(
  {
    category: Type.String({
      errorMessage: {
        type: "Category debe ser un String",
      },
      enum: [...BAIML_CATEGORIES,...TOXIC_SHINE_CATEGORIES],
    }),
    kind: Type.String({
      errorMessage: {
        type: "Kind debe ser String",
      },
      enum: ["Store", "Baiml"],
    }),
  },
  {
    additionalProperties: false,
    errorMessage: {
      additionalProperties: "No debe tener propiedades adicionales",
      required: {
        category: "Falta la propiedad: category",
        kind: "Falta la propiedad: kind",
      },
    },
  }
);

const validateProductInfo = ajv.compile(productInfoDtoSchema);

export const isValidProductInfo = (product) => {
  try {
    const isValid = validateProductInfo(product);
    if (!isValid) {
      /* throw new Error(ajv.errorsText(validateProductInfo.errors)); */
      throw new Error("No existe esta categoria");
    }
  } catch (error) {
    throw error;
  }
};
