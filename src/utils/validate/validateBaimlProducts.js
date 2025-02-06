import { Type } from "@sinclair/typebox";
import Ajv from "ajv";
import addErrors from "ajv-errors";

const ajv = new Ajv()
  .addKeyword("kind")
  .addKeyword("modifier");
addErrors(ajv);

const baimlProductDtoSchema = Type.Object(
  {
    name: Type.String({
      minLength: 2,
      errorMessage: {
        type: "Name debe ser un String",
        minLength: "Name debe tener más de un carácter",
      },
    }),
    nameForOrders: Type.String({
      minLength: 2,
      errorMessage: {
        type: "Name for orders debe ser un String",
        minLength: "Name for orders debe tener más de un carácter",
      },
    }),
    sku: Type.String({
      errorMessage: {
        type: "Sku debe ser un String",
      },
    }),
    category: Type.String({
      errorMessage: {
        type: "Category debe ser un String",
      },
    }),
    description: Type.String({
      errorMessage: {
        type: "Description debe ser un String",
      },
    }),
    unit: Type.String({
      errorMessage: {
        type: "Unit debe ser String",
      },
    }),
    productSet: Type.Number({
      errorMessage: {
        type: "ProductSet debe ser un Number",
      },
    }),
    kind: Type.String({
      errorMessage: {
        type: "Kind debe ser String",
      },
    }),
  },
  {
    additionalProperties: false,
    errorMessage: {
      additionalProperties: "No debe tener propiedades adicionales",
      required: {
        name: "Falta la propiedad: name",
        nameForOrders: "Falta la propiedad: nameForOrders",
        sku:"Falta la propiedad sku",
        category: "Falta la propiedad: category",
        description: "Falta la propiedad: description",
        unit: "Falta la propiedad: unit",
        productSet: "Falta la propiedad: productSet",
        kind: "Falta la propiedad: kind"
      },
    },
  }
);

const validateBaimlProduct = ajv.compile(baimlProductDtoSchema);

export const isValidBaimlProduct = (product) => {
  try {
    const isValid = validateBaimlProduct(product);
    if (!isValid) {
      throw new Error(ajv.errorsText(validateBaimlProduct.errors));
    }
  } catch (error) {
    throw error;
  }
};
