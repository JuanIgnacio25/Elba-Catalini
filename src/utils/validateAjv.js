import { Type } from "@sinclair/typebox";
import Ajv from "ajv";
import addFormats from "ajv-formats";
import addErrors from "ajv-errors";
import passwordValidator from "password-validator";

const validatePassword = new passwordValidator();

validatePassword
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
addFormats(ajv, ["email", "password"]);
addErrors(ajv);

const signupDtoSchema = Type.Object(
  {
    fullname: Type.String({
      errorMessage: {
        type: "El fullname debe ser un String",
      },
    }),
    email: Type.String({
      format: "email",
      errorMessage: {
        type: "El email debe ser un String",
        format: "El formato debe ser de tipo email",
      },
    }),
    password: Type.String({
      format: "password",
      errorMessage: {
        type: "La password debe ser un String",
        format: "El formato debe ser de tipo password",
      },
    }),
  },
  {
    additionalProperties: false,
    errorMessage: "No debe tener propiedades adicionales",
  }
);

const validateSignup = ajv.compile(signupDtoSchema);

export const isValidSignup = (data) => {
  try {
    if (!validatePassword.validate(data.password)) {
      const passwordErrors = validatePassword.validate(data.password, {
        list: true,
      });
      throw new Error("Formato de contraseña incorrecto");
    }
    const valid = validateSignup(data);
    if (!valid) {
      throw new Error(ajv.errorsText(validateSignup.errors));
      /* const errors = validateSignup.errors.map((error) => ({
        dataPath: error.dataPath,
        message: error.message,
      }
    ));
      console.log(errors);
      throw errors; */
    }
  } catch (error) {
    throw error;
  }
};
