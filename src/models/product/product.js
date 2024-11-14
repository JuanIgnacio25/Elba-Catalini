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
      minLength: [2, "El nombre debe tener almenos 2 caracteres"],
      maxLength: [80, "El nombre debe tener menos de 80 caracteres"],
    },
    sku: {
      type: String,
      required: [true, "El sku es requerido"],
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
    images: {
      type: [String],
      required: true,
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

const StoreSchema = new mongoose.Schema({
  subCategory: {
    type: String,
  },
});

const Baiml =
  Product.discriminators?.Baiml || Product.discriminator("Baiml", BaimlSchema);

const Store =
  Product.discriminators?.Store || Product.discriminator("Store", StoreSchema);

export { Product, Baiml, Store };
