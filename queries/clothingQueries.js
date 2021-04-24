import gql from "graphql-tag";

export const ClothingQuery = gql`
  query {
    allClothing {
      name
      price
      _id
      images
      categoryId {
        _id
        name
      }
    }
  }
`;

export const ClothingByCategoryIdQuery = gql`
  query($id: ID!) {
    clothingByCategoryId(id: $id) {
      name
      images
      _id
      price
      categoryId {
        name
      }
    }
  }
`;

export const ClothingByIdQuery = gql`
  query($id: ID) {
    clothingById(id: $id) {
      name
      price
      _id
      images
      color
      composition
    }
  }
`;

export const ClothingChartQuery = gql`
  query {
    allClothing {
      name
      _id
      categoryId {
        name
        _id
      }
    }
  }
`;

export const ClothingAdminQuery = gql`
  query {
    allClothing {
      name
      price
      _id
      images
      composition
      genderId
      color
      categoryId {
        name
        _id
      }
    }
  }
`;
