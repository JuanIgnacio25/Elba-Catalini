import { Type } from "@sinclair/typebox";
import Ajv from "ajv";
import addErrors from "ajv-errors";

const ajv = new Ajv({ allErrors: true })
  .addKeyword("kind")
  .addKeyword("modifier");
addErrors(ajv);

const commentsDataSchema = Type.String({
  maxLength: 1500,
  errorMessage: {
    type: "Description debe ser un String",
    maxLength: "Description debe tener menos de 1500 caracteres",
  },
});

const validateCommentsData = ajv.compile(commentsDataSchema);

export const isValidCommentsData = (data) => {
  try {
    const isValid = validateCommentsData(data);
    if (!isValid) {
      throw new Error(ajv.errorsText(validateCommentsData.errors));
    }
  } catch (error) {
    throw error;
  }
};
