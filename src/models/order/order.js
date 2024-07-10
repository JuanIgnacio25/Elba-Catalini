import mongoose from "@/libs/mongodb";
import { Schema } from "mongoose";
import AutoIncrementFactory from "mongoose-sequence";

const AutoIncrement = AutoIncrementFactory(mongoose.connection);

const orderSchema = new mongoose.Schema({
  orderId: {
    type: Number,
    unique: true,
  },
  products: { type: [{ type: Schema.Types.Mixed }] },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

orderSchema.plugin(AutoIncrement, { inc_field: "orderId" });

export default mongoose.models.order || mongoose.model("order", orderSchema);
