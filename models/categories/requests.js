import Categories from "./model";

export const getCategories = async () => {
  return Categories.find();
};

export const getCategoryById = (id) => {
  return Categories.findById(id);
};

export const createCategory = async (name, image) => {
  await new Categories({ name, image }).save();
  return { message: "Category created" };
};

export const editCategory = async (payload) => {
  await Categories.findByIdAndUpdate(payload.id, {
    [payload.field]: payload.value,
  });
  return { message: "Category changed" };
};

export const deleteCategory = async (id) => {
  await Categories.deleteOne({ _id: id });
  return { message: "Category deleted" };
};
