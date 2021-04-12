import Pages from "./model";

export function getPages() {
  return Pages.find();
}

export const getPage = (path) => {
  return Pages.findOne({ path });
};

export const editMetaPage = async ({ _id, title, description }) => {
  try {
    await Pages.findByIdAndUpdate(_id, { title, description });

    return { message: "Changed page" };
  } catch (e) {
    return { message: "No changed page" };
  }
};
