import mongoose from "@/libs/mongodb";
import AutoIncrementFactory from "mongoose-sequence";

const AutoIncrement = AutoIncrementFactory(mongoose.connection);

const temporalUsersSchema = new mongoose.Schema({
  temporalUserId: {
    type: Number,
    unique: true,
  },
  fullname: {
    type: String,
    required: [true, "El nombre es requerido"],
    minLength: [3, "El nombre debe tener almenos 3 caracteres"],
    maxLength: [50, "El nombre debe tener menos de 50 caracteres"],
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
