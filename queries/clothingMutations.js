import gql from "graphql-tag";

export const EditClothingMutation = gql`
  mutation($payload: ClothingInput!) {
    editClothing(payload: $payload) {
      message
    }
  }
`;

export const AddClothingMutation = gql`
  mutation($payload: ClothingInput!) {
    addClothing(payload: $payload) {
      message
    }
  }
`;

export const DeleteClothingMutation = gql`
  mutation($id: String!) {
    deleteClothing(id: $id) {
      message
    }
  }
`;
