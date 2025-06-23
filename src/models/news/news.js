import mongoose from "mongoose";
import AutoIncrementFactory from "mongoose-sequence";

const AutoIncrement = AutoIncrementFactory(mongoose.connection);

const newsSchema = new mongoose.Schema({
  newId: {
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

newsSchema.plugin(AutoIncrement, { inc_field: "newId" });

export default mongoose.models.news || mongoose.model("news", newsSchema);