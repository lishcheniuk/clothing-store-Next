import gql from "graphql-tag";

export const SignInMutation = gql`
  mutation($username: String!, $password: String!) {
    signIn(input: { username: $username, password: $password }) {
      username
      id
    }
  }
`;

export const ViewerQuery = gql`
  query {
    viewer {
      username
      id
    }
  }
`;
