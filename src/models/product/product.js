import mongoose from "mongoose";

const options = { discriminatorKey: "kind" };

const ProductSchema = new mongoose.Schema(
  {
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

const Product =
  mongoose.models.Product || mongoose.model("Product", ProductSchema);

const BaimlSchema = new mongoose.Schema({
  set: {
    type: Number,
  },
});

const Baiml = Product.discriminators.Baiml || Product.discriminator("Baiml", BaimlSchema);

export { Product, Baiml };
