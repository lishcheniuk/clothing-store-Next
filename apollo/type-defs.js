import { gql } from "@apollo/client";

export const typeDefs = gql`
  scalar Date

  type Category {
    name: String!
    image: String
    _id: ID!
  }

  input CategoryInput {
    id: ID!
    field: String!
    value: String!
  }

  type ClothingItem {
    _id: ID!
    name: String!
    price: String!
    color: String!
    composition: String!
    genderId: String!
    images: [String!]!
    categoryId: Category
  }

  type MessageResponse {
    message: String!
  }

  input ClothingInput {
    _id: ID
    name: String!
    price: String!
    color: String!
    composition: String!
    genderId: String!
    categoryId: String!
    images: [String!]!
  }

  type User {
    id: ID!
    username: String!
    createdAt: Date!
  }

  input SignInInput {
    username: String!
    password: String!
  }

  type Page {
    _id: ID!
    title: String!
    path: String
    description: String!
  }

  input PageInput {
    _id: ID!
    title: String!
    description: String!
  }

  type Query {
    clothingById(id: ID!): ClothingItem
    categories: [Category]!
    categoryById(id: ID!): Category!
    clothingByCategoryId(id: ID!): [ClothingItem]!
    allClothing: [ClothingItem]!
    viewer: User!
    pages: [Page!]!
    metaPage(path: String!): Page!
    allMetaPages: [Page!]!
  }

  type Mutation {
    signIn(input: SignInInput!): User!
    signUp(input: SignInInput!): User!
    editClothing(payload: ClothingInput!): MessageResponse!
    addClothing(payload: ClothingInput!): MessageResponse!
    deleteClothing(id: String!): MessageResponse!
    editMetaPage(payload: PageInput!): MessageResponse!
    categoryEdit(payload: CategoryInput!): MessageResponse!
    categoryDelete(id: ID!): MessageResponse!
    categoryCreate(title: String!, image: String!): MessageResponse!
  }
`;
