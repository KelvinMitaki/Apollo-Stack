import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      token
    }
  }
`;

export const REGISTER_USER = gql`
  mutation RegisterUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    registerUser(
      values: {
        email: $email
        password: $password
        firstName: $firstName
        lastName: $lastName
      }
    ) {
      email
      firstName
      lastName
      _id
    }
  }
`;

export const REGISTER_AGENT = gql`
  mutation RegisterAgent(
    $email: String!
    $password: String!
    $firstName: String!
    $lastName: String!
    $phoneNumber: Int!
    $address: String!
  ) {
    registerAgent(
      values: {
        email: $email
        password: $password
        firstName: $firstName
        lastName: $lastName
        phoneNumber: $phoneNumber
        address: $address
      }
    ) {
      email
      firstName
      lastName
      _id
    }
  }
`;
