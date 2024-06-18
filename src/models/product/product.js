import mongoose from "@/libs/mongodb";
import AutoIncrementFactory from "mongoose-sequence";

const AutoIncrement = AutoIncrementFactory(mongoose.connection);

const options = { discriminatorKey: "kind" };

const ProductSchema = new mongoose.Schema(
  {
    productId: {
      type: Number,
      unique: true,
    },
    name: {
      type: String,
      required: [true, "El nombre es requerido"],
      minLength: [3, "El nombre debe tener almenos 3 caracteres"],
      maxLength: [50, "El nombre debe tener menos de 50 caracteres"],
    },
    category: {
      type: String,
      required: [true, "La categoria es requerido"],
    },

    description: {
      type: String,
      required: [true, "La descripcion del producto es requerida"],
    },
    unit: {
      type: String,
      required: [true, "La unidad es requerida"],
    },
  },
  options
);

ProductSchema.plugin(AutoIncrement, { inc_field: "productId" });

const Product =
  mongoose.models.Product || mongoose.model("Product", ProductSchema);

const BaimlSchema = new mongoose.Schema({
  productSet: {
    type: Number,
  },
});

const Baiml =
  Product.discriminators?.Baiml || Product.discriminator("Baiml", BaimlSchema);

export { Product, Baiml };
