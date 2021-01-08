import { API, graphqlOperation } from "aws-amplify";
import { listItems } from "./graphql/queries";
import { onCreateItem, onUpdateItem } from "./graphql/subscriptions";
import {
  createItem,
  deleteItem as deleteItemMutation,
  updateItem as updateItemMutation,
} from "./graphql/mutations";

const defaultItemPartial = {
  description: "",
  quantity: 1,
  crossed: false,
};

export const fetchItems = async () => {
  const itemData = await API.graphql(graphqlOperation(listItems));
  const items = itemData.data.listItems.items.map((i) => ({
    ...defaultItemPartial,
    ...i,
  }));
  return items;
};

export const addItem = async (item) =>
  await API.graphql(graphqlOperation(createItem, { input: item }));

const createSubscription = (subscriptionFunc) => (handler) =>
  API.graphql(graphqlOperation(subscriptionFunc)).subscribe({
    next: (itemData) => {
      handler(itemData);
    },
  });

export const getCreateItemSubscription = createSubscription(onCreateItem);

export const getUpdateItemSubscription = createSubscription(onUpdateItem);

export const deleteItem = async (id) =>
  await API.graphql(graphqlOperation(deleteItemMutation, { input: { id } }));

export const updateItem = async (input) =>
  await API.graphql(graphqlOperation(updateItemMutation, { input }));