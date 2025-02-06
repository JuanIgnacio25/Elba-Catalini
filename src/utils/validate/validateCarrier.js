import { Type } from "@sinclair/typebox";
import Ajv from "ajv";
import addErrors from "ajv-errors";

const ajv = new Ajv()
  .addKeyword("kind")
  .addKeyword("modifier");
addErrors(ajv);

const carrierDataSchema = Type.String({
  minLength: 2,
  errorMessage: {
    type: "Carrier debe ser un String",
    minLength: "Carrier debe tener más de un carácter",
  },
});

const validateCarrierData = ajv.compile(carrierDataSchema);

export const isValidCarrier = (data) => {
  try {
    const isValid = validateCarrierData(data);
    if (!isValid) {
      throw new Error(ajv.errorsText(validateCarrierData.errors));
    }
  } catch (error) {
    throw error;
  }
};
