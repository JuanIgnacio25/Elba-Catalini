import { Type } from "@sinclair/typebox";
import Ajv from "ajv";
import addErrors from "ajv-errors";
import addFormats from "ajv-formats";

const ajv = new Ajv({allErrors:true, errorsLimit: 5})
  .addKeyword("kind")
  .addKeyword("modifier");
addFormats(ajv, ["email"]);
addErrors(ajv);

const contactDataSchema = Type.Object(
  {
    fullName: Type.String({
      minLength: 2,
      errorMessage: {
        type: "FullName debe ser un String",
        minLength: "FullName debe tener más de un carácter",
      },
    }),
    company: Type.String({
      minLength: 2,
      errorMessage: {
        type: "Company debe ser un String",
      },
    }),
    location: Type.String({
      minLength:2,
      errorMessage: {
        type: "Location debe ser un String",
      },
    }),
    email: Type.String({
      format: "email",
      errorMessage: {
        type: "Email debe ser un String",
        format: "El formato debe ser de tipo email"
      },
    }),
    message: Type.String({
      minLength:2,
      errorMessage: {
        type: "Description debe ser un String",
      },
    }),
  },
  {
    additionalProperties: false,
    errorMessage: {
      additionalProperties: "No debe tener propiedades adicionales",
      required: {
        fullName: "Falta la propiedad: fullName",
        company:"Falta la propiedad company",
        location: "Falta la propiedad: location",
        email:"Falta la propiedad: email",
        message: "Falta la propiedad: message",
      },
    },
  }
);

const validateContactData = ajv.compile(contactDataSchema);

export const isValidContactData = (data) => {
  try {
    const isValid = validateContactData(data);
    if (!isValid) {
      throw new Error(validateContactData.errors[0]?.message || "Error de validación");
    }
  } catch (error) {
    throw error;
  }
};