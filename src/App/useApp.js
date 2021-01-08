import React, { useEffect, useState } from "react";
import * as service from "../service/service";

export function useApp() {
  const [state, setState] = useState({
    inputDescription: "",
    inputName: "",
    inputQuantity: 1,
    items: [],
  });

  const onCreateItem = React.useCallback(
    (newItemData) => {
      const newItem = newItemData.value.data.onCreateItem;
      setState((p) => ({ ...p, items: [...p.items, newItem] }));
    },
    [state.items]
  );

  React.useEffect(() => {
    const subscription = service.getCreateItemSubscription(onCreateItem);
    console.log(subscription);
    return () => subscription.unsubscribe();
  }, [onCreateItem]);

  const fetchAndSetItems = async () => {
    const items = await service.fetchItems();
    setState((p) => ({ ...p, items }));
  };

  useEffect(() => {
    fetchAndSetItems();
  }, []);

  const getInputValue = (e) => e.target.value;

  const setValueAtKey = (k) => (e) =>
    setState((p) => ({ ...p, [k]: getInputValue(e) }));

  const setItemName = setValueAtKey("inputName");
  const setItemDescription = setValueAtKey("inputDescription");

  const incItemQuantity = () =>
    setState((p) => ({ ...p, inputQuantity: p.inputQuantity + 1 }));
  const decItemQuantity = () =>
    setState((p) => ({ ...p, inputQuantity: p.inputQuantity - 1 }));

  async function addItem() {
    const item = {
      description: state.inputDescription,
      name: state.inputName,
      quantity: state.inputQuantity,
    };

    try {
      service.addItem(item);
      // await fetchAndSetItems();
      setState((p) => ({
        ...p,
        inputDescription: "",
        inputName: "",
        inputQuantity: 1,
      }));
    } catch (err) {
      console.log("error creating item:", err);
    }
  }

  async function deleteItem(item) {
    try {
      await service.deleteItem(item.id);
      await fetchAndSetItems();
    } catch (err) {
      console.log("error deleting item:", err);
    }
  }

  return {
    api: {
      deleteItem,
      addItem,
    },
    alterState: {
      setItemName,
      setItemDescription,
      incItemQuantity,
      decItemQuantity,
    },
    state,
  };
}
