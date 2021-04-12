import { dbRequest } from "../utils/mongodb";
import {
  getCategories,
  getCategoryById,
  createCategory,
  deleteCategory,
  editCategory,
} from "../models/categories/requests";
import {
  getAllClothing,
  getClothingById,
  getClothingByCategoryId,
  editClothing,
  addClothing,
  deleteClothing,
} from "../models/clothes/requests";
import { createUser, signIn, autoSignIn } from "../models/users/requests";
import { getPages, getPage, editMetaPage } from "../models/pages/requests";

export const resolvers = {
  Query: {
    clothingById: (_, { id }) => {
      try {
        return dbRequest(getClothingById.bind(null, id));
      } catch ({ message }) {
        throw new Error(message);
      }
    },
    categories: () => dbRequest(getCategories),
    categoryById: (_, { id }) => getCategoryById(id),
    clothingByCategoryId: (_, { id }) => {
      try {
        return dbRequest(getClothingByCategoryId.bind(null, id));
      } catch ({ message }) {
        throw new Error(message);
      }
    },
    allClothing: () => dbRequest(getAllClothing),
    viewer: async (_, _args, ctx) => {
      const { username, _id } = await dbRequest(autoSignIn.bind(null, ctx.req));
      return { username, _id };
    },
    metaPage: (_parent, { path }) => {
      return dbRequest(getPage.bind(null, path));
    },
    allMetaPages: () => dbRequest(getPages),
  },
  Mutation: {
    signIn: async (_, args, context) => {
      const { username, _id, createdAt } = await dbRequest(
        signIn.bind(null, context.res, args.input)
      );
      return { username, _id, createdAt };
    },

    signUp(_, { input }) {
      return dbRequest(createUser.bind(null, input));
    },
    editClothing(_, { payload }) {
      return dbRequest(editClothing.bind(null, payload));
    },
    addClothing(_, { payload }) {
      return dbRequest(addClothing.bind(null, payload));
    },
    deleteClothing(_, { id }) {
      return dbRequest(deleteClothing.bind(null, id));
    },
    editMetaPage(_, { payload }) {
      return dbRequest(editMetaPage.bind(null, payload));
    },
    categoryEdit(_, { payload }) {
      return dbRequest(editCategory.bind(null, payload));
    },
    categoryDelete(_, { id }) {
      return dbRequest(deleteCategory.bind(null, id));
    },
    categoryCreate(_, { title, image }) {
      return dbRequest(createCategory.bind(null, title, image));
    },
  },

  User: {
    id: (obj) => obj._id,
  },
};
