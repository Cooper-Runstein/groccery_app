/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getItem = /* GraphQL */ `
  query GetItem($id: ID!) {
    getItem(id: $id) {
      id
      name
      description
      quantity
      crossed
      list {
        id
        name
        members
        items {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const listItems = /* GraphQL */ `
  query ListItems(
    $filter: ModelItemFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listItems(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        quantity
        crossed
        list {
          id
          name
          members
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getList = /* GraphQL */ `
  query GetList($id: ID!) {
    getList(id: $id) {
      id
      name
      members
      items {
        items {
          id
          name
          description
          quantity
          crossed
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listLists = /* GraphQL */ `
  query ListLists(
    $filter: ModelListFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listLists(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        members
        items {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getHousehold = /* GraphQL */ `
  query GetHousehold($id: ID!) {
    getHousehold(id: $id) {
      id
      members
      createdAt
      updatedAt
    }
  }
`;
export const listHouseholds = /* GraphQL */ `
  query ListHouseholds(
    $filter: ModelHouseholdFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listHouseholds(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        members
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
