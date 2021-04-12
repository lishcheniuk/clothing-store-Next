import Clothes from "./model";
import fs from "fs";

export const getClothingById = (id) => {
  return Clothes.findById(id);
};

export const getClothingByCategoryId = (id) => {
  return Clothes.find({ categoryId: id }).populate("categoryId", "name");
};

export const getAllClothing = () => {
  return Clothes.find().populate({ path: "categoryId", select: "name _id" });
};

export const editClothing = async (payload) => {
  await Clothes.findByIdAndUpdate(payload._id, payload);
  return { message: "Clothing changed" };
};

export const addClothing = async (payload) => {
  const newClothing = new Clothes(payload);
  newClothing.save();
  return { message: "Clothing added" };
};

export const deleteClothing = async (id) => {
  await Clothes.deleteOne({ _id: id });
  return { message: "Clothing deleted" };
};
