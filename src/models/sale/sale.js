import mongoose from "mongoose";
import AutoIncrementFactory from "mongoose-sequence";

const AutoIncrement = AutoIncrementFactory(mongoose.connection);

const saleSchema = new mongoose.Schema({
  image: {
    type: Object,
    required: true,
  },
});

saleSchema.plugin(AutoIncrement, { inc_field: "saleId" });

export default mongoose.models.sale || mongoose.model("sale", saleSchema);
