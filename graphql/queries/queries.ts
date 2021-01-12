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

export const FETCH_AGENT_PROPERTY = gql`
  query FetchAgentProperty($propertyId: String!) {
    fetchAgentProperty(propertyId: $propertyId) {
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
      homeArea
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

export const FILTER_PROPERTIES = gql`
  query FilterProperties($filter: String!) {
    filterProperties(filter: $filter) {
      _id
      images
      type
      price
      streetAddress
      location
      description
      plinthArea
      bedrooms
      bathrooms
      parkingLots
    }
  }
`;

export const FETCH_PROPERTY_DETAILS = gql`
  query FetchPropertyDetails($_id: ID!) {
    fetchPropertyDetails(_id: $_id) {
      _id
      price
      type
      createdAt
      bathrooms
      bedrooms
      parkingLots
      lotArea
      plinthArea
      heading
      description
      agent {
        firstName
        lastName
        email
        phoneNumber
      }
      category
      images
    }
  }
`;
