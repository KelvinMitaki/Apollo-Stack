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
