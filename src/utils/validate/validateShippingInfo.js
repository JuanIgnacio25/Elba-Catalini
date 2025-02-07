import { Type } from "@sinclair/typebox";
import Ajv from "ajv";
import addErrors from "ajv-errors";

const ajv = new Ajv({allErrors:true, errorsLimit: 5})
  .addKeyword("kind")
  .addKeyword("modifier");
addErrors(ajv);

const shippingInfoSchema = Type.Object(
  {
    address: Type.String({
      minLength: 2,
      errorMessage: {
        type: "Address debe ser un String",
        minLength: "Address debe tener más de un carácter",
      },
    }),
    location: Type.String({
      minLength: 2,
      errorMessage: {
        type: "Location debe ser un String",
        minLength: "Location debe tener más de un carácter",
      },
    }),
  },
  {
    additionalProperties: false,
    errorMessage: {
      additionalProperties: "No debe tener propiedades adicionales",
      required: {
        address: "Falta la propiedad: address",
        location: "Falta la propiedad: location",
      },
    },
  }
);

const validateShippingInfo = ajv.compile(shippingInfoSchema);

export const isValidShippingInfo = (data) => {
  try {
    const isValid = validateShippingInfo(data);
    if (!isValid) {
      throw new Error(validateShippingInfo.errors[0]?.message || "Error de validación");
    }
  } catch (error) {
    throw error;
  }
};