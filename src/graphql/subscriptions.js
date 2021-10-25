/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateItem = /* GraphQL */ `
  subscription OnCreateItem {
    onCreateItem {
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
export const onUpdateItem = /* GraphQL */ `
  subscription OnUpdateItem {
    onUpdateItem {
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
export const onDeleteItem = /* GraphQL */ `
  subscription OnDeleteItem {
    onDeleteItem {
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
export const onCreateList = /* GraphQL */ `
  subscription OnCreateList {
    onCreateList {
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
export const onUpdateList = /* GraphQL */ `
  subscription OnUpdateList {
    onUpdateList {
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
export const onDeleteList = /* GraphQL */ `
  subscription OnDeleteList {
    onDeleteList {
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
export const onCreateHousehold = /* GraphQL */ `
  subscription OnCreateHousehold {
    onCreateHousehold {
      id
      members
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateHousehold = /* GraphQL */ `
  subscription OnUpdateHousehold {
    onUpdateHousehold {
      id
      members
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteHousehold = /* GraphQL */ `
  subscription OnDeleteHousehold {
    onDeleteHousehold {
      id
      members
      createdAt
      updatedAt
    }
  }
`;
