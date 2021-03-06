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

export const ADD_PROPERTY = gql`
  mutation AddProperty(
    $reference: Int!
    $location: String!
    $streetAddress: String!
    $category: String!
    $price: Int!
    $bedrooms: Int!
    $bathrooms: Int!
    $type: String!
    $status: String!
    $heading: String!
    $description: String!
    $expiryDate: String!
    $images: [String!]!
    $parkingLots: Int
    $plinthArea: Int
    $lotArea: Int
    $furnished: Boolean
    $petFriendly: Boolean
    $garden: Boolean
    $serviceCharge: Int
    $repossessed: Boolean
    $onAuction: Boolean
    $auctionDate: String
    $auctionVenue: String
  ) {
    addProperty(
      values: {
        reference: $reference
        location: $location
        streetAddress: $streetAddress
        category: $category
        price: $price
        bedrooms: $bedrooms
        bathrooms: $bathrooms
        type: $type
        status: $status
        heading: $heading
        description: $description
        expiryDate: $expiryDate
        images: $images
        parkingLots: $parkingLots
        plinthArea: $plinthArea
        lotArea: $lotArea
        furnished: $furnished
        petFriendly: $petFriendly
        garden: $garden
        serviceCharge: $serviceCharge
        repossessed: $repossessed
        onAuction: $onAuction
        auctionDate: $auctionDate
        auctionVenue: $auctionVenue
      }
    ) {
      _id
      reference
    }
  }
`;

export const EDIT_PROPERTY = gql`
  mutation EditProperty(
    $_id: ID!
    $location: String
    $streetAddress: String
    $category: String
    $price: Int
    $bedrooms: Int
    $bathrooms: Int
    $heading: String
    $description: String
    $expiryDate: String
    $images: [String!]
    $parkingLots: Int
    $plinthArea: Int
    $lotArea: Int
    $furnished: Boolean
    $petFriendly: Boolean
    $garden: Boolean
    $serviceCharge: Int
    $repossessed: Boolean
    $onAuction: Boolean
    $auctionDate: String
    $auctionVenue: String
    $status: String
  ) {
    editProperty(
      values: {
        _id: $_id
        location: $location
        streetAddress: $streetAddress
        category: $category
        price: $price
        bedrooms: $bedrooms
        bathrooms: $bathrooms
        heading: $heading
        description: $description
        expiryDate: $expiryDate
        images: $images
        parkingLots: $parkingLots
        plinthArea: $plinthArea
        lotArea: $lotArea
        furnished: $furnished
        petFriendly: $petFriendly
        garden: $garden
        serviceCharge: $serviceCharge
        repossessed: $repossessed
        onAuction: $onAuction
        auctionDate: $auctionDate
        auctionVenue: $auctionVenue
        status: $status
      }
    ) {
      _id
      reference
      location
      streetAddress
      category
      price
      bedrooms
      bathrooms
      type
      status
      heading
      description
      expiryDate
      images
      parkingLots
      plinthArea
      lotArea
      furnished
      petFriendly
      garden
      serviceCharge
      repossessed
      onAuction
      auctionDate
      auctionVenue
      createdAt
      updatedAt
    }
  }
`;

export const EDIT_PROFILE = gql`
  mutation EditProfile(
    $email: String!
    $firstName: String!
    $lastName: String!
    $phoneNumber: Int!
  ) {
    editProfile(
      values: {
        email: $email
        firstName: $firstName
        lastName: $lastName
        phoneNumber: $phoneNumber
      }
    ) {
      email
      phoneNumber
      firstName
      lastName
      _id
    }
  }
`;

export const UPDATE_EXPIRED_LISTINGS = gql`
  mutation UpdateExpiredListings(
    $values: [ExpiredListingsID!]!
    $expiryDate: Boolean
    $mark: Boolean
    $withdraw: Boolean
  ) {
    updateExpiredListings(
      values: $values
      expiryDate: $expiryDate
      mark: $mark
      withdraw: $withdraw
    ) {
      _id
    }
  }
`;

export const CREATE_LEAD = gql`
  mutation CreateLead(
    $email: String!
    $fullName: String!
    $phoneNumber: Int!
    $message: String!
    $property: String!
    $agent: String!
  ) {
    createLead(
      values: {
        email: $email
        fullName: $fullName
        phoneNumber: $phoneNumber
        message: $message
        property: $property
        agent: $agent
      }
    ) {
      _id
    }
  }
`;
