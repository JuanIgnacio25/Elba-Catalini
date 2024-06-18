import mongoose from "@/libs/mongodb";
import AutoIncrementFactory from "mongoose-sequence";

const AutoIncrement = AutoIncrementFactory(mongoose.connection);

const usersSchema = new mongoose.Schema({
  userId: {
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
  rol:{
    type:String,
    required: true
  }
});

usersSchema.plugin(AutoIncrement, { inc_field: "userId" });

export default mongoose.models.users || mongoose.model("users", usersSchema);