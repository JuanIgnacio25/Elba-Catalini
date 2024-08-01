import { Type } from "@sinclair/typebox";
import Ajv from "ajv";
import addFormats from "ajv-formats";
import addErrors from "ajv-errors";
import passwordValidator from "password-validator";

const validatePasswordRules = new passwordValidator();

validatePasswordRules
  .is()
  .min(8)
  .is()
  .max(20)
  .has()
  .uppercase()
  .has()
  .lowercase()
  .has()
  .digits(2)
  .has()
  .symbols()
  .has()
  .not()
  .spaces();

const ajv = new Ajv({ allErrors: true })
  .addKeyword("kind")
  .addKeyword("modifier");
addFormats(ajv, ["password"]);
addErrors(ajv);

const passwordDtoSchema = Type.String({
  format: "password",
  errorMessage: {
    type: "El password debe ser un String",
    format: "El formato debe ser de tipo password",
  },
});

const validatePassword = ajv.compile(passwordDtoSchema);

const isValidPassword = (password) => {
  try {
    if (!validatePasswordRules.validate(password)) {
      const passwordErrors = validatePasswordRules.validate(password, {
        list: true,
      });
      throw new Error("Formato de contraseña incorrecto");
    }
    const valid = validatePassword(password);
    if (!valid) throw new Error(ajv.errorsText(validatePassword.errors));
  } catch (error) {
    throw error;
  }
};

export default isValidPassword;
