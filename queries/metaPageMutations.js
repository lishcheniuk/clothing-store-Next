import gql from "graphql-tag";

export const EditMetaPageMutation = gql`
  mutation($payload: PageInput!) {
    editMetaPage(payload: $payload) {
      message
    }
  }
`;
