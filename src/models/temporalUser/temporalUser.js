import mongoose from "@/libs/mongodb";
import AutoIncrementFactory from "mongoose-sequence";

const AutoIncrement = AutoIncrementFactory(mongoose.connection);

const temporalUsersSchema = new mongoose.Schema({
  temporalUserId: {
    type: Number,
    unique: true,
  },
  companyName: {
    type: String,
    required: [true, "El nombre es requerido"],
    minLength: [3, "El nombre debe tener almenos 3 caracteres"],
    maxLength: [50, "El nombre debe tener menos de 50 caracteres"],
  },
  cuit: {
    type: String,
    required: [true, "El cuit es requerido"],
    minLength: [3, "El cuit debe tener almenos 3 caracteres"],
    maxLength: [15, "El cuit debe tener menos de 15 caracteres"],
  },
  phoneNumber: {
    type: String,
    required: [true, "El numero de telefono es requerido"],
    minLength: [3, "El numero de telefono debe tener almenos 3 caracteres"],
    maxLength: [50, "El nombre debe tener menos de 50 caracteres"],
  },
  purchasingManagerName: {
    type: String,
    required: [true, "El nombre del encargado de compras es requerido"],
    minLength: [2, "El nombre del encargado de compras debe tener almenos 2 caracteres"],
    maxLength: [25, "El nombre del encargado de compras debe tener menos de 25 caracteres"],
  },
  location: {
    type: String,
    required: [true, "La localidad es requerida"],
    minLength: [3, "La localidad debe tener almenos 3 caracteres"],
    maxLength: [25, "La localidad tener menos de 25 caracteres"],
  },
  address: {
    type: String,
    required: [true, "La direccion es requerida"],
    minLength: [3, "La direccion debe tener almenos 3 caracteres"],
    maxLength: [25, "La direccion tener menos de 25 caracteres"],
  },
  carrier: {
    type: String,
    required: [true, "El transporte es requerido"],
    minLength: [3, "El transporte debe tener almenos 3 caracteres"],
    maxLength: [25, "El transporte tener menos de 25 caracteres"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "El email es requerido"],
  },
  password: {
    type: String,
    required: [true, "La contraseña es requerida"],
    select: false,
  },
  verificationToken: {
    type: String,
    required: [true, "Debe tener un token de validacion"],
  },
}, {timestamps:true});

temporalUsersSchema.plugin(AutoIncrement, { inc_field: "temporalUserId" });
temporalUsersSchema.index(
  { createdAt: 1 },
  { expireAfterSeconds: 3600 }
);

export default mongoose.models.temporalUsers ||
  mongoose.model("temporalUsers", temporalUsersSchema);
