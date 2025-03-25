import { Type } from "@sinclair/typebox";
import Ajv from "ajv";
import addErrors from "ajv-errors";

const ajv = new Ajv({ allErrors: true, errorsLimit: 5 })
  .addKeyword("kind")
  .addKeyword("modifier");
addErrors(ajv);

const storeProductDtoSchema = Type.Object(
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
      minLength: 2,
      errorMessage: {
        minLength: "Sku debe tener más de un carácter",
        type: "Sku debe ser un String",
      },
    }),
    category: Type.String({
      minLength: 2,
      errorMessage: {
        type: "Category debe ser un String",
        minLength: "La Categoria debe tener un valor asignado"
      },
    }),
    subCategory: Type.String({
      minLength: 2,
      errorMessage: {
        type: "Sub Category debe ser un String",
        minLength: "La Sub Categoria debe tener un valor asignado"
      },
    }),
    description: Type.String({
      minLength: 2,
      errorMessage: {
        type: "Description debe ser un String",
        minLength: "Description debe tener un valor asignado",
      },
    }),
    unit: Type.String({
      errorMessage: {
        type: "Unit debe ser String",
      },
    }),
    kind: Type.String({
      minLength: 2,
      errorMessage: {
        minLength: "Kind debe tener un valor asignado",
        type: "Kind debe ser String",
      },
    }),
    variantSubCategory: Type.Optional(
      Type.String({
        minLength:2,
        errorMessage: { type: "variantCategory debe ser un String" , minLength: "La Variante de Sub Categoria debe tener un valor asignado"},
      })
    ),
  },
  {
    additionalProperties: false,
    errorMessage: {
      additionalProperties: "No debe tener propiedades adicionales",
      required: {
        name: "Falta la propiedad: name",
        nameForOrders: "Falta la propiedad: nameForOrders",
        sku: "Falta la propiedad sku",
        category: "Falta la propiedad: category",
        subCategory: "Falta la propiedad: subCategory",
        description: "Falta la propiedad: description",
        unit: "Falta la propiedad: unit",
        kind: "Falta la propiedad: kind",
      },
    },
  }
);

const storeProductValidationWithConditions = {
  ...storeProductDtoSchema,
  if: {
    properties: { subCategory: { enum: ["Cables TPR", "Enchufes"] } },
  },
  then: {
    required: ["variantSubCategory"],
    errorMessage: { required: { variantSubCategory: "Falta la propiedad: variantSubCategory para esta subCategory" } }
  },
};

const validateStoreProduct = ajv.compile(storeProductValidationWithConditions);

export const isValidStoreProduct = (product) => {
  try {
    const isValid = validateStoreProduct(product);
    if (!isValid) {
      throw new Error(
        validateStoreProduct.errors[0]?.message || "Error de validación"
      );
    }
  } catch (error) {
    throw error;
  }
};
