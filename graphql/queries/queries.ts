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

export const FETCH_AGENT_PROPERTIES = gql`
  query FetchAgentProperties($offset: Int!, $limit: Int!) {
    fetchAgentProperties(offset: $offset, limit: $limit) {
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
      expiryDate
    }
  }
`;

export const FETCH_AGENT_PROPERTY = gql`
  query FetchAgentProperty($propertyId: ID!) {
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

export const FILTER_PROPERTIES = gql`
  query FilterProperties($filter: String!, $limit: Int!, $offset: Int!) {
    filterProperties(filter: $filter, limit: $limit, offset: $offset) {
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
export const FETCH_PROPERTIES_COUNT = gql`
  query FilterPropertiesCount($filter: String!) {
    filterPropertiesCount(filter: $filter) {
      count
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
      status
      location
      streetAddress
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

export const AGENT_PROPERTY_COUNT = gql`
  query {
    agentPropertiesCount {
      count
    }
  }
`;
