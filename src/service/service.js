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

/*
 * ITEMS
 */

export const getCreateItemSubscription = createSubscription(onCreateItem);

export const getUpdateItemSubscription = createSubscription(onUpdateItem);

export const getDeleteItemSubscription = createSubscription(onDeleteItem);

export const fetchItems = async () => {
  const itemData = await API.graphql(graphqlOperation(listItems));
  const items = itemData.data.listItems.items.map(merge(defaultItemPartial));
  return items;
};

export const addItem = async (item) =>
  await API.graphql(graphqlOperation(createItem, { input: item }));

export const deleteItem = async (id) =>
  await API.graphql(graphqlOperation(deleteItemMutation, { input: { id } }));

export const updateItem = async (input) =>
  await API.graphql(graphqlOperation(updateItemMutation, { input }));

/**
 * LISTS
 */

export const fetchListsForUser = async (email) => {
  const itemData = await API.graphql(
    graphqlOperation(listLists, {
      filter: { members: { contains: email } },
    })
  );
  const lists = itemData.data.listLists.items;
  return lists;
};

export const fetchList = async (id) => {
  const itemData = await API.graphql(graphqlOperation(getList, { id }));
  const list = itemData.data.getList;
  return list;
};
