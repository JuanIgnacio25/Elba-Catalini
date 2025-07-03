import mongoose from "mongoose";
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
    nameForOrders: {
      type: String,
      required: [true, "El nombre para pedidos es requerido"],
      minLength: [2, "El nombre para pedidos debe tener almenos 2 caracteres"],
      maxLength: [80, "El nombre para pedidos debe tener menos de 80 caracteres"],
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
      type: [Object],
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
  isElectronic: {
    type: Boolean,
    default: false,
  }
});

const StoreSchema = new mongoose.Schema({
  subCategory: {
    type: String,
  },
  variantSubCategory: {
    type: String,
    required: function () {
      return ["Cables TPR", "Enchufes"].includes(this.subCategory);
    },
  },
});

const Baiml =
  Product.discriminators?.Baiml || Product.discriminator("Baiml", BaimlSchema);

const Store =
  Product.discriminators?.Store || Product.discriminator("Store", StoreSchema);

export { Product, Baiml, Store };
