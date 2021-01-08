import { API, graphqlOperation } from "aws-amplify";
import { listItems } from "./graphql/queries";
import { onCreateItem } from "./graphql/subscriptions";
import {
  createItem,
  deleteItem as deleteItemMutation,
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

export const getCreateItemSubscription = (handler) =>
  API.graphql(graphqlOperation(onCreateItem)).subscribe({
    next: (itemData) => {
      handler(itemData);
    },
  });

export const deleteItem = async (id) =>
  await API.graphql(graphqlOperation(deleteItemMutation, { input: { id } }));
