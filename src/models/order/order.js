import mongoose from "mongoose";
import { Schema } from "mongoose";
import AutoIncrementFactory from "mongoose-sequence";

const AutoIncrement = AutoIncrementFactory(mongoose.connection);

const orderSchema = new mongoose.Schema({
  orderId: {
    type: Number,
    unique: true,
  },
  userId: { type: Number, required: [true, "El id del usuario es requerido"] },
  products: { type: [{ type: Schema.Types.Mixed }] },
  carrier: { type: String, required: [true, "El transportista es requerido"] },
  address: { type: String, required: [true, "La dirección es requerida"] },
  location: { type: String, required: [true, "La localidad es requerida"] },
  comments: { type: String },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

orderSchema.plugin(AutoIncrement, { inc_field: "orderId" });

export default mongoose.models.order || mongoose.model("order", orderSchema);
