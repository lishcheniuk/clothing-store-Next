import mongoose from "mongoose";

const categories = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

export default mongoose.models.Categories ||
  mongoose.model("Categories", categories);
