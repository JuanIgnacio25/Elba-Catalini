import { Type } from "@sinclair/typebox";
import Ajv from "ajv";
import addErrors from "ajv-errors";

const ajv = new Ajv({ allErrors: true })
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
        type: "Unit debe ser String"
      }
    }),
    productSet: Type.Number({
      errorMessage: {
        type: "ProductSet debe ser un Number"
      }
    })
  },
  {
    additionalProperties: false,
    errorMessage: {
      additionalProperties: 'No debe tener propiedades adicionales',
      required: {
        name: "Falta la propiedad: name",
        category: "Falta la propiedad: category",
        description: "Falta la propiedad: description",
        unit: "Falta la propiedad: unit",
        productSet: "Falta la propiedad: productSet"
      }
    }
  }
);

const validateBaimlProduct = ajv.compile(baimlProductDtoSchema);

export const isValidBaimlProduct = (product) => {
  try {
    const isValid = validateBaimlProduct(product);
    if(!isValid){
      throw new Error(ajv.errorsText(validateBaimlProduct.errors));
    }
  } catch (error) {
    throw error;
  }
}