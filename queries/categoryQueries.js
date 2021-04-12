import gql from "graphql-tag";

export const CategoriesQuery = gql`
  query {
    categories {
      name
      image
      _id
    }
  }
`;

export const CategoryByIdQuery = gql`
  query($id: ID!) {
    categoryById(id: $id) {
      name
    }
  }
`;
