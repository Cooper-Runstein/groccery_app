import { API, graphqlOperation } from "aws-amplify";
import { listItems, listLists, getList } from "./graphql/queries";
import {
  onCreateItem,
  onCreateList,
  onDeleteItem,
  onDeleteList,
  onUpdateItem,
} from "./graphql/subscriptions";
import {
  createItem,
  createList,
  deleteList as deleteListMutation,
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

const safeRequest = async (req, ignoredErrors = []) => {
  try {
    return await API.graphql(req);
  } catch (errorData) {
    console.log("API ERROR CAUGHT");
    console.log({ errorData });
    if (ignoredErrors.includes(errorData.errorData.message)) {
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

export const getDeleteListSubscription = createSubscription(onDeleteList);

export const getCreateListSubscription = createSubscription(onCreateList);

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

export const addList = async (list) =>
  await safeRequest(graphqlOperation(createList, { input: list }));

export const deleteList = async (id) => {
  console.log({ id });
  await safeRequest(graphqlOperation(deleteListMutation, { input: { id } }));
};
