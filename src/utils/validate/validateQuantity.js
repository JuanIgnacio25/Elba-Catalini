import { Type } from "@sinclair/typebox";
import Ajv from "ajv";
import addErrors from "ajv-errors";

const ajv = new Ajv({ allErrors: true });
addErrors(ajv);

const quantitySchema = Type.Number({
  minimum: 1,
  maximum: 999999,
  errorMessage: {
    type: "Quantity debe ser un número.",
    minimum: "Quantity no puede ser menor a 1.",
    maximum: "Quantity no puede ser mayor a 999999."
  }
});

const validateQuantitySchema = ajv.compile(quantitySchema);

const validateQuantity = (quantity) => {
  try {

    const quantityValue = typeof quantity === 'string' ? parseInt(quantity, 10) : quantity;

    const isValid = validateQuantitySchema(quantityValue);
    if (!isValid) {
      return false;
    }

    return true;
  } catch (error) {
    throw error;
  }
};

export default validateQuantity;