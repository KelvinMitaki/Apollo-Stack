import { gql } from "@apollo/client";

export const FETCH_CURRENT_USER = gql`
  query {
    currentUser {
      _id
      firstName
      lastName
      email
      phoneNumber
      isAgent
    }
  }
`;

export const LOGOUT_USER = gql`
  query {
    logoutUser {
      email
    }
  }
`;

export const FETCH_PROPERTIES = gql`
  query {
    fetchProperties {
      _id
      reference
      images
      category
      streetAddress
      price
      bedrooms
      bathrooms
      type
      status
      updatedAt
    }
  }
`;
