import gql from "graphql-tag";

export const MetaPageQuery = gql`
  query($path: String!) {
    metaPage(path: $path) {
      title
      description
      _id
    }
  }
`;

export const AllMetaPagesQuery = gql`
  query {
    allMetaPages {
      title
      description
      _id
      path
    }
  }
`;
