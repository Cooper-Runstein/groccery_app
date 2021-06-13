import { API, graphqlOperation } from "aws-amplify";
import { listItems, listLists, getList } from "./graphql/queries";
import {
  onCreateItem,
  onDeleteItem,
  onUpdateItem,
} from "./graphql/subscriptions";
import {
  createItem,
  deleteItem as deleteItemMutation,
  updateItem as updateItemMutation,
} from "./graphql/mutations";

import { merge } from "lodash/fp";

const defaultItemPartial = {
  description: "",
  quantity: 1,
  crossed: false,
};

const createSubscription = (subscriptionFunc) => (handler) =>
  API.graphql(graphqlOperation(subscriptionFunc)).subscribe({
    next: (itemData) => {
      handler(itemData);
    },
  });

const safeRequest = async (req, ignoredErrors) => {
  try {
    return await API.graphql(req);
  } catch (errorData) {
    console.log("API ERROR CAUGHT");
    if (ignoredErrors.map((e) => e.includes(errorData.errorData))) {
      console.log("API ERROR SAFELY HANDLED");
      return;
    }

    throw errorData;
  }
};

/*
 * ITEMS
 */

export const getCreateItemSubscription = createSubscription(onCreateItem);

export const getUpdateItemSubscription = createSubscription(onUpdateItem);

export const getDeleteItemSubscription = createSubscription(onDeleteItem);

export const fetchItems = async () => {
  const itemData = await safeRequest(graphqlOperation(listItems));
  const items = itemData.data.listItems.items.map(merge(defaultItemPartial));
  return items;
};

export const addItem = async (item) =>
  await safeRequest(graphqlOperation(createItem, { input: item }));

export const deleteItem = async (id) =>
  await safeRequest(graphqlOperation(deleteItemMutation, { input: { id } }));

export const updateItem = async (input) => {
  const DNE = "DynamoDB:ConditionalCheckFailedException";
  await safeRequest(graphqlOperation(updateItemMutation, { input }), [DNE]);
};

/**
 * LISTS
 */

export const fetchListsForUser = async (email) => {
  const itemData = await safeRequest(
    graphqlOperation(listLists, {
      filter: { members: { contains: email } },
    })
  );
  const lists = itemData.data.listLists.items;
  return lists;
};

export const fetchList = async (id) => {
  const itemData = await safeRequest(graphqlOperation(getList, { id }));
  const list = itemData.data.getList;
  return list;
};
