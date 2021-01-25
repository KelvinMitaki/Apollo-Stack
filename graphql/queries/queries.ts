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
  query FetchAgentProperties(
    $type: String
    $category: String
    $location: String
    $minPrice: Int
    $maxPrice: Int
    $bedrooms: Int
    $bathrooms: Int
    $furnished: Boolean
    $offset: Int!
    $limit: Int!
  ) {
    fetchAgentProperties(
      values: {
        type: $type
        category: $category
        location: $location
        minPrice: $minPrice
        maxPrice: $maxPrice
        bedrooms: $bedrooms
        bathrooms: $bathrooms
        furnished: $furnished
      }
      offset: $offset
      limit: $limit
    ) {
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
  query FilterProperties(
    $filter: String
    $type: String
    $category: String
    $location: String
    $minPrice: Int
    $maxPrice: Int
    $bedrooms: Int
    $bathrooms: Int
    $furnished: Boolean
    $offset: Int!
    $limit: Int!
  ) {
    filterProperties(
      filter: $filter
      values: {
        type: $type
        category: $category
        location: $location
        minPrice: $minPrice
        maxPrice: $maxPrice
        bedrooms: $bedrooms
        bathrooms: $bathrooms
        furnished: $furnished
      }
      offset: $offset
      limit: $limit
    ) {
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
  query FilterPropertiesCount(
    $filter: String
    $type: String
    $category: String
    $location: String
    $minPrice: Int
    $maxPrice: Int
    $bedrooms: Int
    $bathrooms: Int
    $furnished: Boolean
  ) {
    filterPropertiesCount(
      filter: $filter
      values: {
        type: $type
        category: $category
        location: $location
        minPrice: $minPrice
        maxPrice: $maxPrice
        bedrooms: $bedrooms
        bathrooms: $bathrooms
        furnished: $furnished
      }
    ) {
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
      reference
      agent {
        firstName
        lastName
        email
        phoneNumber
        _id
      }
      category
      images
      visitor
    }
  }
`;

export const AGENT_PROPERTY_COUNT = gql`
  query AgentPropertiesCount(
    $type: String
    $category: String
    $location: String
    $minPrice: Int
    $maxPrice: Int
    $bedrooms: Int
    $bathrooms: Int
    $furnished: Boolean
  ) {
    agentPropertiesCount(
      values: {
        type: $type
        category: $category
        location: $location
        minPrice: $minPrice
        maxPrice: $maxPrice
        bedrooms: $bedrooms
        bathrooms: $bathrooms
        furnished: $furnished
      }
    ) {
      count
    }
  }
`;

export const SEARCH_PROPERTIES = gql`
  query SearchProperties(
    $type: String
    $category: String
    $location: String
    $minPrice: Int
    $maxPrice: Int
    $bedrooms: Int
    $bathrooms: Int
    $furnished: Boolean
    $offset: Int!
    $limit: Int!
  ) {
    searchProperties(
      values: {
        type: $type
        category: $category
        location: $location
        minPrice: $minPrice
        maxPrice: $maxPrice
        bedrooms: $bedrooms
        bathrooms: $bathrooms
        furnished: $furnished
      }
      offset: $offset
      limit: $limit
    ) {
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

export const FETCH_EXPIRED_LISTINGS = gql`
  query FetchExpiredListings(
    $type: String
    $category: String
    $location: String
    $minPrice: Int
    $maxPrice: Int
    $bedrooms: Int
    $bathrooms: Int
    $furnished: Boolean
    $offset: Int!
    $limit: Int!
  ) {
    fetchExpiredListings(
      values: {
        type: $type
        category: $category
        location: $location
        minPrice: $minPrice
        maxPrice: $maxPrice
        bedrooms: $bedrooms
        bathrooms: $bathrooms
        furnished: $furnished
      }
      offset: $offset
      limit: $limit
    ) {
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

export const EXPIRED_LISTINGS_COUNT = gql`
  query ExpiredListingsCount(
    $type: String
    $category: String
    $location: String
    $minPrice: Int
    $maxPrice: Int
    $bedrooms: Int
    $bathrooms: Int
  ) {
    expiredListingsCount(
      values: {
        type: $type
        category: $category
        location: $location
        minPrice: $minPrice
        maxPrice: $maxPrice
        bedrooms: $bedrooms
        bathrooms: $bathrooms
      }
    ) {
      count
    }
  }
`;

export const FETCH_LEADS = gql`
  query FetchLeads($offset: Int!, $limit: Int!) {
    fetchLeads(offset: $offset, limit: $limit) {
      createdAt
      property {
        _id
        streetAddress
      }
      fullName
      email
      phoneNumber
      message
    }
  }
`;

export const FETCH_LEADS_COUNT = gql`
  query {
    fetchLeadsCount {
      count
    }
  }
`;

export const FETCH_VIEWS_AND_LEADS_COUNT = gql`
  query {
    viewsAndLeadsCount {
      views {
        month
        count
      }
      leads {
        month
        count
      }
    }
  }
`;

export const PROPERTY_STATISTICS = gql`
  query PropertyStatistics($_id: ID!) {
    propertyStatistics(_id: $_id) {
      views {
        month
        count
      }

      leads {
        month
        count
      }
    }
  }
`;

export const PROPERTY_STATISTICS_MESSAGES = gql`
  query PropertyStatisticsMessages($_id: ID!, $offset: Int!, $limit: Int!) {
    propertyStatisticsMessages(_id: $_id, offset: $offset, limit: $limit) {
      _id
      createdAt
      email
      fullName
      message
      phoneNumber
    }
  }
`;

export const PROPERTY_STATISTICS_MESSAGES_COUNT = gql`
  query propertyStatisticsMessagesCount($_id: ID!) {
    propertyStatisticsMessagesCount(_id: $_id) {
      count
    }
  }
`;
