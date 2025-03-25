import { Type } from "@sinclair/typebox";
import Ajv from "ajv";
import addFormats from "ajv-formats";
import addErrors from "ajv-errors";

const ajv = new Ajv({allErrors:true, errorsLimit: 5})
  .addKeyword("kind")
  .addKeyword("modifier");
addFormats(ajv, ["email"]);
addErrors(ajv);

const emailDtoSchema = Type.String({
  format: "email",
  errorMessage: {
    type: "El email debe ser un String",
    format: "El formato debe ser de tipo email",
  },
});

const validateEmail = ajv.compile(emailDtoSchema);

const isValidEmail = (email) => {
  try {
    const valid = validateEmail(email);
    if (!valid) throw new Error(validateEmail.errors[0]?.message || "Error de validación");
  } catch (error) {
    throw error;
  }
};

export default isValidEmail;
