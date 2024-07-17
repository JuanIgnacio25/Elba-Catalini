import mongoose from "@/libs/mongodb";
import { Schema } from "mongoose";
import AutoIncrementFactory from "mongoose-sequence";

const AutoIncrement = AutoIncrementFactory(mongoose.connection);

const cartSchema = new mongoose.Schema({
  cartId: {
    type: Number,
    unique: true,
  },
  products: { type: [{ type: Schema.Types.Mixed }], default: [] },
});

cartSchema.plugin(AutoIncrement, { inc_field: "cartId" });

export default mongoose.models.cart || mongoose.model("cart", cartSchema);
