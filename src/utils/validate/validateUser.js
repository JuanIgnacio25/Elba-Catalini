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
    companyName: Type.String({
      minLength: 2,
      errorMessage: {
        type: "companyName debe ser un String",
        minLength: "La razon social debe tener más de un carácter",
      },
    }),
    cuit: Type.String({
      pattern: "^[0-9]+$",
      minLength:10,
      maxLength:11,
      errorMessage: {
        type: "El CUIT debe ser un String",
        pattern: "El CUIT solo debe contener números",
        minLength: "El CUIT debe tener entre 10 y 11 caracteres",
        maxLength: "El CUIT debe tener entre 10 y 11 caracteres",
      },
    }),
    phoneNumber: Type.String({
      pattern: "^[0-9]+$",
      minLength:8,
      errorMessage: {
        type: "El Numero de Celular debe ser un String",
        pattern: "El Numero de Celular solo debe contener números",
        minLength: "El numero de celular debe tener mas de 8 caracteres",
      },
    }),
    purchasingManagerName: Type.String({
      minLength:2,
      errorMessage: {
        type: "El nombre del encargado de compras debe ser un String",
        minLength: "El nombre del encargado de compras debe tener mas de 2 caracteres",
      },
    }),
    location: Type.String({
      minLength:2,
      errorMessage: {
        type: "La localidad y provincia debe ser un String",
        minLength: "La localidad y provincia debe tener mas de 2 caracteres",
      },
    }),
    address: Type.String({
      minLength:2,
      errorMessage: {
        type: "La direccion debe ser un String",
        minLength: "La direccion debe tener mas de 2 caracteres",
      },
    }),
    carrier: Type.String({
      minLength:2,
      errorMessage: {
        type: "El transporte debe ser un String",
        minLength: "El transporte debe tener mas de 2 caracteres",
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
      /* throw new Error(ajv.errorsText(validateSignup.errors)); */
      const errors = validateSignup.errors.map((error) => error.message);
      throw new Error(errors.join(", "));
    }
  } catch (error) {
    throw error;
  }
};
