import mongoose from "mongoose";

const clothes = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  images: {
    type: Array,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Categories",
    required: true,
  },
  composition: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  genderId: {
    type: String,
    required: true,
  },
});

export default mongoose.models.Clothes || mongoose.model("Clothes", clothes);
