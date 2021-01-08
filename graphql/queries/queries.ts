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
