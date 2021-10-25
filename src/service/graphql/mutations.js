/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createItem = /* GraphQL */ `
  mutation CreateItem(
    $input: CreateItemInput!
    $condition: ModelItemConditionInput
  ) {
    createItem(input: $input, condition: $condition) {
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
export const updateItem = /* GraphQL */ `
  mutation UpdateItem(
    $input: UpdateItemInput!
    $condition: ModelItemConditionInput
  ) {
    updateItem(input: $input, condition: $condition) {
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
export const deleteItem = /* GraphQL */ `
  mutation DeleteItem(
    $input: DeleteItemInput!
    $condition: ModelItemConditionInput
  ) {
    deleteItem(input: $input, condition: $condition) {
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
export const createList = /* GraphQL */ `
  mutation CreateList(
    $input: CreateListInput!
    $condition: ModelListConditionInput
  ) {
    createList(input: $input, condition: $condition) {
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
export const updateList = /* GraphQL */ `
  mutation UpdateList(
    $input: UpdateListInput!
    $condition: ModelListConditionInput
  ) {
    updateList(input: $input, condition: $condition) {
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
export const deleteList = /* GraphQL */ `
  mutation DeleteList(
    $input: DeleteListInput!
    $condition: ModelListConditionInput
  ) {
    deleteList(input: $input, condition: $condition) {
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
export const createHousehold = /* GraphQL */ `
  mutation CreateHousehold(
    $input: CreateHouseholdInput!
    $condition: ModelHouseholdConditionInput
  ) {
    createHousehold(input: $input, condition: $condition) {
      id
      members
      createdAt
      updatedAt
    }
  }
`;
export const updateHousehold = /* GraphQL */ `
  mutation UpdateHousehold(
    $input: UpdateHouseholdInput!
    $condition: ModelHouseholdConditionInput
  ) {
    updateHousehold(input: $input, condition: $condition) {
      id
      members
      createdAt
      updatedAt
    }
  }
`;
export const deleteHousehold = /* GraphQL */ `
  mutation DeleteHousehold(
    $input: DeleteHouseholdInput!
    $condition: ModelHouseholdConditionInput
  ) {
    deleteHousehold(input: $input, condition: $condition) {
      id
      members
      createdAt
      updatedAt
    }
  }
`;
