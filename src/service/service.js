import { API, graphqlOperation } from "aws-amplify";
import { listItems } from "./graphql/queries";
import {
  createItem,
  deleteItem as deleteItemMutation,
} from "./graphql/mutations";

export const fetchItems = async () => {
  const itemData = await API.graphql(graphqlOperation(listItems));
  const items = itemData.data.listItems.items;
  return items;
};

export const addItem = async (item) =>
  await API.graphql(graphqlOperation(createItem, { input: item }));

export const deleteItem = async (id) =>
  await API.graphql(graphqlOperation(deleteItemMutation, { input: { id } }));
