import mongoose from "mongoose";
import AutoIncrementFactory from "mongoose-sequence";

const AutoIncrement = AutoIncrementFactory(mongoose.connection);

const brandsSchema = new mongoose.Schema({
  brandId: {
    type: Number,
    unique: true,
  },
  name: {
    type: String,
    required: true
  },
  order: {
    type: Number,
    required: true
  },
  image: {
    type: Object,
    required: true,
  },
});

brandsSchema.plugin(AutoIncrement, { inc_field: "brandId" });

export default mongoose.models.brands || mongoose.model("brands", brandsSchema);
