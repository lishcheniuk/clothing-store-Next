import gql from "graphql-tag";

export const CategoryEditMutation = gql`
  mutation($payload: CategoryInput!) {
    categoryEdit(payload: $payload) {
      message
    }
  }
`;

export const CategoryDeleteMutation = gql`
  mutation($id: ID!) {
    categoryDelete(id: $id) {
      message
    }
  }
`;

export const CategoryCreateMutation = gql`
  mutation($title: String!, $image: String!) {
    categoryCreate(title: $title, image: $image) {
      message
    }
  }
`;
