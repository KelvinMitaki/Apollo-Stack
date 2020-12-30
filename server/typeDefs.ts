import { gql } from "apollo-server";

export const typeDefs = gql`
  type Query {
    users: [User!]!
  }

  type User {
    _id: ID!
    fullName: String!
    email: String!
    password: String!
  }
`;
