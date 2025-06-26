import mongoose from "mongoose";
import AutoIncrementFactory from "mongoose-sequence";

const AutoIncrement = AutoIncrementFactory(mongoose.connection);

const newsSchema = new mongoose.Schema({
  newsId: {
    type: Number,
    unique: true,
  },
  order: {
    type: Number,
    required: true,
  },
  productId: {
    type: Number,
    required: true,
    ref: "Product",
  },
});

newsSchema.plugin(AutoIncrement, { inc_field: "newsId" });

export default mongoose.models.News || mongoose.model("News", newsSchema);